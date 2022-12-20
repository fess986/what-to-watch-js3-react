// плеер
import React from 'react';

import { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate, NavigateFunction } from 'react-router-dom';

import { Film } from '../../types/mocks-types';

type PlayerProps = {
  films : Film[];
}

function Player(props : PlayerProps): JSX.Element {
  const [isLoading, setIsloading] = useState(true);
  const [isPlaying, setIsPlaing] = useState(true);
  const [currentTimePlaying, setcurrentTimePlaying] = useState(0);


  const params = useParams();
  const navigate : NavigateFunction = useNavigate();
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    if (videoRef.current === null) {
      return;
    }

    videoRef.current.addEventListener('loadeddata', () => {
      setIsloading(false) ;
      console.log('loaded1');

    });
  }, []);

  // useEffect(() => {
  //   console.log('loaded2')
  // }, [isLoading]);

  let film;
  if (params.id) {
    film = props.films[Number(params.id)];
  } else { film = props.films[0]; }

  const {videoLink} = film;

  const playButtonClick = () => {
    console.log(videoRef.current);
  };


  return (
    <div className="player">
      <video
        ref={videoRef}

        src={videoLink} className="player__video" poster="img/player-poster.jpg"
      >
      </video>

      <button type="button" className="player__exit">Exit</button>

      <div className="player__controls">
        <div className="player__controls-row">
          <div className="player__time">
            <progress className="player__progress" value="30" max="100"></progress>
            <div className="player__toggler" style={{left: '30%' }}>Toggler</div>
          </div>
          <div className="player__time-value">1:30:29</div>
        </div>

        <div className="player__controls-row">
          <button onClick={playButtonClick} type="button" className="player__play">
            <svg viewBox="0 0 19 19" width="19" height="19">
              <use xlinkHref="#play-s"></use>
            </svg>
            <span>Play</span>
          </button>
          <div className="player__name">Transpotting</div>

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
