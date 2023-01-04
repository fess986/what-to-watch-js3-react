import React from 'react';

const ShowMoreButton = () : JSX.Element => {

  const something = 42;
  console.log(something);

  return (
    <div className="catalog__more">
      <button className="catalog__button" type="button">Show more</button>
    </div>
  );

};

export default ShowMoreButton;
