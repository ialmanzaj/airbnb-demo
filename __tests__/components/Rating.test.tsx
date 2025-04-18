import React from 'react';
import Rating from '@/components/home/Rating';
import { render } from '../utils/test-utils';

// Mock colors constant
jest.mock('@/constants/colors', () => ({
  light: {
    rating: '#FFB400',
  },
}));

describe('Rating', () => {
  it('displays the correct rating value', () => {
    const { getByText } = render(<Rating rating={4.5} size="small" />);
    expect(getByText('4.50')).toBeTruthy();
  });

  it('displays review count when showReviewCount is true', () => {
    const { getByText } = render(
      <Rating rating={4.5} reviewCount={10} size="small" showReviewCount={true} />
    );
    expect(getByText('4.50')).toBeTruthy();
    expect(getByText('10 reviews')).toBeTruthy();
  });

  it('displays singular review text when review count is 1', () => {
    const { getByText } = render(
      <Rating rating={4.5} reviewCount={1} size="small" showReviewCount={true} />
    );
    expect(getByText('1 review')).toBeTruthy();
  });

  it('does not display review count when showReviewCount is false', () => {
    const { queryByText } = render(
      <Rating rating={4.5} reviewCount={10} size="small" showReviewCount={false} />
    );
    expect(queryByText('10 reviews')).toBeNull();
  });

  it('does not display review count when count is 0', () => {
    const { queryByText } = render(
      <Rating rating={4.5} reviewCount={0} size="small" showReviewCount={true} />
    );
    expect(queryByText('reviews')).toBeNull();
  });

  it('applies different styles based on size prop', () => {
    const { getByText } = render(<Rating rating={4.5} size="large" />);
    const ratingText = getByText('4.50');
    expect(ratingText.props.className).toContain('text-base');
  });
}); 