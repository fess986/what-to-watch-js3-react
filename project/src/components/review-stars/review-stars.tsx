import React from 'react';

import {ChangeEvent} from 'react';

type ReviewStarsProps = {
  formBloked: boolean,
  starCount : number; // это стейт вызывающего компонента
  onStarClick : (count: number) => void; // коллбек-функция вызывающего компонента
}

const ReviewStars = function(props : ReviewStarsProps) {

  const {starCount, onStarClick, formBloked} = props;


  const starClickHandler = (event : ChangeEvent<HTMLInputElement>) => {
    onStarClick(Number(event.target.value));
  };

  const starsContent = [];

  for (let i = 10; i > 0; i--) {

    starsContent.push(<input disabled={formBloked} onChange={starClickHandler} checked={starCount === i} key={Math.random() + i} className="rating__input" id={`star-${i}`} type="radio" name="rating" value={i} />);

    starsContent.push(<label key={Math.random() + i} className="rating__label" htmlFor={`star-${i}`}>Rating {i}</label>);
  }

  return (
    <div className="rating">
      <div className="rating__stars">

        {starsContent}

      </div>
    </div>
  );
};

export default ReviewStars;
