import { createReducer } from '@reduxjs/toolkit';
import { AuthorizationStatus, DEFAULT_CITY } from '../const';
import { Offer } from '../types/offer';
import { Review } from '../types/review';
import { changeCity, setAuthorizationStatus, setOffers } from './action';
import { fetchComments, fetchNearbyOffers, fetchOffer, fetchOffers, postComment } from './api-actions';

type State = {
  city: string;
  offers: Offer[];
  offer: Offer | null;
  nearbyOffers: Offer[];
  comments: Review[];
  isOffersLoading: boolean;
  isOfferLoading: boolean;
  isNearbyLoading: boolean;
  isCommentsLoading: boolean;
  isCommentSubmitting: boolean;
  isOfferNotFound: boolean;
  authorizationStatus: AuthorizationStatus;
};

const initialState: State = {
  city: DEFAULT_CITY.name,
  offers: [],
  offer: null,
  nearbyOffers: [],
  comments: [],
  isOffersLoading: false,
  isOfferLoading: false,
  isNearbyLoading: false,
  isCommentsLoading: false,
  isCommentSubmitting: false,
  isOfferNotFound: false,
  authorizationStatus: AuthorizationStatus.Unknown,
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeCity, (state, action) => {
      state.city = action.payload;
    })
    .addCase(setOffers, (state, action) => {
      state.offers = action.payload;
    });
  builder.addCase(setAuthorizationStatus, (state, action) => {
    state.authorizationStatus = action.payload;
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
    });

  builder
    .addCase(fetchNearbyOffers.pending, (state) => {
      state.isNearbyLoading = true;
    })
    .addCase(fetchNearbyOffers.fulfilled, (state, action) => {
      state.nearbyOffers = action.payload;
      state.isNearbyLoading = false;
    })
    .addCase(fetchNearbyOffers.rejected, (state) => {
      state.isNearbyLoading = false;
    });

  builder
    .addCase(fetchComments.pending, (state) => {
      state.isCommentsLoading = true;
    })
    .addCase(fetchComments.fulfilled, (state, action) => {
      state.comments = action.payload;
      state.isCommentsLoading = false;
    })
    .addCase(fetchComments.rejected, (state) => {
      state.isCommentsLoading = false;
    });

  builder
    .addCase(postComment.pending, (state) => {
      state.isCommentSubmitting = true;
    })
    .addCase(postComment.fulfilled, (state, action) => {
      state.comments = [action.payload, ...state.comments];
      state.isCommentSubmitting = false;
    })
    .addCase(postComment.rejected, (state) => {
      state.isCommentSubmitting = false;
    });
});

export { initialState };
export type { State };
export default reducer;
