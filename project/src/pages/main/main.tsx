// главная страница
import Logo from '../../components/logo/Logo';
import { Film } from '../../types/mocks-types';
import FilmList from '../../components/film-list/film-list';
import MyListButton from '../../components/buttons/my-list-button/my-list-button';


type MainProps = {
  films: Film[];
}

function Main(props: MainProps): JSX.Element {

  const {films} = props;

  return (
    <>
      <section className="film-card">
        <div className="film-card__bg">
          <img src="img/bg-the-grand-budapest-hotel.jpg" alt="The Grand Budapest Hotel" />
        </div>

        <h1 className="visually-hidden">WTW</h1>
        <header className="page-header film-card__head">

          <Logo />

          <ul className="user-block">
            <li className="user-block__item">
              <div className="user-block__avatar">
                <img src="img/avatar.jpg" alt="User avatar" width="63" height="63" />
              </div>
            </li>
            <li className="user-block__item">
              <a className="user-block__link" href='/some/valid/url'>Sign out</a>
            </li>
          </ul>
        </header>

        <div className="film-card__wrap">
          <div className="film-card__info">
            <div className="film-card__poster">
              <img src="img/the-grand-budapest-hotel-poster.jpg" alt="The Grand Budapest Hotel poster" width="218" height="327" />
            </div>

            <div className="film-card__desc">
              <h2 className="film-card__title">The Grand Budapest Hotel</h2>
              <p className="film-card__meta">
                <span className="film-card__genre">Drama</span>
                <span className="film-card__year">2014</span>
              </p>

              <div className="film-card__buttons">
                <button className="btn btn--play film-card__button" type="button">
                  <svg viewBox="0 0 19 19" width="19" height="19">
                    <use xlinkHref="#play-s"></use>
                  </svg>
                  <span>Play</span>
                </button>

                <MyListButton />

              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="page-content">
        <section className="catalog">
          <h2 className="catalog__title visually-hidden">Catalog</h2>

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

          <FilmList films={films}/>

          <div className="catalog__more">
            <button className="catalog__button" type="button">Show more</button>
          </div>
        </section>

        <footer className="page-footer">
          <div className="logo">
            <a href='/some/valid/url' className="logo__link logo__link--light">
              <span className="logo__letter logo__letter--1">W</span>
              <span className="logo__letter logo__letter--2">T</span>
              <span className="logo__letter logo__letter--3">W</span>
            </a>
          </div>

          <div className="copyright">
            <p>© 2019 What to watch Ltd.</p>
          </div>
        </footer>
      </div>
    </>
  );
}

export default Main;
