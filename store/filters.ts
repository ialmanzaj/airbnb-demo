import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface FiltersState {
  searchQuery: string;
  dateRange: {
    startDate: string | null;
    endDate: string | null;
  };
  guests: {
    adults: number;
    children: number;
    infants: number;
    pets: number;
  };
  propertyType: string | null;
  priceRange: {
    min: number | null;
    max: number | null;
  };
  
  // Actions
  setSearchQuery: (query: string) => void;
  setDateRange: (startDate: string | null, endDate: string | null) => void;
  setGuests: (guestType: 'adults' | 'children' | 'infants' | 'pets', count: number) => void;
  setPropertyType: (type: string | null) => void;
  setPriceRange: (min: number | null, max: number | null) => void;
  resetFilters: () => void;
}

const initialState = {
  searchQuery: '',
  dateRange: {
    startDate: null,
    endDate: null,
  },
  guests: {
    adults: 1,
    children: 0,
    infants: 0,
    pets: 0,
  },
  propertyType: null,
  priceRange: {
    min: null,
    max: null,
  },
};

export const useFiltersStore = create<FiltersState>()(
  persist(
    (set) => ({
      ...initialState,
      
      setSearchQuery: (query) => set({ searchQuery: query }),
      
      setDateRange: (startDate, endDate) => set({
        dateRange: { startDate, endDate }
      }),
      
      setGuests: (guestType, count) => set((state) => ({
        guests: {
          ...state.guests,
          [guestType]: count
        }
      })),
      
      setPropertyType: (type) => set({ propertyType: type }),
      
      setPriceRange: (min, max) => set({
        priceRange: { min, max }
      }),
      
      resetFilters: () => set(initialState),
    }),
    {
      name: 'airbnb-filters',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);