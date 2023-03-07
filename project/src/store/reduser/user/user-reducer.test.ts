import { userReducer } from './user-reducer';
import { setAutorizationStatus, initialUserState } from './user-reducer';
import { AuthStatus, StoreNames } from '../../../const/const';

describe('userReducer tests', () => {

  describe('setAutorizationStatus action tests', () => {

    test('type as string test', () => {
      expect(userReducer.reducer(initialUserState, {type: `${StoreNames.User}/setAutorizationStatus`, payload: AuthStatus.Auth})).toEqual({ autorizationStatus : AuthStatus.Auth });
    });

    test('action-object test', () => {
      expect(userReducer.reducer(initialUserState, setAutorizationStatus(AuthStatus.NoAuth))).toEqual({ autorizationStatus : AuthStatus.NoAuth });
    });

    test('testing with empty state, and wrong type. Should return initState state', () => {
      expect(userReducer.reducer(void 0, {type: 'Unknown Action'})).toEqual(initialUserState);
    });

    test('wrong type, should\'t change state object', () => {
      expect(userReducer.reducer({...initialUserState, autorizationStatus : AuthStatus.UnKnown}, {type: 'Unknown Action'})).toEqual({...initialUserState, autorizationStatus : AuthStatus.UnKnown});
    });

  });

});
