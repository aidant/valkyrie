import settings from '../../config/env';

export default function inviteCommand(command, message) {
  const url = `https://discordapp.com/oauth2/authorize?permissions=67226688&scope=bot&client_id=${settings.clientId}`
  message.channel.sendMessage(`Support has arrived.\n${url}`);
}
