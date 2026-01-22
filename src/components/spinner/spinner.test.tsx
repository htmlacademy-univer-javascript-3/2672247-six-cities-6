import { render, screen } from '@testing-library/react';
import Spinner from './spinner';

describe('Spinner', () => {
  it('renders loading text', () => {
    render(<Spinner />);
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });
});
