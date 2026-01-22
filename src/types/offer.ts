export type Offer = {
  id: string;
  title: string;
  type: string;
  price: number;
  city: string;
  previewImage: string;
  images: string[];
  isPremium: boolean;
  isFavorite: boolean;
  rating: number;
  bedrooms: number;
  maxAdults: number;
  location: {
    latitude: number;
    longitude: number;
  };
  goods: string[];
  host: {
    name: string;
    avatarUrl: string;
    isPro: boolean;
  };
  description: string;
};
