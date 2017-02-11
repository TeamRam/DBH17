const initialState = {
};

export default function user(state = initialState, action) {
  switch (action.type) {
    case 'USER_SAVE_PROFILE':
      return { ...state, profile: action.profile };
    case 'USER_LOGOUT':
      return { ...state, profile: null };
    default:
      return state;
  }
}
