import React, { useState, useCallback } from 'react';
import { View, Pressable, Text, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Stack } from 'expo-router';
import { Sliders } from 'lucide-react-native';
import { LegendList } from '@legendapp/list';

import Colors from '@/constants/colors';
import SearchBar from '@/components/common/SearchBar';
import FilterBar from '@/components/common/FilterBar';
import PropertyCard from '@/components/home/PropertyCard';
import { Property } from '@/types/listing';
import { useListings } from '@/hooks/useListings';

export default function HomeScreen() {
  const [showFilters, setShowFilters] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const { listings, isLoading, error, totalCount } = useListings(searchQuery);

  const handlePropertyPress = useCallback((property: Property) => {
    Alert.alert(
      property.title,
      `You selected ${property.title} in ${property.location?.city}. This would navigate to a property details screen.`
    );
  }, []);

  const renderItem = useCallback(({ item }: { item: Property }) => {
    return (
      <PropertyCard
        property={item}
        onPress={handlePropertyPress}
      />
    );
  }, [handlePropertyPress]);

  if (error) {
    return (
      <View className="flex-1 items-center justify-center">
        <Text className="text-red-500">Error loading listings</Text>
      </View>
    );
  }

  return (
    <SafeAreaView className={styles.container} edges={['top', 'bottom']}>
      <Stack.Screen
        options={{
          headerShown: false,
        }}
      />

      <SearchBar
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      <FilterBar />

      <View className={styles.listContainer}>
        <View className={styles.listHeader}>
          <Text style={{ color: Colors.light.text }} className={styles.resultsText}>
            {totalCount} homes
          </Text>

          <Pressable
            className={styles.filtersButton}
            onPress={() => setShowFilters(!showFilters)}
          >
            <Sliders size={16} color={Colors.light.text} />
            <Text style={{ color: Colors.light.text }} className={styles.filtersButtonText}>
              Filters
            </Text>
          </Pressable>
        </View>

        <LegendList
          estimatedItemSize={200}
          data={listings}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          numColumns={2}
          columnWrapperStyle={{
            justifyContent: 'space-between',
          } as any}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 20 }}
          recycleItems
        />
      </View>
    </SafeAreaView>
  );
}

const styles = {
  // Layout
  container: 'flex-1 bg-white',
  listContainer: 'flex-1 px-4',
  listHeader: 'flex-row justify-between items-center py-4',
  columnWrapper: 'justify-between',
  listContent: 'pb-5',

  // Typography
  resultsText: 'text-sm font-medium',
  filtersButtonText: 'text-sm font-medium ml-1.5',

  // Interactive
  filtersButton: 'flex-row items-center border border-gray-200 rounded-full px-3 py-1.5'
};