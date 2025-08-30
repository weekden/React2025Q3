import { memo, type JSX } from 'react';
import type { CountryInfo } from '../../types/data';
import { getDataForYear } from '../../utils/getDataForYear';
import { defaultTableFields } from '../../config';
import SelectedColumn from './SelectedColumn';

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
      {defaultTableFields.map((field) => (
        <td key={field}>{dataForSelectedYear[field] ?? 'N/A'}</td>
      ))}
      {selectedFields && (
        <SelectedColumn
          data={dataForSelectedYear}
          selectedFields={selectedFields}
        />
      )}
    </tr>
  );
}

export default memo(TableRow);
