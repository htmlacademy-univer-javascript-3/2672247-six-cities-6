import { useState } from 'react';
import { SORT_OPTIONS, SortType } from '../../const';

type SortingOptionsProps = {
  activeSort: SortType;
  onSortChange: (sortType: SortType) => void;
};

function SortingOptions({ activeSort, onSortChange }: SortingOptionsProps): JSX.Element {
  const [isOpen, setIsOpen] = useState(false);

  const handleSortingTypeClick = () => {
    setIsOpen((prevState) => !prevState);
  };

  const handleOptionClick = (option: SortType) => {
    onSortChange(option);
    setIsOpen(false);
  };

  return (
    <form className="places__sorting" action="#" method="get">
      <span className="places__sorting-caption">Sort by</span>
      <span className="places__sorting-type" tabIndex={0} onClick={handleSortingTypeClick}>
        {activeSort}
        <svg className="places__sorting-arrow" width="7" height="4">
          <use xlinkHref="#icon-arrow-select"></use>
        </svg>
      </span>
      <ul
        className={`places__options places__options--custom${isOpen ? ' places__options--opened' : ''}`}
      >
        {SORT_OPTIONS.map((option) => (
          <li
            key={option}
            className={`places__option${option === activeSort ? ' places__option--active' : ''}`}
            tabIndex={0}
            onClick={() => handleOptionClick(option)}
          >
            {option}
          </li>
        ))}
      </ul>
    </form>
  );
}

export default SortingOptions;
