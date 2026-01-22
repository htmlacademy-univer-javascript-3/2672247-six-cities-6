import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { Offer } from '../types/offer';

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
  previewImage: string;
  images: string[];
  goods: string[];
  host: {
    name: string;
    avatarUrl: string;
    isPro: boolean;
  };
  bedrooms: number;
  maxAdults: number;
  description: string;
};

const adaptOffer = (offer: OfferServer): Offer => ({
  id: offer.id,
  title: offer.title,
  type: offer.type,
  price: offer.price,
  city: offer.city.name,
  previewImage: offer.previewImage,
  images: offer.images,
  isPremium: offer.isPremium,
  isFavorite: offer.isFavorite,
  rating: offer.rating,
  bedrooms: offer.bedrooms,
  maxAdults: offer.maxAdults,
  goods: offer.goods,
  host: {
    name: offer.host.name,
    avatarUrl: offer.host.avatarUrl,
    isPro: offer.host.isPro,
  },
  description: offer.description,
  location: {
    latitude: offer.location.latitude,
    longitude: offer.location.longitude,
  },
});

export const fetchOffers = createAsyncThunk<Offer[], undefined, { extra: AxiosInstance }>(
  'offers/fetch',
  async (_arg, { extra: api }) => {
    const { data } = await api.get<OfferServer[]>('/offers');
    return data.map(adaptOffer);
  }
);
