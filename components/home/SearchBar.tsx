import React from 'react';
import { View, TextInput, Pressable, Text } from 'react-native';
import { Search, MapPin, Users } from 'lucide-react-native';
import Colors from '@/constants/colors';

export interface SearchBarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onLocationPress?: () => void;
  onDatePress?: () => void;
  onGuestsPress?: () => void;
  onSearchBarPress?: () => void;
  placeholder?: string;
}

const SearchBar = ({
  searchQuery,
  onSearchChange,
  onLocationPress,
  onDatePress,
  onGuestsPress,
  onSearchBarPress,
  placeholder = 'Where to?'
}: SearchBarProps) => {
  return (
    <View className={styles.container} testID="search-container">
      <Pressable 
        className={styles.searchWrapper}
        onPress={onSearchBarPress}
        testID="search-bar"
      >
        <View className={styles.searchBar}>
          <View className={styles.searchIconContainer} testID="search-icon">
            <Search size={18} color={Colors.light.text} />
          </View>
          <View className={styles.inputContainer}>
            <TextInput
              className={styles.input}
              placeholder={placeholder}
              placeholderTextColor={Colors.light.lightText}
              value={searchQuery}
              onChangeText={onSearchChange}
              testID="search-input"
              accessibilityLabel="Search location input"
            />
          </View>
        </View>
      </Pressable>
      
      <View className={styles.filtersContainer}>
        <Pressable 
          className={styles.filterButton}
          onPress={onLocationPress}
          testID="location-filter"
        >
          <View testID="location-icon">
            <MapPin size={14} color={Colors.light.text} />
          </View>
          <Text className={styles.filterText}>Anywhere</Text>
        </Pressable>
        
        <View className={styles.divider} />
        
        <Pressable 
          className={styles.filterButton}
          onPress={onDatePress}
          testID="date-filter"
        >
          <Text className={styles.filterText}>Any week</Text>
        </Pressable>
        
        <View className={styles.divider} />
        
        <Pressable 
          className={styles.filterButton}
          onPress={onGuestsPress}
          testID="guests-filter"
        >
          <Text className={styles.filterText}>Add guests</Text>
          <View className={styles.guestsIcon} testID="guests-icon">
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