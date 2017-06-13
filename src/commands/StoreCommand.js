import Params from '../utils/params';
import Embed from '../utils/embed';

import User from '../schema/User';

export default {
  command: ['store'],
  helpShort: "Save your information so you don't have to type it out every time.",

  async handler(context, message) {

    let input = new Params(context, message).gamemode().region().accountTag().mouseDpi().sensitivity().isAccountTagHidden().result

    if (!input) {
      return;
    }

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

    message.embed = function() {
      return new Embed(this);
    };

    let accountTag = user.accountTag
    if(user.isAccountTagHidden === true) {
      accountTag = `${accountTag.split('#')[0]}#${accountTag.split('#')[1].replace(/[0-9]/g, '-')}`
    }

    message.embed()
      .author(message.author.username, null, message.author.avatarURL)
      .fields('Account', accountTag)
      .fields('Hidden account tag', user.isAccountTagHidden)
      .fields('Region', user.region)
      .fields('Default Gamemode', user.gamemode)
      .fields('Sensitivity', user.sensitivity)
      .fields('Mouse DPI', user.mouseDpi)
      .footer()
      .send()

  },
  async help(context, message) {

    message.embed = function() {
      return new Embed(this);
    };

    message.embed()
      .fields('Account', 'Nothing fancy, just your BattleTag, GamerTag or OnlineID')
      .fields('Hidden account tag', 'hidden:true or hidden:false')
      .fields('Region', 'us, eu, kr, xbl, psn')
      .fields('Default Gamemode', 'quickplay (qp) or competitive (comp)')
      .fields('Mouse DPI', 'Example; dpi:800')
      .fields('Sensitivity', 'Example; sense:7.5')
      .footer()
      .send(false)
  },
};
