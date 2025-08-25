import type { JSX } from 'react';
import AppButtonsControll from './components/AppButtonsControll/MainButtons';
import { Provider } from 'react-redux';
import { store } from './store';
import ResultTable from './components/ResultTable/ResultTable';

export default function App(): JSX.Element {
  return (
    <Provider store={store}>
      <AppButtonsControll />
      <ResultTable />
    </Provider>
  );
}
