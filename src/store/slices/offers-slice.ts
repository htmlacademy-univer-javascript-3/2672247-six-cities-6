import { createSlice } from '@reduxjs/toolkit';
import { Offer } from '../../types/offer';
import { fetchOffers, toggleFavorite } from '../api-actions';

export type OffersState = {
  offers: Offer[];
  isLoading: boolean;
  hasError: boolean;
};

const initialState: OffersState = {
  offers: [],
  isLoading: false,
  hasError: false,
};

const offersSlice = createSlice({
  name: 'offers',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchOffers.pending, (state) => {
        state.isLoading = true;
        state.hasError = false;
      })
      .addCase(fetchOffers.fulfilled, (state, action) => {
        state.offers = action.payload;
        state.isLoading = false;
        state.hasError = false;
      })
      .addCase(fetchOffers.rejected, (state) => {
        state.isLoading = false;
        state.hasError = true;
      });
    builder.addCase(toggleFavorite.fulfilled, (state, action) => {
      state.offers = state.offers.map((offer) =>
        offer.id === action.payload.id ? action.payload : offer
      );
    });
  },
});

export default offersSlice.reducer;
