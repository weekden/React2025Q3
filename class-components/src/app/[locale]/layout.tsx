import './globals.css';
import Header from '@/components/header/Header';
import Providers from './providers';
import { hasLocale, NextIntlClientProvider } from 'next-intl';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import { JSX } from 'react';
import { cookies } from 'next/dist/server/request/cookies';

export const metadata = {
  title: 'Zelda',
  description: 'Zelda monster store',
  icons: {
    icon: '/favicon-zelda.png',
  },
};

export type RootLayoutProps = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export default async function RootLayout({
  children,
  params,
}: RootLayoutProps): Promise<JSX.Element> {
  const { locale } = await params;
  const cookieStore = cookies();
  const theme = (await cookieStore).get('theme')?.value || 'light';

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  const messages = (await import(`../../../messages/${locale}.json`)).default;

  return (
    <html lang={locale} className={theme}>
      <body>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <Providers>
            <Header />
            <main>{children}</main>
          </Providers>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
