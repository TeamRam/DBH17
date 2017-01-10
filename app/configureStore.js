import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { autoRehydrate } from 'redux-persist';

import rootReducer from './reducers';
import { screenResize, scrollChange } from './actions/window';

export default function configureStore(initialState) {
  if (typeof (window) === 'undefined') {
    global.window = {};
  }

  if (typeof (navigator) === 'undefined') {
    global.navigator = {};
  }

  const store = createStore(rootReducer, initialState, compose(
    autoRehydrate(),
    applyMiddleware(thunkMiddleware),
    window.devToolsExtension ? window.devToolsExtension() : f => f
  ));

  if (global.window.addEventListener) {
    store.dispatch(screenResize(window.innerWidth, window.innerHeight));
    global.window.addEventListener('resize', () => {
      store.dispatch(screenResize(window.innerWidth, window.innerHeight));
    });
    global.window.onscroll = () => {
      store.dispatch(scrollChange(window.document.body.scrollTop));
    };
  }

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('./reducers', () => {
      const nextRootReducer = require('./reducers').default;
      store.replaceReducer(nextRootReducer);
    });
  }

  return store;
}
