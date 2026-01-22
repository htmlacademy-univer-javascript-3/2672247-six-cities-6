import { render, screen } from '@testing-library/react';
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
});
