import { useContext, type JSX } from 'react';
import { FilterContext } from '../../context/filterContext';

function SearchPanel(): JSX.Element {
  const context = useContext(FilterContext);
  return (
    <div className="search-panel">
      <label htmlFor="">
        Search by Country
        <input
          type="text"
          onChange={(event) => context?.setCountry(event.target.value)}
        />
      </label>
      <label htmlFor="">
        Search by Year
        <input
          type="number"
          onChange={(event) => context?.setYear(+event.target.value)}
        />
      </label>
    </div>
  );
}

export default SearchPanel;
