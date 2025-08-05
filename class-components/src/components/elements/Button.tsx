import type { ReactNode } from 'react';
import type { ButtonProps } from '../../types/elements/button';

function Button({
  text = 'Click',
  className = '',
  onClick,
  disabled = false,
}: ButtonProps): ReactNode {
  return (
    <button className={className} onClick={onClick} disabled={disabled}>
      {text}
    </button>
  );
}

export default Button;
