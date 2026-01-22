import { createReducer } from '@reduxjs/toolkit';
import { DEFAULT_CITY } from '../const';
import { Offer } from '../types/offer';
import { changeCity, setOffers } from './action';
import { fetchOffers } from './api-actions';

type State = {
  city: string;
  offers: Offer[];
  isOffersLoading: boolean;
};

const initialState: State = {
  city: DEFAULT_CITY.name,
  offers: [],
  isOffersLoading: false,
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeCity, (state, action) => {
      state.city = action.payload;
    })
    .addCase(setOffers, (state, action) => {
      state.offers = action.payload;
    });

  builder
    .addCase(fetchOffers.pending, (state) => {
      state.isOffersLoading = true;
    })
    .addCase(fetchOffers.fulfilled, (state, action) => {
      state.offers = action.payload;
      state.isOffersLoading = false;
    })
    .addCase(fetchOffers.rejected, (state) => {
      state.isOffersLoading = false;
    });
});

export { initialState };
export type { State };
export default reducer;
