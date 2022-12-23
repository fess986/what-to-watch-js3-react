import moment from 'moment';

export const getDuration = (runTime: number) => `${Math.floor(runTime / 60)}h ${runTime % 60}m`;

export const parseCommentDate = (date: string): string => {
  const parsedDate = moment(date).format('MMMM DD[,] YYYY');
  return parsedDate;
};

export const parseMinutes = (timeInSeconds: number): string => {

  const runtime = timeInSeconds / 60;
  let hours: number | string = Math.floor(runtime / 60);
  let minutes:number | string = Math.floor((runtime - hours * 60));
  let seconds: number | string = Math.floor(runtime * 60 - hours * 3600 - minutes * 60);

  minutes = minutes < 10 ? `0${minutes}` : minutes;
  seconds = seconds < 10 ? `0${seconds}` : seconds;
  hours = hours < 10 ? `0${hours}` : hours;

  const parsedTime = hours === 0 ? `${minutes}:${seconds}` : `${hours}:${minutes}:${seconds}`;

  return parsedTime;
};

