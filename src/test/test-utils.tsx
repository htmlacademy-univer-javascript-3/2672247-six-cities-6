import { configureStore } from '@reduxjs/toolkit';
import type { ReactElement } from 'react';
import { Provider } from 'react-redux';
import { render } from '@testing-library/react';
import { combineReducers } from '@reduxjs/toolkit';
import appReducer from '../store/slices/app-slice';
import offersReducer from '../store/slices/offers-slice';
import offerReducer from '../store/slices/offer-slice';
import favoritesReducer from '../store/slices/favorites-slice';
import userReducer from '../store/slices/user-slice';
import { RootState } from '../store';

type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K];
};

const rootReducer = combineReducers({
  app: appReducer,
  offers: offersReducer,
  offer: offerReducer,
  favorites: favoritesReducer,
  user: userReducer,
});

export const makeStore = (preloadedState?: DeepPartial<RootState>) =>
  configureStore({
    reducer: rootReducer,
    preloadedState: preloadedState as RootState,
  });

export const renderWithProviders = (
  ui: ReactElement,
  preloadedState?: DeepPartial<RootState>
) => {
  const store = makeStore(preloadedState);
  return render(<Provider store={store}>{ui}</Provider>);
};
