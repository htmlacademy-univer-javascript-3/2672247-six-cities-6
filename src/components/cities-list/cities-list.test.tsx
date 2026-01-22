import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
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

  it('calls onCityClick when city selected', async () => {
    const user = userEvent.setup();
    const onCityClick = vi.fn();

    render(
      <CitiesList cities={CITIES} activeCity={CITIES[0].name} onCityClick={onCityClick} />
    );

    await user.click(screen.getByText(CITIES[1].name));
    expect(onCityClick).toHaveBeenCalledWith(CITIES[1].name);
  });
});
