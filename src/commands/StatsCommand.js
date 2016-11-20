import request from 'request';
import settings from '../../config/env';
import { validateBattleTag, validateRegion, validatePlatform, validateOnlineID, validateGamerTag } from '../utils/Validation';
import { marginColour } from '../utils/Colour';
import { battleTags } from '../utils/BattleTag';

export default function statsCommand(context, message) {

  let user = context.params.shift();
  let platform = context.params.shift().toLowerCase() || 'pc';
  let region = context.params.shift().toLowerCase() || 'us';

  if (!validateRegion(region) || !validatePlatform(platform)){
    message.channel.sendMessage(`I require medical attention. \nNo valid platform/region provided.`);
    return;
  };

  if (platform === 'pc') {

    if (!user) {
      user = battleTags(message.author.id);
    }

    if (!validateBattleTag(user)) {
      message.channel.sendMessage(`I require medical attention. \nI can\'t do anything without a valid BattleTag`);
      return;
    }

    user = user.replace('#', '-');
  }

  if (platform === 'psn' && !validateOnlineID(user)) {
    message.channel.sendMessage(`I require medical attention. \nI can\'t do anything without a valid Online ID`);
    return;
  }

  if (platform === 'xbl' && !validateGamerTag(user)) {
    message.channel.sendMessage(`I require medical attention. \nI can\'t do anything without a valid Gamertag`);
    return;
  }

  let overwatch_url = `https://playoverwatch.com/en-us/career/${platform}/${region}/${user}`;

  if (platform === 'psn' || platform === 'xbl') {
    overwatch_url = `https://playoverwatch.com/en-us/career/${platform}/${user}`;
  }

  message.channel.sendMessage('I\'ve got you.');

  const query = {
    url: `https://api.lootbox.eu/${platform}/${region}/${user}/profile`,
    json: true
  };

  request(query, (error, response, body) => {
    const success = !error && response.statusCode >= 200 && response.statusCode < 300 && (!body.statusCode || (body.statusCode >= 200 && body.statusCode < 300));
    if (success) {

      let comp_rank = body.data.competitive.rank || 'unranked';
      let comp_winrate = Math.round(body.data.games.competitive.wins / body.data.games.competitive.played * 100) + '%';
      let comp_playtime = body.data.playtime.competitive || 'N/A';
      let rank_colour = marginColour(body.data.competitive.rank_img);

      if (!body.data.games.competitive.played) {
        comp_winrate = 'N/A';
      }

      let embed = {
        color: rank_colour,
        author: { name: body.data.username, icon_url: body.data.avatar },
        title: `${body.data.username}'s PlayOverwatch Stats`,
        url: overwatch_url,
        description: `Quick summary of ${body.data.username}'s PlayOverwatch stats:`,
        fields: [
          {
            name: 'Skill Rating',
            value: comp_rank,
            inline: true
          },
          {
            name: 'Competitive win rate',
            value:  comp_winrate,
            inline: true
          },
          {
            name: 'Time played in Comp',
            value: comp_playtime,
            inline: true
          },
          {
            name: 'Level',
            value: body.data.level,
            inline: true
          },
          {
            name: 'QP Wins',
            value: body.data.games.quick.wins,
            inline: true
          },
          {
            name: 'Time played in QP',
            value: body.data.playtime.quick,
            inline: true
          }
        ],
        timestamp: new Date(),
        footer: { icon_url: body.data.competitive.rank_img, text: 'Stats as of '}
      }
      message.channel.sendMessage('', { embed });
    } else {
      console.log(body);
      message.channel.sendMessage('I require medical attention. \n```' + body.error + '```');
    }
  });
}
