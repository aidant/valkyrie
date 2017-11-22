import settings from '../../config/env'
import moment from 'moment'

export default {
  command: ['info'],
  helpShort: `Information and statistics about ${settings.name}.`,

  async handler (context, message, client) {
    message.embed()
      .author(settings.name, 'https://github.com/aidant/valkyrie')
      .fields('Uptime', moment.duration(process.uptime(), 'seconds').humanize())
      .fields('Node Version', process.version)
      .fields('Discord library', `Discord.js v${process.versions['discord.js']}`)
      .fields('API', '[Infra-Sight](https://github.com/aidant/infra-sight)')
      .fields('Guilds', client.guilds.size)
      .fields('Users', client.users.size)
      .footer()
      .send()
  }
}
