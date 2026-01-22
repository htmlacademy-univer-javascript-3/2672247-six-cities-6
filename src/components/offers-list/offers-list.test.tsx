import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import OffersList from './offers-list';
import { makeOffer } from '../../test/fixtures';

describe('OffersList', () => {
  it('renders list of offers', () => {
    const offers = [makeOffer({ id: '1' }), makeOffer({ id: '2' })];

    const { container } = render(
      <MemoryRouter>
        <OffersList offers={offers} />
      </MemoryRouter>
    );

    expect(container.querySelectorAll('.place-card').length).toBe(offers.length);
  });

  it('notifies about active offer on hover', () => {
    const offers = [makeOffer({ id: '1' }), makeOffer({ id: '2' })];
    const onActiveOfferChange = vi.fn();

    const { container } = render(
      <MemoryRouter>
        <OffersList offers={offers} onActiveOfferChange={onActiveOfferChange} />
      </MemoryRouter>
    );

    const firstCard = container.querySelector('.place-card') as HTMLElement;
    fireEvent.mouseEnter(firstCard);
    expect(onActiveOfferChange).toHaveBeenCalledWith('1');
    fireEvent.mouseLeave(firstCard);
    expect(onActiveOfferChange).toHaveBeenCalledWith(null);
  });

  it('notifies about favorite toggle', async () => {
    const user = userEvent.setup();
    const offers = [makeOffer({ id: '1', isFavorite: false })];
    const onFavoriteToggle = vi.fn();

    render(
      <MemoryRouter>
        <OffersList offers={offers} onFavoriteToggle={onFavoriteToggle} />
      </MemoryRouter>
    );

    await user.click(screen.getByRole('button', { name: /bookmarks/i }));
    expect(onFavoriteToggle).toHaveBeenCalledWith('1', false);
  });
});
