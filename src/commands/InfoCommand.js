import settings from '../../config/env';
import Embed from '../utils/embed';
import moment from 'moment';
import marginColor from '../utils/Color';
import discordJsPackageInfo from 'discord.js/package';
import { platformName } from '../utils/validation'

export default {
  command: ['info'],
  helpShort: 'Information about me.',

  async handler(context, message) {
    message.embed = function() {
      return new Embed(this);
    };

    message.embed()
      .fields('Node Uptime', moment.duration(process.uptime(), 'seconds').humanize())
      .fields('Node Version', process.versions.node)
      .fields('Library', `${discordJsPackageInfo.name.charAt(0).toUpperCase() + discordJsPackageInfo.name.slice(1)} ${discordJsPackageInfo.version}`)
      .fields('API', 'Infra-sight')
      .footer()
      .send()
  }
};
