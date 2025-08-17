import middleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

export default middleware(routing);

export const config = {
  // eslint-disable-next-line no-useless-escape
  matcher: ['/', '/(en|ru)/:path', '/((?!api|trpc|_next|_vercel|.\..).)'],
};
