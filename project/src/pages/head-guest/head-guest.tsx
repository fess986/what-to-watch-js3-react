// шапка логина пользователя
import React from 'react';
import Logo from '../../components/logo/Logo';

function HeadGuest(): JSX.Element {
  return (
    <section className="film-card">
      <div className="film-card__bg">
        <img alt='background' src="img/bg-header.jpg" />
      </div>

      <h1 className="visually-hidden">WTW</h1>

      <header className="page-header">
        <Logo />

        <div className="user-block">
          <a href="sign-in.html" className="user-block__link">Sign in</a>
        </div>
      </header>

    </section>
  );
}

export default HeadGuest;
