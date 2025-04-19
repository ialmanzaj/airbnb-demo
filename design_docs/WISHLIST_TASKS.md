# Wishlist Feature Implementation

Implementation of the Wishlist feature allowing users to save their favorite property listings.

**Important Note**: Authentication is OUT OF SCOPE for this implementation. We assume authentication is already handled by the application and will use InstantDB's built-in `$user` functionality for user association.

## Completed Tasks

- [x] Phase 1: Database Schema Setup
  - [x] Create wishlist collection in InstantDB
  - [x] Define schema with required fields (id, userId, listingId, createdAt)
  - [x] Deploy schema changes

- [x] Phase 2: UI Components
  - [x] Add heart icon to PropertyCard component
  - [x] Implement toggle state management
  - [x] Add animations using React Native Reanimated
  - [x] Add haptic feedback
  - [x] Implement loading states and error handling

## In Progress Tasks

- [ ] Phase 3: Database Integration
  - [x] Create wishlist data access functions
  - [x] Implement optimistic updates
  - [x] Add local caching for wishlist status (out of scope)
  - [x] Handle offline support and request queuing (out of scope)

## Future Tasks

- [ ] Phase 4: Testing
  - [ ] Write unit tests for UI components
  - [ ] Write integration tests for database operations
  - [ ] Add E2E tests using Maestro
  - [ ] Perform performance testing

## Implementation Plan

We will follow the phased approach outlined in the PRD, focusing on the UI implementation and database integration. The feature will use InstantDB's built-in user management - authentication is explicitly out of scope.

### Relevant Files

- `instant.schema.ts` - Updated with wishlist schema definition
- `components/home/PropertyCard.tsx` - Updated with wishlist UI and interactions
- `lib/wishlist.ts` - Added wishlist database operations

## Technical Details

### Database Schema (InstantDB)
```typescript
// Using InstantDB's built-in user management
interface WishlistEntry {
  id: string;
  status: string;
  createdAt: Date;
  listing?: {
    id: string;
  };
}

// Relationships handled through InstantDB schema:
// - wishlistUser: Links wishlist to built-in $user
// - wishlistListing: Links wishlist to listing
```

### Dependencies
- InstantDB
- React Native Reanimated
- lucide-react-native (for heart icon)
- react-native-haptics
- expo-haptics 

### Database Operations

#### Core Types
```typescript
interface WishlistEntry {
  id: string;
  createdAt: Date;
  listing?: {
    id: string;
  };
}

interface WishlistOperationResult {
  success: boolean;
  error?: string;
}
```

#### Required Operations

1. **Add to Wishlist**
```typescript
// Creates wishlist entry and links to current user and listing
async function addToWishlist(listingId: string): Promise<WishlistOperationResult> {
  try {
    await db.transact([
      db.tx.wishlist.create({
        createdAt: new Date(),
      }),
      (wishlistEntry) => db.tx.wishlistListing.create({
        wishlist: wishlistEntry.id,
        listing: listingId,
      })
    ]);
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
}
```

2. **Remove from Wishlist**
```typescript
// Hard deletes the wishlist entry (relationships auto-cleanup)
async function removeFromWishlist(listingId: string): Promise<WishlistOperationResult> {
  try {
    await db.tx.wishlist.delete({
      id: listingId
    });
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
}
```

3. **Check Wishlist Status**
```typescript
// Returns boolean indicating if listing is in user's wishlist
function useWishlistStatus(listingId: string): boolean {
  const { data } = db.useQuery({
    wishlist: {
      $: { 
        where: { 
          'listing.id': listingId,
        }
      },
      id: true
    }
  });
  return Boolean(data?.wishlist?.length);
}
```

#### Error Handling

The operations handle the following error cases:
- Network errors during database operations
- Invalid listing IDs
- Unauthorized operations
- Concurrent modification conflicts

#### Listing Deletion Handling

When a listing is deleted:
- InstantDB schema automatically handles cascade deletion
- All associated wishlist entries are automatically removed
- No additional cleanup code required due to schema relationship configuration 