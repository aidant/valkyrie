import settings from '../../config/env';
import { marginColour } from '../utils/Colour';

export default function inviteCommand(context, message) {
  let embed = {
    color: marginColour('default'),
    title: `Support has arrived.`,
    url: `https://discordapp.com/oauth2/authorize?permissions=67226688&scope=bot&client_id=${settings.clientId}`,
    footer: { text: settings.footer }
  }
  message.channel.sendMessage('', { embed });
};

