import { memo, useState, type JSX } from 'react';

import './searchPanel.scss';
import type { SortOrder } from '../../types/table';
import ModatWidget from '../ModalWidget/ModalWidget';
import type { CountryData } from '../../types/data';
import { getAllYears } from '../../utils/getAllYears';
import { useFilters } from '../../hooks/useFilter';
type SearchPanelProps = {
  dataCountries: CountryData;
};
function SearchPanel({ dataCountries }: SearchPanelProps): JSX.Element {
  const context = useFilters();
  const yearsList = getAllYears(dataCountries);
  const [isWidgetOpen, setIsWidgetOpen] = useState(false);

  return (
    <div className="search-panel">
      <div className="search-wrapper">
        <input
          type="text"
          placeholder="Search country"
          onChange={(event) => context?.setCountry(event.target.value)}
        />
        <select onChange={(event) => context?.setYear(+event.target.value)}>
          {yearsList.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
      </div>
      <div className="sort-panel">
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
        <div className="settings-wrapper">
          <button onClick={() => setIsWidgetOpen(true)}>⚙</button>
        </div>
      </div>
      {isWidgetOpen && <ModatWidget onClose={() => setIsWidgetOpen(false)} />}
    </div>
  );
}

export default memo(SearchPanel);
