import 'babel-polyfill';
import Discord from 'discord.js';
import settings from './config/env';
import commands from './src/commands';

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

client.on('ready', () => {
  console.log('Valkyrie online.');
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
