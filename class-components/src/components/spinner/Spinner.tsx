import { useContext, type ReactNode } from 'react';
import spinnerBlack from '../../assets/spinner-black.png';
import spinnerWhite from '../../assets/spinner-white.png';
import './spinner.css';
import { ThemeContext } from '../../context/ThemeContext';

function Spinner(): ReactNode {
  const context = useContext(ThemeContext);
  if (!context) {
    return null;
  }
  return (
    <div className="spinner-container">
      <img
        className="spinner-img"
        src={context.theme === 'light' ? spinnerBlack : spinnerWhite}
        alt="Loading..."
        aria-label="Loading..."
      />
    </div>
  );
}

export default Spinner;
