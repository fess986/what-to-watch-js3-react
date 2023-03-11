import { createSlice } from '@reduxjs/toolkit';

import { StoreNames } from '../../../const/const';
import {Review} from '../../../types/films';
import { fetchReviews, sendReviewAction } from '../../api-actions';
import {toast} from 'react-toastify';

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
      })
      .addCase(sendReviewAction.rejected, (state) => {
        // sendReviewAction.rejected - мы можем прописывать сразу в нескольких слайсах, например этот же тип описан в слайсе app
        toast.warn('ошибка при отправке отзыва', {autoClose : 2000, draggable : true});

        //console.log('app', action.error.message); // если хотим ошибку, которую присылает нам сервер

      });
    // .addCase(changeGenre.type, (state, action) => { // мы можем обрабатывать экшены другого слайса. При этом у насе есть доступ к его payload, стейт тут от данного слайса
    //   console.log('мы видим этот экшен');
    //   state.isReviewSending = true;
    //   console.log(state);
    //   console.log(action); // type: "APP/changeGenre" , payload: "Comedy"
    // })

  },
});

export const { loadReviews, changeReviewsLoadedStatus } = reviewsReducer.actions;
