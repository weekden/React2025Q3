import type { JSX } from 'react';
import type { InputProps } from '../../types/elements/input';

function Input(props: InputProps): JSX.Element {
  const {
    id,
    name,
    type,
    label,
    list,
    placeholder,
    autocomplete,
    defaultValue,
    errorMessage,
    onInput,
    onBlur,
    register,
  } = props;
  const inputId = id || name;
  const renderInput = (): JSX.Element => {
    if (type === 'radio') {
      return (
        <input
          {...(register ? register(name) : {})}
          id={inputId}
          name={name}
          type={type}
          defaultValue={defaultValue}
        />
      );
    }

    if (name === 'country') {
      return (
        <input
          {...(register ? register(name) : {})}
          id={inputId}
          name={name}
          type={type}
          placeholder={placeholder}
          autoComplete={autocomplete}
          defaultValue={defaultValue}
          list={list}
          onBlur={onBlur}
          onInput={onInput}
        />
      );
    }

    if (type === 'number') {
      return (
        <input
          {...(register ? register(name, { valueAsNumber: true }) : {})}
          id={inputId}
          name={name}
          type={type}
          placeholder={placeholder}
        />
      );
    }

    return (
      <input
        {...(register ? register(name) : {})}
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
      <label className={`label-${type}`} htmlFor={inputId}>
        {label && <span>{label}</span>}
        {renderInput()}
      </label>
      <p className="input-error" data-testid={`${name}-error`}>
        {errorMessage}
      </p>
    </div>
  );
}

export default Input;
