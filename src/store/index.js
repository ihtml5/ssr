import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer from '@/reducers';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
// const win = window;
const middlewares = [thunk];
if (process.env.NODE_DEV !== 'production') {
  middlewares.push(logger);
}
const storeEnchancers = compose(
  applyMiddleware(...middlewares),
  // win && win.devToolsExtension ? win.devToolsExtension() : f => f,
);
const store = createStore(rootReducer, storeEnchancers);
export default store;
