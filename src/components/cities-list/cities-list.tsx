import { City } from '../../types/city';

type CitiesListProps = {
  cities: City[];
  activeCity: string;
  onCityClick: (city: string) => void;
};

function CitiesList({ cities, activeCity, onCityClick }: CitiesListProps): JSX.Element {
  return (
    <section className="locations container">
      <ul className="locations__list tabs__list">
        {cities.map((city) => (
          <li className="locations__item" key={city.name}>
            <a
              className={`locations__item-link tabs__item${city.name === activeCity ? ' tabs__item--active' : ''}`}
              href="/#todo"
              onClick={(event) => {
                event.preventDefault();
                onCityClick(city.name);
              }}
            >
              <span>{city.name}</span>
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default CitiesList;
