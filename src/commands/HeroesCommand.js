import request from 'request';
import settings from '../../config/env';
import { checkStatsInput, checkGamemodeInput } from '../utils/checkInput';
import { marginColour } from '../utils/colour';

export default function statsCommand(context, message) {

  let mode = context.params.shift();
  let userInput = checkStatsInput(context, message);
  let userInputMode = checkGamemodeInput(mode, message);

  if (!userInput || !userInputMode) {
    return;
  };

  mode = userInputMode.mode;
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

      let colour = marginColour(body[0].name);
      let name = user.split('-');
      name = name[0];
      const fields = [];

      for (let i = 0; i < 6; i++) {
        const hero = body[i];
        let heroName = hero.name;

        if (heroName === 'Torbj&#xF6;rn') {
          heroName = 'Torbjörn';
        };

        if (heroName === 'L&#xFA;cio') {
          heroName = 'Lúcio';
        };

        fields.push({
          name: heroName,
          value: hero.playtime,
          inline: true
        });
      };

      let embed = {
        color: colour,
        author: { name: name, icon_url: body[0].image },
        title: `${name}'s Play Overwatch page.`,
        url: overwatch_url,
        description: `${name}'s most played Heroes:`,
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
