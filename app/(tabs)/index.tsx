import React, { useState } from 'react';
import { StyleSheet, View, FlatList, Pressable, Text, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Stack } from 'expo-router';
import { Sliders } from 'lucide-react-native';

import Colors from '@/constants/colors';
import { properties } from '@/mocks/properties';
import SearchBar from '@/components/home/SearchBar';
import FilterBar from '@/components/home/FilterBar';
import PropertyCard from '@/components/home/PropertyCard';
import { init } from '@instantdb/react-native';
import { schema, Property } from '@/mocks/schemas';
import { LegendList } from '@legendapp/list';

// ID for app: airbnb-demo
const APP_ID = process.env.EXPO_PUBLIC_INSTANTDB_APP_ID!;
console.log(APP_ID);

const db = init({ appId: APP_ID, schema });


export default function HomeScreen() {
  const [showFilters, setShowFilters] = useState(false);

  const { isLoading, error, data } = db.useQuery({ properties: {} });
  console.log(data);

  const handlePropertyPress = (property: Property) => {
    Alert.alert(
      property.title,
      `You selected ${property.title} in ${property.location}. This would navigate to a property details screen.`
    );
  };

  const renderItem = ({ item }: { item: Property }) => (
    <PropertyCard
      property={item}
      onPress={handlePropertyPress}
    />
  );

  return (
    <SafeAreaView style={styles.container} edges={[ 'top', 'bottom']}>
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
            {properties.length} homes
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
          data={properties}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          numColumns={2}
          columnWrapperStyle={styles.columnWrapper}
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