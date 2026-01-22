import { render, screen, waitFor } from '@testing-library/react';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import App from './app';
import { AuthorizationStatus } from '../../const';
import { makeOffer } from '../../test/fixtures';
import type { RootState } from '../../store';

vi.mock('../../store/api-actions', () => ({
  checkAuth: () => ({ type: 'test/checkAuth' }),
  fetchOffers: () => ({ type: 'test/fetchOffers' }),
  fetchFavorites: () => ({ type: 'test/fetchFavorites' }),
}));

vi.mock('../../pages/main-page/main-page', () => ({
  default: () => <div>Main page</div>,
}));

vi.mock('../../pages/login-page/login-page', () => ({
  default: () => <div>Login page</div>,
}));

vi.mock('../../pages/favorites-page/favorites-page', () => ({
  default: () => <div>Favorites page</div>,
}));

vi.mock('../../pages/offer-page/offer-page', () => ({
  default: () => <div>Offer page</div>,
}));

vi.mock('../../pages/not-found-page/not-found-page', () => ({
  default: () => <div>Not found page</div>,
}));

const defaultState: RootState = {
  app: {
    city: 'Paris',
  },
  offers: {
    offers: [],
    isLoading: false,
  },
  offer: {
    offer: null,
    nearbyOffers: [],
    comments: [],
    isOfferLoading: false,
    isNearbyLoading: false,
    isCommentsLoading: false,
    isCommentSubmitting: false,
    isOfferNotFound: false,
  },
  favorites: {
    offers: [],
    isLoading: false,
  },
  user: {
    authorizationStatus: AuthorizationStatus.NoAuth,
  },
};

const makeState = (overrides?: Partial<RootState>): RootState => ({
  ...defaultState,
  ...overrides,
  app: { ...defaultState.app, ...overrides?.app },
  offers: { ...defaultState.offers, ...overrides?.offers },
  offer: { ...defaultState.offer, ...overrides?.offer },
  favorites: { ...defaultState.favorites, ...overrides?.favorites },
  user: { ...defaultState.user, ...overrides?.user },
});

const makeRoutingStore = (overrides?: Partial<RootState>) =>
  configureStore({
    reducer: (state: RootState = defaultState) => state,
    preloadedState: makeState(overrides),
  });

describe('App routing', () => {
  it('renders main page on /', () => {
    window.history.pushState({}, '', '/');
    const store = makeRoutingStore();

    render(
      <Provider store={store}>
        <App />
      </Provider>
    );

    expect(screen.getByText('Main page')).toBeInTheDocument();
  });

  it('renders login page on /login', () => {
    window.history.pushState({}, '', '/login');
    const store = makeRoutingStore();

    render(
      <Provider store={store}>
        <App />
      </Provider>
    );

    expect(screen.getByText('Login page')).toBeInTheDocument();
  });

  it('redirects to login when visiting /favorites as guest', async () => {
    window.history.pushState({}, '', '/favorites');
    const store = makeRoutingStore({
      user: { authorizationStatus: AuthorizationStatus.NoAuth },
    });

    render(
      <Provider store={store}>
        <App />
      </Provider>
    );

    await waitFor(() => {
      expect(screen.getByText('Login page')).toBeInTheDocument();
    });
  });

  it('renders favorites page when authorized', () => {
    window.history.pushState({}, '', '/favorites');
    const store = makeRoutingStore({
      favorites: {
        offers: [makeOffer({ id: '1' })],
        isLoading: false,
      },
      user: { authorizationStatus: AuthorizationStatus.Auth },
    });

    render(
      <Provider store={store}>
        <App />
      </Provider>
    );

    expect(screen.getByText('Favorites page')).toBeInTheDocument();
  });

  it('renders offer page on /offer/:id', () => {
    window.history.pushState({}, '', '/offer/123');
    const store = makeRoutingStore();

    render(
      <Provider store={store}>
        <App />
      </Provider>
    );

    expect(screen.getByText('Offer page')).toBeInTheDocument();
  });

  it('renders not found page on unknown route', () => {
    window.history.pushState({}, '', '/unknown');
    const store = makeRoutingStore();

    render(
      <Provider store={store}>
        <App />
      </Provider>
    );

    expect(screen.getByText('Not found page')).toBeInTheDocument();
  });
});
