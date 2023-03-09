import React from 'react';
import { Review } from '../../../types/films';
import { parseCommentDate } from '../../../utils/utils';

type FilmReviewProps = {
  review: Review;
}

function FilmReview(props : FilmReviewProps): JSX.Element {

  const {review} = props;
  const {comment, user, rating, date} = review;

  const calculatedDate = parseCommentDate(date);

  return (
    <div className="review">
      <blockquote className="review__quote">
        <p className="review__text">{comment}</p>

        <footer className="review__details">
          <cite className="review__author">{user.name}</cite>
          <time className="review__date" dateTime="2016-12-24">{calculatedDate}</time>
        </footer>
      </blockquote>

      <div className="review__rating">{rating.toFixed(1)}</div>
    </div>
  );

}

export default FilmReview;
