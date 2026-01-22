import { Review } from '../types/review';

export const reviews: Review[] = [
  {
    id: 'r1',
    comment:
      'A quiet cozy and picturesque that hides behind a river by the unique lightness of Amsterdam. The building is green and from 18th century.',
    date: '2019-04-24',
    rating: 4.8,
    user: {
      name: 'Max',
      avatarUrl: 'img/avatar-max.jpg',
      isPro: false,
    },
  },
  {
    id: 'r2',
    comment: 'Perfect location and a very friendly host. The flat was spotless.',
    date: '2019-03-11',
    rating: 4.6,
    user: {
      name: 'Angelina',
      avatarUrl: 'img/avatar-angelina.jpg',
      isPro: true,
    },
  },
];
