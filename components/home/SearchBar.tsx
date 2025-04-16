import React from 'react';
import { StyleSheet, View, TextInput, Pressable, Text } from 'react-native';
import { Search, MapPin, Users } from 'lucide-react-native';
import Colors from '@/constants/colors';
import { useFiltersStore } from '@/store/filters';

const SearchBar = () => {
  const { searchQuery, setSearchQuery } = useFiltersStore();
  
  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <View style={styles.searchIconContainer}>
            <Search size={18} color={Colors.light.text} />
          </View>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Where to?"
              placeholderTextColor={Colors.light.lightText}
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
          </View>
        </View>
      </View>
      
      <View style={styles.filtersRow}>
        <Pressable style={styles.filterButton}>
          <MapPin size={14} color={Colors.light.text} />
          <Text style={styles.filterText}>Anywhere</Text>
        </Pressable>
        
        <View style={styles.divider} />
        
        <Pressable style={styles.filterButton}>
          <Text style={styles.filterText}>Any week</Text>
        </Pressable>
        
        <View style={styles.divider} />
        
        <Pressable style={styles.filterButton}>
          <Text style={styles.filterText}>Add guests</Text>
          <View style={styles.guestsIconContainer}>
            <Users size={14} color={Colors.light.text} />
          </View>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.light.background,
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: Colors.light.border,
  },
  searchContainer: {
    marginBottom: 12,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.light.background,
    borderWidth: 1,
    borderColor: Colors.light.border,
    borderRadius: 40,
    paddingHorizontal: 16,
    paddingVertical: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  searchIconContainer: {
    marginRight: 8,
  },
  inputContainer: {
    flex: 1,
  },
  input: {
    fontSize: 16,
    color: Colors.light.text,
  },
  filtersRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 6,
  },
  filterText: {
    fontSize: 14,
    color: Colors.light.text,
    fontWeight: '500',
    marginHorizontal: 4,
  },
  divider: {
    width: 1,
    height: 16,
    backgroundColor: Colors.light.border,
    marginHorizontal: 8,
  },
  guestsIconContainer: {
    marginLeft: 4,
  },
});

export default SearchBar;