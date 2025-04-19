import { ListingWithDetails, Property } from '@/types/listing';

export const mapListingToProperty = (listing: ListingWithDetails): Property => {
  return {
    id: listing.id,
    status: listing.status || 'active',
    createdAt: listing.createdAt.toString(),
    updatedAt: listing.updatedAt.toString(),
    title: listing.title,
    description: listing.description,
    type: listing.type,
    slug: listing.slug,
    maxGuests: listing.maxGuests,
    bedrooms: listing.bedrooms,
    beds: listing.beds,
    baths: listing.baths,
    rating: listing.rating,
    images: listing.images?.map(img => ({
      id: img.id,
      url: img.url,
      caption: img.caption || '',
      isPrimary: img.isPrimary || false,
      order: img.order || 0
    })) || [],
    location: listing.location,
    pricing: listing.pricing
  };
}; 