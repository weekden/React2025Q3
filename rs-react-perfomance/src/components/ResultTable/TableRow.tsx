import { memo, type JSX } from 'react';
import type { CountryInfo } from '../../types/data';
import { getDataForYear } from '../../utils/getDataForYear';

type Props = {
  countryName: string;
  countryInfo: CountryInfo;
  selectedYear: number;
  selectedFields: string[];
};

function TableRow({
  countryName,
  countryInfo,
  selectedYear,
  selectedFields,
}: Props): JSX.Element {
  const dataForSelectedYear = getDataForYear(countryInfo, selectedYear);

  return (
    <tr>
      <td>{countryInfo.iso_code ?? 'N/A'}</td>
      <td>{countryName}</td>
      <td>{dataForSelectedYear.population ?? 'N/A'}</td>
      <td>{dataForSelectedYear.year}</td>
      {selectedFields.map((field) => (
        <td key={field}>
          {dataForSelectedYear[field] !== undefined
            ? dataForSelectedYear[field]?.toFixed(4).toString()
            : 'N/A'}
        </td>
      ))}
    </tr>
  );
}

export default memo(TableRow);
