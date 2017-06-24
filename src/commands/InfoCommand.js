import settings from '../../config/env';
import Embed from '../utils/embed';
import moment from 'moment';
import discordJsPackageInfo from 'discord.js/package';

export default {
  command: ['info'],
  helpShort: `Information and statistics about ${settings.name}.`,

  async handler(context, message, client) {
    message.embed = () => { return new Embed(message); };
    message.embed()
      .author(settings.name, 'https://github.com/AidanT/Valkyrie')
      .fields('Node Uptime', moment.duration(process.uptime(), 'seconds').humanize())
      .fields('Node Version', process.versions.node)
      .fields('Discord library', `${discordJsPackageInfo.name.charAt(0).toUpperCase() + discordJsPackageInfo.name.slice(1)} ${discordJsPackageInfo.version}`)
      .fields('API', '[Infra-Sight](https://github.com/AidanT/Infra-Sight)')
      .fields('Guilds', client.guilds.size)
      .fields('Users', client.users.size)
      .footer()
      .send()
  }
};
