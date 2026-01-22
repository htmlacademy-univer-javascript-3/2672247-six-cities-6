import { render, screen } from '@testing-library/react';
import ReviewsList from './reviews-list';
import { makeReview } from '../../test/fixtures';

describe('ReviewsList', () => {
  it('renders reviews count and items', () => {
    const reviews = [makeReview({ id: '1' }), makeReview({ id: '2' })];

    const { container } = render(<ReviewsList reviews={reviews} />);

    expect(screen.getByText('Reviews ·')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
    expect(container.querySelectorAll('.reviews__item').length).toBe(reviews.length);
  });
});
