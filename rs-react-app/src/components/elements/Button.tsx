import type { JSX } from 'react';
import type { ButtonProps } from '../../types/elements/button';

function Button({
  text = 'Click',
  className = '',
  onClick,
  disabled = false,
  form,
}: ButtonProps): JSX.Element {
  return (
    <button
      className={className}
      onClick={onClick}
      disabled={disabled}
      form={form}
    >
      {text}
    </button>
  );
}

export default Button;
