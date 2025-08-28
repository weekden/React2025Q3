import { use, useContext, type JSX } from 'react';
import { dataPromise } from '../../api/getData';
import TableRow from './TableRow';
import './tableStyle.scss';
import { FilterContext } from '../../context/filterContext';

export default function ResultTable(): JSX.Element {
  const dataCountries = use(dataPromise);
  const context = useContext(FilterContext);
  const year = context?.year || 2023;
  const country = context?.country;
  let countries = Object.entries(dataCountries);

  if (year) {
    countries = countries.filter(([, countryInfo]) =>
      countryInfo.data.some((item) => item.year === year)
    );
  }

  if (country && country.trim() !== '') {
    countries = countries.filter(([countryName]) =>
      countryName.toLowerCase().includes(country.toLowerCase())
    );
  }

  return (
    <table>
      <thead>
        <tr>
          <th>ISO</th>
          <th>Country</th>
          <th>Population</th>
          <th>Year</th>
          <th>CO2</th>
          <th>CO2 Capital</th>
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
