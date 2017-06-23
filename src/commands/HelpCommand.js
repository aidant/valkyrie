import settings from '../../config/env';
import Embed from '../utils/embed';

const HELP = [
  "There's no prescription to treat what you have.",
  "You might not want to tell your friends about that.",
  "I'll send you my consultation fee.",
  "I'm not a miracle worker. Well... Not always.",
  "Take two, and call me in the morning.",
  "The prognosis is not good.",
  "Immer unterbricht mich jemand bei der Arbeit.",
];

function generateMercyQuote(message) {
  message.channel.send(HELP[Math.floor(Math.random() * HELP.length)]);
}

function generateHelpIndex(command, message) {
  let embed = new Embed(message);

  const children = Object.keys(command.children).sort();
  children.forEach(name => {
    const child = command.children[name];

    if (!child.isHidden && child.helpShort) {
      embed.fields(name.charAt(0).toUpperCase() + name.slice(1), child.helpShort)
    }
  });

  if (embed.embed.fields.length > 0) {
    embed
      .description(`For more detailed information about each command, type \`${settings.activator} help command-name\`\nExample: \`${settings.activator} help save\``)
      .send(false);
  } else {
    message.embed = () => { return new Embed(message); };
    message.embed()
      .description('There is no extra help information for this command.')
      .send()
  }
}

export default {
  command: ['help'],
  isHidden: true,

  async handler(context, message) {
    const command = context.router.route(context.params);

    if (command) {
      if (command.help) {
        command.help(context, message);
        return;
      }

      if (command.children) {
        generateHelpIndex(command, message);
        return;
      }
    }

    generateHelpIndex(context.router.root, message);
  },

  async help(context, message) {
    generateMercyQuote(message);
  }
};
