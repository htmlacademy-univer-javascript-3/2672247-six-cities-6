import userReducer, { setAuthorizationStatus } from './user-slice';
import { AuthorizationStatus } from '../../const';

describe('userSlice', () => {
  it('returns initial state', () => {
    const state = userReducer(undefined, { type: 'UNKNOWN' });
    expect(state).toEqual({
      authorizationStatus: AuthorizationStatus.Unknown,
      user: null,
    });
  });

  it('updates authorizationStatus', () => {
    const state = userReducer(undefined, setAuthorizationStatus(AuthorizationStatus.Auth));
    expect(state.authorizationStatus).toBe(AuthorizationStatus.Auth);
  });
});
