// плеер
import React from 'react';

import { useState, useEffect, useRef, SyntheticEvent, MouseEvent } from 'react';
import { useParams, useNavigate, NavigateFunction } from 'react-router-dom';

import { Film } from '../../types/mocks-types';
import {parseMinutes} from '../../utils/utils';
import { appRouteWithId } from '../../const/const';

type PlayerProps = {
  films : Film[];
}

function Player(props : PlayerProps): JSX.Element {
  const [isLoading, setIsloading] = useState(true);
  const [isPlaying, setIsPlaing] = useState(false);
  const [currentTimePlaying, setCurrentTimePlaying] = useState(0);


  const params = useParams();
  const navigate : NavigateFunction = useNavigate();
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    if (videoRef.current === null) {
      return;
    }

    videoRef.current.addEventListener('loadeddata', () => {
      setIsloading(false) ;
    });

  }, []);


  let film;
  if (params.id) {
    film = props.films[Number(params.id)];
  } else { film = props.films[0]; }


  const fullFilmTime = film.runTime * 60;


  const {videoLink} = film;

  const handleCurrentTimePlaying = (evt : SyntheticEvent<HTMLVideoElement>) => {
    setCurrentTimePlaying((evt.target as HTMLVideoElement).currentTime);
  };

  const exitButtonClickHandler = (evt : MouseEvent) => {
    evt.preventDefault();
    navigate(appRouteWithId('Film', params.id));
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


  return (
    <div className="player">
      <video
        ref={videoRef}
        src={videoLink} className="player__video"
        poster={film.backgroundImage}
        onTimeUpdate={handleCurrentTimePlaying}
      >
      </video>

      <button type="button" onClick={exitButtonClickHandler} className="player__exit">Exit</button>

      <div className="player__controls">
        <div className="player__controls-row">
          <div className="player__time">
            <progress className="player__progress" value="30" max="100"></progress>
            <div className="player__toggler" style={{left: '30%' }}>Toggler</div>
          </div>
          <div className="player__time-value">{parseMinutes(fullFilmTime - currentTimePlaying)}</div>

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

          <button type="button" className="player__full-screen">
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
