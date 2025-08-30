import { useMemo, type JSX } from 'react';
import TableRow from './TableRow';
import { getDataForYear } from '../../utils/getDataForYear';
import './tableStyle.scss';
import type { CountryData } from '../../types/data';
import { defaultTableFields } from '../../config';
import { useFilters } from '../../hooks/useFilter';

type ResultTableProps = {
  dataCountries: CountryData;
};

export default function ResultTable({
  dataCountries,
}: ResultTableProps): JSX.Element {
  const context = useFilters();
  const year = context?.year;
  const country = context?.country;
  const countryOrder = context?.countryOrder;
  const populationOrder = context?.populationOrder;
  const selectedFields = context?.selectedFields;

  const countries = useMemo(() => {
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
    return filteredData;
  }, [dataCountries, year, country, countryOrder, populationOrder]);

  return (
    <table>
      <thead>
        <tr>
          <th>ISO</th>
          <th>Country</th>
          {defaultTableFields.map((field) => (
            <th key={field}>{field}</th>
          ))}
          {selectedFields &&
            selectedFields.map((field) => <th key={field}>{field}</th>)}
        </tr>
      </thead>
      <tbody>
        {countries.map(([countryName, countryInfo]) => (
          <TableRow
            key={countryName}
            countryName={countryName}
            countryInfo={countryInfo}
            selectedYear={year || 2023}
            selectedFields={selectedFields || []}
          />
        ))}
      </tbody>
    </table>
  );
}
