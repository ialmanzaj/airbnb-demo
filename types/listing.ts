import { InstaQLEntity } from '@instantdb/react-native';
import { AppSchema } from "@/lib/db";

export const listingsQuery = {
  listings: {
    images: {},
    location: {},
    pricing: {},
  },
} as const;

export type ListingWithDetails = InstaQLEntity<
  AppSchema,
  'listings',
  typeof listingsQuery['listings']
>;

export interface PropertyImage {
  id: string;
  url: string;
  caption: string;
  isPrimary: boolean;
  order: number;
}

export interface PropertyLocation {
  id: string;
  address: string;
  city: string;
  state: string;
  country: string;
  zipCode: string;
  lat: number;
  lng: number;
}

export interface PropertyPricing {
  id: string;
  basePrice: number;
  cleaningFee: number;
  serviceFee: number;
  currency: string;
  minNights: number;
  maxNights: number;
}

export interface Property {
  id: string;
  status: string;
  createdAt: string | number;
  updatedAt: string | number;
  title: string;
  description: string;
  type: string;
  slug: string;
  maxGuests: number;
  bedrooms: number;
  beds: number;
  baths: number;
  rating: number;
  images: PropertyImage[];
  location?: PropertyLocation;
  pricing?: PropertyPricing;
} 