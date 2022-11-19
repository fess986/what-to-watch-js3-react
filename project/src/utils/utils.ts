// import moment from 'moment';

export const getDuration = (runTime: number) => `${Math.floor(runTime / 60)}h ${runTime % 60}m`;
