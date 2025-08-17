'use client';
import { useContext, type JSX } from 'react';
import './spinner.css';
import { ThemeContext } from '../../context/ThemeContext';
import Image from 'next/image';

function Spinner(): JSX.Element | null {
  const context = useContext(ThemeContext);
  if (!context) {
    return null;
  }
  const spinner =
    context.theme === 'light'
      ? '/assets/spinner-black.png'
      : '/assets/spinner-white.png';
  return (
    <div className="spinner-container">
      <Image
        src={spinner}
        alt="Loading..."
        aria-label="Loading..."
        className="spinner-img"
        width={40}
        height={40}
      />
    </div>
  );
}

export default Spinner;
