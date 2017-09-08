import Discord from 'discord.js';

import settings from '../config/env';
import router from './commands';
import User from './schema/User';
import Embed from './utils/embed';
import typing from './utils/typing';

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
const hook = new Discord.WebhookClient(settings.webhookClientId, settings.webhookToken);
hook.embed = () => { return new Embed(hook); };

client.on('ready', () => {
  router.report();

  client.user.setStatus('online');
  client.user.setPresence({ game: { name: `${settings.activator} help`, type: 0 } });
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

  message.typing = typing(message);
  message.embed = () => { return new Embed(message); };
  const context = await createContext(command, parts, message);

  logInteraction(context, message);

  command
    .handler(context, message, client)
    .catch(e => {
      message.embed()
        .description(`A wild error has occurred. Try reporting it with \`${settings.activator} report\``)
        .color(15746887)
        .send()
      hook.embed()
        .author(message.author.username, null, message.author.avatarURL)
        .description(message.content)
        .fields('Error', `${e}`)
        .timestamp()
        .sendHook()
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
