import offerReducer from './offer-slice';
import {
  fetchComments,
  fetchNearbyOffers,
  fetchOffer,
  postComment,
  toggleFavorite,
} from '../api-actions';
import { makeOffer, makeReview } from '../../test/fixtures';

describe('offerSlice', () => {
  it('returns initial state', () => {
    const state = offerReducer(undefined, { type: 'UNKNOWN' });
    expect(state).toEqual({
      offer: null,
      nearbyOffers: [],
      comments: [],
      isOfferLoading: false,
      isNearbyLoading: false,
      isCommentsLoading: false,
      isCommentSubmitting: false,
      isOfferNotFound: false,
    });
  });

  it('sets loading on fetchOffer.pending', () => {
    const state = offerReducer(undefined, fetchOffer.pending('', '1'));
    expect(state.isOfferLoading).toBe(true);
    expect(state.isOfferNotFound).toBe(false);
  });

  it('stores offer on fetchOffer.fulfilled', () => {
    const offer = makeOffer({ id: '1' });
    const state = offerReducer(undefined, fetchOffer.fulfilled(offer, '', '1'));
    expect(state.offer).toEqual(offer);
    expect(state.isOfferLoading).toBe(false);
  });

  it('marks not found on fetchOffer.rejected', () => {
    const state = offerReducer(undefined, fetchOffer.rejected(null, '', '1'));
    expect(state.offer).toBeNull();
    expect(state.isOfferLoading).toBe(false);
    expect(state.isOfferNotFound).toBe(true);
  });

  it('stores nearby offers on fetchNearbyOffers.fulfilled', () => {
    const offers = [makeOffer({ id: '1' })];
    const state = offerReducer(undefined, fetchNearbyOffers.fulfilled(offers, '', '1'));
    expect(state.nearbyOffers).toEqual(offers);
  });

  it('stores comments on fetchComments.fulfilled', () => {
    const reviews = [makeReview({ id: '1' })];
    const state = offerReducer(undefined, fetchComments.fulfilled(reviews, '', '1'));
    expect(state.comments).toEqual(reviews);
  });

  it('prepends comment on postComment.fulfilled', () => {
    const existing = makeReview({ id: '1' });
    const newReview = makeReview({ id: '2' });
    const state = offerReducer(
      { ...offerReducer(undefined, { type: 'UNKNOWN' }), comments: [existing] },
      postComment.fulfilled(newReview, '', { offerId: '1', comment: 'ok', rating: 4 })
    );
    expect(state.comments[0]).toEqual(newReview);
  });

  it('updates favorites in offer and nearby on toggleFavorite.fulfilled', () => {
    const offer = makeOffer({ id: '1', isFavorite: false });
    const nearby = makeOffer({ id: '2', isFavorite: false });
    const updatedOffer = { ...offer, isFavorite: true };

    const state = offerReducer(
      {
        ...offerReducer(undefined, { type: 'UNKNOWN' }),
        offer,
        nearbyOffers: [nearby, offer],
      },
      toggleFavorite.fulfilled(updatedOffer, '', { offerId: '1', status: 1 })
    );

    expect(state.offer?.isFavorite).toBe(true);
    expect(state.nearbyOffers.find((item) => item.id === '1')?.isFavorite).toBe(true);
  });
});
