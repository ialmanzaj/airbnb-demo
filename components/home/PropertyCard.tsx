import React, { useState } from 'react';
import { View, Text, Pressable, Image, Dimensions } from 'react-native';
import { Heart } from 'lucide-react-native';
import Colors from '@/constants/colors';
import { InstaQLEntity } from '@instantdb/react-native';
import { AppSchema } from '@/instant.schema';
import Rating from './Rating';

type ListingWithDetails = InstaQLEntity<
  AppSchema,
  'listings',
  {
    images: {};
    location: {};
    pricing: {};
  }
>;

interface PropertyCardProps {
  property: ListingWithDetails;
  onPress: (property: ListingWithDetails) => void;
}

const { width } = Dimensions.get('window');
const cardWidth = width / 2 - 24; // 2 columns with padding

const PropertyCard = ({ property, onPress }: PropertyCardProps) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);
  const images = property.images || [];
  const hasImages = images.length > 0;

  const handleNextImage = () => {
    if (!hasImages) return;
    setCurrentImageIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handlePrevImage = () => {
    if (!hasImages) return;
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const toggleFavorite = (e: any) => {
    e.stopPropagation();
    setIsFavorite(!isFavorite);
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
    >
      <View className={styles.imageContainer} style={{ height: cardWidth * 1.1 }}>
        {currentImageUrl ? (
          <Image 
            source={{ uri: currentImageUrl }}
            className={styles.image}
            resizeMode="cover"
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
        >
          <Heart 
            size={20} 
            color={isFavorite ? Colors.light.primary : 'white'} 
            fill={isFavorite ? Colors.light.primary : 'transparent'} 
          />
        </Pressable>
        
        {hasImages && images.length > 1 && (
          <View className={styles.imageNavigation}>
            {images.map((_, index) => (
              <View 
                key={index} 
                className={`${styles.dot} ${index === currentImageIndex ? styles.activeDot : ''}`}
              />
            ))}
          </View>
        )}
        
        {hasImages && images.length > 1 && (
          <>
            <Pressable 
              className={`${styles.navButton} ${styles.prevButton}`}
              onPress={handlePrevImage}
            >
              <Text style={{ color: Colors.light.text }} className={styles.navButtonText}>‹</Text>
            </Pressable>
            
            <Pressable 
              className={`${styles.navButton} ${styles.nextButton}`}
              onPress={handleNextImage}
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