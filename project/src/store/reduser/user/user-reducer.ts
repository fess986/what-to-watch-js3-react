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
    setAutorizationStatus : (state, action) => {
      state.autorizationStatus = action.payload;
    }
  },
});

export const {setAutorizationStatus} = userReducer.actions;
