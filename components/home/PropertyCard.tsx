import React, { useState, useEffect } from 'react';
import { View, Text, Pressable, Image, Dimensions } from 'react-native';
import { Heart } from 'lucide-react-native';
import * as Haptics from 'expo-haptics';
import Animated, {
  useAnimatedStyle,
  withSpring,
  withSequence,
  useSharedValue,
  withTiming
} from 'react-native-reanimated';
import Colors from '@/constants/colors';
import Rating from './Rating';
import { addToWishlist, removeFromWishlist, useWishlistStatus } from '@/lib/wishlist';

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
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isUpdating, setIsUpdating] = useState(false);
  const images = property.images || [];
  const hasImages = images.length > 0;

  // Animation values
  const scale = useSharedValue(1);
  const opacity = useSharedValue(1);

  // Get wishlist status from InstantDB
  const wishlistStatus = useWishlistStatus(property.id);
  const isFavorite = wishlistStatus ?? initialFavorite;

  // Animated styles
  const heartStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    opacity: opacity.value,
  }));

  const handleNextImage = (e?: any) => {
    if (e) e.stopPropagation();
    if (!hasImages) return;
    setCurrentImageIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handlePrevImage = (e?: any) => {
    if (e) e.stopPropagation();
    if (!hasImages) return;
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const toggleFavorite = async (e: any) => {
    e.stopPropagation();
    if (isUpdating) return;

    const newValue = !isFavorite;
    setIsUpdating(true);

    try {
      // Trigger haptic feedback
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);

      // Animate heart
      scale.value = withSequence(
        withSpring(1.2),
        withSpring(1)
      );
      opacity.value = withTiming(newValue ? 1 : 0.8, { duration: 100 });

      // Update wishlist in database
      if (newValue) {
        await addToWishlist(property.id);
      } else {
        await removeFromWishlist(property.id);
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

  const locationString = property.location
    ? `${property.location.city}, ${property.location.state}`
    : 'Location unavailable';
  const basePrice = property.pricing?.basePrice;
  const currentImageUrl = hasImages ? images[currentImageIndex]?.url : undefined;

  return (
    <Pressable
      className={styles.container}
      style={{ width: cardWidth }}
      onPress={() => onPress(property)}
      testID="property-card"
    >
      <View className={styles.imageContainer} style={{ height: cardWidth * 1.1 }}>
        {currentImageUrl ? (
          <Image
            source={{ uri: currentImageUrl }}
            className={styles.image}
            resizeMode="cover"
            testID="property-image"
          />
        ) : (
          <View className={`${styles.image} ${styles.placeholderImage}`}>
            <Text style={{ color: Colors.light.lightText }} className={styles.placeholderText}>
              No Image
            </Text>
          </View>
        )}

        <Pressable
          className={styles.favoriteButton}
          onPress={toggleFavorite}
          disabled={isUpdating}
          testID="favorite-button"
        >
          <Animated.View style={heartStyle}>
            <Heart
              size={20}
              color={isFavorite ? Colors.light.primary : 'white'}
              fill={isFavorite ? Colors.light.primary : 'transparent'}
              testID="heart-icon"
            />
          </Animated.View>
        </Pressable>

        {hasImages && images.length > 1 && (
          <View className={styles.imageNavigation}>
            {images.map((_, index) => (
              <View
                key={index}
                className={`${styles.dot} ${index === currentImageIndex ? styles.activeDot : ''}`}
                testID={`image-dot-${index}`}
              />
            ))}
          </View>
        )}

        {hasImages && images.length > 1 && (
          <>
            <Pressable
              className={`${styles.navButton} ${styles.prevButton}`}
              onPress={handlePrevImage}
              testID="prev-image-button"
            >
              <Text style={{ color: Colors.light.text }} className={styles.navButtonText}>‹</Text>
            </Pressable>

            <Pressable
              className={`${styles.navButton} ${styles.nextButton}`}
              onPress={handleNextImage}
              testID="next-image-button"
            >
              <Text style={{ color: Colors.light.text }} className={styles.navButtonText}>›</Text>
            </Pressable>
          </>
        )}
      </View>

      <View className={styles.infoContainer}>
        <View className={styles.titleRow}>
          <Text style={{ color: Colors.light.text }} className={styles.location} numberOfLines={1}>
            {locationString}
          </Text>
          <Rating rating={property.rating} size="small" showReviewCount={false} />
        </View>

        <Text style={{ color: Colors.light.lightText }} className={styles.title} numberOfLines={2}>
          {property.title}
        </Text>

        {basePrice !== undefined ? (
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
        )}
      </View>
    </Pressable>
  );
};

const styles = {
  // Layout
  container: 'mb-5',
  imageContainer: 'relative w-full rounded-xl overflow-hidden mb-2.5',
  image: 'w-full h-full',
  infoContainer: 'px-0.5',
  titleRow: 'flex-row justify-between items-center mb-1',
  priceContainer: 'flex-row items-baseline',

  // Interactive Elements
  favoriteButton: 'absolute top-2.5 right-2.5 z-10',
  navButton: 'absolute top-1/2 -translate-y-[15px] w-[30px] h-[30px] rounded-full bg-white/80 justify-center items-center opacity-80',
  prevButton: 'left-2.5',
  nextButton: 'right-2.5',

  // Image Navigation
  imageNavigation: 'absolute bottom-2.5 left-0 right-0 flex-row justify-center items-center',
  dot: 'w-1.5 h-1.5 rounded-full bg-white/50 mx-0.5',
  activeDot: 'bg-white w-2 h-2 rounded-full',

  // Typography
  location: 'text-sm font-medium flex-1 mr-2',
  title: 'text-sm mb-1',
  price: 'text-base font-bold',
  night: 'text-sm',
  navButtonText: 'text-xl font-bold',
  placeholderText: 'text-base',
  priceUnavailable: 'text-sm mt-1',

  // Visual States
  placeholderImage: 'bg-gray-200 justify-center items-center'
};

export default PropertyCard;