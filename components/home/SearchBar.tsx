import React from 'react';
import { View, TextInput, Pressable, Text } from 'react-native';
import { Search, MapPin, Users } from 'lucide-react-native';
import Colors from '@/constants/colors';
import { useFiltersStore } from '@/store/filters';

const SearchBar = () => {
  const { searchQuery, setSearchQuery } = useFiltersStore();
  
  return (
    <View className={styles.container}>
      <View className={styles.searchWrapper}>
        <View className={styles.searchBar}>
          <View className={styles.searchIconContainer}>
            <Search size={18} color={Colors.light.text} />
          </View>
          <View className={styles.inputContainer}>
            <TextInput
              className={styles.input}
              placeholder="Where to?"
              placeholderTextColor={Colors.light.lightText}
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
          </View>
        </View>
      </View>
      
      <View className={styles.filtersContainer}>
        <Pressable className={styles.filterButton}>
          <MapPin size={14} color={Colors.light.text} />
          <Text className={styles.filterText}>Anywhere</Text>
        </Pressable>
        
        <View className={styles.divider} />
        
        <Pressable className={styles.filterButton}>
          <Text className={styles.filterText}>Any week</Text>
        </Pressable>
        
        <View className={styles.divider} />
        
        <Pressable className={styles.filterButton}>
          <Text className={styles.filterText}>Add guests</Text>
          <View className={styles.guestsIcon}>
            <Users size={14} color={Colors.light.text} />
          </View>
        </Pressable>
      </View>
    </View>
  );
};

const styles = {
  container: 'bg-white px-4 py-2 border-b border-gray-200',
  searchWrapper: 'mb-3',
  searchBar: 'flex-row items-center bg-white border border-gray-200 rounded-full px-4 py-2.5 shadow-sm',
  searchIconContainer: 'mr-2',
  inputContainer: 'flex-1',
  input: 'text-base text-gray-900',
  filtersContainer: 'flex-row items-center',
  filterButton: 'flex-row items-center py-1.5',
  filterText: 'text-sm font-medium text-gray-900 mx-1',
  divider: 'w-[1px] h-4 bg-gray-200 mx-2',
  guestsIcon: 'ml-1'
};


export default SearchBar;