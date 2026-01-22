import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useSelector } from 'react-redux';
import FavoritesPage from '../../pages/favorites-page/favorites-page';
import LoginPage from '../../pages/login-page/login-page';
import MainPage from '../../pages/main-page/main-page';
import NotFoundPage from '../../pages/not-found-page/not-found-page';
import OfferPage from '../../pages/offer-page/offer-page';
import { reviews } from '../../mocks/reviews';
import { RootState } from '../../store';
import PrivateRoute from '../private-route/private-route';

function App(): JSX.Element {
  const offers = useSelector((state: RootState) => state.offers);
  const favoriteOffers = offers.filter((offer) => offer.isFavorite);
  const isAuthorized = false;

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />} />
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
