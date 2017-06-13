import settings from '../../config/env';
import marginColor from '../utils/color';

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
  const fields = [];

  const children = Object.keys(command.children).sort();
  children.forEach(name => {
    const child = command.children[name];

    if (!child.isHidden && child.helpShort) {
      fields.push({
        name: name.charAt(0).toUpperCase() + name.slice(1),
        value: child.helpShort,
        inline: false,
      });
    }
  });

  if (fields.length > 0) {
    const embed = {
      fields,
      footer: { text: settings.footer }
    };

    message.channel.send('', { embed });
  } else {
    // TODO(akira): What should be done when there are no sub-commands visible?
    generateMercyQuote(message);
  }
}

export default {
  command: ['help'],
  helpShort: `Example; ${settings.activator} help stats`,

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
