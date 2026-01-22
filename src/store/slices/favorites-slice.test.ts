import favoritesReducer from './favorites-slice';
import { fetchFavorites, toggleFavorite } from '../api-actions';
import { setAuthorizationStatus } from './user-slice';
import { AuthorizationStatus } from '../../const';
import { makeOffer } from '../../test/fixtures';

describe('favoritesSlice', () => {
  it('returns initial state', () => {
    const state = favoritesReducer(undefined, { type: 'UNKNOWN' });
    expect(state).toEqual({
      offers: [],
      isLoading: false,
    });
  });

  it('sets loading on fetchFavorites.pending', () => {
    const state = favoritesReducer(undefined, fetchFavorites.pending('', undefined));
    expect(state.isLoading).toBe(true);
  });

  it('stores offers on fetchFavorites.fulfilled', () => {
    const offers = [makeOffer({ id: '1' })];
    const state = favoritesReducer(undefined, fetchFavorites.fulfilled(offers, '', undefined));
    expect(state.offers).toEqual(offers);
    expect(state.isLoading).toBe(false);
  });

  it('removes offers on auth reset', () => {
    const offers = [makeOffer({ id: '1' })];
    const state = favoritesReducer(
      { offers, isLoading: false },
      setAuthorizationStatus(AuthorizationStatus.NoAuth)
    );
    expect(state.offers).toEqual([]);
  });

  it('adds offer on toggleFavorite.fulfilled when isFavorite true', () => {
    const offer = makeOffer({ id: '1', isFavorite: true });
    const state = favoritesReducer(
      { offers: [], isLoading: false },
      toggleFavorite.fulfilled(offer, '', { offerId: '1', status: 1 })
    );
    expect(state.offers).toEqual([offer]);
  });

  it('removes offer on toggleFavorite.fulfilled when isFavorite false', () => {
    const offer = makeOffer({ id: '1', isFavorite: false });
    const state = favoritesReducer(
      { offers: [makeOffer({ id: '1', isFavorite: true })], isLoading: false },
      toggleFavorite.fulfilled(offer, '', { offerId: '1', status: 0 })
    );
    expect(state.offers).toEqual([]);
  });
});
