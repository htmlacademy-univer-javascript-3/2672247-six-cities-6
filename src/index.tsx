import ReactDOM from 'react-dom/client';
import { StrictMode } from 'react';
import App from './components/app/app';
import { offers } from './mocks/offers';
import { reviews } from './mocks/reviews';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <StrictMode>
    <App offers={offers} reviews={reviews} />
  </StrictMode>
);
