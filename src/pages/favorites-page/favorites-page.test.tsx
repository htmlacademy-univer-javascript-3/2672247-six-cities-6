import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import FavoritesPage from './favorites-page';
import { makeStore } from '../../test/test-utils';
import { makeOffer } from '../../test/fixtures';
import { AuthorizationStatus } from '../../const';
import * as apiActions from '../../store/api-actions';

describe('FavoritesPage', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('redirects to login when guest toggles favorite', async () => {
    const user = userEvent.setup();
    const offers = [makeOffer({ id: '1', isFavorite: false })];
    const store = makeStore({
      user: { authorizationStatus: AuthorizationStatus.NoAuth },
    });
    store.dispatch = vi.fn() as unknown as typeof store.dispatch;

    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/favorites']}>
          <Routes>
            <Route path="/favorites" element={<FavoritesPage offers={offers} />} />
            <Route path="/login" element={<div>Login page</div>} />
          </Routes>
        </MemoryRouter>
      </Provider>
    );

    await user.click(screen.getByRole('button', { name: /bookmarks/i }));

    expect(screen.getByText('Login page')).toBeInTheDocument();
  });

  it('dispatches toggleFavorite when authorized', async () => {
    const user = userEvent.setup();
    const offers = [makeOffer({ id: '1', isFavorite: false })];
    const store = makeStore({
      user: { authorizationStatus: AuthorizationStatus.Auth },
    });
    store.dispatch = vi.fn() as unknown as typeof store.dispatch;
    const toggleFavoriteSpy = vi.spyOn(apiActions, 'toggleFavorite');

    render(
      <Provider store={store}>
        <MemoryRouter>
          <FavoritesPage offers={offers} />
        </MemoryRouter>
      </Provider>
    );

    await user.click(screen.getByRole('button', { name: /bookmarks/i }));

    expect(toggleFavoriteSpy).toHaveBeenCalledWith({ offerId: '1', status: 1 });
  });
});
