import settings from '../../config/env';
import Embed from '../utils/embed';

export default {
  command: ['invite'],
  helpShort: 'Generates an invite link',

  async handler(context, message) {

    message.embed = function() {
      return new Embed(this);
    };

    message.embed()
      .title('Support has arrived.')
      .url(`https://discordapp.com/oauth2/authorize?permissions=67226688&scope=bot&client_id=${settings.clientId}`)
      .footer()
      .send()

  }
};
