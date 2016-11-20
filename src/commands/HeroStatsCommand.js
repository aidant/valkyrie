import request from 'request';
import settings from '../../config/env';
import { validateBattleTag, validateRegion, validatePlatform, validateMode, validateHeros } from '../utils/Validation';
import { marginColour } from '../utils/Colour';
import { battleTags } from '../utils/BattleTag';

export default function heroStatsCommand(context, message) {

  let hero = context.params.shift() || 'Mercy';
  let mode = context.params.shift() ;
  let battleTag = context.params.shift();
  let platform = context.params.shift() || 'pc';
  let region = context.params.shift() || 'us';

  if (!battleTag) {
    battleTag = battleTags(message.author.id);
  }

  if (!validateBattleTag(battleTag)) {
    message.channel.sendMessage(`I require medical attention. \nI can\'t do anything without a valid BattleTag.`);
    return;
  }

  battleTag = battleTag.replace('#', '-');

  if (!validateMode(mode)){
    message.channel.sendMessage(`I require medical attention. \nI can\'t do anything without a valid gamemode `);
    return;
  };

  if (!validateRegion(region) || !validatePlatform(platform)){
    message.channel.sendMessage(`I require medical attention. \nI can\'t do anything without a valid platform/region.`);
    return;
  };

    if (!validateHeros(hero)){
    message.channel.sendMessage(`I require medical attention. \nI can\'t do anything without a valid Hero.`);
    return;
  };

  message.channel.sendMessage('I\'ve got you.');

  const query = {
    url: `https://api.lootbox.eu/${platform}/${region}/${battleTag}/${mode}/hero/${hero}/`,
    json: true
  };

  request(query, (error, response, body) => {
    const success = !error && response.statusCode >= 200 && response.statusCode < 300 && (!body.statusCode || (body.statusCode >= 200 && body.statusCode < 300));
    if (success) {

      let colour = marginColour('default');
      let embed = {
        color: colour,
        author: { name: battleTag },
        title: `${battleTag}'s PlayOverwatch Stats`,
        url: `https://playoverwatch.com/en-us/career/${platform}/${region}/${battleTag}`,
        description: `Quick summary of ${battleTag}'s PlayOverwatch stats:`,
        fields: [
          {
            name: 'Time Played',
            value: body[hero].TimePlayed,
            inline: true
          }
        ],
        timestamp: new Date(),
        footer: {text: 'Stats as of '}
      }
      message.channel.sendMessage('', { embed });
    } else {
      console.log(body);
      message.channel.sendMessage('I require medical attention. \n```' + body.error + '```')
    }
  });
}
