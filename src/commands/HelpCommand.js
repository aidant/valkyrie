import settings from '../../config/env';
import { marginColour } from '../utils/Colour';

export default function helpCommand(context, message) {
  const embed = {
    color: marginColour('default'),
    author: { name: `All commands for ${settings.activator}` },
    url: settings.url,
    description: `Example: ${settings.activator} invite`,
    fields: [
      { name: 'Help', value: `Example: ${settings.activator} Help Stats`, inline: false},
      { name: 'Stats', value: 'General Overwatch stats', inline: false },
      { name: 'Invite', value: 'Generates an invite link', inline: false },
      //{ name: 'Hero', value: '**WIP** ~~Overwatch hero specific stats~~', inline: false },
      //{ name: 'Patch', value: '**WIP** ~~Current Overwatch Patch Notes~~', inline: false },
      { name: 'Remember', value: 'I\'ll remember your BattleTag Platform and Region', inline: false }
    ],
    footer: { text: settings.footer }
  };
  message.channel.sendMessage('', { embed });
}
