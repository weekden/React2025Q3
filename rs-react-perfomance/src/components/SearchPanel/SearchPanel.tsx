import { useContext, type JSX } from 'react';
import { FilterContext } from '../../context/filterContext';

import './searchPanel.scss';
import type { SortOrder } from '../../types/table';

function SearchPanel(): JSX.Element {
  const context = useContext(FilterContext);
  return (
    <div className="search-panel">
      <div className="search-wrapper">
        <input
          type="text"
          placeholder="Search country"
          onChange={(event) => context?.setCountry(event.target.value)}
        />
        <input
          type="number"
          placeholder="Search by year"
          onChange={(event) => context?.setYear(+event.target.value)}
        />
      </div>
      <div className="sort-wrapper">
        <div className="sort-wrapper">
          <label>Sort by:</label>

          <select
            onChange={(event) => {
              context?.setCountryOrder(event.target.value as SortOrder);
              context?.setPopulationOrder('');
            }}
          >
            <option value={''}>Country Order</option>
            <option value={'asc'}>Country A-Z</option>
            <option value={'desc'}>Country Z-A</option>
          </select>

          <select
            onChange={(event) => {
              context?.setPopulationOrder(event.target.value as SortOrder);
              context?.setCountryOrder('');
            }}
          >
            <option value={''}>Popul Order</option>
            <option value={'asc'}>Popul ↑</option>
            <option value={'desc'}>Popul ↓</option>
          </select>
        </div>
      </div>
    </div>
  );
}

export default SearchPanel;
