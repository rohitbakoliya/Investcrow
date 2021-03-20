import { createStore, compose, applyMiddleware, Middleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { routerMiddleware } from 'connected-react-router';
import logger from 'redux-logger';
import { ApiMiddleware } from './middlewares';
import rootReducer from './rootReducer';
import history from 'utils/history';

export { history }; // imported from here in App.js

// all middleware in a array
const middlewares: Array<Middleware> = [thunkMiddleware, routerMiddleware(history), ApiMiddleware];

if (process.env.NODE_ENV === 'development') {
  middlewares.push(logger);
}

const initialState = {};

// for using redux dev tools in chrome extension
/* eslint-disable no-underscore-dangle */
const composeEnhancers =
  (typeof window !== 'undefined' && (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose;

export const store = createStore(
  rootReducer(history),
  initialState,
  composeEnhancers(applyMiddleware(...middlewares))
);

// store.subscribe(() => console.log(store.getState()));

export default store;
