import type { ReactNode } from 'react';
import spinner from '../../assets/spinner.png';
import './spinner.css';

function Spinner(): ReactNode {
  return (
    <div className="spinner-container">
      <img
        className="spinner-img"
        src={spinner}
        alt="Loading..."
        aria-label="Loading..."
      />
    </div>
  );
}

export default Spinner;
