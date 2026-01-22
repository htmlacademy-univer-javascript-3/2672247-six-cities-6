import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { AuthorizationStatus } from '../const';
import { saveToken } from '../services/token';
import { Offer } from '../types/offer';
import { Review } from '../types/review';
import { setAuthorizationStatus } from './slices/user-slice';

type OfferServer = {
  id: string;
  title: string;
  type: string;
  price: number;
  city: {
    name: string;
  };
  location: {
    latitude: number;
    longitude: number;
  };
  isFavorite: boolean;
  isPremium: boolean;
  rating: number;
  previewImage?: string;
  images?: string[];
  goods?: string[];
  host?: {
    name: string;
    avatarUrl: string;
    isPro: boolean;
  };
  bedrooms?: number;
  maxAdults?: number;
  description?: string;
};

type CommentServer = {
  id: string;
  comment: string;
  date: string;
  rating: number;
  user: {
    name: string;
    avatarUrl: string;
    isPro: boolean;
  };
};

const adaptOffer = (offer: OfferServer): Offer => ({
  id: offer.id,
  title: offer.title,
  type: offer.type,
  price: offer.price,
  city: offer.city.name,
  previewImage: offer.previewImage ?? '',
  images: offer.images ?? [],
  isPremium: offer.isPremium,
  isFavorite: offer.isFavorite,
  rating: offer.rating,
  bedrooms: offer.bedrooms ?? 0,
  maxAdults: offer.maxAdults ?? 0,
  goods: offer.goods ?? [],
  host: {
    name: offer.host?.name ?? '',
    avatarUrl: offer.host?.avatarUrl ?? '',
    isPro: offer.host?.isPro ?? false,
  },
  description: offer.description ?? '',
  location: {
    latitude: offer.location.latitude,
    longitude: offer.location.longitude,
  },
});

const adaptComment = (comment: CommentServer): Review => ({
  id: comment.id,
  comment: comment.comment,
  date: comment.date,
  rating: comment.rating,
  user: {
    name: comment.user.name,
    avatarUrl: comment.user.avatarUrl,
    isPro: comment.user.isPro,
  },
});

export const fetchOffers = createAsyncThunk<Offer[], undefined, { extra: AxiosInstance }>(
  'offers/fetch',
  async (_arg, { extra: api }) => {
    const { data } = await api.get<OfferServer[]>('offers');
    return data.map(adaptOffer);
  }
);

export const fetchFavorites = createAsyncThunk<Offer[], undefined, { extra: AxiosInstance }>(
  'favorites/fetch',
  async (_arg, { extra: api }) => {
    const { data } = await api.get<OfferServer[]>('favorite');
    return data.map(adaptOffer);
  }
);

export const fetchOffer = createAsyncThunk<Offer, string, { extra: AxiosInstance }>(
  'offer/fetch',
  async (offerId, { extra: api }) => {
    const { data } = await api.get<OfferServer>(`offers/${offerId}`);
    return adaptOffer(data);
  }
);

export const fetchNearbyOffers = createAsyncThunk<Offer[], string, { extra: AxiosInstance }>(
  'offers/fetchNearby',
  async (offerId, { extra: api }) => {
    const { data } = await api.get<OfferServer[]>(`offers/${offerId}/nearby`);
    return data.map(adaptOffer);
  }
);

export const fetchComments = createAsyncThunk<Review[], string, { extra: AxiosInstance }>(
  'comments/fetch',
  async (offerId, { extra: api }) => {
    const { data } = await api.get<CommentServer[]>(`comments/${offerId}`);
    return data.map(adaptComment);
  }
);

type AuthData = {
  email: string;
  password: string;
};

type AuthInfo = {
  token: string;
};

export const checkAuth = createAsyncThunk<void, undefined, { extra: AxiosInstance }>(
  'user/checkAuth',
  async (_arg, { dispatch, extra: api }) => {
    try {
      await api.get('login');
      dispatch(setAuthorizationStatus(AuthorizationStatus.Auth));
    } catch {
      dispatch(setAuthorizationStatus(AuthorizationStatus.NoAuth));
    }
  }
);

export const login = createAsyncThunk<void, AuthData, { extra: AxiosInstance }>(
  'user/login',
  async ({ email, password }, { dispatch, extra: api }) => {
    const { data } = await api.post<AuthInfo>('login', { email, password });
    saveToken(data.token);
    dispatch(setAuthorizationStatus(AuthorizationStatus.Auth));
  }
);

type CommentPost = {
  offerId: string;
  comment: string;
  rating: number;
};

export const postComment = createAsyncThunk<Review, CommentPost, { extra: AxiosInstance }>(
  'comments/post',
  async ({ offerId, comment, rating }, { extra: api }) => {
    const { data } = await api.post<CommentServer>(`comments/${offerId}`, { comment, rating });
    return adaptComment(data);
  }
);

type FavoriteStatus = {
  offerId: string;
  status: 0 | 1;
};

export const toggleFavorite = createAsyncThunk<Offer, FavoriteStatus, { extra: AxiosInstance }>(
  'favorites/toggle',
  async ({ offerId, status }, { extra: api }) => {
    const { data } = await api.post<OfferServer>(`favorite/${offerId}/${status}`);
    return adaptOffer(data);
  }
);
