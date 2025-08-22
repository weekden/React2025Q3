import { forwardRef, type JSX } from 'react';
import type { InputProps } from '../../types/elements/input';

const Input = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  const {
    id,
    name,
    type = 'text',
    label,
    placeholder,
    accept,
    value,
    autocomplete,
    onInput,
    onBlur,
  } = props;

  const inputId = id || name;

  const renderInput = (): JSX.Element => {
    if (type === 'file') {
      return <input id={inputId} name={name} type={type} accept={accept} />;
    }

    if (type === 'radio') {
      return <input id={inputId} name={name} type={type} value={value} />;
    }

    if (type === 'search') {
      return (
        <input
          id={inputId}
          name={name}
          type={type}
          ref={ref}
          placeholder={placeholder}
          autoComplete={autocomplete}
          onChange={onInput}
          onBlur={onBlur}
        />
      );
    }

    return (
      <input
        id={inputId}
        name={name}
        type={type}
        placeholder={placeholder}
        autoComplete={autocomplete}
      />
    );
  };

  return (
    <label className={`input-container label-${type}`} htmlFor={inputId}>
      {label && <span>{label}</span>}
      {renderInput()}
    </label>
  );
});

Input.displayName = 'Input';

export default Input;
