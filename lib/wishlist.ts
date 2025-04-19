import { db, type AppSchema } from "@/lib/instant";
import { id } from "@instantdb/react-native";

// Types
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
 * Remove a listing from the current user's wishlist
 * @param listingId The ID of the listing to remove from wishlist
 */
export async function removeFromWishlist(
  listingId: string
): Promise<WishlistOperationResult> {
  try {
    // First find the wishlist entry for this listing
    const { data } = db.useQuery({
      wishlist: {
        $: {
          where: {
            "listing.id": listingId,
          },
        },
        id: true,
      },
    });

    if (!data?.wishlist?.[0]?.id) {
      return { success: true }; // Already not in wishlist
    }

    // Delete the wishlist entry - relationships will be automatically cleaned up
    await db.transact([db.tx.wishlist[data.wishlist[0].id].delete()]);

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
export function useWishlistStatus(listingId: string): boolean {
  const { data } = db.useQuery({
    wishlist: {
      $: {
        where: {
          "listing.id": listingId, // Filter by listingId
        },
      },
    },
  });
  return Boolean(data?.wishlist?.length);
}

/**
 * Hook to get all wishlist entries for the current user
 * @returns Array of wishlist entries with listing details
 */
export function useWishlistEntries() {
  const { data, isLoading, error } = db.useQuery({
    wishlist: {
      listing: {},
    },
  });

  return {
    entries: data?.wishlist || [],
    isLoading,
    error,
  };
}
