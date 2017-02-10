import radium from 'radium';

let mediaValues = {};

function ConfiguredRadium(component) {
  return radium({
    matchMedia: mediaValues
  })(component);
}

ConfiguredRadium.injectMediaValues = function (_mediaValues) {
  mediaValues = _mediaValues;
};

export * from 'radium';
export default ConfiguredRadium;
