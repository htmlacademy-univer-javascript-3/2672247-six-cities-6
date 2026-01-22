import { configureStore } from '@reduxjs/toolkit';
import { createAPI } from '../api';
import { AuthorizationStatus } from '../const';
import { setAuthorizationStatus } from './action';
import reducer from './reducer';

let store: ReturnType<typeof configureStore>;

const api = createAPI(() => {
  store.dispatch(setAuthorizationStatus(AuthorizationStatus.NoAuth));
});

store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: api,
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
