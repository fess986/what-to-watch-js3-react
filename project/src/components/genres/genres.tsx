import React from 'react';

const Genres = () => {
  const something = 42;
  console.log(something);

  return (
    <ul className="catalog__genres-list">
      <li className="catalog__genres-item catalog__genres-item--active">
        <a className="catalog__genres-link" href='/some/valid/url'>All genres</a>
      </li>
      <li className="catalog__genres-item">
        <a className="catalog__genres-link" href='/some/valid/url2'>Comedies</a>
      </li>
      <li className="catalog__genres-item">
        <a className="catalog__genres-link" href='/some/valid/url3'>Crime</a>
      </li>
      <li className="catalog__genres-item">
        <a href='/some/valid/url' className="catalog__genres-link">Documentary</a>
      </li>
      <li className="catalog__genres-item">
        <a href='/some/valid/url' className="catalog__genres-link">Dramas</a>
      </li>
      <li className="catalog__genres-item">
        <a href='/some/valid/url' className="catalog__genres-link">Horror</a>
      </li>
      <li className="catalog__genres-item">
        <a href='/some/valid/url' className="catalog__genres-link">Kids & Family</a>
      </li>
      <li className="catalog__genres-item">
        <a href='/some/valid/url' className="catalog__genres-link">Romance</a>
      </li>
      <li className="catalog__genres-item">
        <a href='/some/valid/url' className="catalog__genres-link">Sci-Fi</a>
      </li>
      <li className="catalog__genres-item">
        <a href='/some/valid/url' className="catalog__genres-link">Thrillers</a>
      </li>
    </ul>
  );

};

export default Genres;
