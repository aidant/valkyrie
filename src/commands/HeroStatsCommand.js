import request from 'request';

export default function heroStatsCommand(context, message) {
  message.channel.sendMessage('I\'ve got you.');

  const hero = context.params.shift() || 'Mercy';

  let battleTag = context.params.shift();
  if (!battleTag) {
    battleTag = 'lazyGamer#11985';
  }

  battleTag = battleTag.replace('#', '-');

  const mode = context.params.shift() || 'quickplay';
  const platform = context.params.shift() || 'pc';
  const region = context.params.shift() || 'us';

  const query = {
    url: `https://api.lootbox.eu/${platform}/${region}/${battleTag}/${mode}/hero/${hero}/`,
    json: true
  };

  request(query, (error, response, body) => {
    const success = !error &&
      response.statusCode >= 200 && response.statusCode < 300 &&
      (!body.statusCode || (body.statusCode >= 200 && body.statusCode < 300));

    if (success) {
      let embed = {
        color: 16426522,
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
