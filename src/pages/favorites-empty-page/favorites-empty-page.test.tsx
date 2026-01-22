import { render, screen } from '@testing-library/react';
import FavoritesEmptyPage from './favorites-empty-page';

describe('FavoritesEmptyPage', () => {
  it('renders empty favorites message', () => {
    render(<FavoritesEmptyPage />);
    expect(screen.getByText('Nothing yet saved.')).toBeInTheDocument();
  });
});
