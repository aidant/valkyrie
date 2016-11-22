import request from 'request';
import settings from '../../config/env';
import { checkStatsInput, checkHeroInput } from '../utils/checkInput';
import { marginColour } from '../utils/Colour';

export default function heroesCommand(context, message) {

  let mode = context.params.shift();
  let userInput = checkStatsInput(context, message);
  let userInputHeroes = checkHeroInput(mode, message);

  if (!userInput || !userInputHeroes) {
    return;
  }

  mode = userInputHeroes.mode;
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

  message.channel.sendMessage('I\'ve got you.');

  request(query, (error, response, body) => {
    const success = !error && response.statusCode >= 200 && response.statusCode < 300 && (!body.statusCode || (body.statusCode >= 200 && body.statusCode < 300));
    if (success) {

      let name = user.split('-');
      name = name[0];
      const fields = [];

      for (let i = 0; i < 6; i++) {
        const hero = body[i];

        fields.push({
          name: hero.name,
          value: hero.playtime,
          inline: true
        });
      }

      let embed = {
        color: marginColour(body[0].name),
        author: { name: name, icon_url: body[0].image },
        title: `${name}'s Overwatch stats`,
        url: `https://playoverwatch.com/en-us/career/${platform}/${region}/${user}`,
        description: `Quick summary of ${name}'s most played heros:`,
        fields: fields,
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
