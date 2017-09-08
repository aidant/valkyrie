import Params from '../utils/params';
import settings from '../../config/env';
import User from '../schema/User';

function calcSensitivityInCm(dpi, sense) {
  const conv = 2.54 * 10 / 3;
  return 360 * conv / (sense * dpi * 0.022);
}

export default {
  command: ['sense'],
  helpShort: 'Display your sensitivity settings.',
  async handler(context, message) {
    let params = await Params(context, message, {
      sensitivity: {
        required: true
      },
      mouseDpi: {
        required: true
      },
      db: true,
      mentions: true
    })
    console.log(params)
    if (params.error) { return; };
    let input = params.result

    const cm360 = calcSensitivityInCm(input.mouseDpi, input.sensitivity).toFixed(3);

    message.embed()
      .color()
      .author(message.author.username, null, message.author.avatarURL)
      .description(`${message.author.username}'s mouse settings`)
      .fields('DPI', input.mouseDpi)
      .fields('Sensitivity', input.sensitivity)
      .fields('CM/360', cm360)
      .send()
  },
  async help(context, message) {
    let embed = message.embed();

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
