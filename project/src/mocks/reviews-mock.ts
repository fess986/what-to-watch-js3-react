import { Review } from '../types/mocks-types';

export const Reviews: Review[] = [
  {
    id: 1,
    user: {
      id: 4,
      name: 'my name',
    },
    rating: 9.0,
    comment: 'very good film i think!',
    date: '2019-05-08T14:13:56.569Z',
  },

  {
    id: 2,
    user: {
      id: 4,
      name: 'Piter Parker',
    },
    rating: 1.0,
    comment: 'it was the worst film i had ever seen!!',
    date: '2019-05-08T14:13:52.569Z',
  },
];
