import React from 'react';
import { createRoot } from 'react-dom/client';
import ErrorBoundary from 'utils/error-boundary';
import App from './App';
import ErrorMessage from './components/error-page';

const container = document.getElementById('root') as HTMLElement;
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <ErrorBoundary fallback={<ErrorMessage title="Ha habido un error" />}>
      <App />
    </ErrorBoundary>
  </React.StrictMode>
);
