import { forwardRef, type JSX } from 'react';
import type { InputProps } from '../../types/elements/input';

const Input = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  const {
    id,
    name,
    type = 'text',
    label,
    placeholder,
    defaultValue,
    autocomplete,
    errorMessage,
    onInput,
    onBlur,
  } = props;

  const inputId = id || name;

  const renderInput = (): JSX.Element => {
    if (type === 'radio') {
      return (
        <input
          id={inputId}
          name={name}
          type={type}
          defaultValue={defaultValue}
        />
      );
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
    <div className="input-container">
      <label className={` label-${type}`} htmlFor={inputId}>
        {label && <span>{label}</span>}
        {renderInput()}
      </label>
      <p className="input-error">{errorMessage}</p>
    </div>
  );
});

Input.displayName = 'Input';

export default Input;
