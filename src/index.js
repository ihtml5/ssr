import React from 'react';
import ReactDOM from 'react-dom';
<<<<<<< HEAD
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import store from './store';
ReactDOM.render(
	<Provider store={store}>
		<App />
	</Provider>,
	document.getElementById('root')
=======
import App from './App';
import './index.css';
import { Provider } from 'react-redux';
import store from './store';

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'),
>>>>>>> ff43ded2f0e2ab51f86341c9b3710cadb99d6c30
);
