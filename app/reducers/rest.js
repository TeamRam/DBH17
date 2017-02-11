const initialState = {
};

export default function rest(state = initialState, action) {
  let resName;
  let resource;

  switch (action.type) {
    case 'REST_GET_LOADING':
      resName = action.resource;
      resource = {
        ...state[resName],
        loading: true,
        error: null
      };

      return { ...state, [resName]: resource };
    case 'REST_GET_ERROR':
      resName = action.resource;
      resource = {
        ...state[resName],
        loading: false,
        error: action.error
      };

      return { ...state, [resName]: resource };
    case 'REST_GET_SUCCESS':
      resName = action.resource;
      resource = {
        ...state[resName],
        loading: false,
        error: null,
        response: action.response
      };

      return { ...state, [resName]: resource };
    default:
      return state;
  }
}
