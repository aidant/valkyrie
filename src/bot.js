import Discord from 'discord.js';

import settings from '../config/env';
import router from './commands';
import User from './schema/User';

const VAL = [
  "Did someone call for a witch?",
  "Right beside you.",
  "Valkyrie im Bereitschaftsdienst.",
  "I'm here.",
  "I'll enjoy the quiet while it lasts.",
  "Valkyrie online.",
  "Operating at maximum efficiency.",
  "Medic!... Wait, that's me!"
];

const DISCORD_USER_REF_REGEX = /^<@(\d+)>$/;

function logInteraction(context, message) {
  const from = `<${message.author.username}#${message.author.discriminator}> `;
  let channel = '';

  if (message.channel.type === 'text') {
    channel = `[${message.channel.guild.name}:#${message.channel.name}] `;
  }

  const commandStr = context.path.join(' ');
  const paramsStr = context.params.join(' ');

  console.log(`${channel}${from} command: '${commandStr}' params: '${paramsStr}'`);
}

async function createContext(command, parts, message) {
  // Generate params array
  const params = [];
  parts.slice(command.path.length).forEach(part => {
    const userRef = part.match(DISCORD_USER_REF_REGEX);
    if (userRef) {
      params.push(message.mentions.users.get(userRef[1]));
      return;
    }

    params.push(part);
  });

  // Load user from database if they exist
  const user = await User.findOne({ discordId: message.author.id });

  return Object.assign({}, command, {
    router,
    user,
    params,
  });
}

const client = new Discord.Client();

client.on('ready', () => {
  router.report();

  console.log('Valkyrie connected.');
  client.user.setStatus('dnd');
  client.user.setGame('val help');
});

client.on('message', async message => {
  const parts = message.content.split(/\s+/);
  const activator = parts.shift();

  if (!activator || activator.toLowerCase() !== settings.activator) {
    return;
  }

  const command = router.route(parts);
  if (!command || !command.handler) {
    message.channel.sendMessage(VAL[Math.floor(Math.random()*VAL.length)]);
    return;
  }

  const context = await createContext(command, parts, message);
  console.log(context);

  logInteraction(context, message);

  command
    .handler(context, message)
    .catch(e => {
      message.channel.sendMessage('I require medical attention.')
      console.error(e);
    });
});

if (!settings.token) {
  console.error('Please configure a discord login token.');
  process.exit(1);
}

export default {
  connect() {
    return client.login(settings.token);
  }
};
