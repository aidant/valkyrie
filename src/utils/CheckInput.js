import { validateBattleTag, validateRegion, validatePlatform, validateOnlineID, validateGamerTag, validateHeros, validateMode } from './Validation';
import { battleTags } from './BattleTag';

export function checkStatsInput(context, message) {

  let user = context.params.shift();
  let platform = context.params.shift() || 'pc';
  let region = context.params.shift() || 'us';

  if (!validateRegion(region) || !validatePlatform(platform)){
    message.channel.sendMessage(`I require medical attention. \nNo valid platform/region provided.`);
    return false;
  };

  if (platform === 'pc') {

    if (!user) {
      user = battleTags(message.author.id);
    };

    if (!validateBattleTag(user)) {
      message.channel.sendMessage(`I require medical attention. \nI can\'t do anything without a valid BattleTag.`);
      return false;
    };

    user = user.replace('#', '-');
  };

  if (platform === 'psn' && !validateOnlineID(user)) {
    message.channel.sendMessage(`I require medical attention. \nI can\'t do anything without a valid Online ID.`);
    return false;
  };

  if (platform === 'xbl' && !validateGamerTag(user)) {
    message.channel.sendMessage(`I require medical attention. \nI can\'t do anything without a valid Gamertag.`);
    return false;
  };

  return { user, platform, region };
};

export function checkHeroInput(hero, mode, message) {

  if (!validateHeros(hero)) {
    message.channel.sendMessage(`I require medical attention. \nI can\'t do anything without a valid Hero.`);
    return false;
  };

  if (!validateMode(mode)) {
    message.channel.sendMessage(`I require medical attention. \nI can\'t do anything without a valid Gamemode.`);
    return false;
  };
  return true;
};