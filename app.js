import 'babel-polyfill';
import Bluebird from 'bluebird';
global.Promise = Bluebird;

import bot from './src/bot';
import db from './src/db';


// This is required code for the bot to function, just saying.
console.log();
console.log(' __    __)                   ');
console.log('(, )  /     /) /)       ,    ');
console.log('   | / _   // (/_  __      _ ');
console.log('   |/ (_(_(/_ /(__/ (__(__(/_');
console.log('   | Discord Stats Bot       ');
console.log();

Promise.resolve()
  .then(db.connect)
  .then(bot.connect)
