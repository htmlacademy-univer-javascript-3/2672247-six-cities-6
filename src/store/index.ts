import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { createAPI } from '../api';
import { AuthorizationStatus } from '../const';
import { clearUser, setAuthorizationStatus } from './slices/user-slice';
import appReducer from './slices/app-slice';
import favoritesReducer from './slices/favorites-slice';
import offerReducer from './slices/offer-slice';
import offersReducer from './slices/offers-slice';
import userReducer from './slices/user-slice';

const rootReducer = combineReducers({
  app: appReducer,
  offers: offersReducer,
  offer: offerReducer,
  favorites: favoritesReducer,
  user: userReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

let onUnauthorized: (() => void) | null = null;

const api = createAPI(() => {
  onUnauthorized?.();
});

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: api,
      },
    }),
});

onUnauthorized = () => {
  store.dispatch(setAuthorizationStatus(AuthorizationStatus.NoAuth));
  store.dispatch(clearUser());
};

export type AppDispatch = typeof store.dispatch;

export default store;
