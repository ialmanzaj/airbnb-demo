import React from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Heart } from 'lucide-react-native';
import { LegendList } from "@legendapp/list";

import { getWishlist } from '@/lib/wishlist';
import { EmptyState } from '@/components/common/EmptyState';
import { WishlistItemWithListing } from '@/types/wishlist';
import { WishlistItemCard } from '@/components/wishlist/WishlistItemCard';

export default function WishlistScreen() {
    const { wishlist, isLoading, error } = getWishlist();

    // --- Loading State ---
    if (isLoading) {
        return (
            <SafeAreaView style={{ flex: 1 }} className={styles.containerCentered}>
                <ActivityIndicator size="large" />
                <Text className={styles.loadingText}>Loading Wishlist...</Text>
            </SafeAreaView>
        );
    }

    // --- Error State ---
    if (error) {
        console.error("Wishlist Screen Error:", error);
        return (
            <SafeAreaView style={{ flex: 1 }} className={styles.containerCentered}>
                <Text className={styles.errorText}>Could not load wishlist.</Text>
                <Text className={styles.errorDetails}>{error.message}</Text>
            </SafeAreaView>
        );
    }

    // --- Empty State ---
    if (!wishlist || wishlist.length === 0) {
        return (
            <SafeAreaView style={{ flex: 1 }} className={styles.containerCentered}>
                <EmptyState
                    icon={Heart}
                    title="No Wishlists Yet"
                    description="Tap the heart on any listing to save it here."
                />
            </SafeAreaView>
        );
    }

    // --- Populated State --- 
    const renderItem = ({ item }: { item: WishlistItemWithListing }) => (
        <View className="w-[48%]">
            <WishlistItemCard item={item} onRemovePress={() => { }} />
        </View>
    );

    return (
        <SafeAreaView className={styles.container}>
            <Text className={styles.title}>My Wishlist</Text>
            <LegendList
                data={wishlist}
                renderItem={renderItem}
                keyExtractor={(item: WishlistItemWithListing) => item.id}
                estimatedItemSize={300}
                numColumns={2}
                contentContainerStyle={legendListStyles.listContentContainer}
                recycleItems
            />
        </SafeAreaView>
    );
}

// Styles adhering to 2001-tailwind-styling.mdc
const styles = {
    container: 'flex-1 bg-white',
    containerCentered: 'flex-1 bg-white items-center justify-center px-5 py-5',
    title: 'text-2xl font-bold text-gray-900 mb-4 px-5 pt-4',
    loadingText: 'mt-3 text-gray-600',
    errorText: 'text-lg font-semibold text-red-600 mb-2',
    errorDetails: 'text-sm text-gray-500 text-center',
};

// Create StyleSheet objects specifically for LegendList style props
const legendListStyles = StyleSheet.create({
    listContentContainer: {
        paddingHorizontal: 16, // Example: equiv. to px-4
        paddingBottom: 16,     // Example: equiv. to pb-4
    },
    columnWrapper: {
        justifyContent: 'space-between',
    },
});