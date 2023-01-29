// страница деталей фильма
import React from 'react';
import { Route, Routes, useParams } from 'react-router-dom';

import Logo from '../../components/logo/Logo';
import FilmDetails from '../../components/film-card/film-card-details';
import FilmOverview from '../../components/film-card/film-card-overview';
import FilmReviews from '../../components/film-card/film-card-reviews';
import FilmNavigation from '../../components/film-card/film-navigation';
import AddReviewButton from '../../components/buttons/add-review-button/add-review-button';
import MyListButton from '../../components/buttons/my-list-button/my-list-button';
import PlayButton from '../../components/buttons/play-button/play-button';
import MoreLikeThisList from '../../components/more-like-this-list/more-like-this-list';
import UserBlock from '../../components/user-block/user-block';

import { FILM_MENU } from '../../const/const';
import { Film, Review } from '../../types/mocks-types';

type FilmProps = {
  films: Film[];
  reviews: Review[];
}

function FilmCard(props : FilmProps): JSX.Element {
  const idParam = useParams().id;

  let filmId : number;

  if (idParam === undefined) {
    filmId = 0;
  } else if (isNaN(Number(idParam))) {
    filmId = 0;
  } else {
    filmId = Math.floor(Number(idParam));
  }

  const film : Film = props.films[filmId] ? props.films[filmId] : props.films[0];

  const {reviews} = props;

  const {backgroundImage, name, genre, posterImage} = film;

  return (
    <>
      <section className="film-card film-card--full">

        <div className="film-card__hero">
          <div className="film-card__bg">
            <img src={backgroundImage} alt={name} />
          </div>

          <h1 className="visually-hidden">WTW</h1>

          <header className="page-header film-card__head">

            <Logo />

            <UserBlock />

          </header>

          <div className="film-card__wrap">
            <div className="film-card__desc">
              <h2 className="film-card__title">{name}</h2>
              <p className="film-card__meta">
                <span className="film-card__genre">{genre}</span>
                <span className="film-card__year">2014</span>
              </p>

              <div className="film-card__buttons">

                <PlayButton id={idParam}/>
                <MyListButton />
                <AddReviewButton/>

              </div>
            </div>
          </div>
        </div>

        <div className="film-card__wrap film-card__translate-top">
          <div className="film-card__info">
            <div className="film-card__poster film-card__poster--big">
              <img src={posterImage} alt={name} width="218"
                height="327"
              />
            </div>

            <div className="film-card__desc">
              <nav className="film-nav film-card__nav">
                <FilmNavigation />
              </nav>

              <Routes>
                <Route path="/" element={<FilmDetails film={film} />} />
                <Route path={FILM_MENU.details.toLowerCase()} element={<FilmDetails film={film} />} />
                <Route path={FILM_MENU.overview.toLowerCase()} element={<FilmOverview film={film} />} />
                <Route path={FILM_MENU.reviews.toLowerCase()} element={<FilmReviews reviews={reviews}/>} />
              </Routes>

            </div>
          </div>
        </div>

      </section>

      <div className="page-content">
        <section className="catalog catalog--like-this">
          <h2 className="catalog__title">More like this</h2>

          <div className="catalog__films-list">

            <MoreLikeThisList film={props.films}/>

          </div>
        </section>

        <footer className="page-footer">

          <Logo lightness={'light'}/>

          <div className="copyright">
            <p>© 2019 What to watch Ltd.</p>
          </div>
        </footer>
      </div>

    </>
  );
}

export default FilmCard;
