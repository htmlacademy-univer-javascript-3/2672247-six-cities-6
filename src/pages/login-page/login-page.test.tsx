import { fireEvent, render, screen, waitFor } from '@testing-library/react';
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
    store.dispatch = vi.fn() as unknown as typeof store.dispatch;
    const loginSpy = vi.spyOn(apiActions, 'login');

    render(
      <Provider store={store}>
        <MemoryRouter>
          <LoginPage />
        </MemoryRouter>
      </Provider>
    );

    await user.type(screen.getByPlaceholderText('Email'), 'test@example.com');
    await user.type(screen.getByPlaceholderText('Password'), 'secret1');
    const submitButton = screen.getByRole('button', { name: /sign in/i });
    fireEvent.submit(submitButton.closest('form') as HTMLFormElement);

    expect(loginSpy).toHaveBeenCalledWith({ email: 'test@example.com', password: 'secret1' });
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

  it('shows validation error for invalid password', async () => {
    const user = userEvent.setup();
    const store = makeStore({
      user: { authorizationStatus: AuthorizationStatus.NoAuth },
    });
    store.dispatch = vi.fn() as unknown as typeof store.dispatch;

    render(
      <Provider store={store}>
        <MemoryRouter>
          <LoginPage />
        </MemoryRouter>
      </Provider>
    );

    await user.type(screen.getByPlaceholderText('Email'), 'test@example.com');
    await user.type(screen.getByPlaceholderText('Password'), 'onlyletters');
    const submitButton = screen.getByRole('button', { name: /sign in/i });
    fireEvent.submit(submitButton.closest('form') as HTMLFormElement);

    expect(screen.getByText(/Password must contain at least one letter and one number/i)).toBeInTheDocument();
  });
});
