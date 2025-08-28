import { use, useContext, useEffect, useState, type JSX } from 'react';
import { dataPromise } from '../../api/getData';
import TableRow from './TableRow';
import { FilterContext } from '../../context/filterContext';

import './tableStyle.scss';
import type { CountryOrder } from '../../types/table';

export default function ResultTable(): JSX.Element {
  const dataCountries = use(dataPromise);
  const [countries, setCountries] = useState(Object.entries(dataCountries));
  const [countryOrder, setCoutryOrder] = useState<CountryOrder>(null);
  const context = useContext(FilterContext);
  const year = context?.year || 2023;
  const country = context?.country;

  const toggleSortCountries = (): void => {
    setCoutryOrder((order) => (order === 'asc' || null ? 'desc' : 'asc'));
  };

  useEffect(() => {
    let filteredData = Object.entries(dataCountries);

    if (year) {
      filteredData = filteredData.filter(([, countryInfo]) =>
        countryInfo.data.some((item) => item.year === year)
      );
    }

    if (country && country.trim() !== '') {
      filteredData = filteredData.filter(([countryName]) =>
        countryName.toLowerCase().includes(country.toLowerCase())
      );
    }

    if (countryOrder && countryOrder === 'asc') {
      filteredData = filteredData.sort(([a], [b]) => a.localeCompare(b));
    } else if (countryOrder) {
      filteredData = filteredData.sort(([a], [b]) => b.localeCompare(a));
    }

    setCountries(filteredData);
  }, [dataCountries, year, country, countryOrder]);

  return (
    <table>
      <thead>
        <tr>
          <th>ISO</th>
          <th onClick={toggleSortCountries}>
            Country
            <span>
              {countryOrder === 'asc' && 'up'}
              {countryOrder === 'desc' && 'down'}
            </span>
          </th>
          <th>Population</th>
          <th>Year</th>
        </tr>
      </thead>
      <tbody>
        {countries.map(([countryName, countryInfo]) => (
          <TableRow
            key={countryName}
            countryName={countryName}
            countryInfo={countryInfo}
            selectedYear={year}
          />
        ))}
      </tbody>
    </table>
  );
}
