import React, { useCallback } from 'react';
import { View, Text, Pressable, Dimensions } from 'react-native';
import { useRouter } from 'expo-router';

import PriceDisplay from '@/components/PriceDisplay';
import Rating from '@/components/home/Rating';
import ImageCarousel from '@/components/ImageCarousel';
import WishlistFavoriteButton from '@/components/wishlist/WishlistFavoriteButton';
import { WishlistItemWithListing } from '@/types/wishlist';
import { PropertyImage } from '@/types/listing';

interface WishlistItemCardProps {
    item: WishlistItemWithListing;
    onRemovePress: (wishlistId: string) => void; // Callback for remove button press
}

const { width } = Dimensions.get('window');
const cardWidth = width / 2 - 24; // 2 columns with padding

export function WishlistItemCard({ item, onRemovePress }: WishlistItemCardProps) {
    const router = useRouter();
    const listing = item.listing;

    if (!listing) {
        return null;
    }

    const handleCardPress = useCallback(() => {
        if (listing.slug) {
            // Cast route to any to resolve expo-router type issue for dynamic routes
            router.push(`/listing/${listing.slug}` as any);
        } else {
            router.push(`/listing/${listing.id}` as any);
            console.warn('Navigating using listing ID as slug is missing.');
        }
    }, [router, listing.slug, listing.id]);

    const handleRemove = useCallback(() => {
        onRemovePress(item.id);
    }, [onRemovePress, item.id]);

    // Find primary image or fallback to the first one
    const findPrimaryImageUrl = (images: PropertyImage[] | undefined): string => {
        console.log('images', images);
        if (!images || images.length === 0) {
            return 'https://via.placeholder.com/300'; // Default placeholder
        }
        const primary = images.find((img) => img.isPrimary);
        return primary?.url || images[0].url;
    };

    const primaryImageUrl = findPrimaryImageUrl(listing.images);

    return (
        <Pressable onPress={handleCardPress}
            className={styles.container}
            style={{ width: cardWidth }}
            testID="wishlist-item-card"
        >
            <ImageCarousel
                images={listing.images || []}
                height={cardWidth * 1.1}
            />
            <View className={styles.favoriteButtonContainer}>
                <WishlistFavoriteButton
                    isFavorite={true}
                    onPress={handleRemove}
                    size={24}
                />
            </View>

            <View className={styles.infoContainer}>
                <View className={styles.titleRow}>
                    <Text className={styles.title} numberOfLines={1}>
                        {listing.title}
                    </Text>
                    {listing.rating > 0 && (
                        <Rating rating={listing.rating} />
                    )}
                </View>
                <Text className={styles.location} numberOfLines={1}>
                    {listing.location?.city}, {listing.location?.state}
                </Text>
                <PriceDisplay
                    pricing={listing.pricing}
                />
            </View>
        </Pressable>
    );
}

// Follow styling pattern from 2001-tailwind-styling.mdc
const styles = {
    container: 'flex-1 m-1 mb-4 overflow-hidden rounded-lg bg-white shadow-sm',
    image: 'w-full aspect-square',
    favoriteButtonContainer: 'absolute top-2 right-2 z-10',
    infoContainer: 'p-2',
    titleRow: 'flex-row justify-between items-center mb-0.5',
    title: 'text-sm font-semibold flex-shrink mr-1',
    location: 'text-xs text-gray-600 mb-0.5',
    price: 'mt-1', // Applied via PriceDisplay className now
};
