export enum AppRoute {
  Main = '/',
  Login = '/login',
  MyList = '/mylist',
  Film = '/films/:id/*',
  AddReview = '/films/:id/review',
  Player = '/player/:id',
}

type appRouteWithIdProps = keyof (typeof AppRoute);

export function appRouteWithId(line : appRouteWithIdProps, id: number|string|undefined) {
  let finalString: string;

  if (line === 'Film') {
    finalString = `/films/${id}`;
  } else if (line === 'AddReview') {
    finalString = `/films/${id}/review`;
  } else if (line === 'Player') {
    finalString = `/player/${id}`;
  } else {
    finalString = AppRoute[line];
  }

  return finalString;
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

export const ALL_GENRES = 'All genres';

export const GENRES_SHOWN_NUMBER = 9;

export const FILMS_COUNT_ON_START = 6;

export const SHOW_MORE_FILMS_COUNT = 1;

