import React from 'react';
import { StyleSheet, View, Text, ScrollView, Pressable } from 'react-native';
import { Home, Building, Tent, Warehouse, Palmtree, Castle, Sailboat, Flame } from 'lucide-react-native';
import Colors from '@/constants/colors';

interface FilterItemProps {
  icon: React.ReactNode;
  label: string;
  isActive?: boolean;
  onPress: () => void;
}

const FilterItem = ({ icon, label, isActive = false, onPress }: FilterItemProps) => (
  <Pressable 
    style={[styles.filterItem, isActive && styles.activeFilterItem]} 
    onPress={onPress}
  >
    <View style={[styles.iconContainer, isActive && styles.activeIconContainer]}>
      {icon}
    </View>
    <Text style={[styles.filterLabel, isActive && styles.activeFilterLabel]}>
      {label}
    </Text>
  </Pressable>
);

const FilterBar = () => {
  const [activeFilter, setActiveFilter] = React.useState('Trending');

  const handleFilterPress = (filter: string) => {
    setActiveFilter(filter);
  };

  return (
    <View style={styles.container}>
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <FilterItem 
          icon={<Flame size={18} color={activeFilter === 'Trending' ? Colors.light.primary : Colors.light.text} />} 
          label="Trending" 
          isActive={activeFilter === 'Trending'}
          onPress={() => handleFilterPress('Trending')}
        />
        <FilterItem 
          icon={<Home size={18} color={activeFilter === 'Houses' ? Colors.light.primary : Colors.light.text} />} 
          label="Houses" 
          isActive={activeFilter === 'Houses'}
          onPress={() => handleFilterPress('Houses')}
        />
        <FilterItem 
          icon={<Building size={18} color={activeFilter === 'Apartments' ? Colors.light.primary : Colors.light.text} />} 
          label="Apartments" 
          isActive={activeFilter === 'Apartments'}
          onPress={() => handleFilterPress('Apartments')}
        />
        <FilterItem 
          icon={<Tent size={18} color={activeFilter === 'Cabins' ? Colors.light.primary : Colors.light.text} />} 
          label="Cabins" 
          isActive={activeFilter === 'Cabins'}
          onPress={() => handleFilterPress('Cabins')}
        />
        <FilterItem 
          icon={<Warehouse size={18} color={activeFilter === 'Barns' ? Colors.light.primary : Colors.light.text} />} 
          label="Barns" 
          isActive={activeFilter === 'Barns'}
          onPress={() => handleFilterPress('Barns')}
        />
        <FilterItem 
          icon={<Palmtree size={18} color={activeFilter === 'Tropical' ? Colors.light.primary : Colors.light.text} />} 
          label="Tropical" 
          isActive={activeFilter === 'Tropical'}
          onPress={() => handleFilterPress('Tropical')}
        />
        <FilterItem 
          icon={<Castle size={18} color={activeFilter === 'Castles' ? Colors.light.primary : Colors.light.text} />} 
          label="Castles" 
          isActive={activeFilter === 'Castles'}
          onPress={() => handleFilterPress('Castles')}
        />
        <FilterItem 
          icon={<Sailboat size={18} color={activeFilter === 'Beachfront' ? Colors.light.primary : Colors.light.text} />} 
          label="Beachfront" 
          isActive={activeFilter === 'Beachfront'}
          onPress={() => handleFilterPress('Beachfront')}
        />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.light.background,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: Colors.light.border,
  },
  scrollContent: {
    paddingHorizontal: 16,
    gap: 24,
  },
  filterItem: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  activeFilterItem: {
    opacity: 1,
  },
  iconContainer: {
    marginBottom: 6,
    opacity: 0.7,
  },
  activeIconContainer: {
    opacity: 1,
  },
  filterLabel: {
    fontSize: 12,
    color: Colors.light.lightText,
    textAlign: 'center',
  },
  activeFilterLabel: {
    color: Colors.light.text,
    fontWeight: '500',
  },
});

export default FilterBar;