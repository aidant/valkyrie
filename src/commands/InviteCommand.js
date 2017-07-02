import settings from '../../config/env';

export default {
  command: ['invite'],
  helpShort: `Invite ${settings.name} to your server.`,
  async handler(context, message) {
    message.embed()
      .fields('Support has arrived', `[Invite ${settings.name} to your server.](https://discordapp.com/oauth2/authorize?permissions=67161153&scope=bot&client_id=${settings.clientId})`)
      .footer()
      .send()
  }
};
