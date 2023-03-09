import {loadReviews, changeReviewsLoadedStatus } from './reviews-reducer';
import { StoreNames } from '../../../const/const';
import {Reviews} from '../../../mocks/reviews-mock';
import {fetchReviews} from '../../api-actions';
import { InitialReviewsState } from './reviews-reducer';
import { reviewsReducer } from './reviews-reducer';

describe('Testing of reviews reducer', () => {

  const reviews = Reviews;

  describe('General reducer behavior tests', () => {

    it('testing with empty state, should create anyway', () => {
      expect(reviewsReducer.reducer(void 0 , loadReviews([1,2,3]))).toEqual({ ...InitialReviewsState, reviewsList : [1,2,3] });
    });

    it('testing with empty state, and wrong type. Should return initState state', () => {
      expect(reviewsReducer.reducer(void 0 , {type: 'wrong type'})).toEqual(InitialReviewsState);
    });

    it('wrong type, should\'t change state object', () => {
      expect(reviewsReducer.reducer({...InitialReviewsState, isReviewsLoaded : true} , {type: 'wrong type'})).toEqual({...InitialReviewsState, isReviewsLoaded : true});
    });

  });

  describe('standard reducers tests', () => {

    describe('testing of loadReviews action', () => {

      it('testing with action-object', () => {
        expect(reviewsReducer.reducer(InitialReviewsState , {type: `${StoreNames.Reviews}/loadReviews`, payload:[1,2,3]})).toEqual({ ...InitialReviewsState, reviewsList : [1,2,3] });
      });

      it('should change only reviewsList field', () => {
        expect(reviewsReducer.reducer({...InitialReviewsState, isReviewsLoaded : true} , {type: `${StoreNames.Reviews}/loadReviews`, payload:[1,2,3,4]})).toEqual({ ...InitialReviewsState, reviewsList : [1,2,3,4], isReviewsLoaded : true });
      });

      it('testing with object', () => {
        expect(reviewsReducer.reducer(InitialReviewsState , loadReviews([1,2,3]))).toEqual({ ...InitialReviewsState, reviewsList : [1,2,3] });
      });
    });

    describe('testing of changeReviewsLoadedStatus action', () => {

      it('testing with action-object', () => {
        expect(reviewsReducer.reducer(InitialReviewsState , {type: `${StoreNames.Reviews}/changeReviewsLoadedStatus`, payload:true})).toEqual({ ...InitialReviewsState, isReviewsLoaded : true });
      });

      it('testing with object', () => {
        expect(reviewsReducer.reducer(InitialReviewsState , changeReviewsLoadedStatus(true))).toEqual({ ...InitialReviewsState, isReviewsLoaded : true });
      });

      it('should change only isReviewsLoaded field', () => {
        expect(reviewsReducer.reducer({...InitialReviewsState, reviewsList : reviews} , changeReviewsLoadedStatus(true))).toEqual({ ...InitialReviewsState, reviewsList : reviews, isReviewsLoaded : true });
      });


    });
  });

  describe('extra reducers tests', () => {

    describe('fetchReviews.pending action tests', () => {

      it('normal action work', () => {
        expect(reviewsReducer.reducer({...InitialReviewsState, isReviewsLoaded : true}, {type : fetchReviews.pending.type})).toEqual({...InitialReviewsState, isReviewsLoaded : false});
      });

      it('string action', () => {
        expect(reviewsReducer.reducer({...InitialReviewsState, isReviewsLoaded : true}, {type: 'reviews/fetchReviews/pending'})).toEqual({...InitialReviewsState, isReviewsLoaded : false});
      });

      it('should change only isReviewsLoaded field', () => {
        expect(reviewsReducer.reducer({...InitialReviewsState, isReviewsLoaded : true, reviewsList: reviews}, {type : fetchReviews.pending.type})).toEqual({...InitialReviewsState, isReviewsLoaded : false, reviewsList: reviews});
      });

    });

    describe('fetchReviews.fullfiled action tests', () => {

      it('normal action work: should isReviewsLoaded true, and save payload in reviewsList field', () => {
        expect(reviewsReducer.reducer({...InitialReviewsState}, {type : fetchReviews.fulfilled.type, payload: reviews})).toEqual({...InitialReviewsState, reviewsList: reviews, isReviewsLoaded : true});
      });

      it('string action', () => {
        expect(reviewsReducer.reducer({...InitialReviewsState}, {type : 'reviews/fetchReviews/fulfilled', payload: reviews})).toEqual({...InitialReviewsState, reviewsList: reviews, isReviewsLoaded : true});
      });

      // it('string action', () => {
      //   expect(reviewsReducer.reducer({...InitialReviewsState, isReviewsLoaded : true}, {type: 'reviews/fetchReviews/pending'})).toEqual({...InitialReviewsState, isReviewsLoaded : false});
      // });

      // it('should change only isReviewsLoaded field', () => {
      //   expect(reviewsReducer.reducer({...InitialReviewsState, isReviewsLoaded : true, reviewsList: reviews}, {type : fetchReviews.pending.type})).toEqual({...InitialReviewsState, isReviewsLoaded : false, reviewsList: reviews});
      // });

    });


  });

});

//   // проверка экшена fetchFilmsAction.fulfilled
//   describe('testing of fetchFilmsAction.fulfilled action', () => {

//     // передаем в payload, и должны получить пустой массив
//     it('testing with action-object', () => {
//       expect(filmsReducer.reducer(InitialFilmsState , {type: 'films/fetchFilms/fulfilled', payload: null})).toEqual(InitialFilmsState);
//     });

//     // передаем тип экшена через его статус fetchFilmsAction.fulfilled, так как это промис
//     it('testing with object', () => {
//       expect(filmsReducer.reducer(InitialFilmsState , {type: fetchFilmsAction.fulfilled.type, payload: null})).toEqual(InitialFilmsState);
//     });

//     it('should change only filmList field', () => {
//       expect(filmsReducer.reducer({...InitialFilmsState, activeFIlm: Films[0]} , {type: fetchFilmsAction.fulfilled.type, payload: null})).toEqual({ filmList: [], activeFIlm: Films[0] });
//     });

//   });

//   // проверка экшена fetchActiveFilmAction.fulfilled
//   describe('testing of fetchActiveFilmAction.fulfilled action', () => {

//     // передаем в payload, и должны получить пустой массив
//     it('testing with action-object', () => {
//       expect(filmsReducer.reducer(InitialFilmsState , {type: 'films/fetchActiveFilm/fulfilled', payload: Films[0]})).toEqual({ filmList: [], activeFIlm: Films[0] });
//     });

//     it('testing with object', () => {
//       expect(filmsReducer.reducer(InitialFilmsState , {type: fetchActiveFilmAction.fulfilled.type, payload: Films[0]})).toEqual({ filmList: [], activeFIlm: Films[0] });
//     });

//     it('should change only filmList field', () => {
//       expect(filmsReducer.reducer({...InitialFilmsState, filmList: Films} , {type: fetchActiveFilmAction.fulfilled.type, payload: Films[0]})).toEqual({ filmList: Films, activeFIlm: Films[0] });
//     });

//   });
// });
