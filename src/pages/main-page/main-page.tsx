import { useCallback, useEffect, useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import CitiesList from '../../components/cities-list/cities-list';
import MainEmpty from '../../components/main-empty/main-empty';
import Map from '../../components/map/map';
import OffersList from '../../components/offers-list/offers-list';
import SortingOptions from '../../components/sorting-options/sorting-options';
import Spinner from '../../components/spinner/spinner';
import { AuthorizationStatus, CITIES, DEFAULT_CITY, SortType } from '../../const';
import { useAppDispatch, useAppSelector } from '../../hooks/store';
import { changeCity } from '../../store/slices/app-slice';
import { logout, toggleFavorite } from '../../store/api-actions';
import {
  selectAuthorizationStatus,
  selectCity,
  selectFavoritesCount,
  selectOffersByCity,
  selectOffersError,
  selectOffersLoading,
  selectSortedOffers,
  selectUser,
} from '../../store/selectors';

function MainPage(): JSX.Element {
  const [activeOfferId, setActiveOfferId] = useState<string | null>(null);
  const [activeSort, setActiveSort] = useState<SortType>('Popular');
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const city = useAppSelector(selectCity);
  const isOffersLoading = useAppSelector(selectOffersLoading);
  const hasOffersError = useAppSelector(selectOffersError);
  const authorizationStatus = useAppSelector(selectAuthorizationStatus);
  const favoritesCount = useAppSelector(selectFavoritesCount);
  const user = useAppSelector(selectUser);
  const offersInCity = useAppSelector(selectOffersByCity);
  const sortedOffers = useAppSelector((state) => selectSortedOffers(state, activeSort));

  const selectedCity = useMemo(
    () => CITIES.find((item) => item.name === city) ?? DEFAULT_CITY,
    [city]
  );

  const isEmpty = !isOffersLoading && offersInCity.length === 0 && !hasOffersError;

  useEffect(() => {
    setActiveOfferId(null);
  }, [city]);

  const handleCityClick = useCallback(
    (cityName: string) => {
      dispatch(changeCity(cityName));
    },
    [dispatch]
  );

  const handleSortChange = useCallback((sortType: SortType) => {
    setActiveSort(sortType);
  }, []);

  const handleFavoriteToggle = useCallback(
    (offerId: string, isFavorite: boolean) => {
      if (authorizationStatus !== AuthorizationStatus.Auth) {
        navigate('/login');
        return;
      }

      dispatch(toggleFavorite({ offerId, status: isFavorite ? 0 : 1 }));
    },
    [authorizationStatus, dispatch, navigate]
  );

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <div className="page page--gray page--main">
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <Link className="header__logo-link header__logo-link--active" to="/">
                <img
                  className="header__logo"
                  src="img/logo.svg"
                  alt="6 cities logo"
                  width="81"
                  height="41"
                />
              </Link>
            </div>
            <nav className="header__nav">
              <ul className="header__nav-list">
                {authorizationStatus === AuthorizationStatus.Auth && user ? (
                  <>
                    <li className="header__nav-item user">
                      <Link className="header__nav-link header__nav-link--profile" to="/favorites">
                        <div className="header__avatar-wrapper user__avatar-wrapper"></div>
                        <span className="header__user-name user__name">{user.email}</span>
                        <span className="header__favorite-count">{favoritesCount}</span>
                      </Link>
                    </li>
                    <li className="header__nav-item">
                      <button className="header__nav-link" type="button" onClick={handleLogout}>
                        <span className="header__signout">Log out</span>
                      </button>
                    </li>
                  </>
                ) : (
                  <li className="header__nav-item user">
                    <Link className="header__nav-link header__nav-link--profile" to="/login">
                      <div className="header__avatar-wrapper user__avatar-wrapper"></div>
                      <span className="header__login">Sign in</span>
                    </Link>
                  </li>
                )}
              </ul>
            </nav>
          </div>
        </div>
      </header>

      <main className={`page__main page__main--index${isEmpty ? ' page__main--index-empty' : ''}`}>
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          <CitiesList cities={CITIES} activeCity={city} onCityClick={handleCityClick} />
        </div>
        <div className="cities">
          {isEmpty ? (
            <MainEmpty cityName={selectedCity.name} />
          ) : (
            <div className="cities__places-container container">
              <section className="cities__places places" data-active-offer-id={activeOfferId ?? ''}>
                <h2 className="visually-hidden">Places</h2>
                {hasOffersError ? (
                  <div className="places__sorting">
                    <b>Unable to load offers. Please try again later.</b>
                  </div>
                ) : (
                  <b className="places__found">
                    {offersInCity.length} places to stay in {selectedCity.name}
                  </b>
                )}
                <SortingOptions activeSort={activeSort} onSortChange={handleSortChange} />
                {isOffersLoading ? (
                  <Spinner />
                ) : (
                  <OffersList
                    offers={sortedOffers}
                    onActiveOfferChange={setActiveOfferId}
                    onFavoriteToggle={handleFavoriteToggle}
                  />
                )}
              </section>
              <div className="cities__right-section">
                <Map
                  city={selectedCity}
                  offers={sortedOffers}
                  activeOfferId={activeOfferId}
                  className="cities__map map"
                />
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default MainPage;
