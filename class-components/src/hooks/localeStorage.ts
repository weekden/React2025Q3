import { useEffect, useState } from 'react';

function useLocalStorage(
  key: string,
  defaultValue: string
): [string, (value: string) => void] {
  const getValueFromLocalStorage = (): string =>
    localStorage.getItem(key) || defaultValue;

  const [state, setState] = useState(getValueFromLocalStorage);

  useEffect(() => {
    localStorage.setItem(key, state);
  }, [key, state]);

  return [state, setState];
}

export default useLocalStorage;
