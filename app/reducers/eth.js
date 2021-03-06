const initialState = {
};

export default function eth(state = initialState, action) {
  let address;
  let resource;

  switch (action.type) {
    case 'USER_LOGOUT':
      return initialState;
    case 'ETH_BALANCE_LOADING':
      address = action.address;
      resource = {
        ...state[address],
        loading: true,
        error: null
      };

      return { ...state, [address]: resource };
    case 'ETH_BALANCE_ERROR':
      address = action.address;
      resource = {
        ...state[address],
        loading: false,
        error: action.error
      };

      return { ...state, [address]: resource };
    case 'ETH_BALANCE_SUCCESS':
      address = action.address;
      resource = {
        ...state[address],
        loading: false,
        error: null,
        response: action.response
      };

      return { ...state, [address]: resource };
    case 'ETH_BALANCES':
      return { ...state, balances: action.balances };
    default:
      return state;
  }
}
