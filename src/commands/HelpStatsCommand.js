import settings from '../../config/env';
import { marginColour } from '../utils/colour';

export default function helpStatsCommand(context, message) {
  const embed = {
    color: marginColour('default'),
    fields: [
      { name: 'User', value: 'Must be a valid BattleTag, Gamertag or Online ID', inline: false },
      { name: 'Platform', value: 'Platforms: pc, xbl, psn \nDeafult: pc ', inline: false },
      { name: 'Region', value: 'Regions: eu, us, kr, cn \nDeafult: us ', inline: false },
    ],
    footer: { text: settings.footer }
  };
  message.channel.sendMessage('', { embed });
};
