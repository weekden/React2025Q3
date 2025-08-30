import { useContext, type JSX } from 'react';
import type { CountryInfo } from '../../types/data';
import { getDataForYear } from '../../utils/getDataForYear';
import { FilterContext } from '../../context/filterContext';

type Props = {
  key: string;
  countryName: string;
  countryInfo: CountryInfo;
  selectedYear: number;
};

function TableRow({
  countryName,
  countryInfo,
  selectedYear,
}: Props): JSX.Element {
  const context = useContext(FilterContext);

  const selectedFields = context?.selectedFields;
  const dataForSelectedYear = getDataForYear(countryInfo, selectedYear);

  return (
    <>
      <tr>
        <td>{countryInfo.iso_code ?? 'N/A'}</td>
        <td>{countryName}</td>
        <td>{dataForSelectedYear.population ?? 'N/A'}</td>
        <td>{dataForSelectedYear.year}</td>
        {selectedFields &&
          selectedFields.map((field) => (
            <td key={field}>
              {dataForSelectedYear[field] !== undefined
                ? dataForSelectedYear[field]?.toFixed(4).toString()
                : 'N/A'}
            </td>
          ))}
      </tr>
    </>
  );
}

export default TableRow;
