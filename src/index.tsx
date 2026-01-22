import ReactDOM from 'react-dom/client';
import { StrictMode } from 'react';
import { Provider } from 'react-redux';
import App from './components/app/app';
import { offers } from './mocks/offers';
import store from './store';
import { setOffers } from './store/action';

store.dispatch(setOffers(offers));

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>
);
