import { render } from '@testing-library/react';
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
});
