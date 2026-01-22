import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ReviewForm from './review-form';

describe('ReviewForm', () => {
  it('submits comment and rating', async () => {
    const user = userEvent.setup();
    const onSubmit = vi.fn();

    render(<ReviewForm onSubmit={onSubmit} />);

    const submitButton = screen.getByRole('button', { name: /submit/i });
    expect(submitButton).toBeDisabled();

    await user.click(screen.getByTitle('perfect'));
    await user.type(
      screen.getByPlaceholderText(/Tell how was your stay/i),
      'a'.repeat(60)
    );

    expect(submitButton).toBeEnabled();

    await user.click(submitButton);

    expect(onSubmit).toHaveBeenCalledWith('a'.repeat(60), 5);
  });
});
