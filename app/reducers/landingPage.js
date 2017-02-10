const initialState = {
  name: 'Pink'
};

export default function landingPage(state = initialState, action) {
  switch (action.type) {
    case 'landingPage/CHANGE_NAME':
      if (state.name === 'Pink') {
        return { ...state, name: 'Floyd' };
      }

      return { ...state, name: 'Pink' };
    default:
      return state;
  }
}
