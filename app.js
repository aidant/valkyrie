import 'babel-polyfill';
import Bluebird from 'bluebird';
global.Promise = Bluebird;

import bot from './src/bot';
import db from './src/db';


console.log('            _ _               _      ');
console.log('/\\   /\\__ _| | | ___   _ _ __(_) ___ ');
console.log('\\ \\ / / _` | | |/ / | | | \'__| |/ _ \\');
console.log(' \\ V / (_| | |   <| |_| | |  | |  __/');
console.log('  \\_/ \\__,_|_|_|\\_\\___, |_|  |_|\\___|');
console.log('  Discord Stats Bot|___/             ');
console.log();

Promise.resolve()
  .then(db.connect)
  .then(bot.connect)
