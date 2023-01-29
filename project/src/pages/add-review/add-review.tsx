// страница добавления объявления
import React from 'react';

import { useState, FormEvent } from 'react';
import { useParams, useNavigate, NavigateFunction } from 'react-router-dom';
import Logo from '../../components/logo/Logo';
import ReviewStars from '../../components/review-stars/review-stars';
import UserBlock from '../../components/user-block/user-block';

import { appRouteWithId } from '../../const/const';

function AddReview(): JSX.Element {
  const INITIAL_COUNT = 5;
  const [starCount, setStarCount] = useState(INITIAL_COUNT);
  const [reviewMessage, setReviewMessage] = useState('');

  const reviewID = useParams();
  const navigate : NavigateFunction = useNavigate();

  return (
    <section className="film-card film-card--full">
      <div className="film-card__header">
        <div className="film-card__bg">
          <img src="img/bg-the-grand-budapest-hotel.jpg" alt="The Grand Budapest Hotel" />
        </div>

        <h1 className="visually-hidden">WTW</h1>

        <header className="page-header">
          <Logo />

          <nav className="breadcrumbs">
            <ul className="breadcrumbs__list">
              <li className="breadcrumbs__item">
                <a href="film-page.html" className="breadcrumbs__link">The Grand Budapest Hotel</a>
              </li>
              <li className="breadcrumbs__item">
                <a href='/' className="breadcrumbs__link">Add review</a>
              </li>
            </ul>
          </nav>

          <UserBlock />

        </header>

        <div className="film-card__poster film-card__poster--small">
          <img src="img/the-grand-budapest-hotel-poster.jpg" alt="The Grand Budapest Hotel poster" width="218" height="327" />
        </div>
      </div>

      <div className="add-review">
        <form className="add-review__form" onSubmit={(evt : FormEvent) : void => {
          evt.preventDefault();
          navigate(appRouteWithId('Film', reviewID.id));
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
