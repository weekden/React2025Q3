import ServerMainPage from '@/components/mainPage/ServerMainPage';
import Spinner from '@/components/spinner/Spinner';
import { JSX, Suspense } from 'react';

export default async function Page(props: {
  searchParams?: Promise<{ query?: string; page?: string }>;
}): Promise<JSX.Element> {
  const searchParams = await props.searchParams;
  const page = Number(searchParams?.page) || 1;
  const query = searchParams?.query || '';
  return (
    <Suspense fallback={<Spinner />}>
      <ServerMainPage page={page} query={query} />
    </Suspense>
  );
}
