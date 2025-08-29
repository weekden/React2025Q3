import { type JSX } from 'react';
import type { CountryInfo } from '../../types/data';
import { getDataForYear } from '../../utils/getDataForYear';

type Props = {
  key: string;
  countryName: string;
  countryInfo: CountryInfo;
  selectedYear: number;
};

export default function TableRow({
  countryName,
  countryInfo,
  selectedYear,
}: Props): JSX.Element {
  const dataForSelectedYear = getDataForYear(countryInfo, selectedYear);

  return (
    <>
      <tr>
        <td>{countryInfo.iso_code ?? 'N/A'}</td>
        <td>{countryName}</td>
        <td>{dataForSelectedYear.population?.toString() ?? 'N/A'}</td>
        <td>{dataForSelectedYear.year.toString()}</td>
      </tr>
    </>
  );
}
