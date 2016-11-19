import settings from '../../config/env';

export default function helpCommand(context, message) {
  const embed = {
    color: 15746887,
    author: { name: `All commands for ${settings.activator}` },
    url: 'http://overcomp.akira.gg/',
    description: `Example: ${settings.activator} invite`,
    fields: [
      { name: 'Help', value: 'Info on how to use the command provided', inline: false},
      { name: 'Stats', value: 'General Overwatch stats', inline: false },
      { name: 'Invite', value: 'Generates an invite link', inline: false },
      { name: 'Hero', value: 'Overwatch hero specific stats', inline: false },
      { name: 'Patch', value: 'Current Overwatch Patch Notes', inline: false },
      { name: 'Store', value: 'Stores a users BattleTag', inline: false }
    ],
    footer: { text: 'Built by LazyGamer & AkiraYasha' },
  };
  message.channel.sendMessage('', { embed });
}
