import { validateBattleTag, validateRegion, validatePlatform, validateOnlineID, validateGamerTag, validateHeros, validateMode } from './validation';

export function checkStatsInput(context, message) {

  let user = context.params.shift() || results.battleTag;
  let platform = context.params.shift() || results.platform || 'pc';
  let region = context.params.shift() || results.region || 'us';

  platform = platform.toLowerCase();
  region = region.toLowerCase();

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

export function checkGamemodeInput(mode, message) {

  if (!mode) {
    message.channel.sendMessage(`I require medical attention. \nI can\'t do anything without a gamemode.`);
    return false;
  };

  mode = mode.toLowerCase();
  mode = mode.replace('qp', 'quickplay');
  mode = mode.replace('comp', 'competitive');

  if (!validateMode(mode)) {
    message.channel.sendMessage(`I require medical attention. \nI can\'t do anything without a valid gamemode.`);
    return false;
  };
  return { mode };
};
