// главная страница
import { useEffect } from 'react';

import Logo from '../../components/logo/Logo';
import FilmList from '../../components/film-list/film-list';
import MyListButton from '../../components/buttons/my-list-button/my-list-button';
import PlayButton from '../../components/buttons/play-button/play-button';
import ShowMoreButton from '../../components/buttons/show-more-button/show-more-button';
import Genres from '../../components/genres/genres';
import UserBlock from '../../components/user-block/user-block';
import Loading from '../../components/Loading/loading';

import { fetchPromoFilmAction } from '../../store/api-actions';
import { useAppDispatch, useAppSelector } from '../../hooks/index';
import { getfilmsShownCount, getIsPromoFilmLoaded } from '../../store/reduser/app/app-selectors';
import { getGenre } from '../../store/reduser/app/app-selectors';
import {getFilmList, getFilteredFilmList, getPromoFilm} from '../../store/reduser/films/films-selectors';

import { resetFilms, addFilms, changeGenre } from '../../store/reduser/app/app-reducer';
import { Film } from '../../types/films';

function Main(): JSX.Element {

  const dispatch = useAppDispatch();
  // const genre = useAppSelector((state) => state.genre); // так мы напрямую используем useSelector через типизированную версию useAppSelector
  // а так мы обращаемся через вспомогательную наглядную функцию
  const genres = useAppSelector(getGenre);
  const filmsShownCount = useAppSelector(getfilmsShownCount);
  const films = useAppSelector(getFilmList);
  const filteredFilms = useAppSelector(getFilteredFilmList);
  const promoFilm = useAppSelector(getPromoFilm) as Film;
  const isPromoFilmLoaded : boolean = useAppSelector(getIsPromoFilmLoaded);

  const showMoreButtonHandler = () => {
    dispatch(addFilms());
  };

  const genreClickHandler = (filmGenre : string) => {
    dispatch(changeGenre(filmGenre));
  };

  useEffect(() => {
    dispatch(fetchPromoFilmAction());
  }, [dispatch]);

  useEffect(() => () => {
    dispatch(resetFilms());
  }, [dispatch]);

  if (!isPromoFilmLoaded) {
    return (
      <Loading />
    );
  }

  const {backgroundImage, name, posterImage, genre, released, id, isFavorite} = promoFilm;

  return (
    <>
      <section className="film-card">
        <div className="film-card__bg">
          <img src={backgroundImage} alt={name} />
        </div>

        <h1 className="visually-hidden">WTW</h1>
        <header className="page-header film-card__head">

          <Logo />
          <UserBlock />

        </header>

        <div className="film-card__wrap">
          <div className="film-card__info">
            <div className="film-card__poster">
              <img src={posterImage} alt={`${name} poster`} width="218" height="327" />
            </div>

            <div className="film-card__desc">
              <h2 className="film-card__title">{name}</h2>
              <p className="film-card__meta">
                <span className="film-card__genre">{genre}</span>
                <span className="film-card__year">{released}</span>
              </p>

              <div className="film-card__buttons">

                <PlayButton id={id}/>

                {
                  (!isFavorite)
                    ?
                    <MyListButton status='add' id={id}/>
                    :
                    <MyListButton status='added' id={id}/>
                }

              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="page-content">
        <section className="catalog">
          <h2 className="catalog__title visually-hidden">Catalog</h2>

          <Genres films={films} activeGenre={genres} genreClickHandler={genreClickHandler}/>

          <FilmList films={filteredFilms} filmsShownCount={filmsShownCount}/>

          {
            filteredFilms.length > filmsShownCount ? <ShowMoreButton showMoreButtonHandler={showMoreButtonHandler}/> : ''
          }

        </section>

        <footer className="page-footer">

          <Logo lightness='light'/>

          <div className="copyright">
            <p>© 2019 What to watch Ltd.</p>
          </div>
        </footer>
      </div>
    </>
  );
}

export default Main;
