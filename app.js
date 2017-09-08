import 'babel-polyfill';
import Bluebird from 'bluebird';
import chalk from 'chalk';
global.Promise = Bluebird;

import bot from './src/bot';
import db from './src/db';

console.log(chalk.hex('#f04747')(`
               _ _               _         \r
   /\\   /\\__ _| | | ___   _ _ __(_) ___    \r
   \\ \\ / / _\` | | |/ / | | | \'__| |/ _ \\   \r
    \\ V / (_| | |   <| |_| | |  | |  __/   \r
     \\_/ \\__,_|_|_|\\_,\\__, |_|  |_|\\___|   \r
      ${chalk.hex('#FFFFFF').underline('Discord Stats Bot')}|___/               \n`));

Promise.resolve()
  .then(db.connect)
  .then(bot.connect)
