import { createSlice } from '@reduxjs/toolkit';
import { AuthorizationStatus } from '../../const';
import { Offer } from '../../types/offer';
import { fetchFavorites, toggleFavorite } from '../api-actions';
import { setAuthorizationStatus } from './user-slice';

export type FavoritesState = {
  offers: Offer[];
  isLoading: boolean;
};

const initialState: FavoritesState = {
  offers: [],
  isLoading: false,
};

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFavorites.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchFavorites.fulfilled, (state, action) => {
        state.offers = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchFavorites.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(toggleFavorite.fulfilled, (state, action) => {
        const updated = action.payload;
        if (updated.isFavorite) {
          const exists = state.offers.some((offer) => offer.id === updated.id);
          state.offers = exists
            ? state.offers.map((offer) => (offer.id === updated.id ? updated : offer))
            : [updated, ...state.offers];
        } else {
          state.offers = state.offers.filter((offer) => offer.id !== updated.id);
        }
      })
      .addCase(setAuthorizationStatus, (state, action) => {
        if (action.payload === AuthorizationStatus.NoAuth) {
          state.offers = [];
        }
      });
  },
});

export default favoritesSlice.reducer;
