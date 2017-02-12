import { combineReducers } from 'redux';
import window from './window';
import user from './user';
import rest from './rest';
import eth from './eth';
import investment from './investment';

export default combineReducers({
  window,
  user,
  rest,
  eth,
  investment
});
