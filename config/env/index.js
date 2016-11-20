import path from 'path';

const env = process.env.NODE_ENV || 'development';
const config = require(`./${env}`)

const defaults = {
  token: false,
  activator: 'val',
  url: 'http://overcomp.akira.gg',
  footer: 'Built by LazyGamer & AkiraYasha'
};

export default Object.assign(defaults, config);
