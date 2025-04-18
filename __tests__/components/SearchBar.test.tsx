import React from 'react';
import { fireEvent } from '@testing-library/react-native';
import { render } from '../utils/test-utils';
import SearchBar from '../../components/home/SearchBar';

// Mock colors constant
jest.mock('@/constants/colors', () => ({
  light: {
    text: '#000000',
    lightText: '#717171',
  },
}));

describe('SearchBar', () => {
  const defaultProps = {
    onSearchChange: jest.fn(),
    onLocationPress: jest.fn(),
    onDatePress: jest.fn(),
    onGuestsPress: jest.fn(),
    onSearchBarPress: jest.fn(),
    searchQuery: '',
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly with default props', () => {
    const { getByPlaceholderText, getByTestId } = render(
      <SearchBar {...defaultProps} />
    );

    expect(getByPlaceholderText('Where to?')).toBeTruthy();
    expect(getByTestId('search-icon')).toBeTruthy();
  });

  it('calls onSearchChange when text input changes', () => {
    const { getByTestId } = render(
      <SearchBar {...defaultProps} />
    );

    const input = getByTestId('search-input');
    fireEvent.changeText(input, 'test search');

    expect(defaultProps.onSearchChange).toHaveBeenCalledWith('test search');
  });

  it('calls onSearchBarPress when search bar is pressed', () => {
    const { getByTestId } = render(
      <SearchBar {...defaultProps} />
    );

    const searchBar = getByTestId('search-bar');
    fireEvent.press(searchBar);

    expect(defaultProps.onSearchBarPress).toHaveBeenCalled();
  });

  it('displays current search query', () => {
    const props = {
      ...defaultProps,
      searchQuery: 'test location',
    };
    const { getByTestId } = render(<SearchBar {...props} />);
    const searchInput = getByTestId('search-input');
    expect(searchInput.props.value).toBe('test location');
  });

  it('displays all filter buttons with correct text', () => {
    const { getByText } = render(<SearchBar {...defaultProps} />);
    expect(getByText('Anywhere')).toBeTruthy();
    expect(getByText('Any week')).toBeTruthy();
    expect(getByText('Add guests')).toBeTruthy();
  });

  it('calls onLocationPress when location filter is pressed', () => {
    const { getByTestId } = render(<SearchBar {...defaultProps} />);
    const locationFilter = getByTestId('location-filter');
    fireEvent.press(locationFilter);
    expect(defaultProps.onLocationPress).toHaveBeenCalled();
  });

  it('calls onDatePress when date filter is pressed', () => {
    const { getByTestId } = render(<SearchBar {...defaultProps} />);
    const dateFilter = getByTestId('date-filter');
    fireEvent.press(dateFilter);
    expect(defaultProps.onDatePress).toHaveBeenCalled();
  });

  it('calls onGuestsPress when guests filter is pressed', () => {
    const { getByTestId } = render(<SearchBar {...defaultProps} />);
    const guestsFilter = getByTestId('guests-filter');
    fireEvent.press(guestsFilter);
    expect(defaultProps.onGuestsPress).toHaveBeenCalled();
  });

  it('displays all required icons', () => {
    const { getByTestId } = render(<SearchBar {...defaultProps} />);
    expect(getByTestId('search-icon')).toBeTruthy();
    expect(getByTestId('location-icon')).toBeTruthy();
    expect(getByTestId('guests-icon')).toBeTruthy();
  });

  it('handles empty search input', () => {
    const { getByTestId } = render(<SearchBar {...defaultProps} />);
    const searchInput = getByTestId('search-input');
    fireEvent.changeText(searchInput, '');
    expect(defaultProps.onSearchChange).toHaveBeenCalledWith('');
  });
}); 