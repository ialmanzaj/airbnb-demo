import React, { useState } from 'react';
import { View, Pressable, Text, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Stack } from 'expo-router';
import { Sliders } from 'lucide-react-native';

import Colors from '@/constants/colors';
import SearchBar from '@/components/home/SearchBar';
import FilterBar from '@/components/home/FilterBar';
import PropertyCard, { Property } from '@/components/home/PropertyCard';
import { init, InstaQLEntity } from '@instantdb/react-native';
import schema, { AppSchema } from "@/instant.schema";
import { LegendList } from '@legendapp/list';

// ID for app: airbnb-demo
const APP_ID = process.env.EXPO_PUBLIC_INSTANT_APP_ID!;

const db = init({ appId: APP_ID, schema });

// Define the query type for type safety and utility type extraction
const listingsQuery = {
  listings: {
    images: {},
    location: {},
    pricing: {},
  },
}; // Add satisfies for type checking

// Define the type for a single listing based on the query
type ListingWithDetails = InstaQLEntity<
  AppSchema,
  'listings',
  typeof listingsQuery['listings']
>;

export default function HomeScreen() {
  const [showFilters, setShowFilters] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Use the defined query
  const { isLoading, error, data } = db.useQuery(listingsQuery);

  // Use the correct type
  const listings: ListingWithDetails[] = data?.listings || [];

  // Map ListingWithDetails to Property type
  const mapListingToProperty = (listing: ListingWithDetails): Property => {
    return {
      id: listing.id,
      status: listing.status || 'active',
      createdAt: listing.createdAt,
      updatedAt: listing.updatedAt,
      title: listing.title,
      description: listing.description,
      type: listing.type,
      slug: listing.slug,
      maxGuests: listing.maxGuests,
      bedrooms: listing.bedrooms,
      beds: listing.beds,
      baths: listing.baths,
      rating: listing.rating,
      images: listing.images?.map(img => ({
        id: img.id,
        url: img.url,
        caption: img.caption || '',
        isPrimary: img.isPrimary || false,
        order: img.order || 0
      })) || [],
      location: listing.location,
      pricing: listing.pricing
    };
  };

  // Update the type for the pressed item
  const handlePropertyPress = (property: Property) => {
    Alert.alert(
      property.title,
      `You selected ${property.title} in ${property.location?.city}. This would navigate to a property details screen.`
    );
  };

  // Update the item type in renderItem
  const renderItem = ({ item }: { item: ListingWithDetails }) => {
    const property = mapListingToProperty(item);
    return (
      <PropertyCard
        property={property}
        onPress={handlePropertyPress}
      />
    );
  };

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
            {listings?.length} homes
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