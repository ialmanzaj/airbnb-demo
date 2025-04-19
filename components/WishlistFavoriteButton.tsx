import React, { useEffect } from 'react';
import FavoriteButton from '@/components/FavoriteButton';
import { useWishlistFavorite } from '@/hooks/useWishlistFavorite';

interface WishlistFavoriteButtonProps {
  propertyId: string;
  onError?: (error: Error) => void;
}

export const WishlistFavoriteButton: React.FC<WishlistFavoriteButtonProps> = ({
  propertyId,
  onError
}) => {
  const { isFavorite, isLoading, handleToggle, error } = useWishlistFavorite(propertyId);

  useEffect(() => {
    if (error && onError) {
      onError(error);
    }
  }, [error, onError]);

  return (
    <FavoriteButton
      isFavorite={isFavorite}
      isLoading={isLoading}
      onPress={handleToggle}
      testID="wishlist-favorite-button"
    />
  );
};

export default WishlistFavoriteButton; 