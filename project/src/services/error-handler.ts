import { store } from '../store';
import { setError } from '../store/action';
import { clearErrorActionAPI} from '../store/api-actions';

export const errorHandler = (message : string) => {
  store.dispatch(setError(message));
  store.dispatch(clearErrorActionAPI());
};
