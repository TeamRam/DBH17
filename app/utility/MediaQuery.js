import React from 'react';
import MediaQuery from 'react-responsive';

let mediaValues = {};

const MediaQueryWithValues = (props) => {
  return (
    <MediaQuery values={mediaValues} {...props} />
  );
};

MediaQueryWithValues.injectMediaValues = function (_mediaValues) {
  mediaValues = _mediaValues;
};

export * from 'react-responsive';

export default MediaQueryWithValues;
