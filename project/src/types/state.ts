import {store} from '../store/index';

// тут мы прописываем тип State вручную. Точнее начинаем, далее на автомате
// export type State = {
//   genre: string,
//   filmList: string[],
// }

// тут тип State берется непосредственно из хранилища. ReturnType получает тип возвращаемой функцией store.getState объекта. Без этого получился бы корявый тип
export type State = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
