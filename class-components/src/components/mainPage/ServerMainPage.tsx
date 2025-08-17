import Message from '@/components/message/Message';
import ClientMainPage from './ClientMainPage';

import { JSX } from 'react';
import { fetchCharacters } from '@/app/api/api';

type ServerMainPageProps = {
  query?: string;
  page?: number;
};

export default async function ServerMainPage({
  query = '',
  page = 1,
}: ServerMainPageProps): Promise<JSX.Element> {
  const countCards = 20;
  try {
    const data = await fetchCharacters(query, countCards, page);

    if (!data?.data || data.data.length === 0) {
      return <Message message="No characters found" />;
    }

    const isLastPage = data.data.length < countCards;

    return <ClientMainPage data={data} page={page} isLastPage={isLastPage} />;
  } catch (error: unknown) {
    if (error instanceof Error) {
      return <Message message={`Fetching error - ${error.message}`} />;
    }
    return <Message message="Unknown error" />;
  }
}
