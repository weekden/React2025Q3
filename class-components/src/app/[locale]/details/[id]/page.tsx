import ServerCardDetail from '@/components/cardDetail/ServerCardDetails';
import { JSX } from 'react';

export default async function CardDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<JSX.Element> {
  const { id } = await params;

  return <ServerCardDetail id={id} />;
}
