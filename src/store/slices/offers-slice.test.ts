import offersReducer from './offers-slice';
import { fetchOffers, toggleFavorite } from '../api-actions';
import { makeOffer } from '../../test/fixtures';

describe('offersSlice', () => {
  it('returns initial state', () => {
    const state = offersReducer(undefined, { type: 'UNKNOWN' });
    expect(state).toEqual({
      offers: [],
      isLoading: false,
    });
  });

  it('sets loading on fetchOffers.pending', () => {
    const state = offersReducer(undefined, fetchOffers.pending('', undefined));
    expect(state.isLoading).toBe(true);
  });

  it('stores offers on fetchOffers.fulfilled', () => {
    const offers = [makeOffer({ id: '1' }), makeOffer({ id: '2' })];
    const state = offersReducer(undefined, fetchOffers.fulfilled(offers, '', undefined));
    expect(state.offers).toEqual(offers);
    expect(state.isLoading).toBe(false);
  });

  it('stops loading on fetchOffers.rejected', () => {
    const state = offersReducer(undefined, fetchOffers.rejected(null, '', undefined));
    expect(state.isLoading).toBe(false);
  });

  it('updates offer on toggleFavorite.fulfilled', () => {
    const offer = makeOffer({ id: '1', isFavorite: false });
    const updatedOffer = { ...offer, isFavorite: true };
    const state = offersReducer({ offers: [offer], isLoading: false }, toggleFavorite.fulfilled(updatedOffer, '', { offerId: '1', status: 1 }));
    expect(state.offers[0].isFavorite).toBe(true);
  });
});
