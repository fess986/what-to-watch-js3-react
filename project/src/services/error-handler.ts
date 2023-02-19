import { store } from '../store';
import { setError } from '../store/reduser/app/app-reducer';
import { clearErrorActionAPI} from '../store/api-actions';

export const errorHandler = (message : string) => {
  store.dispatch(setError(message));
  store.dispatch(clearErrorActionAPI());
};
