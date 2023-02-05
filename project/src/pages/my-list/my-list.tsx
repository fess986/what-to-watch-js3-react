// список моих фмльмов

import React from 'react';

import Logo from '../../components/logo/Logo';
import FilmList from '../../components/film-list/film-list';
import UserBlock from '../../components/user-block/user-block';

import { Film } from '../../types/films';
import { useAppSelector } from '../../hooks';
import { getFilmList } from '../../store/selectors';

function MyList(): JSX.Element {

  const films : Film[] = useAppSelector(getFilmList);

  return (
    <div className="user-page">
      <header className="page-header user-page__head">

        <Logo />

        <h1 className="page-title user-page__title">My list</h1>

        <UserBlock />

      </header>

      <section className="catalog">
        <h2 className="catalog__title visually-hidden">Catalog</h2>

        <FilmList films={films} />

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
