import {StoreNames} from '../../../const/const';
import {InitialReviewsType} from './reviews-reducer';

type State = {
  [StoreNames.Reviews] : InitialReviewsType,
}

export const getReviewsList = (state : State) => state[StoreNames.Reviews].reviewsList;
export const getReviewsLoadedStatus = (state : State) => state[StoreNames.Reviews].isReviewsLoaded;
export const getReviewsSendingStatus = (state : State) => state[StoreNames.Reviews].isReviewSending;
