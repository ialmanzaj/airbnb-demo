import { db } from "@/lib/db";
import { id } from "@instantdb/react-native";

interface WishlistOperationResult {
  success: boolean;
  error?: string;
}

/**
 * Add a listing to the current user's wishlist
 * @param listingId The ID of the listing to add to wishlist
 */
export async function addToWishlist(
  listingId: string
): Promise<WishlistOperationResult> {
  try {
    const wishlistId = id();
    await db.transact([
      db.tx.wishlist[wishlistId].update({
        createdAt: new Date().toISOString(),
      }),
      // Create the relationship using a separate step
      db.tx.wishlist[wishlistId].link({
        listing: listingId,
      }),
    ]);
    return { success: true };
  } catch (error) {
    console.error("Failed to add to wishlist:", error);
    return {
      success: false,
      error:
        error instanceof Error ? error.message : "Failed to add to wishlist",
    };
  }
}

/**
 * Hook to get a wishlist entry ID for a listing
 * @param listingId The ID of the listing to check
 * @returns Query result containing wishlist entry ID if it exists
 */
export function getWishlistByListingId(listingId: string) {
  return db.useQuery({
    wishlist: {
      $: {
        where: {
          "listing.id": listingId,
        },
      },
    },
  });
}

/**
 * Remove a listing from the current user's wishlist
 * @param wishlistId The ID of the wishlist entry to remove
 */
export async function removeFromWishlist(
  wishlistId: string
): Promise<WishlistOperationResult> {
  try {
    // Delete the wishlist entry - relationships will be automatically cleaned up
    await db.transact([db.tx.wishlist[wishlistId].delete()]);

    return { success: true };
  } catch (error) {
    console.error("Failed to remove from wishlist:", error);
    return {
      success: false,
      error:
        error instanceof Error
          ? error.message
          : "Failed to remove from wishlist",
    };
  }
}

/**
 * Hook to check if a listing is in the current user's wishlist
 * @param listingId The ID of the listing to check
 * @returns boolean indicating if the listing is in the wishlist
 */
export function useWishlistExists(listingId: string): boolean {
  const { data } = getWishlistByListingId(listingId);
  return Boolean(data?.wishlist?.length);
}

/**
 * Hook to get all wishlist entries for the current user with detailed listing information
 * @returns Array of wishlist entries with nested listing details (location, pricing, primary image)
 */
export function getWishlist() {
  // Fetch wishlist items and include necessary linked listing details
  // This query structure should align with ListingWithDetails type
  const { data, isLoading, error } = db.useQuery({
    wishlist: {
      listing: { // Fetch the linked listing
        // Explicitly fetch nested fields needed for the UI
        location: {}, // Fetch linked location details
        pricing: {}, // Fetch linked pricing details
        images: { // Fetch linked images
           // Optionally filter for primary image or limit, but fetching all 
           // might be needed by WishlistItemCard's findPrimaryImageUrl
           // $: { where: { isPrimary: true }, limit: 1 }, 
        }, 
      },
    },
  });

  // Ensure we return an empty array if data is null/undefined during loading or error
  const wishlistItems = data?.wishlist || [];

  return {
    wishlist: wishlistItems,
    isLoading,
    error,
  };
}

/**
 * Toggle the wishlist status for a listing
 * @param propertyId The ID of the listing to toggle
 * @param wishlistId Optional ID of existing wishlist entry
 */
export async function toggleWishlist(
  propertyId: string,
  wishlistId?: string
): Promise<WishlistOperationResult> {
  try {
    if (wishlistId) {
      return await removeFromWishlist(wishlistId);
    } else {
      return await addToWishlist(propertyId);
    }
  } catch (error) {
    console.error("Error toggling wishlist:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to toggle wishlist",
    };
  }
}
