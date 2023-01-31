// компонент для краткого описания фильма на странице FilmCard
import React from 'react';
import { Film } from '../../types/films';

type FilmOverviewProps = {
  film: Film;
}

function FilmOverview(props : FilmOverviewProps): JSX.Element {

  const {film} = props;
  const {rating, scoresCount, description, director, starring} = film;

  // решение через тернарный оператор
  // const textRating : string = (rating < 3) ?
  //   'Bad' :
  //   (rating < 5) ? 'Normal' :
  //     (rating < 8) ? 'Good' :
  //       (rating < 10) ? 'Very Good' :
  //         (rating === 10) ? 'Awaresome!' :
  //           'invalid rating';

  // решение через switch
  let textRating = '123';

  switch (true) {
    case rating < 3 || rating === 3:
      textRating = 'Bad';
      break;
    case (((rating < 5) || (rating === 5)) && (rating > 3)):
      textRating = 'Normal';
      break;
    case (((rating < 8) || (rating === 8)) && (rating > 5)):
      textRating = 'Good';
      break;
    case ((rating < 10 ) && (rating > 8)):
      textRating = 'Very Good';
      break;
    case (rating === 10 ) :
      textRating = 'Aweresome!';
      break;
    case (rating > 10 ) :
      textRating = 'invalid rating';
      break;
  }

  return (
    <>
      <div className="film-rating">
        <div className="film-rating__score">{rating}</div>
        <p className="film-rating__meta">
          <span className="film-rating__level">{textRating}</span>
          <span className="film-rating__count">{scoresCount.toString()} ratings</span>
        </p>
      </div>

      <div className="film-card__text">
        <p>{description}</p>

        <p className="film-card__director"><strong>Director: {director}</strong></p>

        <p className="film-card__starring"><strong>Starring: {starring.join(', ')}</strong></p>
      </div>
    </>
  );
}

export default FilmOverview;
