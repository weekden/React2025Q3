import type { ReactNode } from 'react';

export type PopupProps = {
  title?: string | null;
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  form?: string | null;
};
