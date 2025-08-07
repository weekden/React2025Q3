import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { HashRouter } from 'react-router-dom';
import './index.css';

import ErrorBoundary from './components/errorBoundary/ErrorBoundary';
import App from './App';
import { ThemeContextProvider } from './context/ThemeContext';
import { Provider } from 'react-redux';
import store from './store';

const root = document.getElementById('root');
if (root) {
  createRoot(root).render(
    <StrictMode>
      <Provider store={store}>
        <ErrorBoundary>
          <HashRouter>
            <ThemeContextProvider>
              <App />
            </ThemeContextProvider>
          </HashRouter>
        </ErrorBoundary>
      </Provider>
    </StrictMode>
  );
}
