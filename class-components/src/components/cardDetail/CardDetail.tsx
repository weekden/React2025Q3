import { useSearchParams } from 'react-router-dom';
import { useEffect, useState, type ReactNode } from 'react';
import Spinner from '../spinner/Spinner';
import Message from '../message/Message';
import { fetchCharactersById } from '../../api/getData';
import type { Character } from '../../types/api';
import './cardDetail.css';
import Card from '../card/Card';

function CardDetails(): ReactNode {
  const [data, setData] = useState<Character | null>(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const id = searchParams.get('details');

  useEffect(() => {
    if (!id) return;
    showDetails(id);
  }, [id]);

  const showDetails = async (id: string): Promise<void> => {
    setIsLoading(true);
    try {
      const result = await fetchCharactersById(id);
      setData(result.data);
      setIsLoading(false);
    } catch (error) {
      setData(null);
      setIsError(true);
      setIsLoading(false);
      if (error instanceof Error) {
        setErrorMessage(error.message);
      } else {
        setErrorMessage('Unexpected error');
      }
    }
  };

  return (
    <div className="card-details" data-testid="card-details">
      {isLoading && (
        <div className="center-conten">
          <Spinner />
        </div>
      )}
      {isError && (
        <div className="center-content">
          <Message message={errorMessage} />
        </div>
      )}
      {!isLoading && !isError && data && (
        <>
          <button
            className="card-details__close"
            aria-label="close-details"
            onClick={() => {
              searchParams.delete('details');
              setSearchParams(searchParams);
            }}
          >
            &#9747;
          </button>
          <div className="card-details__card">
            <Card
              id={data.id}
              name={data.name}
              race={data.race}
              description={data.description}
            />
          </div>
        </>
      )}
    </div>
  );
}

export default CardDetails;
