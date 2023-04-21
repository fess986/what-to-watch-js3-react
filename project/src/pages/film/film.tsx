// страница деталей фильма
import {useEffect} from 'react';
import { Route, Routes, useParams } from 'react-router-dom';
import { useAppDispatch } from '../../hooks';

import Logo from '../../components/logo/Logo';
import FilmDetails from '../../components/film-card/film-card-details';
import FilmOverview from '../../components/film-card/film-card-overview';
import FilmReviews from '../../components/film-card/film-card-reviews';
import FilmNavigation from '../../components/film-card/film-navigation';
import AddReviewButton from '../../components/buttons/add-review-button/add-review-button';
import MyListButton from '../../components/buttons/my-list-button/my-list-button';
import PlayButton from '../../components/buttons/play-button/play-button';
import MoreLikeThisList from '../../components/more-like-this-list/more-like-this-list';
import UserBlock from '../../components/user-block/user-block';
import Loading from '../../components/Loading/loading';

import { getActiveFilm, getSimilarFilmList } from '../../store/reduser/films/films-selectors';
import {getReviewsList} from '../../store/reduser/reviews/reviews-selectors';
import { getIsActiveFilmLoaded, getIsSimilarFilmsLoaded } from '../../store/reduser/app/app-selectors';
import { getAuthStatus } from '../../store/reduser/user/user-selectors';
import { useAppSelector } from '../../hooks';
import { fetchActiveFilmAction } from '../../store/api-actions';
import { fetchReviews, fetchSimilarFilms } from '../../store/api-actions';

import { FILM_MENU } from '../../const/const';
import { Film, Review } from '../../types/films';

function FilmCard(): JSX.Element {
  const dispatch = useAppDispatch();
  const idParam = useParams().id;
  const id = Number(useParams().id) ?? 1;
  const isAuth = useAppSelector(getAuthStatus);
  const similarFilms = useAppSelector(getSimilarFilmList);
  const isFilmLoaded = useAppSelector(getIsActiveFilmLoaded);
  const isSimilarFilmsLoaded = useAppSelector(getIsSimilarFilmsLoaded);
  const reviews = useAppSelector(getReviewsList) as Review[];
  const film = useAppSelector(getActiveFilm) as Film; // воспользуемся приведением типа, для того чтобы TS не ругался на нас, когда мы пробуем деструкторизировать film, который может оказаться null. На самом деле, если там будет null,  мы рендерим заглушку и до самой деструкторизации дело не дойдет
  // console.log(film)

  useEffect(() => {
    dispatch(fetchActiveFilmAction(id));
    dispatch(fetchReviews(id));
    dispatch(fetchSimilarFilms(id));

    // диспатч возвращает промис,
    // dispatch(fetchSimilarFilms(id)).then((action) => { // диспатч - промис, который передает нам данные из возврата fetchSimilarFilms, он создает поля type / payload для action.
    //   console.log(action); // объект экшена с полями type / payload
    //   return action;
    // });

  }, [id, dispatch]);


  if (!isFilmLoaded) {
    return (
      <Loading caller=' Film Page'/>
    );
  }

  const {backgroundImage, name, genre, posterImage, isFavorite} = film;

  return (
    <>
      <section className="film-card film-card--full">

        <div className="film-card__hero">
          <div className="film-card__bg">
            <img src={backgroundImage} alt={name} />
          </div>

          <h1 className="visually-hidden">WTW</h1>

          <header className="page-header film-card__head">

            <Logo />

            <UserBlock />

          </header>

          <div className="film-card__wrap">
            <div className="film-card__desc">
              <h2 className="film-card__title">{name}</h2>
              <p className="film-card__meta">
                <span className="film-card__genre">{genre}</span>
                <span className="film-card__year">2014</span>
              </p>

              <div className="film-card__buttons">

                <PlayButton id={idParam}/>

                {
                  (!isFavorite)
                    ?
                    <MyListButton status='add' id={id}/>
                    :
                    <MyListButton status='added' id={id}/>
                }

                {isAuth === 'AUTH' ? <AddReviewButton /> : ''}


              </div>
            </div>
          </div>
        </div>

        <div className="film-card__wrap film-card__translate-top">
          <div className="film-card__info">
            <div className="film-card__poster film-card__poster--big">
              <img src={posterImage} alt={name} width="218"
                height="327"
              />
            </div>

            <div className="film-card__desc">
              <nav className="film-nav film-card__nav">
                <FilmNavigation />
              </nav>

              <Routes>
                <Route path="/" element={<FilmDetails film={film} />} />
                <Route path={FILM_MENU.details.toLowerCase()} element={<FilmDetails film={film} />} />
                <Route path={FILM_MENU.overview.toLowerCase()} element={<FilmOverview film={film} />} />
                <Route path={FILM_MENU.reviews.toLowerCase()} element={<FilmReviews reviews={reviews}/>} />
              </Routes>

            </div>
          </div>
        </div>

      </section>

      <div className="page-content">
        <section className="catalog catalog--like-this">
          <h2 className="catalog__title">More like this</h2>

          <div className="catalog__films-list">

            {isSimilarFilmsLoaded
              ? <MoreLikeThisList film={similarFilms}/>
              : <h1>No Similar Films</h1>}

          </div>
        </section>

        <footer className="page-footer">

          <Logo lightness={'light'}/>

          <div className="copyright">
            <p>© 2019 What to watch Ltd.</p>
          </div>
        </footer>
      </div>

    </>
  );
}

export default FilmCard;
