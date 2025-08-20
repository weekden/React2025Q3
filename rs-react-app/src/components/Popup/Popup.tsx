import { useEffect, type JSX } from 'react';
import { createPortal } from 'react-dom';
import Button from '../elements/Button';
import type { PopupProps } from '../../types/popup';
import styles from './Popup.module.css';

const portal = document.getElementById('portal');

function Popup({ isOpen, onClose, children }: PopupProps): JSX.Element | null {
  useEffect((): void => {
    const handleEsc = (event: KeyboardEvent): void => {
      if (event.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
  }, [onClose]);

  if (!isOpen || !(portal instanceof HTMLElement)) {
    return null;
  }

  return createPortal(
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.popup} onClick={(e) => e.stopPropagation()}>
        <Button onClick={onClose} text="X" />
        <div className={styles.formWrapper}>{children}</div>
      </div>
    </div>,
    portal
  );
}

export default Popup;
