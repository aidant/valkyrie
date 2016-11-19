import settings from '../../config/env';

export default function helpStatsCommand(context, message) {
  const embed = {
    color: 15746887,
    author: { name: 'Help Stats' },
    url: 'http://overcomp.akira.gg/',
    description: `${settings.activator} stats BattleTag#1337 psn eu`,
    fields: [
      { name: 'User', value: 'Must be a valid BattleTag', inline: false },
      { name: 'Platform', value: 'Platforms: pc, xbl, psn \nDeafult: pc ', inline: false },
      { name: 'Region', value: 'Regions: eu, us, kr, cn \nDeafult: us ', inline: false },
    ],
    footer: { text: 'Built by LazyGamer & AkiraYasha' }
  };
  message.channel.sendMessage('', { embed });
}
