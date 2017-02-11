import { combineReducers } from 'redux';
import window from './window';
import user from './user';
import rest from './rest';
import eth from './eth';

export default combineReducers({
  window,
  user,
  rest,
  eth
});
