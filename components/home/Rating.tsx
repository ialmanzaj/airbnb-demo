import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
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
    <View style={styles.container}>
      <Star 
        size={starSize} 
        color={Colors.light.rating} 
        fill={Colors.light.rating} 
      />
      <Text style={[
        styles.ratingText, 
        size === 'small' && styles.smallText,
        size === 'large' && styles.largeText
      ]}>
        {rating.toFixed(2)}
      </Text>
      {showReviewCount && reviewCount > 0 && (
        <>
          <Text style={[
            styles.separator, 
            size === 'small' && styles.smallText,
            size === 'large' && styles.largeText
          ]}>·</Text>
          <Text style={[
            styles.reviewCount, 
            size === 'small' && styles.smallText,
            size === 'large' && styles.largeText
          ]}>
            {reviewCount} {reviewCount === 1 ? 'review' : 'reviews'}
          </Text>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    fontSize: 14,
    fontWeight: '500',
    color: Colors.light.text,
    marginLeft: 4,
  },
  separator: {
    fontSize: 14,
    color: Colors.light.lightText,
    marginHorizontal: 4,
  },
  reviewCount: {
    fontSize: 14,
    color: Colors.light.lightText,
  },
  smallText: {
    fontSize: 12,
  },
  largeText: {
    fontSize: 16,
  },
});

export default Rating;