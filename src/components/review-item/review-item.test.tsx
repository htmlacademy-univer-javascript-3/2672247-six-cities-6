import { render, screen } from '@testing-library/react';
import ReviewItem from './review-item';
import { makeReview } from '../../test/fixtures';

describe('ReviewItem', () => {
  it('renders review data', () => {
    const review = makeReview({ comment: 'Nice', date: '2023-04-01T10:00:00.000Z' });

    render(<ReviewItem review={review} />);

    expect(screen.getByText('Nice')).toBeInTheDocument();
    expect(screen.getByText('Kate')).toBeInTheDocument();
    expect(screen.getByText('April 2023')).toBeInTheDocument();
  });
});
