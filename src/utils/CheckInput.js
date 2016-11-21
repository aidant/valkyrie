import { validateBattleTag, validateRegion, validatePlatform, validateOnlineID, validateGamerTag, validateHeros, validateMode } from './Validation';
import { battleTags } from './BattleTag';

export function checkStatsInput(context, message) {

  let user = context.params.shift();
  let platform = context.params.shift() || 'pc';
  let region = context.params.shift() || 'us';
  let result = false;

  if (!validateRegion(region) || !validatePlatform(platform)){
    message.channel.sendMessage(`I require medical attention. \nNo valid platform/region provided.`);
    return { result };
  };

  if (platform === 'pc') {

    if (!user) {
      user = battleTags(message.author.id);
    };

    if (!validateBattleTag(user)) {
      message.channel.sendMessage(`I require medical attention. \nI can\'t do anything without a valid BattleTag.`);
      return { result };
    };

    user = user.replace('#', '-');
  };

  if (platform === 'psn' && !validateOnlineID(user)) {
    message.channel.sendMessage(`I require medical attention. \nI can\'t do anything without a valid Online ID.`);
    return { result };
  };

  if (platform === 'xbl' && !validateGamerTag(user)) {
    message.channel.sendMessage(`I require medical attention. \nI can\'t do anything without a valid Gamertag.`);
    return { result };
  };

  result = true;
  return { user, platform, region, result };
};

export function checkHeroInput(hero, mode, message) {

  let result = false;

  if (!validateHeros(hero)) {
    message.channel.sendMessage(`I require medical attention. \nI can\'t do anything without a valid Hero.`);
    return { result };
  };

  if (!validateMode(mode)) {
    message.channel.sendMessage(`I require medical attention. \nI can\'t do anything without a valid Gamemode.`);
    return { result };
  };

  result = true;
  return { result };
};
