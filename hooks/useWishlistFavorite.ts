import { useCallback } from 'react';
import { getWishlistByListingId, toggleWishlist } from '@/lib/wishlist';

export interface UseWishlistFavoriteResult {
  isFavorite: boolean;
  isLoading: boolean;
  handleToggle: () => Promise<void>;
  error: Error | null;
}

export const useWishlistFavorite = (propertyId: string): UseWishlistFavoriteResult => {
  const { data, isLoading, error } = getWishlistByListingId(propertyId);
  const wishlistId = data?.wishlist?.[0]?.id;
  
  const handleToggle = useCallback(async () => {
    try {
      await toggleWishlist(propertyId, wishlistId);
    } catch (err) {
      console.error('Error toggling wishlist:', err);
      throw err;
    }
  }, [propertyId, wishlistId]);

  return {
    isFavorite: Boolean(data?.wishlist?.length),
    isLoading,
    handleToggle,
    error: error as Error | null
  };
}; 