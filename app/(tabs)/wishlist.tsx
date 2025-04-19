import React from 'react';
import { View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function WishlistScreen() {
    return (
        <SafeAreaView className={styles.container}>
            <View className={styles.content}>
                <Text className={styles.title}>Wishlist</Text>
                <Text className={styles.description}>
                    This would be the wishlist screen where saved properties appear.
                </Text>
            </View>
        </SafeAreaView>
    );
}

// Organized styles following the pattern:
// 1. Layout styles
// 2. Visual styles
// 3. Typography styles
const styles = {
    // Layout and visual styles
    container: 'flex-1 bg-white',
    
    // Layout styles
    content: 'flex-1 items-center justify-center px-5 py-5',
    
    // Typography styles
    title: 'text-2xl font-bold text-gray-900 mb-3',
    description: 'text-base text-gray-500 text-center',
};