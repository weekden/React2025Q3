'use client';
import { useContext, type JSX } from 'react';
import spinnerBlack from '../../assets/spinner-black.png';
import spinnerWhite from '../../assets/spinner-white.png';
import './spinner.css';
import { ThemeContext } from '../../context/ThemeContext';
import Image from 'next/image';

function Spinner(): JSX.Element | null {
  const context = useContext(ThemeContext);
  if (!context) {
    return null;
  }
  const spinner = context.theme === 'light' ? spinnerBlack : spinnerWhite;
  return (
    <div className="spinner-container">
      <Image
        src={spinner}
        alt="Loading..."
        aria-label="Loading..."
        className="spinner-img"
      />
    </div>
  );
}

export default Spinner;
