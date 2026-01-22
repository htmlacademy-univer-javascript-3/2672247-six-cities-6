import { BrowserRouter, Route, Routes } from 'react-router-dom';
import FavoritesPage from '../../pages/favorites-page/favorites-page';
import LoginPage from '../../pages/login-page/login-page';
import MainPage from '../../pages/main-page/main-page';
import NotFoundPage from '../../pages/not-found-page/not-found-page';
import OfferPage from '../../pages/offer-page/offer-page';
import { Offer } from '../../types/offer';
import { Review } from '../../types/review';
import PrivateRoute from '../private-route/private-route';

type AppProps = {
  offers: Offer[];
  reviews: Review[];
};

function App({ offers, reviews }: AppProps): JSX.Element {
  const favoriteOffers = offers.filter((offer) => offer.isFavorite);
  const isAuthorized = false;

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage offers={offers} />} />
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/favorites"
          element={(
            <PrivateRoute isAuthorized={isAuthorized}>
              <FavoritesPage offers={favoriteOffers} />
            </PrivateRoute>
          )}
        />
        <Route path="/offer/:id" element={<OfferPage offers={offers} reviews={reviews} />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
