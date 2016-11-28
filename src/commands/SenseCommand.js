import settings from '../../config/env';
import { marginColour } from '../utils/colour';

import User from '../schema/User';

const DISCORD_ID_REGEX = /^<@(\d+)>$/;

function parseMention(str) {
  const match = str && str.match(DISCORD_ID_REGEX);
  return match && match[1];
}

function calcSensitivityInCm(dpi, sense) {
  const conv = 2.54 * 10 / 3;
  return 360 * conv / (sense * dpi * 0.022);
}

export default {
  command: ['sense'],
  helpShort: "Player sensitivity settings",

  async handler(context, message) {
    const target = parseMention(context.params.shift());
    if (!target) {
      message.channel.sendMessage('I do not understand');
      return;
    }

    const discordPlayer = message.mentions.users.get(target);


    const player = await User.findOne({ discordId: target });
    if (!player) {
      message.channel.sendMessage('I do not know anything about that person.');
      return;
    }

    if (!player.sensitivity || !player.mouseDpi) {
      message.channel.sendMessage('I do not know that players mouse settings.');
      return;
    }

    console.log(discordPlayer);

    const cm360 = calcSensitivityInCm(player.mouseDpi, player.sensitivity).toFixed(3);
    console.log(cm360);

    let embed = {
      author: { name: discordPlayer.username, icon_url: discordPlayer.avatar },
      title: `${discordPlayer.username}'s Mouse settings`,
      fields: [
        {
          name: 'Mouse DPI',
          value: player.mouseDpi,
          inline: true
        },
        {
          name: 'Sensitivity',
          value: player.sensitivity,
          inline: true
        },
        {
          name: 'CM/360',
          value: cm360,
          inline: true
        },
      ],
      footer: { text: settings.footer }
    };

    message.channel.sendMessage('', { embed });
  }
};
