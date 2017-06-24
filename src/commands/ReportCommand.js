import Discord from 'discord.js';
import Embed from '../utils/embed'
import settings from '../../config/env';

const hook = new Discord.WebhookClient('324078260948303873', '8pbG-_MA8lV58pUJFtRTqAAEjzt0j-69pNW00qs9_thjUIIH6BBrSiASmdxtEmA8Sxjg');

export default {
  command: ['report'],
  helpShort: 'Report issues, bugs or feature requests.',

  async handler(context, message) {

    if(context.params.length < 1) {
      this.help(context, message)
      return;
    }

    hook.embed = () => { return new Embed(hook); };

    let channel = `<#${message.channel.id}>`;
    let links = `<@${message.author.id}>`
    if(message.channel.type === 'text') {
      channel = `#${message.channel.name} - ${message.guild.name}`
      links = `<#${message.channel.id}>\n<@${message.author.id}>`
    }
    let db = '';
    if (context.user) {
      db = [];
      db.push(`Account: ${context.user.accountTag}`)
      db.push(`Region: ${context.user.region}`)
      db.push(`Hidden: ${context.user.isAccountTagHidden}`)
      db.push(`Gamemode: ${context.user.gamemode}`)
      db.push(`Mouse DPI: ${context.user.mouseDpi}`)
      db.push(`Sensitivity: ${context.user.sensitivity}`)
      db = db.join(' \n')
    }

    hook.embed()
      .author(message.author.username, null, message.author.avatarURL)
      .fields('Info', `Reported in: ${channel} \nBy user: ${message.author.username}`)
      .fields('Links', links)
      .fields('Database', db)
      .description(context.params.join(' '))
      .timestamp()
      .sendHook(false)
      .then(() => {
        message.embed = () => { return new Embed(message); };
        message.embed()
          .description('Your message was sent!')
          .send()
      })
      .catch(e => {
        console.error(e)
        message.embed = () => { return new Embed(message); };
        message.embed()
          .color(15746887)
          .description('Failed to send message.')
          .send()
      })

  },
  async help(context, message) {
    message.embed = () => { return new Embed(message); };
    message.embed()
      .description('Please include a small summary of your issue.')
      .fields('Example:', `\`${settings.activator} report No stats are shown for my battleTag, Tracer#3939.\``)
      .send()
  }
};
