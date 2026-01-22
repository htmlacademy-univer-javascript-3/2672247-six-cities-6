import { renderHook } from '@testing-library/react';
import type { ReactNode } from 'react';
import { Provider } from 'react-redux';
import { AuthorizationStatus } from '../const';
import { makeStore } from '../test/test-utils';
import { useAppDispatch, useAppSelector } from './store';

const buildWrapper = (store: ReturnType<typeof makeStore>) =>
  function Wrapper({ children }: { children: ReactNode }) {
    return <Provider store={store}>{children}</Provider>;
  };

describe('store hooks', () => {
  it('useAppSelector reads state', () => {
    const store = makeStore({
      user: { authorizationStatus: AuthorizationStatus.Auth },
    });
    const { result } = renderHook(
      () => useAppSelector((state) => state.user.authorizationStatus),
      { wrapper: buildWrapper(store) }
    );

    expect(result.current).toBe(AuthorizationStatus.Auth);
  });

  it('useAppDispatch returns store dispatch', () => {
    const store = makeStore();
    const { result } = renderHook(() => useAppDispatch(), { wrapper: buildWrapper(store) });

    expect(result.current).toBe(store.dispatch);
  });
});
