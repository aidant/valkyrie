import settings from '../../config/env';

export default function inviteCommand(context, message) {
  const url = `https://discordapp.com/oauth2/authorize?permissions=67226688&scope=bot&client_id=${settings.clientId}`
  message.channel.sendMessage(`Support has arrived.\n${url}\nPlease use \`#f04747\` for my role as I like that colour.`);
}
