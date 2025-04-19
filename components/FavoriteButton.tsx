import React, { useState } from 'react';
import { Pressable } from 'react-native';
import { Heart } from 'lucide-react-native';
import * as Haptics from 'expo-haptics';
import Colors from '@/constants/colors';
import { addToWishlist, removeFromWishlist, useWishlistStatus, useWishlistEntryId } from '@/crud/wishlist';

interface FavoriteButtonProps {
  propertyId: string;
  initialFavorite?: boolean;
  onFavoriteChange?: (isFavorite: boolean) => void;
  testID?: string;
}

const FavoriteButton = ({
  propertyId,
  initialFavorite = false,
  onFavoriteChange,
  testID = 'favorite-button'
}: FavoriteButtonProps) => {
  const [isUpdating, setIsUpdating] = useState(false);
  const isWishlisted = useWishlistStatus(propertyId);
  const { data: wishlistData } = useWishlistEntryId(propertyId);
  const isFavorite = isWishlisted ?? initialFavorite;

  const handleRemoveFromWishlist = async () => {
    const wishlistId = wishlistData?.wishlist?.[0]?.id;
    if (wishlistId) {
      await removeFromWishlist(wishlistId);
    }
  };

  const toggleFavorite = async (e: any) => {
    e.stopPropagation();
    if (isUpdating) return;

    const newValue = !isFavorite;
    setIsUpdating(true);

    try {
      // Trigger haptic feedback
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);

      if (newValue) {
        await addToWishlist(propertyId);
      } else {
        await handleRemoveFromWishlist();
      }

      if (onFavoriteChange) {
        onFavoriteChange(newValue);
      }
    } catch (error) {
      console.error('Error updating wishlist:', error);
      // Provide feedback for error
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <Pressable
      className={styles.favoriteButton}
      onPress={toggleFavorite}
      disabled={isUpdating}
      testID={testID}
    >
      <Heart
        size={20}
        color={isFavorite ? Colors.light.primary : 'white'}
        fill={isFavorite ? Colors.light.primary : 'transparent'}
        testID="heart-icon"
      />
    </Pressable>
  );
};

const styles = {
  favoriteButton: 'absolute top-2.5 right-2.5 z-10',
};

export default FavoriteButton; 