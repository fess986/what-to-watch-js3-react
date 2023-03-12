// главная страница
import { useEffect } from 'react';

import Logo from '../../components/logo/Logo';
import FilmList from '../../components/film-list/film-list';
import MyListButton from '../../components/buttons/my-list-button/my-list-button';
import PlayButton from '../../components/buttons/play-button/play-button';
import ShowMoreButton from '../../components/buttons/show-more-button/show-more-button';
import Genres from '../../components/genres/genres';
import UserBlock from '../../components/user-block/user-block';
import { useAppDispatch, useAppSelector } from '../../hooks/index';
import { getfilmsShownCount } from '../../store/reduser/app/app-selectors';
import { getGenre } from '../../store/reduser/app/app-selectors';
import {getFilmList, getFilteredFilmList} from '../../store/reduser/films/films-selectors';
// import {getFilmList} from '../../store/reduser/films/films-selectors';

import { resetFilms, addFilms, changeGenre } from '../../store/reduser/app/app-reducer';

function Main(): JSX.Element {

  const dispatch = useAppDispatch();
  // const genre = useAppSelector((state) => state.genre); // так мы напрямую используем useSelector через типизированную версию useAppSelector
  // а так мы обращаемся через вспомогательную наглядную функцию
  const genre = useAppSelector(getGenre);
  const filmsShownCount = useAppSelector(getfilmsShownCount);
  const films = useAppSelector(getFilmList);
  const filteredFilms = useAppSelector(getFilteredFilmList);


  const showMoreButtonHandler = () => {
    dispatch(addFilms());
  };

  const genreClickHandler = (filmGenre : string) => {
    dispatch(changeGenre(filmGenre));
  };

  useEffect(() => () => {
    dispatch(resetFilms());
  }, [dispatch]);

  return (
    <>
      <section className="film-card">
        <div className="film-card__bg">
          <img src="img/bg-the-grand-budapest-hotel.jpg" alt="The Grand Budapest Hotel" />
        </div>

        <h1 className="visually-hidden">WTW</h1>
        <header className="page-header film-card__head">

          <Logo />
          <UserBlock />

        </header>

        <div className="film-card__wrap">
          <div className="film-card__info">
            <div className="film-card__poster">
              <img src="img/the-grand-budapest-hotel-poster.jpg" alt="The Grand Budapest Hotel poster" width="218" height="327" />
            </div>

            <div className="film-card__desc">
              <h2 className="film-card__title">The Grand Budapest Hotel</h2>
              <p className="film-card__meta">
                <span className="film-card__genre">Drama</span>
                <span className="film-card__year">2014</span>
              </p>

              <div className="film-card__buttons">

                <PlayButton id={0}/>
                <MyListButton />

              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="page-content">
        <section className="catalog">
          <h2 className="catalog__title visually-hidden">Catalog</h2>

          <Genres films={films} activeGenre={genre} genreClickHandler={genreClickHandler}/>

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
