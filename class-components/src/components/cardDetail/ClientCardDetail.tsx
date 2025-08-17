'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import Button from '../elements/Button';
import Card from '../card/Card';
import { JSX } from 'react';
import './cardDetail.css';
import { Character } from '@/types/api';

type ClientCardDetailProps = {
  character: Character;
};

export default function ClientCardDetail({
  character,
}: ClientCardDetailProps): JSX.Element {
  const router = useRouter();
  const searchParams = useSearchParams();

  const closeCardDetail = (): void => {
    const params = new URLSearchParams(searchParams?.toString());
    params.delete('details');
    router.push(`/?${params.toString()}`);
  };

  return (
    <div className="card-details">
      <Button
        className="card-details__close"
        onClick={closeCardDetail}
        text={'☓'}
      />
      <div className="card-details__card">
        <Card card={character} isDetail={true} />
      </div>
    </div>
  );
}
