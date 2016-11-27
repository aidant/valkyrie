import 'babel-polyfill';
import Discord from 'discord.js';
import settings from './config/env';
import commands from './src/commands';

// This is required code for the bot to function, just saying.
console.log();
console.log(' __    __)                   ');
console.log('(, )  /     /) /)       ,    ');
console.log('   | / _   // (/_  __      _ ');
console.log('   |/ (_(_(/_ /(__/ (__(__(/_');
console.log('   | Discord Stats Bot       ');
console.log();

const client = new Discord.Client();
const VAL = [
'Did someone call for a witch?',
'Right beside you.',
'Valkyrie im Bereitschaftsdienst.',
'I\'m here.',
'I\'ll enjoy the quiet while it lasts.',
'Valkyrie online.',
'Operating at maximum efficiency.',
'Medic!... Wait, that\'s me!'
]

function logInteraction(message, command) {
  const from = `<${message.author.username}#${message.author.discriminator}> `;
  let channel = '';

  if (message.channel.type === 'text') {
    channel = `[${message.channel.guild.name}:#${message.channel.name}] `;
  }

  const commandStr = command.command.join(' ');
  const paramsStr = command.params.join(' ');

  console.log(`${channel}${from} command: '${commandStr}' params: '${paramsStr}'`);
}

client.on('ready', () => {
  commands.report();

  console.log('Valkyrie connected.');
  client.user.setStatus('dnd');
  client.user.setGame('val help');
});

client.on('message', message => {
  const parts = message.content.split(' ');
  const activator = parts.shift();

  if (!activator || activator.toLowerCase() !== settings.activator) {
    return;
  }

  const command = commands.route(parts);
  if (!command) {
    message.channel.sendMessage(VAL[Math.floor(Math.random()*VAL.length)]);
    return;
  }

  logInteraction(message, command);

  try {
    command.handler(command, message);
  } catch (e) {
    message.channel.sendMessage('I require medical attention.')
    console.error(e);
  }
});

if (!settings.token) {
  console.error('Please configure a discord login token.');
  process.exit(1);
}

client.login(settings.token);
