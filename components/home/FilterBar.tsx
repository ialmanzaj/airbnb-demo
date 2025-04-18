import React from 'react';
import { View, Text, Pressable, ScrollView } from 'react-native';
import { Flame, Home, Building, Tent, Warehouse, Palmtree, Castle, Sailboat } from 'lucide-react-native';
import Colors from '@/constants/colors';

interface FilterItemProps {
  icon: React.ReactNode;
  label: string;
  isActive?: boolean;
  onPress: () => void;
}

const FilterItem = ({ icon, label, isActive = false, onPress }: FilterItemProps) => (
  <Pressable 
    className={`${styles.filterItem} ${isActive ? styles.activeFilterItem : ''}`}
    onPress={onPress}
  >
    <View className={`${styles.iconContainer} ${isActive ? styles.activeIconContainer : ''}`}>
      {icon}
    </View>
    <Text 
      className={`${styles.filterLabel} ${isActive ? styles.activeFilterLabel : ''}`}
      style={{ color: isActive ? Colors.light.text : Colors.light.lightText }}
    >
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
    <View className={styles.container}>
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        className={styles.scrollContent}
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

const styles = {
  // Layout
  container: 'bg-white py-3 border-b border-[#DDDDDD]',
  scrollContent: 'px-4',
  filterItem: 'items-center justify-center mr-6',
  
  // Interactive Elements
  activeFilterItem: 'opacity-100',
  
  // Icon Styling
  iconContainer: 'mb-1.5 opacity-70',
  activeIconContainer: 'opacity-100',
  
  // Typography
  filterLabel: 'text-xs text-center',
  activeFilterLabel: 'font-medium'
};

export default FilterBar;