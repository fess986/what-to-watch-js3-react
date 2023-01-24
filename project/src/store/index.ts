import {configureStore} from '@reduxjs/toolkit';
import createAPI from '../services/api';
import {reducer} from './reduser';

export const api = createAPI();

// при создании через configureStore - не нужно указывать ссылку на redux-devtools, он будет активирован автоматически
export const store = configureStore({ // configureStore - из пакета @reduxjs/toolkit в оличии от обычного createStore имеет ряд бонусов. Во первых в него предустановлен redux-chunk, поэтому если нам не нужно его дополнительно конфигурировать, можно не импортируя эту библиотеку добавлять в middleware
  reducer, // сюда можно кидать сразу несколько редьюсеров, если нет вложенности больше одного уровня(иначе используем стандартную combineRedusers)
  // если не нужны доп параметры, можно добавлять middleware так:
  // middleware: [thunk, logger], // или так
  // middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger), // это равносильно предыдущей записи
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: api, // добавляем в thunk наш экземпляр api, теперь к нему всегда можно будет обращаться из экшена
      },
    }),
});
