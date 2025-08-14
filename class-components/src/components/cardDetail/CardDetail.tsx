import Card from '../card/Card';
import Button from '../elements/Button';
import Spinner from '../spinner/Spinner';
import Message from '../message/Message';

import { useNavigate, useParams } from 'react-router-dom';
import type { JSX } from 'react';
import { useGetCharacterByIdQuery, zeldaApi } from '../../store/apiSlice';
import { getErrorMessage } from '../../utils/getErrorMessage';

import './cardDetail.css';
import { ZeldaTagTypes } from '../../types/api';
import { useDispatch } from 'react-redux';

function CardDetails(): JSX.Element {
  const { page, id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { data, isLoading, isFetching, error } = useGetCharacterByIdQuery(
    id || '',
    {
      skip: !id,
    }
  );

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
        {!isLoading && !isFetching && data && (
          <Button
            text="Refresh"
            onClick={() =>
              dispatch(
                zeldaApi.util.invalidateTags([
                  { type: ZeldaTagTypes.Character },
                ])
              )
            }
          />
        )}
      </div>
    </>
  );
}

export default CardDetails;
