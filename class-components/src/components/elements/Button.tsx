import type { JSX } from 'react';
import type { ButtonProps } from '../../types/elements/button';
import { useTranslations } from 'next-intl';

function Button({
  text = 'Click',
  className = '',
  onClick,
  disabled = false,
  nameLocale = '',
  keyLocale = '',
}: ButtonProps): JSX.Element {
  const t = useTranslations(nameLocale);
  return (
    <button className={className} onClick={onClick} disabled={disabled}>
      {keyLocale && t?.has(keyLocale) ? t(keyLocale) : text}
    </button>
  );
}

export default Button;
