import { render, screen, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import App from './app';
import { makeStore } from '../../test/test-utils';
import { AuthorizationStatus } from '../../const';
import { setAuthorizationStatus } from '../../store/slices/user-slice';
import { makeOffer } from '../../test/fixtures';

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

describe('App routing', () => {
  it('renders main page on /', () => {
    window.history.pushState({}, '', '/');
    const store = makeStore();

    render(
      <Provider store={store}>
        <App />
      </Provider>
    );

    expect(screen.getByText('Main page')).toBeInTheDocument();
  });

  it('renders login page on /login', () => {
    window.history.pushState({}, '', '/login');
    const store = makeStore();

    render(
      <Provider store={store}>
        <App />
      </Provider>
    );

    expect(screen.getByText('Login page')).toBeInTheDocument();
  });

  it('redirects to login when visiting /favorites as guest', async () => {
    window.history.pushState({}, '', '/favorites');
    const store = makeStore();
    store.dispatch(setAuthorizationStatus(AuthorizationStatus.NoAuth));

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
    const store = makeStore({
      favorites: {
        offers: [makeOffer({ id: '1' })],
        isLoading: false,
      },
    });
    store.dispatch(setAuthorizationStatus(AuthorizationStatus.Auth));

    render(
      <Provider store={store}>
        <App />
      </Provider>
    );

    expect(screen.getByText('Favorites page')).toBeInTheDocument();
  });

  it('renders offer page on /offer/:id', () => {
    window.history.pushState({}, '', '/offer/123');
    const store = makeStore();

    render(
      <Provider store={store}>
        <App />
      </Provider>
    );

    expect(screen.getByText('Offer page')).toBeInTheDocument();
  });

  it('renders not found page on unknown route', () => {
    window.history.pushState({}, '', '/unknown');
    const store = makeStore();

    render(
      <Provider store={store}>
        <App />
      </Provider>
    );

    expect(screen.getByText('Not found page')).toBeInTheDocument();
  });
});
