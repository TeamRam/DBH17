const initialState = {
  ethAddress: {
    loading: false,
    error: null,
    response: {
      blockchainAddress: '0xa4d9f4d7bcf2749e1c2b5a46557f53bd27566b26',
      credential: 'testsetsetset',
      password: 'test1234'
    }
  }
};

export default function rest(state = initialState, action) {
  let resName;
  let resource;

  switch (action.type) {
    case 'USER_LOGOUT':
      return initialState;
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
        // TODO uncomment when removing hardcoded data
        // response: action.response
      };

      return { ...state, [resName]: resource };
    default:
      return state;
  }
}
