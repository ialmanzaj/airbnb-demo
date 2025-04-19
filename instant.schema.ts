// instant.schema.ts
import { i } from '@instantdb/react';

const _schema = i.schema({
  entities: {
    // Built-in users table - can only use default fields
    $users: i.entity({
      email: i.string().unique().indexed(),
    }),

    // User profiles with additional info
    profiles: i.entity({
      name: i.string(),
      avatar: i.string(), // URL to avatar image
      phoneNumber: i.string(),
      isHost: i.boolean(),
      bio: i.string(),
      languages: i.json(), // Array of languages
      createdAt: i.date().indexed(),
      lastActive: i.date().indexed(),
    }),

    // Property listings
    listings: i.entity({
      title: i.string().indexed(),
      description: i.string(),
      type: i.string().indexed(), // apartment, house, room, etc.
      slug: i.string().unique(), // URL-friendly identifier
      status: i.string().indexed(), // active, inactive, pending
      maxGuests: i.number(),
      bedrooms: i.number(),
      beds: i.number(),
      baths: i.number(),
      rating: i.number(),
      createdAt: i.date().indexed(),
      updatedAt: i.date(),
    }),

    // Location information for listings
    locations: i.entity({
      address: i.string(),
      city: i.string().indexed(),
      state: i.string().indexed(),
      country: i.string().indexed(),
      zipCode: i.string(),
      lat: i.number().indexed(),
      lng: i.number().indexed(),
    }),

    // Pricing information
    pricing: i.entity({
      basePrice: i.number().indexed(),
      cleaningFee: i.number(),
      serviceFee: i.number(),
      currency: i.string(),
      minNights: i.number(),
      maxNights: i.number(),
    }),

    // Individual amenities
    amenities: i.entity({
      name: i.string().unique(),
      category: i.string().indexed(), // e.g., "basics", "safety", "entertainment"
      icon: i.string(), // Icon identifier or URL
    }),

    // Bookings/Reservations
    bookings: i.entity({
      checkIn: i.date().indexed(),
      checkOut: i.date().indexed(),
      status: i.string().indexed(), // pending, confirmed, cancelled, completed
      guestCount: i.number(),
      totalPrice: i.number(),
      createdAt: i.date().indexed(),
    }),

    // Reviews
    reviews: i.entity({
      rating: i.number().indexed(),
      comment: i.string(),
      createdAt: i.date().indexed(),
      type: i.string(), // "guest_to_host", "host_to_guest", "guest_to_listing"
    }),

    // Images for listings
    images: i.entity({
      url: i.string(),
      caption: i.string(),
      isPrimary: i.boolean(),
      order: i.number(),
    }),

    // Wishlist entries
    wishlist: i.entity({
      createdAt: i.date().indexed(),
      status: i.string().indexed(), // active, inactive
    }),
  },

  links: {
    // Profile <-> User (one-to-one)
    profileUser: {
      forward: { on: 'profiles', has: 'one', label: '$user' },
      reverse: { on: '$users', has: 'one', label: 'profile' },
    },

    // Listing <-> Host (one-to-one)
    listingHost: {
      forward: { on: 'listings', has: 'one', label: 'host' },
      reverse: { on: '$users', has: 'many', label: 'listings' },
    },

    // Listing <-> Location (one-to-one)
    listingLocation: {
      forward: { on: 'listings', has: 'one', label: 'location', onDelete: 'cascade' },
      reverse: { on: 'locations', has: 'one', label: 'listing' },
    },

    // Listing <-> Pricing (one-to-one)
    listingPricing: {
      forward: { on: 'listings', has: 'one', label: 'pricing', onDelete: 'cascade' },
      reverse: { on: 'pricing', has: 'one', label: 'listing' },
    },

    // Listing <-> Amenities (many-to-many)
    listingAmenities: {
      forward: { on: 'listings', has: 'many', label: 'amenities' },
      reverse: { on: 'amenities', has: 'many', label: 'listings' },
    },

    // Listing <-> Images (one-to-many)
    listingImages: {
      forward: { on: 'listings', has: 'many', label: 'images' },
      reverse: { on: 'images', has: 'one', label: 'listing' },
    },

    // Booking <-> Listing (many-to-one)
    bookingListing: {
      forward: { on: 'bookings', has: 'one', label: 'listing' },
      reverse: { on: 'listings', has: 'many', label: 'bookings' },
    },

    // Booking <-> Guest (many-to-one)
    bookingGuest: {
      forward: { on: 'bookings', has: 'one', label: 'guest' },
      reverse: { on: '$users', has: 'many', label: 'bookings' },
    },

    // Review <-> Author (many-to-one)
    reviewAuthor: {
      forward: { on: 'reviews', has: 'one', label: 'author' },
      reverse: { on: '$users', has: 'many', label: 'reviews' },
    },

    // Review <-> Listing (many-to-one)
    reviewListing: {
      forward: { on: 'reviews', has: 'one', label: 'listing' },
      reverse: { on: 'listings', has: 'many', label: 'reviews' },
    },

    // Review <-> Booking (one-to-one)
    reviewBooking: {
      forward: { on: 'reviews', has: 'one', label: 'booking' },
      reverse: { on: 'bookings', has: 'one', label: 'review' },
    },

    // Wishlist <-> User (many-to-one)
    wishlistUser: {
      forward: { on: 'wishlist', has: 'one', label: '$user' },
      reverse: { on: '$users', has: 'many', label: 'wishlistItems' },
    },

    // Wishlist <-> Listing (many-to-one)
    wishlistListing: {
      forward: { on: 'wishlist', has: 'one', label: 'listing' },
      reverse: { on: 'listings', has: 'many', label: 'wishlistEntries' },
    },
  },
});

// This helps TypeScript display better intellisense
type _AppSchema = typeof _schema;
interface AppSchema extends _AppSchema {}
const schema: AppSchema = _schema;

export type { AppSchema };
export default schema; 