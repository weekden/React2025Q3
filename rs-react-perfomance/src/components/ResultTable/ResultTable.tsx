import { use, type JSX } from 'react';
import { dataPromise } from '../../api/getData';
import TableRow from './TableRow';
import './tableStyle.scss';

export default function ResultTable(): JSX.Element {
  const dataCountries = use(dataPromise);
  const countries = Object.entries(dataCountries);

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
          />
        ))}
      </tbody>
    </table>
  );
}
