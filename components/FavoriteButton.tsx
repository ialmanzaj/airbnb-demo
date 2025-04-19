import React from 'react';
import { Pressable } from 'react-native';
import { Heart } from 'lucide-react-native';
import * as Haptics from 'expo-haptics';
import Colors from '@/constants/colors';

interface FavoriteButtonProps {
  isFavorite: boolean;
  isLoading?: boolean;
  onPress: () => void;
  testID?: string;
}

const FavoriteButton = ({
  isFavorite,
  isLoading = false,
  onPress,
  testID = 'favorite-button'
}: FavoriteButtonProps) => {
  const handlePress = (e: any) => {
    e.stopPropagation();
    if (isLoading) return;

    // Trigger haptic feedback
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    onPress();
  };

  return (
    <Pressable
      className={styles.favoriteButton}
      onPress={handlePress}
      disabled={isLoading}
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