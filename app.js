import 'babel-polyfill';
import Bluebird from 'bluebird';
import chalk from 'chalk';
global.Promise = Bluebird;

import bot from './src/bot';
import db from './src/db';

console.log(chalk`
{red                  _ _               _
     /\\   /\\__ _| | | ___   _ _ __(_) ___
     \\ \\ / / _\` | | |/ / | | | \'__| |/ _ \\
      \\ V / (_| | |   <| |_| | |  | |  __/
       \\_/ \\__,_|_|_|\\_,\\__, |_|  |_|\\___|}
       {reset.underline Discord Stats Bot}{red |___/}
`)

Promise.resolve()
  .then(db.connect)
  .then(bot.connect)
