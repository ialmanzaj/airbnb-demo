// Based on PRD and usage in WishlistItemCard.tsx
import type { ListingWithDetails } from '@/types/listing'; // Assuming listing types are in types/listing.ts

// Basic Wishlist entity structure
export interface Wishlist {
  id: string;
  createdAt: string; // Or Date?
  status: string; // 'active', 'removed', etc.
  // Add other fields if present in your InstantDB schema
  userId: string; // Link to user
  listingId: string; // Link to listing
}

// Type returned by the useWishlist hook, combining Wishlist and its linked Listing
export interface WishlistItemWithListing extends Wishlist {
  // Use ListingWithDetails for better type accuracy based on schema query
  listing: ListingWithDetails | null; 
}

// Type for the result of add/remove operations from lib/wishlist.ts
export interface WishlistOperationResult {
  success: boolean;
  message?: string;
  error?: any;
  wishlistId?: string; // ID of the created/removed item
} 