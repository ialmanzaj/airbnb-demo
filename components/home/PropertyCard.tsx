import React from 'react';
import { View, Pressable, Dimensions } from 'react-native';
import ImageCarousel from '@/components/ImageCarousel';
import FavoriteButton from '@/components/FavoriteButton';
import PropertyInfo from '@/components/PropertyInfo';
import PriceDisplay from '@/components/PriceDisplay';
import { WishlistFavoriteButton } from '../WishlistFavoriteButton';

export interface PropertyImage {
  id: string;
  url: string;
  caption?: string;
  isPrimary?: boolean;
  order?: number;
}

export interface PropertyLocation {
  id: string;
  address: string;
  city: string;
  state: string;
  country: string;
  zipCode: string;
  lat: number;
  lng: number;
}

export interface PropertyPricing {
  id: string;
  basePrice: number;
  cleaningFee: number;
  serviceFee: number;
  currency: string;
  minNights: number;
  maxNights: number;
}

export interface Property {
  id: string;
  status: string;
  createdAt: string | number;
  updatedAt: string | number;
  title: string;
  description: string;
  type: string;
  slug: string;
  maxGuests: number;
  bedrooms: number;
  beds: number;
  baths: number;
  rating: number;
  images: PropertyImage[];
  location?: PropertyLocation;
  pricing?: PropertyPricing;
}

interface PropertyCardProps {
  property: Property;
  onPress: (property: Property) => void;
  initialFavorite?: boolean;
  onFavoriteChange?: (isFavorite: boolean) => void;
}

const { width } = Dimensions.get('window');
const cardWidth = width / 2 - 24; // 2 columns with padding

const PropertyCard = ({ property, onPress, initialFavorite = false, onFavoriteChange }: PropertyCardProps) => {
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