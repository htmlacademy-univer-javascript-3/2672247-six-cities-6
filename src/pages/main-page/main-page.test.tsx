import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import MainPage from './main-page';
import { makeStore } from '../../test/test-utils';
import { makeOffer } from '../../test/fixtures';

vi.mock('../../components/map/map', () => ({
  default: () => <div>Map</div>,
}));

vi.mock('../../components/offers-list/offers-list', () => ({
  default: () => <div>OffersList</div>,
}));

vi.mock('../../components/sorting-options/sorting-options', () => ({
  default: () => <div>SortingOptions</div>,
}));

describe('MainPage', () => {
  it('renders empty state when there are no offers', () => {
    const store = makeStore({
      app: { city: 'Paris' },
      offers: { offers: [], isLoading: false },
    });

    render(
      <Provider store={store}>
        <MemoryRouter>
          <MainPage />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText('No places to stay available')).toBeInTheDocument();
  });

  it('renders offers count for selected city', () => {
    const offers = [
      makeOffer({ id: '1', city: 'Paris' }),
      makeOffer({ id: '2', city: 'Cologne' }),
    ];

    const store = makeStore({
      app: { city: 'Paris' },
      offers: { offers, isLoading: false },
    });

    render(
      <Provider store={store}>
        <MemoryRouter>
          <MainPage />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText('1 places to stay in Paris')).toBeInTheDocument();
  });
});
