// список моих фмльмов

import React from 'react';

import Logo from '../../components/logo/Logo';
import FilmList from '../../components/film-list/film-list';
import UserBlock from '../../components/user-block/user-block';

import { Film } from '../../types/films';
import { useAppSelector } from '../../hooks';
import { getFavoriteFilmList } from '../../store/reduser/films/films-selectors';
import { getIsFavoriteFilmsLoaded } from '../../store/reduser/app/app-selectors';
import Loading from '../../components/Loading/loading';

function MyList(): JSX.Element {

  const isFavoriteFilmsLoaded = useAppSelector(getIsFavoriteFilmsLoaded);
  const films : Film[] = useAppSelector(getFavoriteFilmList);

  if (!isFavoriteFilmsLoaded) {
    return (
      <Loading />
    );
  }

  return (
    <div className="user-page">
      <header className="page-header user-page__head">

        <Logo />

        <h1 className="page-title user-page__title">My list</h1>

        <UserBlock />

      </header>

      <section className="catalog">
        <h2 className="catalog__title visually-hidden">Catalog</h2>

        { (films.length === 0)
          ? <h1>You have no favorite Films</h1>
          : <FilmList films={films} />}

      </section>

      <footer className="page-footer">

        <Logo lightness={'light'}/>

        <div className="copyright">
          <p>© 2019 What to watch Ltd.</p>
        </div>
      </footer>
    </div>
  );
}

export default MyList;
