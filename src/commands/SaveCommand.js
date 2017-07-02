import Params from '../utils/params';
import hideAccountTag from '../utils/hideAccountTag';
import User from '../schema/User';
import settings from '../../config/env/'

export default {
  command: ['save'],
  helpShort: `Save your BattleTag and more. Makes ${settings.name} easier to use.`,

  async handler(context, message) {

    let input = new Params(context, message).gamemode().region().accountTag().mouseDpi().sensitivity().isAccountTagHidden().required().result
    if (input.error) { return; };

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
    if (input.isAccountTagHidden === true || input.isAccountTagHidden === false) { user.isAccountTagHidden = input.isAccountTagHidden };

    await user.save();

    let embed = message.embed();

    embed
      .author(message.author.username, null, message.author.avatarURL)
      .fields('Account', hideAccountTag(user.accountTag, user.isAccountTagHidden))
      .fields('Hidden BattleTag', user.isAccountTagHidden)
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
      .fields('Account', 'Nothing fancy, just your BattleTag, GamerTag or OnlineID')
      .fields('Hidden BattleTag', '`hidden:true` or `hidden:false`\nWhen true your full BattleTag won\'t be shown.')
      .fields('Region', '`us`, `eu`, `kr`, `xbl`, `psn`')
      .fields('Gamemode', '`quickplay`, (`qp`) or `competitive`, (`comp`)')
      .fields('Mouse DPI', 'Example: `dpi:800`')
      .fields('Sensitivity', 'Example: `sense:7.5`')
      .footer()
      .send(false)
  },
};
