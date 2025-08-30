import { memo, type JSX } from 'react';

type SelectedColumnProps = {
  selectedFields: string[];
  data: Record<string, number | undefined>;
};
function SelectedColumn({
  selectedFields,
  data,
}: SelectedColumnProps): JSX.Element {
  return (
    <>
      {selectedFields.map((field) => (
        <td key={field}>
          {data[field] !== undefined ? data[field].toFixed(4) : 'N/A'}
        </td>
      ))}
    </>
  );
}

export default memo(SelectedColumn);
