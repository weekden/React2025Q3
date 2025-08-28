import { Suspense, type JSX } from 'react';
import ResultTable from './components/ResultTable/ResultTable';
import Loader from './components/Loader/Loader';

function App(): JSX.Element {
  return (
    <>
      <h1>CO2 Emissions </h1>
      <Suspense fallback={<Loader />}>
        <ResultTable />
      </Suspense>
    </>
  );
}

export default App;
