import Card from '../card/Card';
import Button from '../elements/Button';
import Spinner from '../spinner/Spinner';
import Message from '../message/Message';

import { useNavigate, useParams } from 'react-router-dom';
import type { ReactNode } from 'react';
import {
  useClearCharacterCacheByIdMutation,
  useGetCharacterByIdQuery,
} from '../../store/apiSlice';
import { getErrorMessage } from '../../utils/getErrorMessage';

import './cardDetail.css';

function CardDetails(): ReactNode {
  const { page, id } = useParams();
  const navigate = useNavigate();

  const { data, isLoading, isFetching, error } = useGetCharacterByIdQuery(
    id || '',
    {
      skip: !id,
    }
  );

  const [clearCache] = useClearCharacterCacheByIdMutation();
  const handleClearCacheById = (): void => {
    if (!id) {
      return;
    }
    clearCache(id);
  };

  if (error) {
    return <Message message={getErrorMessage(error)} />;
  }

  return (
    <>
      <div className="card-details" data-testid="card-details">
        {(isLoading || isFetching) && (
          <div className="center-content">
            {isLoading && <Spinner />}
            {!isLoading && isFetching && <Message message="Fetching data..." />}
          </div>
        )}

        {!isLoading && !isFetching && data && (
          <>
            <Button
              className="card-details__close"
              onClick={() => navigate(`/page/${page}`)}
              text={'☓'}
            />
            <div className="card-details__card">
              <Card card={data.data} />
            </div>
          </>
        )}
        <Button text="Refresh" onClick={handleClearCacheById} />
      </div>
    </>
  );
}

export default CardDetails;
