import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import './index.scss';

import App from './App';
import { Provider } from 'react-redux';

import { store } from './store';
import Loading from './components/common/Loading/Loading';


export const API_URL = 'http://localhost:5000';
export const USER_ID = '62288ade73a4284c9e93cea9';

ReactDOM.render(
  <Suspense fallback={<Loading />}>
    <Provider store={store}>
      <App />
    </Provider>
  </Suspense>,
  document.getElementById('root')
);