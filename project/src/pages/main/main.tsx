// главная страница
import { useEffect } from 'react';

import Logo from '../../components/logo/Logo';
import { Film } from '../../types/mocks-types';
import FilmList from '../../components/film-list/film-list';
import MyListButton from '../../components/buttons/my-list-button/my-list-button';
import PlayButton from '../../components/buttons/play-button/play-button';
import ShowMoreButton from '../../components/buttons/show-more-button/show-more-button';
import Genres from '../../components/genres/genres';
import { useAppDispatch, useAppSelector } from '../../hooks/index';
import {getGenre, getFilmList, getfilmsShownCount} from '../../store/selectors';

import { loadFilms, resetFilms, addFilms, changeGenre } from '../../store/action';

type MainProps = {
  films: Film[];
}

function Main(props: MainProps): JSX.Element {

  const {films} = props;

  const dispatch = useAppDispatch();
  // const genre = useAppSelector((state) => state.genre); // так мы напрямую используем useSelector через типизированную версию useAppSelector

  // а так мы обращаемся через вспомогательную наглядную функцию
  const genre = useAppSelector(getGenre);
  const filmsShownCount = useAppSelector(getfilmsShownCount);
  const filmList = useAppSelector(getFilmList);

  const showMoreButtonHandler = () => {
    dispatch(addFilms());
  };

  const genreClickHandler = (filmGenre : string) => {
    dispatch(changeGenre(filmGenre));
  };

  useEffect(() => {
    dispatch(loadFilms(films));

    return () => {
      dispatch(resetFilms());
    };
  }, [dispatch, films]);


  return (
    <>
      <section className="film-card">
        <div className="film-card__bg">
          <img src="img/bg-the-grand-budapest-hotel.jpg" alt="The Grand Budapest Hotel" />
        </div>

        <h1 className="visually-hidden">WTW</h1>
        <header className="page-header film-card__head">

          <Logo />

          <ul className="user-block">
            <li className="user-block__item">
              <div className="user-block__avatar">
                <img src="img/avatar.jpg" alt="User avatar" width="63" height="63" />
              </div>
            </li>
            <li className="user-block__item">
              <a className="user-block__link" href='/some/valid/url'>Sign out</a>
            </li>
          </ul>
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

          <Genres films={filmList} genre={genre} genreClickHandler={genreClickHandler}/>

          <FilmList films={filmList} filmsShownCount={filmsShownCount}/>

          {
            filmList.length > filmsShownCount ? <ShowMoreButton showMoreButtonHandler={showMoreButtonHandler}/> : ''
          }


        </section>

        <footer className="page-footer">
          <div className="logo">
            <a href='/some/valid/url' className="logo__link logo__link--light">
              <span className="logo__letter logo__letter--1">W</span>
              <span className="logo__letter logo__letter--2">T</span>
              <span className="logo__letter logo__letter--3">W</span>
            </a>
          </div>

          <div className="copyright">
            <p>© 2019 What to watch Ltd.</p>
          </div>
        </footer>
      </div>
    </>
  );
}

export default Main;
