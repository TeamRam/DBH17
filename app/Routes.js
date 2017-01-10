import React from 'react';
import { Route } from 'react-router';

import App from './App';
import NoMatch from './components/NotFound';

// Polyfill to fake require.ensure on NodeJS
if (typeof require.ensure !== 'function') require.ensure = (d, c) => c(require);

const loadLandingPage = (location, cb) => {
  require.ensure([], (require) => {
    const module = require('./components/LandingPage/LandingPage');
    cb(null, module.default);
  });
};

export const getRoutes = (store) => {
  return (
    <Route component={App}>
      <Route path="/" getComponent={loadLandingPage} />
      <Route path="*" component={NoMatch} />
    </Route>
  );
};

export default getRoutes();
