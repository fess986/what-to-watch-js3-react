// компонент для добавления комментария на странице FilmCard
import React from 'react';
import { Review } from '../../types/films';
import FilmReview from './review/review';

type FilmReviewsProps = {
  reviews : Review[];
}

function FilmReviews(props: FilmReviewsProps): JSX.Element {

  const {reviews} = props;

  const firstColEnd: number = Math.ceil(reviews.length / 2);

  const getReviews = (start : number, end : number): JSX.Element[] => {
    const content : JSX.Element[] = [];
    for (let i = start; i < end; i++) {
      content.push(<FilmReview key={reviews[i].id} review={reviews[i]}/>);
    }
    return content;
  };

  return (
    <div className="film-card__reviews film-card__row">
      <div className="film-card__reviews-col">

        {getReviews(0, firstColEnd)}

      </div>
      <div className="film-card__reviews-col">

        {getReviews(firstColEnd, reviews.length)}

      </div>
    </div>
  );
}

export default FilmReviews;
