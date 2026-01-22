import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import OfferCard from './offer-card';
import { makeOffer } from '../../test/fixtures';

describe('OfferCard', () => {
  it('renders offer info', () => {
    const offer = makeOffer({ title: 'Cozy room', price: 200, type: 'house' });

    render(
      <MemoryRouter>
        <OfferCard offer={offer} />
      </MemoryRouter>
    );

    expect(screen.getByText('Cozy room')).toBeInTheDocument();
    expect(screen.getByText('€200')).toBeInTheDocument();
    expect(screen.getByText('house')).toBeInTheDocument();
  });

  it('calls onBookmarkClick when bookmark pressed', async () => {
    const user = userEvent.setup();
    const onBookmarkClick = vi.fn();
    const offer = makeOffer();

    render(
      <MemoryRouter>
        <OfferCard offer={offer} onBookmarkClick={onBookmarkClick} />
      </MemoryRouter>
    );

    await user.click(screen.getByRole('button', { name: /bookmarks/i }));
    expect(onBookmarkClick).toHaveBeenCalled();
  });
});
