import { SORT_OPTIONS, SortType } from '../../const';

type SortingOptionsProps = {
  activeSort: SortType;
  onSortChange: (sortType: SortType) => void;
};

function SortingOptions({ activeSort, onSortChange }: SortingOptionsProps): JSX.Element {
  return (
    <form className="places__sorting" action="#" method="get">
      <span className="places__sorting-caption">Sort by</span>
      <span className="places__sorting-type" tabIndex={0}>
        {activeSort}
        <svg className="places__sorting-arrow" width="7" height="4">
          <use xlinkHref="#icon-arrow-select"></use>
        </svg>
      </span>
      <ul className="places__options places__options--custom places__options--opened">
        {SORT_OPTIONS.map((option) => (
          <li
            key={option}
            className={`places__option${option === activeSort ? ' places__option--active' : ''}`}
            tabIndex={0}
            onClick={() => onSortChange(option)}
          >
            {option}
          </li>
        ))}
      </ul>
    </form>
  );
}

export default SortingOptions;
