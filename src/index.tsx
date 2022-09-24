import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';

import App from './App';
import { Provider } from 'react-redux';

import { store } from './store';


export const API_URL = 'https://api.websiteswithpassion.pl';
export const USER_ID = '62288ade73a4284c9e93cea9';

ReactDOM.render(
 
    <Provider store={store}>
      <App />
    </Provider>,
  document.getElementById('root')
);