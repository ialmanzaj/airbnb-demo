import React from 'react';
import { Pressable } from 'react-native';
import { Heart } from 'lucide-react-native'; // Assuming lucide icons are used
import Colors from '@/constants/colors'; // Assuming color constants exist

interface WishlistFavoriteButtonProps {
  isFavorite: boolean; // Should always be true when used in WishlistItemCard
  onPress: () => void;
  size?: number;
  className?: string;
}

// Simplified version for use in WishlistItemCard
// Assumes it will always be displayed as 'favorited' (filled heart)
// and the onPress handler triggers removal.
const WishlistFavoriteButton: React.FC<WishlistFavoriteButtonProps> = ({ onPress, size = 24, className }) => {
  // On the wishlist screen, the item is always favorited, so we show a filled heart.
  // Pressing it triggers the removal action.
  return (
    <Pressable onPress={onPress} hitSlop={10} className={`${className} active:opacity-70`}>
      <Heart size={size} color={Colors.light.primary} fill={Colors.light.primary} />
    </Pressable>
  );
};

export default WishlistFavoriteButton; 