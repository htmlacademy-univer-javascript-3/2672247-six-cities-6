import type { AnyAction, ThunkAction, ThunkDispatch } from '@reduxjs/toolkit';
import type { AxiosInstance } from 'axios';
import {
  checkAuth,
  fetchComments,
  fetchFavorites,
  fetchNearbyOffers,
  fetchOffer,
  fetchOffers,
  postComment,
  toggleFavorite,
} from './api-actions';
import { AuthorizationStatus } from '../const';
import { setAuthorizationStatus } from './slices/user-slice';

const offerServer = {
  id: 'offer-1',
  title: 'Nice place',
  type: 'apartment',
  price: 120,
  city: { name: 'Paris' },
  location: { latitude: 48.8566, longitude: 2.3522 },
  isFavorite: false,
  isPremium: false,
  rating: 4.2,
  previewImage: 'img/offer.jpg',
  images: ['img/offer-1.jpg'],
  goods: ['Wi-Fi'],
  host: {
    name: 'Host',
    avatarUrl: 'img/avatar.jpg',
    isPro: true,
  },
  bedrooms: 2,
  maxAdults: 4,
  description: 'Nice place to stay',
};

const commentServer = {
  id: 'review-1',
  comment: 'Great stay',
  date: '2023-04-01T10:00:00.000Z',
  rating: 4,
  user: {
    name: 'Kate',
    avatarUrl: 'img/avatar-kate.jpg',
    isPro: true,
  },
};

const makeApi = (data: unknown): AxiosInstance =>
  ({
    get: vi.fn().mockResolvedValue({ data }),
    post: vi.fn().mockResolvedValue({ data }),
  } as unknown as AxiosInstance);

const collectActions = () => {
  const actions: AnyAction[] = [];
  const dispatch: ThunkDispatch<unknown, AxiosInstance, AnyAction> = (
    action: AnyAction | ThunkAction<unknown, unknown, AxiosInstance, AnyAction>
  ) => {
    actions.push(action as AnyAction);
    return action as AnyAction;
  };
  return { actions, dispatch };
};

describe('api-actions', () => {
  it('fetchOffers dispatches fulfilled with adapted data', async () => {
    const api = makeApi([offerServer]);
    const { actions, dispatch } = collectActions();

    await fetchOffers()(dispatch, () => ({}), api);

    const fulfilled = actions.find(fetchOffers.fulfilled.match);
    expect(fulfilled).toBeTruthy();
    expect(fulfilled?.payload[0]).toMatchObject({
      id: offerServer.id,
      city: offerServer.city.name,
      location: offerServer.location,
    });
  });

  it('fetchFavorites dispatches fulfilled with adapted data', async () => {
    const api = makeApi([offerServer]);
    const { actions, dispatch } = collectActions();

    await fetchFavorites()(dispatch, () => ({}), api);

    const fulfilled = actions.find(fetchFavorites.fulfilled.match);
    expect(fulfilled).toBeTruthy();
    expect(fulfilled?.payload[0].id).toBe(offerServer.id);
  });

  it('fetchOffer dispatches fulfilled with adapted data', async () => {
    const api = makeApi(offerServer);
    const { actions, dispatch } = collectActions();

    await fetchOffer(offerServer.id)(dispatch, () => ({}), api);

    const fulfilled = actions.find(fetchOffer.fulfilled.match);
    expect(fulfilled).toBeTruthy();
    expect(fulfilled?.payload.id).toBe(offerServer.id);
  });

  it('fetchNearbyOffers dispatches fulfilled with adapted data', async () => {
    const api = makeApi([offerServer]);
    const { actions, dispatch } = collectActions();

    await fetchNearbyOffers(offerServer.id)(dispatch, () => ({}), api);

    const fulfilled = actions.find(fetchNearbyOffers.fulfilled.match);
    expect(fulfilled).toBeTruthy();
    expect(fulfilled?.payload).toHaveLength(1);
  });

  it('fetchComments dispatches fulfilled with adapted data', async () => {
    const api = makeApi([commentServer]);
    const { actions, dispatch } = collectActions();

    await fetchComments(offerServer.id)(dispatch, () => ({}), api);

    const fulfilled = actions.find(fetchComments.fulfilled.match);
    expect(fulfilled).toBeTruthy();
    expect(fulfilled?.payload[0].id).toBe(commentServer.id);
  });

  it('postComment dispatches fulfilled with adapted data', async () => {
    const api = makeApi(commentServer);
    const { actions, dispatch } = collectActions();

    await postComment({ offerId: offerServer.id, comment: 'Ok', rating: 4 })(dispatch, () => ({}), api);

    const fulfilled = actions.find(postComment.fulfilled.match);
    expect(fulfilled).toBeTruthy();
    expect(fulfilled?.payload.id).toBe(commentServer.id);
  });

  it('toggleFavorite dispatches fulfilled with adapted data', async () => {
    const api = makeApi({ ...offerServer, isFavorite: true });
    const { actions, dispatch } = collectActions();

    await toggleFavorite({ offerId: offerServer.id, status: 1 })(dispatch, () => ({}), api);

    const fulfilled = actions.find(toggleFavorite.fulfilled.match);
    expect(fulfilled).toBeTruthy();
    expect(fulfilled?.payload.isFavorite).toBe(true);
  });

  it('checkAuth dispatches setAuthorizationStatus(Auth) on success', async () => {
    const api = makeApi({});
    const { actions, dispatch } = collectActions();

    await checkAuth()(dispatch, () => ({}), api);

    const authAction = actions.find(setAuthorizationStatus.match);
    expect(authAction).toBeTruthy();
    expect(authAction?.payload).toBe(AuthorizationStatus.Auth);
  });

  it('checkAuth dispatches setAuthorizationStatus(NoAuth) on error', async () => {
    const api = {
      get: vi.fn().mockRejectedValue(new Error('Unauthorized')),
      post: vi.fn(),
    } as unknown as AxiosInstance;
    const { actions, dispatch } = collectActions();

    await checkAuth()(dispatch, () => ({}), api);

    const authAction = actions.find(setAuthorizationStatus.match);
    expect(authAction).toBeTruthy();
    expect(authAction?.payload).toBe(AuthorizationStatus.NoAuth);
  });
});
