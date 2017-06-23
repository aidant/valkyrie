import Discord from 'discord.js';

import settings from '../config/env';
import router from './commands';
import User from './schema/User';

const DISCORD_USER_REF_REGEX = /^<@(\d+)>$/;

function logInteraction(context, message) {
  const from = `<${message.author.tag}> `;
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

  client.user.setStatus('online');
  client.user.setGame(`${settings.activator} help`);
  //client.user.setAvatar('./Val-12.png')
    //.then(user => console.log(`New avatar set!`))
    //.catch(console.error);
  console.log(`${client.user.username} serving ${client.users.size} users in ${client.guilds.size} servers;`);
  for (const [key, guild] of client.guilds) {
  console.log(`[${key}]: ${guild.name}`)
  }

});

client.on('message', async message => {
  const parts = message.content.split(/\s+/);
  const activator = parts.shift();

  if (!activator || activator.toLowerCase() !== settings.activator) {
    return;
  }

  const command = router.route(parts);
  if (!command || !command.handler) {
    return;
  }

  if (command.restrictToServer && message.channel.type === 'text') {
    if (command.restrictToServer != message.channel.guild.id) {
      return;
    }
  }

  const context = await createContext(command, parts, message);

  logInteraction(context, message);

  command
    .handler(context, message, client)
    .catch(e => {
      message.channel.send({ embed: {description: 'I require medical attention.', color: 15746887} })
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
