import request from 'request';

export default function statsCommand(context, message) {
  message.channel.sendMessage('I\'ve got you.');

  let battleTag = context.params.shift();
  if (!battleTag) {
    battleTag = 'lazyGamer#11985';
  }

  battleTag = battleTag.replace('#', '-');

  const valid_regions = ['eu', 'us', 'kr', 'cn'];
  const valid_platforms = ['pc', 'xbl', 'psn'];
  const platform = context.params.shift() || 'pc';
  const region = context.params.shift() || 'us';

  if (!valid_regions.includes(region) || !valid_platforms.includes(platform)){
    message.channel.sendMessage('I require medical attention. \nType `val help stats` for info on how to use this comamnd.');
    return
  };

  const battleTag_RegEx = /^[a-zA-Z0-9]+#[0-9]{4,5}$/
  if (battleTag_RegEx.test(battleTag)) {
    message.channel.sendMessage('triggerd');
    console.log('triggerd');
    return
  }

  const query = {
    url: `https://api.lootbox.eu/${platform}/${region}/${battleTag}/profile`,
    json: true
  };

  request(query, (error, response, body) => {
    const success = !error &&
      response.statusCode >= 200 && response.statusCode < 300 &&
      (!body.statusCode || (body.statusCode >= 200 && body.statusCode < 300));

    if (success) {
      let embed = {
        color: 16426522,
        author: { name: body.data.username, icon_url: body.data.avatar },
        title: `${body.data.username}'s PlayOverwatch Stats`,
        url: `https://playoverwatch.com/en-us/career/${platform}/${region}/${battleTag}`,
        description: `Quick summary of ${body.data.username}'s PlayOverwatch stats:`,
        fields: [
          {
            name: 'Skill Rating',
            value: body.data.competitive.rank,
            inline: true
          },
          {
            name: 'Competitive win rate',
            value: Math.round(body.data.games.competitive.wins / body.data.games.competitive.played * 100) + '%',
            inline: true
          },
          {
            name: 'Time played in Comp',
            value: body.data.playtime.competitive,
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
