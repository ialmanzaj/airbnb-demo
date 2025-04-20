import React from 'react';
import { useFiltersStore } from '@/store/filters';
import SearchBar from '../common/SearchBar';

const SearchBarContainer = () => {
  const { searchQuery, setSearchQuery } = useFiltersStore();

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
  };

  const handleLocationPress = () => {
    // Handle location filter press
  };

  const handleDatePress = () => {
    // Handle date filter press
  };

  const handleGuestsPress = () => {
    // Handle guests filter press
  };

  const handleSearchBarPress = () => {
    // Handle search bar press
  };

  return (
    <SearchBar
      searchQuery={searchQuery}
      onSearchChange={handleSearchChange}
      onLocationPress={handleLocationPress}
      onDatePress={handleDatePress}
      onGuestsPress={handleGuestsPress}
      onSearchBarPress={handleSearchBarPress}
    />
  );
};

export default SearchBarContainer; 