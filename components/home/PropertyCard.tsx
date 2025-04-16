import React, { useState } from 'react';
import { StyleSheet, View, Text, Pressable, Dimensions, Image } from 'react-native';
import { Heart } from 'lucide-react-native';
import Colors from '@/constants/colors';
import { Property } from '@/mocks/properties';
import Rating from './Rating';

interface PropertyCardProps {
  property: Property;
  onPress: (property: Property) => void;
}

const { width } = Dimensions.get('window');
const cardWidth = width / 2 - 24; // 2 columns with padding

const PropertyCard = ({ property, onPress }: PropertyCardProps) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);

  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) => 
      prevIndex === property.images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handlePrevImage = () => {
    setCurrentImageIndex((prevIndex) => 
      prevIndex === 0 ? property.images.length - 1 : prevIndex - 1
    );
  };

  const toggleFavorite = (e: any) => {
    e.stopPropagation();
    setIsFavorite(!isFavorite);
  };

  return (
    <Pressable 
      style={styles.container}
      onPress={() => onPress(property)}
    >
      <View style={styles.imageContainer}>
        <Image 
          source={{ uri: property.images[currentImageIndex] }}
          style={styles.image}
          resizeMode="cover"
        />
        
        <Pressable 
          style={styles.favoriteButton}
          onPress={toggleFavorite}
        >
          <Heart 
            size={20} 
            color={isFavorite ? Colors.light.primary : 'white'} 
            fill={isFavorite ? Colors.light.primary : 'transparent'} 
          />
        </Pressable>
        
        <View style={styles.imageNavigation}>
          {property.images.map((_, index) => (
            <View 
              key={index} 
              style={[
                styles.dot, 
                index === currentImageIndex && styles.activeDot
              ]} 
            />
          ))}
        </View>
        
        {property.superhost && (
          <View style={styles.superhostBadge}>
            <Text style={styles.superhostText}>Superhost</Text>
          </View>
        )}
        
        <Pressable 
          style={[styles.navButton, styles.prevButton]} 
          onPress={handlePrevImage}
        >
          <Text style={styles.navButtonText}>‹</Text>
        </Pressable>
        
        <Pressable 
          style={[styles.navButton, styles.nextButton]} 
          onPress={handleNextImage}
        >
          <Text style={styles.navButtonText}>›</Text>
        </Pressable>
      </View>
      
      <View style={styles.infoContainer}>
        <View style={styles.titleRow}>
          <Text style={styles.location} numberOfLines={1}>
            {property.location}
          </Text>
          <Rating rating={property.rating} size="small" showReviewCount={false} />
        </View>
        
        <Text style={styles.title} numberOfLines={2}>
          {property.title}
        </Text>
        
        <Text style={styles.distance}>
          {property.distance}
        </Text>
        
        <Text style={styles.dates}>
          {property.dates}
        </Text>
        
        <View style={styles.priceContainer}>
          <Text style={styles.price}>
            ${property.price}
          </Text>
          <Text style={styles.night}> night</Text>
        </View>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    width: cardWidth,
    marginBottom: 20,
  },
  imageContainer: {
    position: 'relative',
    width: '100%',
    height: cardWidth * 1.1,
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 10,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  favoriteButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    zIndex: 10,
  },
  imageNavigation: {
    position: 'absolute',
    bottom: 10,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    marginHorizontal: 2,
  },
  activeDot: {
    backgroundColor: 'white',
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  superhostBadge: {
    position: 'absolute',
    top: 10,
    left: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  superhostText: {
    color: 'white',
    fontSize: 10,
    fontWeight: 'bold',
  },
  navButton: {
    position: 'absolute',
    top: '50%',
    transform: [{ translateY: -15 }],
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
    opacity: 0.8,
  },
  prevButton: {
    left: 10,
  },
  nextButton: {
    right: 10,
  },
  navButtonText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.light.text,
  },
  infoContainer: {
    paddingHorizontal: 2,
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  location: {
    fontSize: 14,
    fontWeight: '500',
    color: Colors.light.text,
    flex: 1,
    marginRight: 8,
  },
  title: {
    fontSize: 14,
    color: Colors.light.lightText,
    marginBottom: 4,
  },
  distance: {
    fontSize: 14,
    color: Colors.light.lightText,
    marginBottom: 2,
  },
  dates: {
    fontSize: 14,
    color: Colors.light.lightText,
    marginBottom: 4,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.light.text,
  },
  night: {
    fontSize: 14,
    color: Colors.light.text,
  },
});

export default PropertyCard;