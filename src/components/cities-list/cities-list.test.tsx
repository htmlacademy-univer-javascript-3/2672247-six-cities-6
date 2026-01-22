import { render } from '@testing-library/react';
import CitiesList from './cities-list';
import { CITIES } from '../../const';

describe('CitiesList', () => {
  it('renders city links and highlights active city', () => {
    const { container } = render(
      <CitiesList cities={CITIES} activeCity={CITIES[0].name} onCityClick={() => {}} />
    );

    expect(container.querySelectorAll('.locations__item').length).toBe(CITIES.length);
    expect(container.querySelector('.tabs__item--active')?.textContent).toContain(CITIES[0].name);
  });
});
