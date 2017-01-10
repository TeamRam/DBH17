import React from 'react';
import ReactDOM from 'react-dom';
import { renderToStaticMarkup } from 'react-dom/server';
import { Router, match, RouterContext, browserHistory } from 'react-router';
import Helmet from 'react-helmet';
import { Provider } from 'react-redux';
import injectTapEventPlugin from 'react-tap-event-plugin';
import { persistStore } from 'redux-persist';
import createFilter from 'redux-persist-transform-filter';
import { StyleRoot } from 'radium';

import configureStore from './configureStore';
import config from './config';

import routes, { getRoutes } from './Routes';
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
      routes: getRoutes(store),
      history: browserHistory,
    }, (error, redirectLocation, routeProps) => {
      ReactDOM.render(
        <Provider store={store}>
          <StyleRoot>
            <Router {...routeProps} onUpdate={onRouteUpdate} />
          </StyleRoot>
        </Provider>,
        document.getElementById('root')
      );
    });
  });
}

function renderComponentWithRoot(Component, componentProps, store) {
  const componentHtml = renderToStaticMarkup(
    <Provider store={store}>
      <StyleRoot>
        <Component {...componentProps} />
      </StyleRoot>
    </Provider>
  );

  const head = Helmet.rewind();
  const initialState = store.getState();

  return `<!doctype html>\n${renderToStaticMarkup(
    <Root content={componentHtml} initialState={initialState} head={head} />
  )}`;
}

function handleError(res, error) {
  res.status(500).send(error.message);
}

function handleRedirect(res, redirectLocation) {
  res.redirect(302, redirectLocation.pathname + redirectLocation.search);
}

function routeIsUnmatched(renderProps) {
  return renderProps.routes[renderProps.routes.length - 1].path === '*';
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

export const lambdaHandleRoute = ({ location, basename, headers = {}, callback = () => { } }) => {
  // http://stackoverflow.com/questions/35481084/react-starter-kit-and-material-ui-useragent-should-be-supplied-in-the-muitheme/35530465
  const userAgent = headers['User-Agent'];

  global.navigator = global.navigator || {};
  global.navigator.userAgent = userAgent || 'all';

  match({ routes, location, basename }, (error, redirectLocation, renderProps) => {
    if (renderProps) {
      const store = configureStore();
      const readyOnAllActions = renderProps.components
        .filter(component => component.readyOnActions)
        .map(component => component.readyOnActions(store.dispatch, renderProps.params));

      Promise
        .all(readyOnAllActions)
        .then(() => renderComponentWithRoot(RouterContext, renderProps, store))
        .then(callback);
    } else {
      // error, redirectLocation, catchall
      console.log(`🐫  ${error} - ${redirectLocation}`);
    }
  });
};

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

export default serverMiddleware;
