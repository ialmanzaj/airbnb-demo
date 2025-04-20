import React from 'react';
import { View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface RatingProps {
  rating?: number | null;
  // Optional: Add reviewCount later if needed
  // reviewCount?: number;
}

/**
 * Component to display the average rating with a star icon.
 */
const Rating: React.FC<RatingProps> = ({ rating }) => {
  // Don't render the component if rating is null or undefined
  if (rating == null || rating === undefined) {
    return null;
  }

  return (
    <View className={styles.container}>
      <Ionicons name="star" size={16} color="#FFB400" /> {/* Use a gold-like color for the star */}
      <Text className={styles.text}>{rating.toFixed(1)}</Text>
    </View>
  );
};

// Styles adhering to 2001-tailwind-styling.mdc
const styles = {
  // Layout
  container: 'flex-row items-center',
  // Typography
  text: 'ml-1 text-sm font-normal text-gray-800',
};

export default Rating; 