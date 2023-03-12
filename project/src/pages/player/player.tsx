// плеер
import React from 'react';

import { useState, useEffect, useRef, SyntheticEvent, MouseEvent } from 'react';
import { useParams, useNavigate, NavigateFunction } from 'react-router-dom';

import { Film } from '../../types/films';
import { Films } from '../../mocks/films-mock';
import {parseMinutes} from '../../utils/utils';
import { appRouteWithId } from '../../const/const';
import { getActiveFilm } from '../../store/reduser/films/films-selectors';
import { useAppSelector, useAppDispatch } from '../../hooks';
import { fetchActiveFilmAction } from '../../store/api-actions';

function Player(): JSX.Element {
  const [isLoading, setIsloading] = useState(true);
  const [isPlaying, setIsPlaing] = useState(false);
  const [currentTimePlaying, setCurrentTimePlaying] = useState(0);
  const [filmDuration, setfilmDuration] = useState(0);
  const [playRowPosition, setPlayRowPosition] = useState(0);

  const dispatch = useAppDispatch();
  const params = useParams();
  const navigate : NavigateFunction = useNavigate();
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const id = Number(params.id) || 1; // чтобы не было проблем с доступом к этой переменной, даем вариант на выбор

  const film2 = useAppSelector(getActiveFilm) as Film;

  useEffect(() => {
    if (videoRef.current === null) {
      return;
    }

    videoRef.current.addEventListener('loadeddata', () => {
      setIsloading(false) ;
      setfilmDuration((current) => {
        if (videoRef.current) {
          current = videoRef.current.duration;
        }
        return current;
      });
    });

  }, []);

  useEffect(() => {
    setPlayRowPosition(Math.floor(currentTimePlaying / filmDuration * 100));
  }, [currentTimePlaying, filmDuration]);

  // прогружаем активный фильм при смене адреса
  useEffect(() => {
    dispatch(fetchActiveFilmAction(id));
  }, [id, dispatch]);


  // let film;
  // if (params.id) {
  //   film = props.films[Number(params.id)];
  // } else { film = props.films[0]; }

  // const fullFilmTime = film.runTime * 60;  - пока что используем моки, поэтому длинну видео рассчитываем по факту. Возможно потом будем брать из данных карточки фильма.

  const {videoLink} = film2 || Films[0];
  const {backgroundImage} = film2 || Films[0];

  const handleCurrentTimePlaying = (evt : SyntheticEvent<HTMLVideoElement>) => {
    setCurrentTimePlaying((evt.target as HTMLVideoElement).currentTime);
  };

  const exitButtonClickHandler = (evt : MouseEvent) => {
    evt.preventDefault();
    navigate(appRouteWithId('Film', id));
  };

  const playButtonClick = () => {
    if (videoRef.current === null) {
      return;
    }

    if (videoRef.current.paused) {
      videoRef.current.play();
      setIsPlaing((value : boolean) : boolean => !value);
    } else {
      videoRef.current.pause();
      setIsPlaing((value : boolean) : boolean => !value);
    }
  };

  const toggleFullScreen = () => {
    /* eslint-disable */
    const document:any = window.document;
    /* eslint-enable */
    const elem = document.documentElement;

    if (!document.fullscreenElement && !document.mozFullScreenElement &&
      !document.webkitFullscreenElement && !document.msFullscreenElement) {
      if (elem.requestFullscreen) {
        elem.requestFullscreen();
      } else if (elem.msRequestFullscreen) {
        elem.msRequestFullscreen();
      } else if (elem.mozRequestFullScreen) {
        elem.mozRequestFullScreen();
      } else if (elem.webkitRequestFullscreen) {
        /* eslint-disable */
        elem.webkitRequestFullscreen((Element as any).ALLOW_KEYBOARD_INPUT);
        /* eslint-enable */
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      }
    }
  };

  return (
    <div className="player">
      <video
        ref={videoRef}
        src={videoLink} className="player__video"
        poster={backgroundImage}
        onTimeUpdate={handleCurrentTimePlaying}
        onClick={playButtonClick}
      >
      </video>

      <button type="button" onClick={exitButtonClickHandler} className="player__exit">Exit</button>

      <div className="player__controls">
        <div className="player__controls-row">
          <div className="player__time">
            <progress className="player__progress" value={String(playRowPosition)} max="100"></progress>
            <div className="player__toggler" style={{left: `${playRowPosition}%` }}>Toggler</div>
          </div>
          <div className="player__time-value">{parseMinutes(filmDuration - currentTimePlaying)}</div>

        </div>

        <div className="player__controls-row">

          {
            isPlaying ?

              <button onClick={playButtonClick} type="button" className="player__play">
                <svg viewBox="0 0 14 21" width="14" height="21">
                  <use xlinkHref="#pause"></use>
                </svg>
                <span>Pause</span>
              </button>
              :
              <button onClick={playButtonClick} type="button" className="player__play">
                <svg viewBox="0 0 19 19" width="19" height="19">
                  <use xlinkHref="#play-s"></use>
                </svg>
                <span>Play</span>
              </button>

          }

          <div className="player__name">{isLoading ? 'loading' : 'played'}</div>

          <button type="button" className="player__full-screen" onClick={toggleFullScreen}>
            <svg viewBox="0 0 27 27" width="27" height="27">
              <use xlinkHref="#full-screen"></use>
            </svg>
            <span>Full screen</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Player;
