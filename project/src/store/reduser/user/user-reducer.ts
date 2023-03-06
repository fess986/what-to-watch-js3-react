import {createSlice} from '@reduxjs/toolkit';

import {StoreNames, AuthStatus} from '../../../const/const';

export type InitialUserType = {
  autorizationStatus: AuthStatus,
}

export const initialUserState : InitialUserType = {
  autorizationStatus : AuthStatus.UnKnown,
};

export const userReducer = createSlice({
  name: StoreNames.User,
  initialState: initialUserState,
  reducers: {
    requireAutorization : (state, action) => {
      state.autorizationStatus = action.payload;
    }
  },
});

export const {requireAutorization} = userReducer.actions;
