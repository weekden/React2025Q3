import ClientCardDetail from './ClientCardDetail';
import { fetchCharactersById } from '@/api/api';
import { JSX } from 'react';
import Message from '../message/Message';

type ServerCardDetailProps = {
  id: string;
};

export default async function ServerCardDetail({
  id,
}: ServerCardDetailProps): Promise<JSX.Element> {
  try {
    const detailData = await fetchCharactersById(id);

    if (!detailData?.data) {
      return <Message message="Character not found" />;
    }

    return <ClientCardDetail character={detailData.data} />;
  } catch (error: unknown) {
    if (error instanceof Error) {
      return <Message message={`Fetching error - ${error.message}`} />;
    }
    return <Message message="Unknown error" />;
  }
}
