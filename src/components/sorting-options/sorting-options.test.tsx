import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SortingOptions from './sorting-options';
import { SORT_OPTIONS } from '../../const';

describe('SortingOptions', () => {
  it('renders sorting options with active value', () => {
    const { container } = render(
      <SortingOptions activeSort="Popular" onSortChange={() => {}} />
    );

    expect(container.querySelector('.places__sorting-type')?.textContent).toContain('Popular');
    expect(container.querySelectorAll('.places__option').length).toBe(SORT_OPTIONS.length);
    expect(container.querySelector('.places__option--active')?.textContent).toContain('Popular');
  });

  it('opens list and notifies onSortChange', async () => {
    const user = userEvent.setup();
    const onSortChange = vi.fn();

    const { container } = render(
      <SortingOptions activeSort="Popular" onSortChange={onSortChange} />
    );

    const sortingType = container.querySelector('.places__sorting-type') as HTMLElement;
    await user.click(sortingType);
    expect(container.querySelector('.places__options--opened')).toBeTruthy();

    await user.click(screen.getByText('Price: low to high'));
    expect(onSortChange).toHaveBeenCalledWith('Price: low to high');
  });
});
