import { validateBattleTag } from '../utils/Validation';
import { checkStatsInput } from '../utils/checkInput';
var Datastore = require('nedb')
  , db = new Datastore({ filename: 'BattleTags.json', autoload: true });


export default function storeCommand(context, message) {

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

  db.update(query, update, options, (err, result) => {
    console.log(err);
    console.log(result);
  });
};
