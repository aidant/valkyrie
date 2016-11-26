import settings from '../../config/env';
import { marginColour } from '../utils/Colour';

export default function helpCommand(context, message) {
  const embed = {
    color: marginColour('default'),
    fields: [
      { name: 'Help', value: `Example: ${settings.activator} Help Stats`, inline: false},
      { name: 'Stats', value: 'General Overwatch stats', inline: false },
      { name: 'Invite', value: 'Generates an invite link', inline: false },
      { name: 'Heroes', value: 'Top 6 most played heros.', inline: false },
      //{ name: 'Store', value: 'I\'ll remember your Username, Platform and Region', inline: false }
    ],
    footer: { text: settings.footer }
  };
  message.channel.sendMessage('', { embed });
};
