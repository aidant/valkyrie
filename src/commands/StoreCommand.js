import { validateBattleTag } from '../utils/validation';
import { checkStatsInput } from '../utils/checkInput';

import User from '../schema/User';

export default {
  command: ['store'],
  isHidden: true,
  helpShort: "I'll remember your Username, Platform and Region",

  async handler(context, message) {
    let userInput = checkStatsInput(context, message);

    if (!userInput) {
      return;
    }

    let battleTag = userInput.user;
    let platform = userInput.platform;
    let region = userInput.region;

    let user = await User.findOne({ discordId: message.author.id });
    if (!user) {
      user = User.create({
        discordId: message.author.id,
      });
    }

    user.battleTag = battleTag;
    user.platform = platform;
    user.region = region;

    await user.save();

    message.channel.sendMessage('Verstanden.');
  },
};
