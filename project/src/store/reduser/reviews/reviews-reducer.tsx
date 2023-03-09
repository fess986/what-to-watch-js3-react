import { createSlice } from '@reduxjs/toolkit';

import { StoreNames } from '../../../const/const';
import {Review} from '../../../types/films';

export type InitialReviewsType = {
  reviewsList: Review[],
  isReviewsLoaded: boolean,
}

export const InitialReviewsState: InitialReviewsType = {
  reviewsList: [],
  isReviewsLoaded: false,
};

export const reviewsReducer = createSlice({
  name: StoreNames.Reviews,
  initialState: InitialReviewsState,
  reducers: { // тут мы добавляем собственные редьюсеры слайса, те, которые мы потом можем экспортировать и использовать в других местах приложения, например диспатчить их или вызывать в других редьюсерах
    loadReviews : (state, action) => { // данный экшен по факту уже не нужен, так как мы загружаем данные, перехватывая api-action под названием fetchFilmsAction и обращаемся к его статусу fulfilled
      state.reviewsList = action.payload;
    },
    changeReviewsLoadedStatus : (state, action) => {
      state.isReviewsLoaded = action.payload;
    }
  },
  // extraReducers(builder) { // сюда мы можем добавлять сторонние действия, например из других слайсов, из api-actions и обычных стандартных экшенов
  //   builder
  //     .addCase(fetchFilmsAction.fulfilled, (state, action) => { // тут может быть и самый обычный экшен, но мы используем api-action под названием fetchFilmsAction и обращаемся к его статусу fulfilled
  //       state.filmList = adaptAllFilmAPItoProject(action.payload);
  //     })
  //     .addCase(fetchActiveFilmAction.fulfilled, (state, action) => { // тут может быть и самый обычный экшен, но мы используем api-action под названием fetchActiveFilmAction и обращаемся к его статусу fulfilled
  //       // console.log(action.payload);
  //       state.activeFIlm = adaptFilmAPItoProject(action.payload);
  //     });
  // },
});

export const { loadReviews, changeReviewsLoadedStatus } = reviewsReducer.actions;
