import { Suspense, type JSX } from 'react';

import Loader from './components/Loader/Loader';

import { FilterProvider } from './context/filterContext';
import MainContent from './main/MainContent';

function App(): JSX.Element {
  return (
    <>
      <h1>CO2 Emissions </h1>
      <Suspense fallback={<Loader />}>
        <FilterProvider>
          <MainContent />
        </FilterProvider>
      </Suspense>
    </>
  );
}

export default App;
