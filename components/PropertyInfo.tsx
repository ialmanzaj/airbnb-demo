import React from 'react';
import { View, Text } from 'react-native';
import Colors from '@/constants/colors';
import Rating from '@/components/home/Rating';
import { PropertyLocation } from '@/types/listing';

interface PropertyInfoProps {
  title: string;
  location?: PropertyLocation;
  rating: number;
}

const PropertyInfo = ({ title, location, rating }: PropertyInfoProps) => {
  const locationString = location
    ? `${location.city}, ${location.state}`
    : 'Location unavailable';

  return (
    <View className={styles.infoContainer}>
      <View className={styles.titleRow}>
        <Text style={{ color: Colors.light.text }} className={styles.location} numberOfLines={1}>
          {locationString}
        </Text>
        <Rating rating={rating} size="small" showReviewCount={false} />
      </View>

      <Text style={{ color: Colors.light.lightText }} className={styles.title} numberOfLines={2}>
        {title}
      </Text>
    </View>
  );
};

const styles = {
  infoContainer: 'px-0.5',
  titleRow: 'flex-row justify-between items-center mb-1',
  location: 'text-sm font-medium flex-1 mr-2',
  title: 'text-sm mb-1',
};

export default PropertyInfo; 