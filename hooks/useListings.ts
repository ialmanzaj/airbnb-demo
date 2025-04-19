import { useMemo } from 'react';
import { db } from '@/lib/db';
import { listingsQuery, ListingWithDetails, Property } from '@/types/listing';
import { mapListingToProperty } from '@/utils/listingTransforms';

export const useListings = (searchQuery?: string) => {
  const { isLoading, error, data } = db.useQuery(listingsQuery);

  // Memoize the transformed listings
  const listings = useMemo(() => {
    const rawListings: ListingWithDetails[] = data?.listings || [];
    return rawListings.map(mapListingToProperty);
  }, [data?.listings]);

  // Filter listings if search query exists
  const filteredListings = useMemo(() => {
    if (!searchQuery) return listings;
    
    return listings.filter(listing => 
      listing.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      listing.location?.city?.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [listings, searchQuery]);

  return {
    listings: filteredListings,
    isLoading,
    error,
    totalCount: filteredListings.length
  };
}; 