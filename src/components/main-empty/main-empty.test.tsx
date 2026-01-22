import { render, screen } from '@testing-library/react';
import MainEmpty from './main-empty';

describe('MainEmpty', () => {
  it('renders empty state message with city name', () => {
    render(<MainEmpty cityName="Paris" />);
    expect(screen.getByText('No places to stay available')).toBeInTheDocument();
    expect(screen.getByText(/Paris/)).toBeInTheDocument();
  });
});
