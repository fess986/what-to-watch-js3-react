import moment from 'moment';

export const getDuration = (runTime: number) => `${Math.floor(runTime / 60)}h ${runTime % 60}m`;

export const parseCommentDate = (date: string): string => {
  const ass = moment(date).format('MMMM DD[,] YYYY');
  return ass;
};
