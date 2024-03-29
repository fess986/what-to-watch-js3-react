export const ALL_GENRES = 'All genres';
export const GENRES_SHOWN_NUMBER = 9;

export const FILMS_COUNT_ON_START = 6;
export const SHOW_MORE_FILMS_COUNT = 1;

export const ERROR_TIMEOUT = 2000;
export const TIMEOUT_API = 5000;

export const INITIAL_COUNT_STARS_COUNT = 5;
export const MINIMUM_CHARACTERS_COUNT = 50;
export const MAXIMUM_CHARACTERS_COUNT = 400;

export enum AppRoute {
  Main = '/',
  Login = '/login',
  MyList = '/mylist',
  Film = '/films/:id/*',
  AddReview = '/films/:id/review',
  Player = '/player/:id',
}

export enum AppRouteAPI {
  Films = '/films', // get - получение списка фильмов
  Promo = '/promo', // get - получение промо фильма
  Film = '/films/', // get /films/:id - Получение фильма с идентификатором id .
  Similar = '/films/', // get /films/: id/similar - Получение списка похожих фильмов. // нужны тесты
  Favorite = '/favorite', // get - Получение списка фильмов «к просмотру».
  FavoritePost = '/favorite/', // post /favorite/: film_id/: status
  Comments = '/comments/', // get - /comments/: film_id
  CommentsPost = '/comments/', // post - /comments/: film_id - Отправить новый комментарий к фильму по его id .
  LoginPost = '/login', // post - /login, Авторизация пользователя на сервере
  LoginCheck = '/login', // get - /login - Проверка статуса авторизации пользователя.
  Logout = '/logout' // delete - /logout - Завершение сеанса работы — выход из закрытой части приложения.
}

export enum ActionTypesAPI {
  FETCH_FILMS = 'films/fetchFilms',
  PROMO = 'films/fetchPromoFilm',
  FETCH_ACTIVE_FILM = 'films/fetchActiveFilm',
  CHECK_AUTH_STATUS = 'user/checkAuth',
  LOGIN = 'user/login',
  LOGOUT = 'user/logout',
  CLEAR_ERROR = 'app/clearError',
  FETCH_REVIEWS = 'reviews/fetchReviews',
  POST_COMMENT = 'reviews/postReviews',
  FETCH_SIMILAR_FILMS = 'films/fetchSimilarFilms',
  FETCH_MY_LIST_FILMS = 'films/fetchMyListFilms',
  ADD_TO_FAVORIRIES = 'films/addToFavorities',
  REMOVE_FROM_FAVORIRIES = 'films/removeFromFavorities',
}

type appRouteWithIdProps = keyof (typeof AppRoute);

export type AppRouteWithId = string;

export function appRouteWithId(line : appRouteWithIdProps, id: number|string|undefined) :AppRouteWithId {
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

export enum StoreNames {
  App = 'APP',
  Films = 'FILMS',
  Reviews = 'REVIEWS',
  User = 'USER',
}


