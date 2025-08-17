import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
  locales: ['en', 'ru'],
  defaultLocale: 'en',
});

// export const locales = ['en', 'ru'];

// export const routing = defineRouting({
//   locales: locales,
//   defaultLocale: 'en',
// });

// export type Locales = typeof routing.locales;

// export const localePrefix: LocalePrefix<Locales> = 'always';
