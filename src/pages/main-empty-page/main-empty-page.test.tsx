import { render, screen } from '@testing-library/react';
import MainEmptyPage from './main-empty-page';

describe('MainEmptyPage', () => {
  it('renders empty main page message', () => {
    render(<MainEmptyPage />);
    expect(screen.getByText('No places to stay available')).toBeInTheDocument();
  });
});
