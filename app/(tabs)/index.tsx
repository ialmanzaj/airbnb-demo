import React, { useState } from 'react';
import { StyleSheet, View, FlatList, Pressable, Text, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Stack } from 'expo-router';
import { Sliders } from 'lucide-react-native';

import Colors from '@/constants/colors';
import SearchBar from '@/components/home/SearchBar';
import FilterBar from '@/components/home/FilterBar';
import PropertyCard from '@/components/home/PropertyCard';
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

  // Use the defined query
  const { isLoading, error, data } = db.useQuery(listingsQuery);

  // Use the correct type
  const listings: ListingWithDetails[] = data?.listings || [];
  console.log("listings", listings);

  // Update the type for the pressed item
  const handlePropertyPress = (listing: ListingWithDetails) => {
    Alert.alert(
      listing.title,
      // Adjust alert message if needed, location is now nested
      `You selected ${listing.title} in ${listing.location?.city}. This would navigate to a property details screen.`
    );
  };

  // Update the item type in renderItem
  const renderItem = ({ item }: { item: ListingWithDetails }) => (
    <PropertyCard
      property={item}
      onPress={handlePropertyPress}
    />
  );

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      <Stack.Screen
        options={{
          headerShown: false,
        }}
      />

      <SearchBar />
      <FilterBar />

      <View style={styles.listContainer}>
        <View style={styles.listHeader}>
          <Text style={styles.resultsText}>
            {listings?.length} homes
          </Text>

          <Pressable
            style={styles.filtersButton}
            onPress={() => setShowFilters(!showFilters)}
          >
            <Sliders size={16} color={Colors.light.text} />
            <Text style={styles.filtersButtonText}>Filters</Text>
          </Pressable>
        </View>

        <LegendList
          estimatedItemSize={200}
          data={listings}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          numColumns={2}
          columnWrapperStyle={styles.columnWrapper as any}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContent}
          recycleItems
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.background,
  },
  listContainer: {
    flex: 1,
    paddingHorizontal: 16,
  },
  listHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
  },
  resultsText: {
    fontSize: 14,
    fontWeight: '500',
    color: Colors.light.text,
  },
  filtersButton: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.light.border,
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  filtersButtonText: {
    fontSize: 14,
    fontWeight: '500',
    color: Colors.light.text,
    marginLeft: 6,
  },
  listContent: {
    paddingBottom: 20,
  },
  columnWrapper: {
    justifyContent: 'space-between',
  },
});