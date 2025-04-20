import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import FilterBar from '@/components/common/FilterBar';
import Colors from '@/constants/colors';

// Mock colors constant
jest.mock('@/constants/colors', () => ({
  light: {
    text: '#000000',
    lightText: '#717171',
    primary: '#FF385C',
  },
}));

describe('FilterBar', () => {
  it('renders all filter options', () => {
    const { getByText } = render(<FilterBar />);
    expect(getByText('Trending')).toBeTruthy();
    expect(getByText('Houses')).toBeTruthy();
    expect(getByText('Apartments')).toBeTruthy();
    expect(getByText('Cabins')).toBeTruthy();
    expect(getByText('Barns')).toBeTruthy();
    expect(getByText('Tropical')).toBeTruthy();
    expect(getByText('Castles')).toBeTruthy();
    expect(getByText('Beachfront')).toBeTruthy();
  });

  it('sets initial active filter to Trending', () => {
    const { getByText } = render(<FilterBar />);
    const trendingFilter = getByText('Trending');
    const trendingContainer = trendingFilter.parent.parent;
    expect(trendingContainer.props.className).toContain('opacity-100');
    expect(trendingFilter.props.style).toEqual({ color: Colors.light.text });
  });

  it('changes active filter when clicked', () => {
    const { getByText } = render(<FilterBar />);
    const housesFilter = getByText('Houses');
    const housesContainer = housesFilter.parent.parent;
    
    fireEvent.press(housesContainer);
    
    expect(housesContainer.props.className).toContain('opacity-100');
    expect(housesFilter.props.style).toEqual({ color: Colors.light.text });
    expect(getByText('Trending').props.style).toEqual({ color: Colors.light.lightText });
  });

  it('applies active styles to selected filter', () => {
    const { getByText } = render(<FilterBar />);
    const cabinsFilter = getByText('Cabins');
    const cabinsContainer = cabinsFilter.parent.parent;
    
    fireEvent.press(cabinsContainer);
    
    expect(cabinsContainer.props.className).toContain('opacity-100');
    expect(cabinsFilter.props.style).toEqual({ color: Colors.light.text });
    expect(getByText('Trending').props.style).toEqual({ color: Colors.light.lightText });
  });
}); 