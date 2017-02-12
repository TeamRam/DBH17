import { getBalance } from './eth';

const restDomain = 'http://10.20.100.97:8080';

export const restGet = (resource, endpoint) => {
  return (dispatch) => {
    dispatch({
      type: 'REST_GET_LOADING',
      resource
    });
    try {
      return fetch(restDomain + endpoint)
        .then(response => response.json().then(body => ({ response, body })))
        .then(({ response, body }) => {
          if (!response.ok) {
            dispatch({
              type: 'REST_GET_ERROR',
              resource,
              error: body.error
            });
          } else {
            dispatch(getBalance(body.blockchainAddress));
            dispatch({
              type: 'REST_GET_SUCCESS',
              resource,
              response: body
            });
          }
        }).catch((e) => {
          dispatch({
            type: 'REST_GET_ERROR',
            resource,
            error: e
          });
        });
    } catch (e) {
      dispatch({
        type: 'REST_GET_ERROR',
        resource,
        error: e
      });
    }
  };
};
