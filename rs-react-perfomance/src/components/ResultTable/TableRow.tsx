import type { JSX } from 'react';
import type { CountryInfo } from '../../types/data';

type Props = {
  key: string;
  countryName: string;
  countryInfo: CountryInfo;
};

export default function TableRow({
  countryName,
  countryInfo,
}: Props): JSX.Element {
  const dataForCountry = countryInfo.data;
  const dataForLastYear = dataForCountry[dataForCountry.length - 1];

  return (
    <tr>
      <td>{countryInfo.iso_code ?? 'N/A'}</td>
      <td>{countryName}</td>
      <td>{dataForLastYear.population?.toString() ?? 'N/A'}</td>
      <td>{dataForLastYear.year.toString()}</td>
      <td>{dataForLastYear.co2?.toFixed(4).toString() ?? 'N/A'}</td>
      <td>{dataForLastYear.co2_per_capita?.toFixed(4).toString() ?? 'N/A'}</td>
    </tr>
  );
}
