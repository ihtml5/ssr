import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer from '@/reducers';
import logger from 'redux-logger';
<<<<<<< HEAD

// const win = window;
const middlewares = [];
=======
import thunk from 'redux-thunk';
// const win = window;
const middlewares = [thunk];
>>>>>>> ff43ded2f0e2ab51f86341c9b3710cadb99d6c30
if (process.env.NODE_DEV !== 'production') {
  middlewares.push(logger);
}
const storeEnchancers = compose(
  applyMiddleware(...middlewares),
  // win && win.devToolsExtension ? win.devToolsExtension() : f => f,
);
const store = createStore(rootReducer, storeEnchancers);
export default store;
