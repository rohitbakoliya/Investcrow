import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import { History } from 'history';
import * as ducks from './ducks/index.defaults';

const rootReducer = (history: History) =>
  combineReducers({ router: connectRouter(history), ...ducks });

export default rootReducer;
