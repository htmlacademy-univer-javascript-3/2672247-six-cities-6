import { render, screen } from '@testing-library/react';
import OfferNotLoggedPage from './offer-not-logged-page';

describe('OfferNotLoggedPage', () => {
  it('renders sign in link', () => {
    render(<OfferNotLoggedPage />);
    expect(screen.getByText('Sign in')).toBeInTheDocument();
  });
});
