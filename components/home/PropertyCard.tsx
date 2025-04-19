import React from 'react';
import { View, Pressable, Dimensions } from 'react-native';
import ImageCarousel from '@/components/ImageCarousel';
import PropertyInfo from '@/components/PropertyInfo';
import PriceDisplay from '@/components/PriceDisplay';
import { WishlistFavoriteButton } from '../WishlistFavoriteButton';
import { Property } from '@/types/listing';

interface PropertyCardProps {
  property: Property;
  onPress: (property: Property) => void;
}

const { width } = Dimensions.get('window');
const cardWidth = width / 2 - 24; // 2 columns with padding

const PropertyCard = ({ property, onPress }: PropertyCardProps) => {
  return (
    <Pressable
      className={styles.container}
      style={{ width: cardWidth }}
      onPress={() => onPress(property)}
      testID="property-card"
    >
      <View style={{ position: 'relative' }}>
        <ImageCarousel
          images={property.images || []}
          height={cardWidth * 1.1}
        />
        <WishlistFavoriteButton
          propertyId={property.id}
        />
      </View>

      <PropertyInfo
        title={property.title}
        location={property.location}
        rating={property.rating}
      />

      <PriceDisplay pricing={property.pricing} />
    </Pressable>
  );
};

const styles = {
  container: 'mb-5',
};

export default PropertyCard; 