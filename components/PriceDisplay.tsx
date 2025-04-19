import React from 'react';
import { View, Text } from 'react-native';
import Colors from '@/constants/colors';
import { PropertyPricing } from '@/types/listing';

interface PriceDisplayProps {
  pricing?: PropertyPricing;
}

const PriceDisplay = ({ pricing }: PriceDisplayProps) => {
  const basePrice = pricing?.basePrice;

  return basePrice !== undefined ? (
    <View className={styles.priceContainer}>
      <Text style={{ color: Colors.light.text }} className={styles.price}>
        ${basePrice}
      </Text>
      <Text style={{ color: Colors.light.text }} className={styles.night}> night</Text>
    </View>
  ) : (
    <Text style={{ color: Colors.light.lightText }} className={styles.priceUnavailable}>
      Price unavailable
    </Text>
  );
};

const styles = {
  priceContainer: 'flex-row items-baseline',
  price: 'text-base font-bold',
  night: 'text-sm',
  priceUnavailable: 'text-sm mt-1',
};

export default PriceDisplay; 