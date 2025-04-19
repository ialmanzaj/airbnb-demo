import React from 'react';
import { fireEvent } from '@testing-library/react-native';
import { render } from '../utils/test-utils';
import PropertyCard from '@/components/home/PropertyCard';
import { Property } from '@/types/listing';


// Mock colors constant
jest.mock('@/constants/colors', () => ({
  light: {
    text: '#000000',
    lightText: '#717171',
    primary: '#FF385C',
    rating: '#FFB400',
  },
}));

const mockProperty: Property = {
  id: '1',
  status: 'active',
  createdAt: '2024-01-01',
  updatedAt: '2024-01-01',
  title: 'Test Property',
  description: 'A test property description',
  type: 'apartment',
  slug: 'test-property',
  maxGuests: 4,
  bedrooms: 2,
  beds: 2,
  baths: 1,
  rating: 4.5,
  images: [
    { id: '1', url: 'https://example.com/image1.jpg', caption: '', isPrimary: true, order: 1 },
    { id: '2', url: 'https://example.com/image2.jpg', caption: '', isPrimary: false, order: 2 },
  ],
  location: {
    id: '1',
    address: '123 Test St',
    city: 'Test City',
    state: 'Test State',
    country: 'Test Country',
    zipCode: '12345',
    lat: 0,
    lng: 0,
  },
  pricing: {
    id: '1',
    basePrice: 100,
    cleaningFee: 50,
    serviceFee: 30,
    currency: 'USD',
    minNights: 1,
    maxNights: 30,
  },
};

const mockPropertyNoImages = {
  ...mockProperty,
  id: '2',
  title: 'Test Property No Images',
  images: [],
};

const mockPropertyNoLocation = {
  ...mockProperty,
  id: '3',
  title: 'Test Property No Location',
  images: [{ id: '1', url: 'https://example.com/image1.jpg', caption: '', isPrimary: true, order: 1 }],
  location: null,
};

describe('PropertyCard', () => {
  const mockOnPress = jest.fn();
  const mockOnFavoriteChange = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders property information correctly', () => {
    const { getByText, getByTestId } = render(
      <PropertyCard property={mockProperty} onPress={mockOnPress} />
    );

    expect(getByText('Test City, Test State')).toBeTruthy();
    expect(getByText('Test Property')).toBeTruthy();
    expect(getByText('$100')).toBeTruthy();
    expect(getByText('night')).toBeTruthy();
    expect(getByTestId('property-image')).toBeTruthy();
  });

  it('handles favorite button press', () => {
    const { getByTestId, getAllByTestId } = render(
      <PropertyCard
        property={mockProperty}
        onPress={mockOnPress}
      />
    );

    const favoriteButton = getByTestId('favorite-button');
    const heartIcons = getAllByTestId('heart-icon');
    const heartIcon = heartIcons[0];

    // Initial state
    expect(heartIcon.props.fill).toBe('transparent');

    // Press favorite button
    fireEvent(favoriteButton, 'press', {
      stopPropagation: () => { },
    });

    // Check if heart icon fill color changed
    expect(heartIcon.props.fill).toBe('#FF385C');
    expect(mockOnFavoriteChange).toHaveBeenCalledWith(true);
  });

  it('respects initialFavorite prop', () => {
    const { getAllByTestId } = render(
      <PropertyCard
        property={mockProperty}
        onPress={mockOnPress}
      />
    );

    const heartIcons = getAllByTestId('heart-icon');
    const heartIcon = heartIcons[0];
    expect(heartIcon.props.fill).toBe('#FF385C');
  });

  it('handles image navigation', () => {
    const { getByTestId, getAllByTestId } = render(
      <PropertyCard property={mockProperty} onPress={mockOnPress} />
    );

    const propertyImage = getByTestId('property-image');
    const nextButton = getByTestId('next-image-button');
    const prevButton = getByTestId('prev-image-button');
    const dots = getAllByTestId(/^image-dot-/);

    // Initial state
    expect(propertyImage.props.source.uri).toBe('https://example.com/image1.jpg');
    expect(dots[0].props.className).toContain('bg-white');

    // Navigate to next image
    fireEvent.press(nextButton);

    // Check if image changed
    expect(propertyImage.props.source.uri).toBe('https://example.com/image2.jpg');
    expect(dots[1].props.className).toContain('bg-white');

    // Navigate to previous image
    fireEvent.press(prevButton);

    // Check if image changed back
    expect(propertyImage.props.source.uri).toBe('https://example.com/image1.jpg');
    expect(dots[0].props.className).toContain('bg-white');
  });

  it('shows placeholder when no images are available', () => {
    const propertyWithoutImages = {
      ...mockProperty,
      images: [],
    };

    const { getByText, queryByTestId } = render(
      <PropertyCard property={propertyWithoutImages} onPress={mockOnPress} />
    );

    expect(getByText('No Image')).toBeTruthy();
    expect(queryByTestId('next-image-button')).toBeNull();
    expect(queryByTestId('prev-image-button')).toBeNull();
  });

  it('calls onPress with property data when card is pressed', () => {
    const { getByTestId } = render(
      <PropertyCard property={mockProperty} onPress={mockOnPress} />
    );

    fireEvent.press(getByTestId('property-card'));
    expect(mockOnPress).toHaveBeenCalledWith(mockProperty);
  });

  it('shows location unavailable when no location data', () => {
    const propertyWithoutLocation = {
      ...mockProperty,
      location: undefined,
    };

    const { getByText } = render(
      <PropertyCard property={propertyWithoutLocation} onPress={mockOnPress} />
    );

    expect(getByText('Location unavailable')).toBeTruthy();
  });

  it('shows price unavailable when no pricing data', () => {
    const propertyWithoutPricing = {
      ...mockProperty,
      pricing: undefined,
    };

    const { getByText } = render(
      <PropertyCard property={propertyWithoutPricing} onPress={mockOnPress} />
    );

    expect(getByText('Price unavailable')).toBeTruthy();
  });
}); 