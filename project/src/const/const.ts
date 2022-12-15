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

// console.log(appRouteWithId('Player', 7));

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

