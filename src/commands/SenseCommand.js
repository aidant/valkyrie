import Embed from '../utils/embed';
import Params from '../utils/params';
import settings from '../../config/env';
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

    let input = new Params(context, message).mouseDpi(true).sensitivity(true).db().required().result;
    if (input.error) { return; };

    const cm360 = calcSensitivityInCm(input.mouseDpi, input.sensitivity).toFixed(3);

    message.embed = () => { return new Embed(message); };
    message.embed()
      .color()
      .author(message.author.username, null, message.author.avatarURL)
      .description(`${message.author.username}'s mouse settings`)
      .fields('DPI', input.mouseDpi)
      .fields('Sensitivity', input.sensitivity)
      .fields('CM/360', cm360)
      .footer()
      .send()
  },
  async help(context, message) {
    let embed = new Embed(message);

    if(!context.user || (!context.user.mouseDpi || !context.user.sensitivity)) {
      embed.description(`Tip: Save your information with \`${settings.activator} save\``)
    }

    embed
      .fields('Mouse DPI', 'Example: `dpi:800`')
      .fields('Sensitivity', 'Example: `sense:7.5`')
      .footer()
      .send()
  }
};
