import React, { useState } from 'react';
import { View, Text, Pressable, Image } from 'react-native';
import Colors from '@/constants/colors';
import { PropertyImage } from '@/types/listing';

interface ImageCarouselProps {
  images: PropertyImage[];
  height: number;
  testID?: string;
}

const ImageCarousel = ({ images, height, testID = 'property-image' }: ImageCarouselProps) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const hasImages = images.length > 0;
  const currentImageUrl = hasImages ? images[currentImageIndex]?.url : undefined;

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

  return (
    <View className={styles.imageContainer} style={{ height }}>
      {currentImageUrl ? (
        <Image
          source={{ uri: currentImageUrl }}
          className={styles.image}
          resizeMode="cover"
          testID={testID}
        />
      ) : (
        <View className={`${styles.image} ${styles.placeholderImage}`}>
          <Text style={{ color: Colors.light.lightText }} className={styles.placeholderText}>
            No Image
          </Text>
        </View>
      )}

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
  );
};

const styles = {
  imageContainer: 'relative w-full rounded-xl overflow-hidden mb-2.5',
  image: 'w-full h-full',
  placeholderImage: 'bg-gray-200 justify-center items-center',
  placeholderText: 'text-base',
  imageNavigation: 'absolute bottom-2.5 left-0 right-0 flex-row justify-center items-center',
  dot: 'w-1.5 h-1.5 rounded-full bg-white/50 mx-0.5',
  activeDot: 'bg-white w-2 h-2 rounded-full',
  navButton: 'absolute top-1/2 -translate-y-[15px] w-[30px] h-[30px] rounded-full bg-white/80 justify-center items-center opacity-80',
  prevButton: 'left-2.5',
  nextButton: 'right-2.5',
  navButtonText: 'text-xl font-bold',
};

export default ImageCarousel; 