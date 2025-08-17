'use client';
import { useEffect, useState } from 'react';

function useLocalStorage(
  key: string,
  defaultValue: string
): [string, (value: string) => void] {
  const [state, setState] = useState(defaultValue);

  useEffect(() => {
    const storedValue = localStorage.getItem(key);
    if (storedValue !== null) {
      setState(storedValue);
    }
  }, [key]);

  useEffect(() => {
    localStorage.setItem(key, state);
  }, [key, state]);

  return [state, setState];
}

export default useLocalStorage;
