import { Suspense, type JSX } from 'react';
import ResultTable from './components/ResultTable/ResultTable';
import Loader from './components/Loader/Loader';
import SearchPanel from './components/SearchPanel/SearchPanel';

import { FilterProvider } from './context/filterContext';

function App(): JSX.Element {
  return (
    <>
      <FilterProvider>
        <h1>CO2 Emissions </h1>
        <SearchPanel />
        <Suspense fallback={<Loader />}>
          <ResultTable />
        </Suspense>
      </FilterProvider>
    </>
  );
}

export default App;
