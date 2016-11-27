import { validateBattleTag } from '../utils/validation';
import { checkStatsInput } from '../utils/checkInput';
import db from '../utils/db';

export default {
  command: ['store'],

  async handler(context, message) {
    let userInput = checkStatsInput(context, message);

    if (!userInput) {
      return;
    }

    let battleTag = userInput.user;
    let platform = userInput.platform;
    let region = userInput.region;

    const query = {
      discordId: message.author.id,
    };

    const update = {
      battleTag,
      platform,
      region,
      discordId: message.author.id,
    };

    const options = {
      upsert: true,
    };

    await db.username.update(query, update, options, (err, result) => {
      message.channel.sendMessage('Verstanden.');
    });
  }
};
