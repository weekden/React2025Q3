import type { JSX } from 'react';
import type { InputProps } from '../../types/elements/input';

function Input(props: InputProps): JSX.Element {
  const { id, name, type, label, placeholder, accept, value, autocomplete } =
    props;
  const inputId = id || name;
  return (
    <label className={`input-container label-${type}`} htmlFor={inputId}>
      <p className="label-title">{label}</p>
      <input
        id={inputId}
        name={name}
        type={type || 'text'}
        placeholder={placeholder}
        autoComplete={autocomplete}
        value={value}
        accept={accept}
      />
    </label>
  );
}

export default Input;
