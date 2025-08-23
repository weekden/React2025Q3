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

    if (type === 'search') {
      return (
        <input
          {...(register ? register(name) : {})}
          id={inputId}
          name={name}
          type={type}
          placeholder={placeholder}
          autoComplete={autocomplete}
          list={list}
          onBlur={onBlur}
          onInput={onInput}
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
      <p className="input-error">{errorMessage}</p>
    </div>
  );
}

export default Input;
