import { StoreNames } from '../../../const/const';
import {InitialUserType} from './user-reducer';

type State = {
  [StoreNames.User] : InitialUserType
}

// прописать тип стейта
export const getAuthStatus = (state : State) => state[StoreNames.User].autorizationStatus;
