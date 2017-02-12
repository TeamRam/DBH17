const initialState = {
  selectedType: 1
};

export default function user(state = initialState, action) {
  switch (action.type) {
    case 'INVESTMENT_SELECT_TYPE':
      return { ...state, selectedType: action.index };
    default:
      return state;
  }
}
