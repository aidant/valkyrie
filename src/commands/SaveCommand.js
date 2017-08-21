import Params from '../utils/params';
import User from '../schema/User';
import settings from '../../config/env/'

export default {
  command: ['save'],
  helpShort: `Save your BattleTag and more. Makes ${settings.name} easier to use.`,

  async handler(context, message) {

    let params = await Params(context, message, {
      accountTag: true,
      region: true,
      gamemode: true,
      sensitivity: true,
      mouseDpi: true
    })
    console.log(params)
    if (params.error) return;
    let input = params.result;

    let user = await User.findOne({ discordId: message.author.id });
    if (!user) {
      user = User.create({
        discordId: message.author.id,
      });
    }

    if (input.accountTag) { user.accountTag = input.accountTag };
    if (input.region) { user.region = input.region };
    if (input.sensitivity) { user.sensitivity = input.sensitivity };
    if (input.mouseDpi) { user.mouseDpi = input.mouseDpi };
    if (input.gamemode) { user.gamemode = input.gamemode };

    await user.save();

    let embed = message.embed();

    embed
      .author(message.author.username, null, message.author.avatarURL)
      .fields('Account', user.accountTag)
      .fields('Prefered Region', user.region)
      .fields('Prefered Gamemode', user.gamemode)
      .fields('Sensitivity', user.sensitivity)
      .fields('Mouse DPI', user.mouseDpi)

    if (embed.embed.fields.length < 1) {
        this.help(context, message)
      } else {
        embed.send()
      }

  },
  async help(context, message) {
    message.embed()
      .description('You can save one or more items at a time. Your information can always be updated later.')
      .fields('Account', 'Any valid BattleTag, GamerTag or OnlineID')
      .fields('Region', 'Americas or us, Europe or eu, Asia or kr, xbl, psn')
      .fields('Gamemode', 'Quickplay or qp, Competitive or comp')
      .fields('Mouse DPI', 'Example: `dpi:800`')
      .fields('Sensitivity', 'Example: `sense:7.5`')
      .send(false)
  },
};
