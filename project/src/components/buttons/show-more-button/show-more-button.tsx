import React from 'react';

type ShowMoreButtonProp = {
  showMoreButtonHandler : () => void;
}

const ShowMoreButton = ({showMoreButtonHandler} : ShowMoreButtonProp) : JSX.Element =>

  (
    <div className="catalog__more">
      <button className="catalog__button" type="button" onClick={showMoreButtonHandler}>Show more</button>
    </div>
  );
export default ShowMoreButton;
