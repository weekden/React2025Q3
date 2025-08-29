import { use, useContext, useEffect, useState, type JSX } from 'react';
import TableRow from './TableRow';
import { FilterContext } from '../../context/filterContext';
import { dataPromise } from '../../api/getData';
import { getDataForYear } from '../../utils/getDataForYear';
import './tableStyle.scss';

export default function ResultTable(): JSX.Element {
  const dataCountries = use(dataPromise);
  const [countries, setCountries] = useState(Object.entries(dataCountries));

  const context = useContext(FilterContext);
  const year = context?.year || 2023;
  const country = context?.country;
  const countryOrder = context?.countryOrder;
  const populationOrder = context?.populationOrder;

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

    filteredData = filteredData.sort(([countryA, dataA], [countryB, dataB]) => {
      if (countryOrder) {
        return countryOrder === 'asc'
          ? countryA.localeCompare(countryB)
          : countryB.localeCompare(countryA);
      }

      if (populationOrder) {
        const A = getDataForYear(dataA, year).population ?? 0;
        const B = getDataForYear(dataB, year).population ?? 0;

        return populationOrder === 'asc' ? A - B : B - A;
      }

      return 0;
    });
    setCountries(filteredData);
  }, [dataCountries, year, country, countryOrder, populationOrder]);

  return (
    <table>
      <thead>
        <tr>
          <th>ISO</th>
          <th>Country</th>
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
