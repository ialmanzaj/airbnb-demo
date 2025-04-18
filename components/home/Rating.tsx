import React from 'react';
import { View, Text } from 'react-native';
import { Star } from 'lucide-react-native';
import Colors from '@/constants/colors';

interface RatingProps {
  rating: number;
  reviewCount?: number;
  size?: 'small' | 'medium' | 'large';
  showReviewCount?: boolean;
}

const Rating = ({ 
  rating, 
  reviewCount = 0, 
  size = 'medium',
  showReviewCount = true 
}: RatingProps) => {
  const starSize = size === 'small' ? 12 : size === 'medium' ? 14 : 16;
  
  return (
    <View className={styles.container}>
      <Star 
        size={starSize} 
        color={Colors.light.rating} 
        fill={Colors.light.rating} 
      />
      <Text className={`${styles.ratingText} ${
        size === 'small' ? styles.smallText : 
        size === 'large' ? styles.largeText : ''
      }`}>
        {rating.toFixed(2)}
      </Text>
      {showReviewCount && reviewCount > 0 && (
        <>
          <Text className={`${styles.separator} ${
            size === 'small' ? styles.smallText : 
            size === 'large' ? styles.largeText : ''
          }`}>·</Text>
          <Text className={`${styles.reviewCount} ${
            size === 'small' ? styles.smallText : 
            size === 'large' ? styles.largeText : ''
          }`}>
            {reviewCount} {reviewCount === 1 ? 'review' : 'reviews'}
          </Text>
        </>
      )}
    </View>
  );
};

const styles = {
  // Layout
  container: 'flex-row items-center',
  
  // Typography
  ratingText: 'text-sm font-medium text-gray-900 ml-1',
  separator: 'text-sm text-gray-500 mx-1',
  reviewCount: 'text-sm text-gray-500',
  
  // Size Variants
  smallText: 'text-xs',
  largeText: 'text-base'
};

export default Rating;