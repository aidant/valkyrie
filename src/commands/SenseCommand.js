import Embed from '../utils/embed';
import Params from '../utils/params';

import User from '../schema/User';

const DISCORD_ID_REGEX = /^[0-9]*$/;

function parseMention(str) {
  const match = str && str.id.match(DISCORD_ID_REGEX);
  return match && match[0];
}

function calcSensitivityInCm(dpi, sense) {
  const conv = 2.54 * 10 / 3;
  return 360 * conv / (sense * dpi * 0.022);
}

export default {
  command: ['sense'],
  helpShort: 'Display your sensitivity settings.',

  async handler(context, message) {

    if (!context.user || (!context.user.mouseDpi || !context.user.sensitivity)) {

      message.embed = function() {
        return new Embed(this);
      }

      message.embed()
        .color()
        .description(`I require your Mouse DPI & Sensitivity. Use the store command to save your information.`)
        .footer()
        .send()
        return;

    }

    const cm360 = calcSensitivityInCm(context.user.mouseDpi, context.user.sensitivity).toFixed(3);

    message.embed = function() {
      return new Embed(this);
    }

    message.embed()
      .color()
      .author(message.author.username, null, message.author.avatarURL)
      .description(`${message.author.username}'s mouse settings`)
      .fields('DPI', context.user.mouseDpi)
      .fields('Sensitivity', context.user.sensitivity)
      .fields('CM/360', cm360)
      .footer()
      .send()
  },
  async help(context, message) {

    message.embed = function() {
      return new Embed(this);
    }

    message.embed()
      .description('First save your information with the store command')
      .footer()
      .send()

  }
};
