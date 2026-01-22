import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import OfferPage from './offer-page';
import { makeStore } from '../../test/test-utils';
import { makeOffer } from '../../test/fixtures';
import { AuthorizationStatus } from '../../const';

vi.mock('../../components/map/map', () => ({
  default: () => <div>Map</div>,
}));

vi.mock('../../components/offers-list/offers-list', () => ({
  default: () => <div>OffersList</div>,
}));

vi.mock('../../components/reviews-list/reviews-list', () => ({
  default: () => <div>ReviewsList</div>,
}));

vi.mock('../../components/review-form/review-form', () => ({
  default: () => <div>ReviewForm</div>,
}));

describe('OfferPage', () => {
  it('renders not found page when offer is missing', () => {
    const store = makeStore({
      offer: {
        offer: null,
        nearbyOffers: [],
        comments: [],
        isOfferLoading: false,
        isNearbyLoading: false,
        isCommentsLoading: false,
        isCommentSubmitting: false,
        isOfferNotFound: true,
      },
    });
    store.dispatch = vi.fn();

    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/offer/1']}>
          <Routes>
            <Route path="/offer/:id" element={<OfferPage />} />
          </Routes>
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText('404 Not Found')).toBeInTheDocument();
  });

  it('renders loading state while fetching offer', () => {
    const store = makeStore({
      offer: {
        offer: null,
        nearbyOffers: [],
        comments: [],
        isOfferLoading: true,
        isNearbyLoading: false,
        isCommentsLoading: false,
        isCommentSubmitting: false,
        isOfferNotFound: false,
      },
    });
    store.dispatch = vi.fn();

    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/offer/1']}>
          <Routes>
            <Route path="/offer/:id" element={<OfferPage />} />
          </Routes>
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('renders offer details and review form for authorized user', () => {
    const offer = makeOffer({ id: '1', title: 'Amazing place' });
    const store = makeStore({
      offer: {
        offer,
        nearbyOffers: [],
        comments: [],
        isOfferLoading: false,
        isNearbyLoading: false,
        isCommentsLoading: false,
        isCommentSubmitting: false,
        isOfferNotFound: false,
      },
      user: { authorizationStatus: AuthorizationStatus.Auth },
    });
    store.dispatch = vi.fn();

    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/offer/1']}>
          <Routes>
            <Route path="/offer/:id" element={<OfferPage />} />
          </Routes>
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText('Amazing place')).toBeInTheDocument();
    expect(screen.getByText('ReviewForm')).toBeInTheDocument();
  });
});
