import settings from '../../config/env';

export default {
  command: ['invite'],
  helpShort: `Invite ${settings.name} to your server.`,
  async handler(context, message) {
    message.embed()
      .fields('Support has arrived', `[Invite ${settings.name} to your server.](${settings.invite})`)
      .footer()
      .send()
  }
};
