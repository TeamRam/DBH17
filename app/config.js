import url from 'url';

export default {
  base: '/',
  assetsFolder: '/',
  bundle: 'app.js',
  asset(filename) {
    return url.resolve(this.assetsFolder, filename);
  }
};
