import { type JSX } from 'react';
import type { CountryInfo } from '../../types/data';

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
  const dataForCountry = countryInfo.data;
  const dataForLastYear = dataForCountry[dataForCountry.length - 1];
  const dataForSelectedYear =
    dataForCountry.find((item) => item.year === selectedYear) ||
    dataForLastYear;

  return (
    <tr>
      <td>{countryInfo.iso_code ?? 'N/A'}</td>
      <td>{countryName}</td>
      <td>{dataForSelectedYear.population?.toString() ?? 'N/A'}</td>
      <td>{dataForSelectedYear.year.toString()}</td>
      <td>{dataForSelectedYear.co2?.toFixed(4).toString() ?? 'N/A'}</td>
      <td>
        {dataForSelectedYear.co2_per_capita?.toFixed(4).toString() ?? 'N/A'}
      </td>
    </tr>
  );
}
