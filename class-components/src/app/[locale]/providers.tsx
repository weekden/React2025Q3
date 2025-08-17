'use client';

import { Provider } from 'react-redux';
import store from '@/store';
import { ThemeContextProvider } from '@/context/ThemeContext';
import { JSX } from 'react';

export default function Providers({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return (
    <Provider store={store}>
      <ThemeContextProvider>{children}</ThemeContextProvider>
    </Provider>
  );
}
