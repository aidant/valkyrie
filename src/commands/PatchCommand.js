import request from 'request';
import settings from '../../config/env';
import { marginColour } from '../utils/Colour';

export default function patchCommand(context, message) {

  const query = {
    url: `https://api.lootbox.eu/patch_notes`,
    json: true
  };

  message.channel.sendMessage('I\'ve got you.');

  request(query, (error, response, body) => {
    const success = !error && response.statusCode >= 200 && response.statusCode < 300 && (!body.statusCode || (body.statusCode >= 200 && body.statusCode < 300));
    if (success) {

      let colour = marginColour('deafult');

      let embed = {
        color: colour,
        title: `Overwatch Patch Notes`,
        fields: [
          {
            name: 'Patch',
            value: body.patchNotes[0].patchVersion,
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
