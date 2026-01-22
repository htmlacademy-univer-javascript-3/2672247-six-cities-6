import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import LoginPage from './login-page';
import { makeStore } from '../../test/test-utils';
import { AuthorizationStatus } from '../../const';
import * as apiActions from '../../store/api-actions';

describe('LoginPage', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('dispatches login on submit', async () => {
    const user = userEvent.setup();
    const store = makeStore({
      user: { authorizationStatus: AuthorizationStatus.NoAuth },
    });
    store.dispatch = vi.fn();
    const loginSpy = vi.spyOn(apiActions, 'login');

    render(
      <Provider store={store}>
        <MemoryRouter>
          <LoginPage />
        </MemoryRouter>
      </Provider>
    );

    await user.type(screen.getByPlaceholderText('Email'), 'test@example.com');
    await user.type(screen.getByPlaceholderText('Password'), 'secret');
    await user.click(screen.getByRole('button', { name: /sign in/i }));

    expect(loginSpy).toHaveBeenCalledWith({ email: 'test@example.com', password: 'secret' });
  });

  it('redirects to main page when authorized', async () => {
    const store = makeStore({
      user: { authorizationStatus: AuthorizationStatus.Auth },
    });

    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/login']}>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/" element={<div>Main page</div>} />
          </Routes>
        </MemoryRouter>
      </Provider>
    );

    await waitFor(() => {
      expect(screen.getByText('Main page')).toBeInTheDocument();
    });
  });
});
