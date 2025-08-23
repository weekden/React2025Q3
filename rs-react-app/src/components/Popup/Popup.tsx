import { useEffect, type JSX } from 'react';
import { createPortal } from 'react-dom';
import Button from '../elements/Button';
import type { PopupProps } from '../../types/popup';
import './popup.css';

const portal = document.getElementById('portal');

function Popup({
  title,
  isOpen,
  onClose,
  children,
  form,
}: PopupProps): JSX.Element | null {
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
    <div className="overlay" onClick={onClose}>
      <div className="popup" onClick={(e) => e.stopPropagation()}>
        <p className="popup-title">{`${title?.toUpperCase()} FORM`}</p>
        <Button className="close-btn" onClick={onClose} text="X" />
        <div className="form-wrapper">{children}</div>
        <Button
          className="submit-btn"
          type="submit"
          form={`${form}-form`}
          text="Send"
        />
      </div>
    </div>,
    portal
  );
}

export default Popup;
