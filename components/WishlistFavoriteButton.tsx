import React from 'react';
import {
  useWishlistEntryId,
  toggleWishlist
} from '@/lib/wishlist';
import FavoriteButton from '@/components/FavoriteButton';

interface WishlistFavoriteButtonProps {
  propertyId: string;
}

export const WishlistFavoriteButton: React.FC<WishlistFavoriteButtonProps> = ({ propertyId }) => {
  const { data: wishlistStatus, isLoading } = useWishlistEntryId(propertyId);
  const wishlistId = wishlistStatus?.wishlist?.[0]?.id;

  const handleToggleWishlist = async () => {
    await toggleWishlist(propertyId, wishlistId);
  };

  return (
    <FavoriteButton
      isFavorite={Boolean(wishlistStatus?.wishlist?.length)}
      isLoading={isLoading}
      onPress={handleToggleWishlist}
    />
  );
};

export default WishlistFavoriteButton; 