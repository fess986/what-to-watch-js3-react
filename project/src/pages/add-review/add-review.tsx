// страница добавления объявления
import React from 'react';

import { useState, FormEvent, useEffect } from 'react';
import { useParams, useNavigate, NavigateFunction, Link } from 'react-router-dom';

import Logo from '../../components/logo/Logo';
import ReviewStars from '../../components/review-stars/review-stars';
import UserBlock from '../../components/user-block/user-block';
import Loading from '../../components/Loading/loading';

import { useAppDispatch, useAppSelector } from '../../hooks';
import {getActiveFilm} from '../../store/reduser/films/films-selectors';
import { getIsActiveFilmLoaded } from '../../store/reduser/app/app-selectors';
import { appRouteWithId } from '../../const/const';
import { fetchActiveFilmAction } from '../../store/api-actions';
import { Film } from '../../types/films';

function AddReview(): JSX.Element {
  const INITIAL_COUNT = 5;
  const [starCount, setStarCount] = useState(INITIAL_COUNT);
  const [reviewMessage, setReviewMessage] = useState('');

  const dispatch = useAppDispatch();
  const reviewID = Number(useParams().id) ?? 1;
  const navigate : NavigateFunction = useNavigate();
  const isFilmLoaded = useAppSelector(getIsActiveFilmLoaded);
  const film = useAppSelector(getActiveFilm) as Film;

  useEffect(() => {
    dispatch(fetchActiveFilmAction(reviewID));
  }, [reviewID, dispatch]);

  if (!isFilmLoaded) {
    return (
      <Loading />
    );
  }

  return (
    <section className="film-card film-card--full">
      <div className="film-card__header">
        <div className="film-card__bg">
          <img src={film.backgroundImage} alt={film.name} />
        </div>

        <h1 className="visually-hidden">WTW</h1>

        <header className="page-header">
          <Logo />

          <nav className="breadcrumbs">
            <ul className="breadcrumbs__list">
              <li className="breadcrumbs__item">
                <Link to={appRouteWithId('Film', reviewID)} className="breadcrumbs__link">{film.name}</Link>
              </li>
              <li className="breadcrumbs__item">
                <Link to={appRouteWithId('AddReview', reviewID)} className="breadcrumbs__link">Add review</Link>
              </li>
            </ul>
          </nav>

          <UserBlock />

        </header>

        <div className="film-card__poster film-card__poster--small">
          <img src={film.posterImage} alt={film.name} width="218" height="327" />
        </div>
      </div>

      <div className="add-review">
        <form className="add-review__form" onSubmit={(evt : FormEvent) : void => {
          evt.preventDefault();
          navigate(appRouteWithId('Film', reviewID));
        }}
        >

          {/* передаем состояние на уровень вверх через вызов коллбек-функции */}
          <ReviewStars starCount={starCount} onStarClick={(count : number) : void => {
            setStarCount(count);
          }}
          />

          <div className="add-review__text">
            <textarea className="add-review__textarea" name="review-text" id="review-text" placeholder="Review text"
              onChange={(evt) => {
                setReviewMessage(evt.target.value);
              }}
            >
            </textarea>
            <div className="add-review__submit">
              <button className="add-review__btn" type="submit" disabled = {reviewMessage === ''}>Post</button>
            </div>

          </div>
        </form>
      </div>

    </section>
  );
}

export default AddReview;
