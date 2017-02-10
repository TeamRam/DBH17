export const screenResize = (width, height) => {
  return {
    type: 'window/SCREEN_RESIZE',
    windowWidth: width,
    windowHeight: height
  };
};

export const scrollChange = (scrollV) => {
  return {
    type: 'window/WINDOW_SCROLL',
    scrollV
  };
};
