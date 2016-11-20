import settings from '../../config/env';
import { marginColour } from '../utils/Colour';

export default function helpStatsCommand(context, message) {
  const embed = {
    color: marginColour('default'),
    author: { name: 'Help Stats' },
    url: settings.url,
    description: `${settings.activator} stats BattleTag#1337 psn eu`,
    fields: [
      { name: 'User', value: 'Must be a valid BattleTag', inline: false },
      { name: 'Platform', value: 'Platforms: pc, xbl, psn \nDeafult: pc ', inline: false },
      { name: 'Region', value: 'Regions: eu, us, kr, cn \nDeafult: us ', inline: false },
    ],
    footer: { text: settings.footer }
  };
  message.channel.sendMessage('', { embed });
}
