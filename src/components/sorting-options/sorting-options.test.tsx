import { render } from '@testing-library/react';
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
});
