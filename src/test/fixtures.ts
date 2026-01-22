import { Offer } from '../types/offer';
import { Review } from '../types/review';

export const makeOffer = (overrides: Partial<Offer> = {}): Offer => ({
  id: 'offer-1',
  title: 'Charming studio',
  type: 'apartment',
  price: 120,
  city: 'Paris',
  previewImage: 'img/offer.jpg',
  images: ['img/offer-1.jpg'],
  isPremium: false,
  isFavorite: false,
  rating: 4.2,
  bedrooms: 2,
  maxAdults: 4,
  location: {
    latitude: 48.8566,
    longitude: 2.3522,
  },
  goods: ['Wi-Fi', 'Kitchen'],
  host: {
    name: 'John Doe',
    avatarUrl: 'img/avatar.jpg',
    isPro: false,
  },
  description: 'Nice place to stay.',
  ...overrides,
});

export const makeReview = (overrides: Partial<Review> = {}): Review => ({
  id: 'review-1',
  comment: 'Great stay',
  date: '2023-04-01T10:00:00.000Z',
  rating: 4,
  user: {
    name: 'Kate',
    avatarUrl: 'img/avatar-kate.jpg',
    isPro: true,
  },
  ...overrides,
});
