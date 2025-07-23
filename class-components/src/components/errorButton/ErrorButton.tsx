import type { ReactNode } from 'react';
import type { ErrorProps } from '../../types/error';
import './error.css';

function ErrorButton({ onErrorGenerate }: ErrorProps): ReactNode {
  const handleClick = (): void => {
    onErrorGenerate();
  };

  return (
    <div className="error-mock-container" data-testid="error-button">
      <button onClick={handleClick}>Error Button</button>
    </div>
  );
}

export default ErrorButton;
