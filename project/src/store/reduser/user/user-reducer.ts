import {createSlice} from '@reduxjs/toolkit';

import {StoreNames, AuthStatus} from '../../../const/const';

export type InitialUserType = {
  autorizationStatus: AuthStatus,
}

const initialUserState : InitialUserType = {
  autorizationStatus : AuthStatus.NoAuth,
};

export const userReduser = createSlice({
  name: StoreNames.User,
  initialState: initialUserState,
  reducers: {
    requireAutorization : (state, action) => {
      state.autorizationStatus = action.payload;
    }
  },
});

export const {requireAutorization} = userReduser.actions;
