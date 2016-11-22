import request from 'request';
import settings from '../../config/env';
import { checkStatsInput, checkHeroInput } from '../utils/checkInput';
import { marginColour } from '../utils/Colour';

export default function statsCommand(context, message) {

  let mode = context.params.shift();
  mode = mode.toLowerCase();
  let userInput = checkStatsInput(context, message);
  let userInputHeros = checkHeroInput(mode, message);

  if (!userInput || !userInputHeros) {
    return;
  }

  mode = userInputHeros.mode;
  let user = userInput.user;
  let platform = userInput.platform;
  let region = userInput.region;
  let overwatch_url = `https://playoverwatch.com/en-us/career/${platform}/${region}/${user}`;

  if (platform === 'psn' || platform === 'xbl') {
    overwatch_url = `https://playoverwatch.com/en-us/career/${platform}/${user}`;
  };

  const query = {
    url: `https://api.lootbox.eu/${platform}/${region}/${user}/${mode}/heroes`,
    json: true
  };
  console.log(query)

  message.channel.sendMessage('I\'ve got you.');

  request(query, (error, response, body) => {
    const success = !error && response.statusCode >= 200 && response.statusCode < 300 && (!body.statusCode || (body.statusCode >= 200 && body.statusCode < 300));
    if (success) {

      let hero1 = body[0];
      let hero2 = body[1];
      let hero3 = body[2];
      let hero4 = body[3];
      let hero5 = body[4];
      let hero6 = body[5];
      let colour = marginColour(hero1.name);
      let name = user.split('-');
      name = name[0];
      let embed = {
        color: colour,
        author: { name: name, icon_url: hero1.image },
        title: `${name}'s Overwatch stats`,
        url: `https://playoverwatch.com/en-us/career/${platform}/${region}/${user}`,
        description: `Quick summary of ${name}'s Hero stats:`,
        fields: [
          {
            name: hero1.name,
            value: hero1.playtime,
            inline: true
          },
          {
            name: hero2.name,
            value: hero2.playtime,
            inline: true
          },
          {
            name: hero3.name,
            value: hero3.playtime,
            inline: true
          },
          {
            name: hero4.name,
            value: hero4.playtime,
            inline: true
          },
          {
            name: hero5.name,
            value: hero5.playtime,
            inline: true
          },
          {
            name: hero6.name,
            value: hero6.playtime,
            inline: true
          }
        ],
        timestamp: new Date(),
        footer: {text: 'Valkyrie '}
      }
      message.channel.sendMessage('', { embed });

    } else {
      console.log(body);
      message.channel.sendMessage('I require medical attention. \n```' + body.error + '```')
    }
  });
}
