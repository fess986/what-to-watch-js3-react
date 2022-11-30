export enum AppRoute {
  Main = '/',
  Login = '/login',
  MyList = '/mylist',
  Film = '/films/:id/*',
  AddReview = '/films/:id/review',
  Player = '/player/:id',
}

export enum AuthStatus {
  Auth = 'AUTH',
  NoAuth = 'NOAUTH',
  UnKnown = 'UNKNOWN',
}

export const FILM_MENU = {
  details : 'Details',
  overview : 'Overview',
  reviews: 'Reviews',
};
