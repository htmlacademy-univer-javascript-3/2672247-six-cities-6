import { createReducer } from '@reduxjs/toolkit';
import { DEFAULT_CITY } from '../const';
import { Offer } from '../types/offer';
import { changeCity, setOffers } from './action';

type State = {
  city: string;
  offers: Offer[];
};

const initialState: State = {
  city: DEFAULT_CITY.name,
  offers: [],
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeCity, (state, action) => {
      state.city = action.payload;
    })
    .addCase(setOffers, (state, action) => {
      state.offers = action.payload;
    });
});

export { initialState };
export type { State };
export default reducer;
