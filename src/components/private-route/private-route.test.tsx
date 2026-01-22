import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import PrivateRoute from './private-route';
import { makeStore } from '../../test/test-utils';
import { AuthorizationStatus } from '../../const';

describe('PrivateRoute', () => {
  it('renders spinner while authorization status is unknown', () => {
    const store = makeStore({
      user: { authorizationStatus: AuthorizationStatus.Unknown },
    });

    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/']}>
          <Routes>
            <Route
              path="/"
              element={(
                <PrivateRoute>
                  <div>Private</div>
                </PrivateRoute>
              )}
            />
          </Routes>
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('renders children when authorized', () => {
    const store = makeStore({
      user: { authorizationStatus: AuthorizationStatus.Auth },
    });

    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/']}>
          <Routes>
            <Route
              path="/"
              element={(
                <PrivateRoute>
                  <div>Private</div>
                </PrivateRoute>
              )}
            />
          </Routes>
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText('Private')).toBeInTheDocument();
  });

  it('redirects to login when not authorized', async () => {
    const store = makeStore({
      user: { authorizationStatus: AuthorizationStatus.NoAuth },
    });

    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/']}>
          <Routes>
            <Route
              path="/"
              element={(
                <PrivateRoute>
                  <div>Private</div>
                </PrivateRoute>
              )}
            />
            <Route path="/login" element={<div>Login</div>} />
          </Routes>
        </MemoryRouter>
      </Provider>
    );

    await waitFor(() => {
      expect(screen.getByText('Login')).toBeInTheDocument();
    });
  });
});
