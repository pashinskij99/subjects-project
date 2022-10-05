import './styles/index.scss';
import React from 'react';
import App from './App';

import store from './scripts/redux/store';
import { Provider } from 'react-redux';

import * as ReactDOMClient from 'react-dom/client';

const rootElement = document.getElementById('root');

const root = ReactDOMClient.createRoot(rootElement);

root.render(
    <Provider store={store}>
        <App />
    </Provider>
);
