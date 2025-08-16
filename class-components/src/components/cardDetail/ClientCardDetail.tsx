'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { zeldaApi } from '@/store/apiSlice';
import Button from '../elements/Button';
import Card from '../card/Card';
import { JSX } from 'react';
import { Character } from '@/types/api';
import './cardDetail.css';

export default function ClientCardDetail({
  character,
}: {
  character: Character;
}): JSX.Element {
  const router = useRouter();
  const dispatch = useDispatch();
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
      <Button
        text="Refresh"
        onClick={() =>
          dispatch(zeldaApi.util.invalidateTags([{ type: 'Character' }]))
        }
      />
    </div>
  );
}
