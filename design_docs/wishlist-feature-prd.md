# Product Requirements Document (PRD) for Wishlist Feature

## 1. Introduction

### 1.1 Purpose
This PRD outlines the requirements for implementing a Wishlist feature in our Airbnb clone application. The feature will allow users to save their favorite property listings by pressing a heart icon on the property card, adding the listing to a wishlist stored in the database.

### 1.2 Scope
The Wishlist feature will be integrated into the existing property listing interface, specifically within the `PropertyCard` component. It will involve frontend UI updates, database schema modifications, and backend logic to manage wishlist data.

**Authentication Note**: User authentication is explicitly OUT OF SCOPE for this feature. The implementation assumes authentication is already handled elsewhere in the application. The wishlist feature will work with the currently authenticated user without implementing any authentication logic.

### 1.3 Target Audience
- End Users: Travelers and property seekers using the app to browse and save listings.
- Developers: Team members who will implement and maintain this feature.
- Stakeholders: Product managers and business analysts tracking feature adoption.

## 2. Feature Overview

### 2.1 Feature Description
Users will be able to add a property listing to their wishlist by pressing a heart icon on the `PropertyCard`. This action will save the listing ID to a wishlist collection in the InstantDB database. The heart icon will visually indicate whether the listing is in the user's wishlist through an animated state transition.

### 2.2 User Story
- As a user, I want to save properties I'm interested in by tapping a heart icon on the PropertyCard, so that I can easily find them later in my wishlist.
- As a user, I want immediate visual feedback when I add/remove a property to my wishlist.

### 2.3 Success Criteria
- Users can add/remove listings to/from their wishlist with a single tap
- Wishlist status is visually reflected on the property card with smooth animations:
  - Outlined heart → Filled heart with scale animation when adding
  - Filled heart → Outlined heart with fade animation when removing
- Wishlist data persists across app sessions and is synced with the database
- Heart icon interaction is responsive (< 100ms feedback)
- Feature achieves at least 20% engagement from active users within the first month

## 3. Requirements

### 3.1 Functional Requirements
1. **UI Element**: 
   - Add a heart icon button to the `PropertyCard` component
   - Position in top-right corner with proper padding and touch target size
   - Support both light and dark mode with appropriate contrast
2. **Toggle Functionality**: 
   - Tapping the heart icon triggers optimistic UI update
   - Implement debouncing to prevent rapid repeated taps
   - Handle edge cases (network errors, concurrent updates)
3. **Visual Feedback**:
   - Heart icon smoothly animates between states using React Native Reanimated
   - Add subtle haptic feedback on state change
   - Show loading state during network operations
4. **Database Integration**: 
   - Store wishlist entries in InstantDB with listing ID and timestamp
   - Implement batch operations for efficient updates
   - Cache wishlist status locally for improved performance

### 3.2 Non-Functional Requirements
1. **Performance**: 
   - UI updates should feel instantaneous (< 16ms)
   - Wishlist actions should complete within 500ms under normal network conditions
   - Implement request queuing for offline support
2. **Scalability**: Database schema should support thousands of wishlist entries per user without performance degradation
3. **Accessibility**: 
   - Heart icon button must have proper ARIA labels
   - Minimum touch target size of 44x44 points
   - Support VoiceOver/TalkBack with meaningful descriptions

### 3.3 System Requirements
- **Frontend**: React Native with Expo, using existing `PropertyCard` component.
- **Backend**: InstantDB for storing wishlist data.

## 4. Design Specifications

### 4.1 UI Mockups
- **Property Card with Heart Icon**:
  - Heart icon: 24x24dp, positioned 16dp from top and right edges
  - Touch target: 44x44dp centered on icon
  - Default state: Outlined heart with 2dp stroke width
  - Active state: Filled heart with brand color
  - Loading state: Subtle pulse animation
  - Transition: 300ms spring animation between states

### 4.2 User Flow
1. User views property listings on the home screen
2. User taps heart icon on a property card
3. Heart icon immediately animates to filled state
4. Wishlist update is sent to InstantDB
5. On success: No visible change (already optimistically updated)
6. On error: Revert animation, show toast notification

### 4.3 Database Schema Changes
- Update InstantDB schema in `instant.schema.ts`:
  ```typescript
  // Wishlist entity
  wishlist: i.entity({
    status: i.string().indexed(), // 'active' or 'deleted'
    createdAt: i.date().indexed(),
  }),

  // Wishlist relationships
  wishlistUser: {
    forward: { on: 'wishlist', has: 'one', label: '$user' },
    reverse: { on: '$users', has: 'many', label: 'wishlistItems' },
  },
  
  wishlistListing: {
    forward: { on: 'wishlist', has: 'one', label: 'listing' },
    reverse: { on: 'listings', has: 'many', label: 'wishlistEntries' },
  }
  ```

## 5. Technical Implementation Plan

### 5.1 Phases
1. **Phase 1: Schema Update**
   - Update InstantDB schema in `@/lib/db` to include wishlist entity and relationships
   - Implement type-safe interfaces for wishlist operations
   - Add wishlist-related types to AppSchema
2. **Phase 2: Data Access Layer**
   - Create `lib/wishlist.ts` for wishlist operations
   - Implement optimistic updates using InstantDB transactions
   - Add proper error handling and type safety
   - Example implementation:
     ```typescript
     import { db } from '@/lib/db';
     import type { AppSchema } from '@/lib/db';

     interface WishlistEntry {
       id: string;
       status: string;
       createdAt: Date;
       listing?: {
         id: string;
       };
     }

     export async function addToWishlist(listingId: string): Promise<void> {
       await db.transact([
         db.tx.wishlist.create({
           status: 'active',
           createdAt: new Date(),
         }),
         (wishlistEntry) => db.tx.wishlistListing.create({
           wishlist: wishlistEntry.id,
           listing: listingId,
         })
       ]);
     }

     export function useWishlistStatus(listingIds: string[]): { [key: string]: boolean } {
       return db.useQuery({
         wishlist: {
           $: { where: { 'listing.id': { $in: listingIds } } },
           id: true,
           listing: {
             id: true
           }
         }
       });
     }
     ```
3. **Phase 3: UI Implementation**
   - Add heart icon to `PropertyCard` component using `lucide-react-native`
   - Implement toggle state logic with InstantDB hooks
   - Add optimistic UI updates and loading states
   - Example component integration:
     ```typescript
     const PropertyCard = ({ property }: PropertyCardProps) => {
       const wishlistStatuses = useWishlistStatus([property.id]);
       const isFavorite = wishlistStatuses[property.id] ?? false;
       
       const handleToggleWishlist = async () => {
         try {
           if (isFavorite) {
             await removeFromWishlist(property.id);
           } else {
             await addToWishlist(property.id);
           }
         } catch (error) {
           // Handle error
         }
       };
       
       return (
         // Component JSX
       );
     };
     ```
4. **Phase 4: Testing and Deployment**
   - Write unit tests for wishlist operations
   - Test InstantDB queries and mutations
   - Implement E2E tests with Maestro
   - Deploy schema changes and monitor performance

### 5.2 Dependencies
- **InstantDB**: Core database operations and real-time sync
- **@instantdb/react-native**: React Native specific hooks and utilities
- **lucide-react-native**: For heart icon UI
- **react-native-reanimated**: For smooth animations
- **expo-haptics**: For haptic feedback

### 5.3 Technical Risks and Mitigations
1. **Database Performance**
   - Risk: Large number of wishlist queries affecting performance
   - Mitigation: 
     - Use indexed fields in schema
     - Implement efficient batch queries
     - Cache wishlist status locally
     - Use InstantDB's optimistic updates

2. **Data Consistency**
   - Risk: Race conditions during concurrent wishlist operations
   - Mitigation:
     - Use InstantDB transactions for atomic operations
     - Implement proper error handling
     - Add retry logic for failed operations

3. **Offline Support**
   - Risk: Poor user experience during network issues
   - Mitigation:
     - Implement local state management
     - Queue operations for offline support
     - Use InstantDB's built-in sync capabilities

## 6. Testing Strategy

### 6.1 Unit Tests
- Test wishlist data operations:
  ```typescript
  describe('Wishlist Operations', () => {
    it('should add listing to wishlist', async () => {
      const listingId = 'test-listing';
      await addToWishlist(listingId);
      const status = await db.query({
        wishlist: {
          $: { where: { 'listing.id': listingId } },
          id: true
        }
      }).first();
      expect(status).toBeTruthy();
    });
  });
  ```
- Test InstantDB hooks and queries:
  ```typescript
  describe('Wishlist Hooks', () => {
    it('should return correct wishlist status', () => {
      const { result } = renderHook(() => 
        useWishlistStatus(['listing-1', 'listing-2'])
      );
      expect(result.current).toEqual({
        'listing-1': false,
        'listing-2': false
      });
    });
  });
  ```

### 6.2 Integration Tests
- Test wishlist feature with InstantDB transactions:
  ```typescript
  describe('Wishlist Integration', () => {
    it('should handle concurrent wishlist operations', async () => {
      const operations = [
        addToWishlist('listing-1'),
        addToWishlist('listing-2'),
        removeFromWishlist('listing-1')
      ];
      await Promise.all(operations);
      // Verify final state
    });
  });
  ```
- Test offline behavior and sync:
  ```typescript
  describe('Offline Support', () => {
    it('should queue operations when offline', async () => {
      // Simulate offline state
      await addToWishlist('listing-3');
      // Verify operation is queued
      // Restore connection
      // Verify sync completes
    });
  });
  ```

### 6.3 E2E Tests
- Maestro flow for wishlist interactions:
  ```yaml
  appId: com.airbnb.clone
  ---
  - launchApp
  - tapOn:
      id: "property-card-1"
  - tapOn:
      id: "wishlist-button"
  - assertVisible:
      id: "wishlist-active-icon"
  - tapOn:
      id: "wishlist-button"
  - assertVisible:
      id: "wishlist-inactive-icon"
  ```

## 7. Monitoring and Analytics

### 7.1 InstantDB Metrics
- Monitor query performance:
  - Average response time for wishlist queries
  - Number of concurrent wishlist operations
  - Cache hit rates for wishlist status
- Track sync health:
  - Sync latency and success rates
  - Number of conflict resolutions
  - Offline queue size and processing time

### 7.2 User Analytics
- Track wishlist engagement:
  - Number of unique users using wishlist feature
  - Average number of items in wishlists
  - Most wishlisted property types
  - Time between adding to wishlist and booking
- Monitor error rates:
  - Failed wishlist operations
  - Sync failures
  - UI error occurrences

### 7.3 Performance Monitoring
- InstantDB query optimization:
  ```typescript
  // Example of query performance tracking
  const startTime = performance.now();
  const result = await db.query({
    wishlist: {
      $: { 
        where: { 'listing.id': { $in: listingIds } },
        limit: 100
      },
      id: true,
      listing: { id: true }
    }
  });
  const queryTime = performance.now() - startTime;
  // Log query time for monitoring
  ```
- UI performance metrics:
  - Time to interactive for wishlist buttons
  - Animation frame rates
  - Memory usage patterns

## 8. Support and Maintenance

### 8.1 Troubleshooting Guide
- Common InstantDB Issues:
  - Query timeout resolution
  - Sync conflict handling
  - Cache invalidation strategies
  - Network error recovery
- UI State Management:
  - Handling stale wishlist states
  - Recovery from failed operations
  - Managing concurrent updates

### 8.2 Maintenance Tasks
- Regular schema validation
- Query performance optimization
- Cache management
- Sync health checks
- Error log analysis

### 8.3 Future Enhancements
- Wishlist categories/collections
- Shared wishlists
- Advanced filtering and sorting
- Offline-first improvements
- Real-time collaboration features

## 9. Appendix

### 9.1 InstantDB Schema Reference
```typescript
// Complete wishlist-related schema
const schema = i.schema({
  entities: {
    wishlist: i.entity({
      status: i.string().indexed(),
      createdAt: i.date().indexed(),
    }),
  },
  links: {
    wishlistUser: {
      forward: { on: 'wishlist', has: 'one', label: '$user' },
      reverse: { on: '$users', has: 'many', label: 'wishlistItems' },
    },
    wishlistListing: {
      forward: { on: 'wishlist', has: 'one', label: 'listing' },
      reverse: { on: 'listings', has: 'many', label: 'wishlistEntries' },
    },
  },
});
```

### 9.2 Type Definitions
```typescript
// Key type definitions for wishlist feature
interface WishlistEntry {
  id: string;
  status: string;
  createdAt: Date;
  listing?: {
    id: string;
  };
}

type WishlistStatus = { [key: string]: boolean };
```

### 9.3 Best Practices
- Follow InstantDB integration standards
- Implement proper error handling
- Use TypeScript for type safety
- Maintain clean architecture
- Document complex queries
- Test thoroughly before deployment

## 10. Rollout Plan
- **Beta Release**: Roll out to 10% of users to gather feedback and monitor performance.
- **Full Release**: Gradual rollout to all users over a week, with monitoring for engagement and issues.
- **Post-Release**: Analyze usage data to assess feature success and identify areas for improvement.

## 11. Support and Maintenance
- **Support**: Provide in-app help documentation for wishlist feature.
- **Maintenance**: Monitor database performance for wishlist queries and optimize as needed.
- **Future Enhancements**: Consider adding a dedicated wishlist screen to view saved listings.

## 12. Appendix
- **References**: InstantDB documentation for schema updates and queries.
- **Glossary**:
  - Wishlist: A collection of user-saved property listings.
  - InstantDB: The database solution used for storing app data. 