import React, {useEffect, useRef} from 'react';
import { Film } from '../../types/films';

type VideoPlayerProps = {
  film: Film,
  src: string,
  isPlaying: boolean,
}

function SmallVideoPlayer({film, src, isPlaying} : VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    if (videoRef.current === null) {
      return;
    }

    let timeout : NodeJS.Timeout; // так как мы сразу ничего не присваиваем этой переменной, необходимо точно указать TS ее тип.

    if (isPlaying) {
      timeout = setTimeout(() => {(videoRef.current as HTMLVideoElement).play();
        (videoRef.current as HTMLVideoElement).muted = true; // мы обязаны указать, что запрос в мут-режиме, иначе нас отбреет сервер, так как прогрузка идет не по клику пользователя, а по ховеру
      }, 1000); // мы проверили что videoRef.current - точно не null, поэтому для TS мы утверждаем, что это именно HTMLVideoElement, у которого есть методы play и load
    }
    else {
      videoRef.current.load();
    }

    return () => clearTimeout(timeout);
  }, [isPlaying]);

  return (
    <video
      src={src}
      ref={videoRef}
      poster={film.previewImage}
      width="280"
      height="175"
    >
    </video>
  );
}

export default SmallVideoPlayer;
