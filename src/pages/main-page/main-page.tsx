import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import CitiesList from '../../components/cities-list/cities-list';
import Map from '../../components/map/map';
import OffersList from '../../components/offers-list/offers-list';
import SortingOptions from '../../components/sorting-options/sorting-options';
import { CITIES, DEFAULT_CITY, SortType } from '../../const';
import { RootState } from '../../store';
import { changeCity } from '../../store/action';
import { Offer } from '../../types/offer';

const sortOffers = (offers: Offer[], sortType: SortType): Offer[] => {
  switch (sortType) {
    case 'Price: low to high':
      return [...offers].sort((first, second) => first.price - second.price);
    case 'Price: high to low':
      return [...offers].sort((first, second) => second.price - first.price);
    case 'Top rated first':
      return [...offers].sort((first, second) => second.rating - first.rating);
    default:
      return offers;
  }
};

function MainPage(): JSX.Element {
  const [activeOfferId, setActiveOfferId] = useState<string | null>(null);
  const [activeSort, setActiveSort] = useState<SortType>('Popular');
  const dispatch = useDispatch();
  const city = useSelector((state: RootState) => state.city);
  const offers = useSelector((state: RootState) => state.offers);
  const selectedCity = CITIES.find((item) => item.name === city) ?? DEFAULT_CITY;
  const offersInCity = offers.filter((offer) => offer.city === selectedCity.name);
  const sortedOffers = sortOffers(offersInCity, activeSort);

  useEffect(() => {
    setActiveOfferId(null);
  }, [city]);

  const handleCityClick = (cityName: string) => {
    dispatch(changeCity(cityName));
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
                <li className="header__nav-item user">
                  <Link className="header__nav-link header__nav-link--profile" to="/login">
                    <div className="header__avatar-wrapper user__avatar-wrapper"></div>
                    <span className="header__user-name user__name">Oliver.conner@gmail.com</span>
                    <span className="header__favorite-count">3</span>
                  </Link>
                </li>
                <li className="header__nav-item">
                  <Link className="header__nav-link" to="/login">
                    <span className="header__signout">Sign out</span>
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </header>

      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          <CitiesList cities={CITIES} activeCity={city} onCityClick={handleCityClick} />
        </div>
        <div className="cities">
          <div className="cities__places-container container">
            <section className="cities__places places" data-active-offer-id={activeOfferId ?? ''}>
              <h2 className="visually-hidden">Places</h2>
              <b className="places__found">
                {offersInCity.length} places to stay in {selectedCity.name}
              </b>
              <SortingOptions activeSort={activeSort} onSortChange={setActiveSort} />
              <OffersList offers={sortedOffers} onActiveOfferChange={setActiveOfferId} />
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
        </div>
      </main>
    </div>
  );
}

export default MainPage;
