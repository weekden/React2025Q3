import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './index.css';

import ErrorBoundary from './components/errorBoundary/ErrorBoundary';
import App from './App';

const root = document.getElementById('root');
if (root) {
  createRoot(root).render(
    <StrictMode>
      <ErrorBoundary>
        <BrowserRouter basename="/React2025Q3/class-components/">
          <App />
        </BrowserRouter>
      </ErrorBoundary>
    </StrictMode>
  );
}
