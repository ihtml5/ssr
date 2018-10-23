import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { renderRoutes } from 'react-router-config';
import routes from './routes';
import store from './store';

ReactDOM.hydrate(
	<Provider store={store}>
		<BrowserRouter>{renderRoutes(routes)}</BrowserRouter>
	</Provider>,
	document.getElementById('root')
);
