import path from 'path';

const env = process.env.NODE_ENV || 'development';
const config = require(`./${env}`)

const rootPath = path.join(__dirname, '..', '..', '..');

const defaults = {
  token: false,
  activator: 'val',
  url: 'http://overcomp.akira.gg',
  footer: 'Built by LazyGamer & AkiraYasha',
  databaseUri: 'nedb://' + path.join(rootPath, 'data'),
};

export default Object.assign(defaults, config);
