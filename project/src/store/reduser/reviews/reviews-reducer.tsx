import { createSlice } from '@reduxjs/toolkit';

import { StoreNames } from '../../../const/const';
import {Review} from '../../../types/films';
import { fetchReviews, sendReviewAction } from '../../api-actions';

export type InitialReviewsType = {
  reviewsList: Review[],
  isReviewsLoaded: boolean,
  isReviewSending: boolean,
}

export const InitialReviewsState: InitialReviewsType = {
  reviewsList: [],
  isReviewsLoaded: false,
  isReviewSending: false,
};

export const reviewsReducer = createSlice({
  name: StoreNames.Reviews,
  initialState: InitialReviewsState,
  reducers: {
    loadReviews : (state, action) => {
      state.reviewsList = action.payload;
    },
    changeReviewsLoadedStatus : (state, action) => {
      state.isReviewsLoaded = action.payload;
    },
    changeReviewSendingStatus : (state, action) => {
      state.isReviewSending = action.payload;
    },
  },
  extraReducers(builder) { // сюда мы можем добавлять сторонние действия, например из других слайсов, из api-actions и обычных стандартных экшенов
    builder
      .addCase(fetchReviews.pending, (state, action) => {
        state.isReviewsLoaded = false;
      })
      .addCase(fetchReviews.fulfilled, (state, action) => {
        state.reviewsList = action.payload;
        state.isReviewsLoaded = true;
      })
      .addCase(sendReviewAction.pending, (state, action) => {
        state.isReviewSending = true;
      })
      .addCase(sendReviewAction.fulfilled, (state, action) => {
        state.reviewsList = action.payload;
        state.isReviewSending = false;
      });

  },
});

export const { loadReviews, changeReviewsLoadedStatus } = reviewsReducer.actions;
