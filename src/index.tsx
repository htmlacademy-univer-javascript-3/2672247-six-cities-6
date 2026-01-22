import ReactDOM from 'react-dom/client';
import { StrictMode } from 'react';
import App from './components/app/app';

const offersCount = 312;

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <StrictMode>
    <App offersCount={offersCount} />
  </StrictMode>
);
