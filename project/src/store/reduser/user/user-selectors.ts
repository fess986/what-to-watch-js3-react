import { StoreNames } from '../../../const/const';

// прописать тип стейта
export const getAuthStatus = (state) => state[StoreNames.User].autorizationStatus;
