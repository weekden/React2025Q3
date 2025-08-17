import Message from '../message/Message';
import { JSX } from 'react';
import { fetchCharactersById } from '@/api/api';
import ClientCardDetail from './ClientCardDetail';

type ServerCardDetailProps = {
  id: string | null;
};

export default async function ServerCardDetail({
  id,
}: ServerCardDetailProps): Promise<JSX.Element | null> {
  try {
    if (!id) return null;
    const response = await fetchCharactersById(id);
    const character = response?.data;

    if (!character) return <Message message="Character not found" />;
    return <ClientCardDetail character={character} />;
  } catch (error: unknown) {
    if (error instanceof Error) {
      return <Message message={`Fetching error - ${error.message}`} />;
    }
    return <Message message="Unknown error" />;
  }
}
