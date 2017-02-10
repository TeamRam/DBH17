const initialState = {
  windowHeight: typeof window === 'object' ? window.innerHeight : null,
  windowWidth: typeof window === 'object' ? window.innerWidth : null,
  scrollV: 0
};

export default function window(state = initialState, action) {
  switch (action.type) {
    case 'window/SCREEN_RESIZE':
      return { ...state, windowWidth: action.windowWidth, windowHeight: action.windowHeight };
    case 'window/WINDOW_SCROLL':
      return { ...state, scrollV: action.scrollV };
    default:
      return state;
  }
}
