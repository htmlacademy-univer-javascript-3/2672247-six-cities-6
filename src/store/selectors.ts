import { createSelector } from '@reduxjs/toolkit';
import { SortType } from '../const';
import { Offer } from '../types/offer';
import { RootState } from './index';

export const selectCity = (state: RootState): string => state.app.city;
export const selectOffers = (state: RootState): Offer[] => state.offers.offers;
export const selectOffersLoading = (state: RootState): boolean => state.offers.isLoading;
export const selectAuthorizationStatus = (state: RootState) => state.user.authorizationStatus;
export const selectOffer = (state: RootState) => state.offer.offer;
export const selectNearbyOffers = (state: RootState) => state.offer.nearbyOffers;
export const selectComments = (state: RootState) => state.offer.comments;
export const selectIsOfferLoading = (state: RootState) => state.offer.isOfferLoading;
export const selectIsCommentSubmitting = (state: RootState) => state.offer.isCommentSubmitting;
export const selectIsOfferNotFound = (state: RootState) => state.offer.isOfferNotFound;
export const selectFavorites = (state: RootState) => state.favorites.offers;
export const selectFavoritesCount = (state: RootState) => state.favorites.offers.length;

export const selectOffersByCity = createSelector(
  [selectOffers, selectCity],
  (offers, city) => offers.filter((offer) => offer.city === city)
);

const sortOffers = (offers: Offer[], sortType: SortType): Offer[] => {
  switch (sortType) {
    case 'Price: low to high':
      return [...offers].sort((first, second) => first.price - second.price);
    case 'Price: high to low':
      return [...offers].sort((first, second) => second.price - first.price);
    case 'Top rated first':
      return [...offers].sort((first, second) => second.rating - first.rating);
    default:
      return offers;
  }
};

export const selectSortedOffers = createSelector(
  [selectOffersByCity, (_state: RootState, sortType: SortType) => sortType],
  (offers, sortType) => sortOffers(offers, sortType)
);

export const selectFavoriteOffers = createSelector([selectFavorites], (offers) => offers);
