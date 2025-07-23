import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';

import MainPage from './pages/mainPage';
import ErrorBoundary from './components/errorBoundary/ErrorBoundary';

const root = document.getElementById('root');
if (root) {
  createRoot(root).render(
    <StrictMode>
      <ErrorBoundary>
        <MainPage></MainPage>
      </ErrorBoundary>
    </StrictMode>
  );
}
