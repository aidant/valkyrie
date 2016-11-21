import request from 'request';
import settings from '../../config/env';
import { checkStatsInput, checkHeroInput } from '../utils/checkInput';
import { marginColour } from '../utils/Colour';

export default function statsCommand(context, message) {

  let hero = context.params.shift();
  let mode = context.params.shift();
  let userInput = checkStatsInput(context, message);
  let userInputHeros = checkHeroInput(hero, mode, message);

  if (userInput.result === false || userInputHeros.result === false) {
    return;
  }

  let user = userInput.user;
  let platform = userInput.platform;
  let region = userInput.region;
  let overwatch_url = `https://playoverwatch.com/en-us/career/${platform}/${region}/${user}`;

  if (platform === 'psn' || platform === 'xbl') {
    overwatch_url = `https://playoverwatch.com/en-us/career/${platform}/${user}`;
  };

  const query = {
    url: `https://api.lootbox.eu/${platform}/${region}/${user}/${mode}/hero/${hero}/`,
    json: true
  };

  message.channel.sendMessage('I\'ve got you.');

  request(query, (error, response, body) => {
    const success = !error && response.statusCode >= 200 && response.statusCode < 300 && (!body.statusCode || (body.statusCode >= 200 && body.statusCode < 300));
    if (success) {

      let colour = marginColour('default');
      let embed = {
        color: colour,
        author: { name: user },
        title: `${user}'s PlayOverwatch Stats`,
        url: `https://playoverwatch.com/en-us/career/${platform}/${region}/${user}`,
        description: `Quick summary of ${user}'s PlayOverwatch stats:`,
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
