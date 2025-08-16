'use client';
import './globals.css';
import { JSX } from 'react';

import Header from '@/components/header/Header';
import { Provider } from 'react-redux';
import store from '@/store';
import { ThemeContextProvider } from '@/context/ThemeContext';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return (
    <html lang="en">
      <body>
        <Provider store={store}>
          <ThemeContextProvider>
            <Header />
            <main>{children}</main>
          </ThemeContextProvider>
        </Provider>
      </body>
    </html>
  );
}

// export const metadata: Metadata = {
//   title: 'Zelda',
//   description: 'Zelda monsters store...',
// };
