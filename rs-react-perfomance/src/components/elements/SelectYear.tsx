import { memo, type ChangeEvent, type JSX } from 'react';
import type { YearSelectProps } from '../../types/elements/select';

function SelectYear({ id, options, onChange }: YearSelectProps): JSX.Element {
  const handleChange = (event: ChangeEvent<HTMLSelectElement>): void => {
    onChange(event.target.value);
  };
  return (
    <select id={id} onChange={handleChange}>
      {options.map((item) => (
        <option key={item} value={item}>
          {item}
        </option>
      ))}
    </select>
  );
}

export default memo(SelectYear);
