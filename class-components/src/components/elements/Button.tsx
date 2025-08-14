import type { JSX } from 'react';
import type { ButtonProps } from '../../types/elements/button';

function Button({
  text = 'Click',
  className = '',
  onClick,
  disabled = false,
}: ButtonProps): JSX.Element {
  return (
    <button className={className} onClick={onClick} disabled={disabled}>
      {text}
    </button>
  );
}

export default Button;
