import React from 'react';
import ReactDOM from 'react-dom';
import { renderToStaticMarkup } from 'react-dom/server';
import { Router, match, RouterContext, browserHistory } from 'react-router';
import Helmet from 'react-helmet';
import { Provider } from 'react-redux';
import injectTapEventPlugin from 'react-tap-event-plugin';
import { persistStore } from 'redux-persist';
import createFilter from 'redux-persist-transform-filter';

import configureStore from './configureStore';
import config from './config';

import routes from './Routes';
import Root from './Root';


const isClient = typeof document !== 'undefined';
if (isClient) {
  const onRouteUpdate = () => {
    scrollToTop();
  };

  const scrollToTop = () => {
    window.scrollTo(0, 0);
  };

  injectTapEventPlugin();

  const store = configureStore(window.__INITIAL_STATE__);
  const persistConfig = {
    // blacklist: ['match', 'chat', 'appbar'],
    // transforms: [
    //   // only store a subset of the profile reducers state, for the demo we don't want
    //   // the question answers to be stored
    //   createFilter(
    //     'profile',
    //     ['idToken', 'wantsToConnectWith', 'authProfile', 'name', 'firstName', 'pictureUrl', 'userType', 'jobTitle', 'companyName']
    //   )
    // ]
  };


  persistStore(store, persistConfig, () => {
    match({
      routes: routes,
      history: browserHistory,
    }, (error, redirectLocation, routeProps) => {
      ReactDOM.render(
        <Provider store={store}>
            <Router {...routeProps} onUpdate={onRouteUpdate} />
        </Provider>,
        document.getElementById('root')
      );
    });
  });
}

function serverMiddleware(req, res) {
  // http://stackoverflow.com/questions/35481084/react-starter-kit-and-material-ui-useragent-should-be-supplied-in-the-muitheme/35530465
  global.navigator = global.navigator || {};
  global.navigator.userAgent = req.headers['user-agent'] || 'all';

  match({ routes, location: req.url }, (error, redirectLocation, renderProps) => {
    if (error) {
      handleError(error);
    } else if (redirectLocation) {
      handleRedirect(res, redirectLocation);
    } else if (renderProps) {
      handleRoute(res, renderProps);
    } else {
      // This should actually never happen, as Routes.js has a catch-all '*' path.
      res.sendStatus(404);
    }
  });
}

function handleError(res, error) {
  res.status(500).send(error.message);
}

function handleRedirect(res, redirectLocation) {
  res.redirect(302, redirectLocation.pathname + redirectLocation.search);
}

function handleRoute(res, renderProps) {
  const store = configureStore();
  const status = routeIsUnmatched(renderProps) ? 404 : 200;

  const readyOnAllActions = renderProps.components
    .filter(component => component.readyOnActions)
    .map(component => component.readyOnActions(store.dispatch, renderProps.params));


  return Promise
    .all(readyOnAllActions)
    .then(() => {
      return res
        .status(status)
        .send(renderComponentWithRoot(RouterContext, renderProps, store));
    });
}

function routeIsUnmatched(renderProps) {
  return renderProps.routes[renderProps.routes.length - 1].path === '*';
}

function renderComponentWithRoot(Component, componentProps, store) {
  const componentHtml = renderToStaticMarkup(
    <Provider store={store}>
      <Component {...componentProps} />
    </Provider>
  );

  const head = Helmet.rewind();
  const initialState = store.getState();

  return `<!doctype html>\n${renderToStaticMarkup(
    <Root content={componentHtml} initialState={initialState} head={head} />
  )}`;
}

export default serverMiddleware;
