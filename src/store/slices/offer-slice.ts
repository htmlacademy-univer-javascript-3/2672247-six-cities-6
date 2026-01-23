import { createSlice } from '@reduxjs/toolkit';
import { Offer } from '../../types/offer';
import { Review } from '../../types/review';
import { fetchComments, fetchNearbyOffers, fetchOffer, postComment, toggleFavorite } from '../api-actions';

export type OfferState = {
  offer: Offer | null;
  nearbyOffers: Offer[];
  comments: Review[];
  isOfferLoading: boolean;
  isNearbyLoading: boolean;
  isCommentsLoading: boolean;
  isCommentSubmitting: boolean;
  commentPostError: string | null;
  isOfferNotFound: boolean;
};

const initialState: OfferState = {
  offer: null,
  nearbyOffers: [],
  comments: [],
  isOfferLoading: false,
  isNearbyLoading: false,
  isCommentsLoading: false,
  isCommentSubmitting: false,
  commentPostError: null,
  isOfferNotFound: false,
};

const offerSlice = createSlice({
  name: 'offer',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchOffer.pending, (state) => {
        state.isOfferLoading = true;
        state.isOfferNotFound = false;
      })
      .addCase(fetchOffer.fulfilled, (state, action) => {
        state.offer = action.payload;
        state.isOfferLoading = false;
        state.isOfferNotFound = false;
      })
      .addCase(fetchOffer.rejected, (state) => {
        state.isOfferLoading = false;
        state.offer = null;
        state.isOfferNotFound = true;
      })
      .addCase(fetchNearbyOffers.pending, (state) => {
        state.isNearbyLoading = true;
      })
      .addCase(fetchNearbyOffers.fulfilled, (state, action) => {
        state.nearbyOffers = action.payload;
        state.isNearbyLoading = false;
      })
      .addCase(fetchNearbyOffers.rejected, (state) => {
        state.isNearbyLoading = false;
      })
      .addCase(fetchComments.pending, (state) => {
        state.isCommentsLoading = true;
      })
      .addCase(fetchComments.fulfilled, (state, action) => {
        state.comments = action.payload;
        state.isCommentsLoading = false;
      })
      .addCase(fetchComments.rejected, (state) => {
        state.isCommentsLoading = false;
      })
      .addCase(postComment.pending, (state) => {
        state.isCommentSubmitting = true;
        state.commentPostError = null;
      })
      .addCase(postComment.fulfilled, (state, action) => {
        state.comments = [action.payload, ...state.comments];
        state.isCommentSubmitting = false;
        state.commentPostError = null;
      })
      .addCase(postComment.rejected, (state) => {
        state.isCommentSubmitting = false;
        state.commentPostError = 'Failed to submit review. Please try again.';
      });
    builder.addCase(toggleFavorite.fulfilled, (state, action) => {
      if (state.offer && state.offer.id === action.payload.id) {
        state.offer = action.payload;
      }
      state.nearbyOffers = state.nearbyOffers.map((offer) =>
        offer.id === action.payload.id ? action.payload : offer
      );
    });
  },
});

export default offerSlice.reducer;
