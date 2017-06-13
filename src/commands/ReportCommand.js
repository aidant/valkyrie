import Discord from 'discord.js';
import Embed from '../utils/embed'

const hook = new Discord.WebhookClient('324078260948303873', '8pbG-_MA8lV58pUJFtRTqAAEjzt0j-69pNW00qs9_thjUIIH6BBrSiASmdxtEmA8Sxjg');

export default {
  command: ['report'],
  helpShort: 'Report issues, bugs or feature requests.',

  async handler(context, message) {

    if(context.params.length < 1) {

      message.embed = function() {
        return new Embed(this);
      };

      message.embed()
        .description('A message is required to send.')
        .send()
        return;
    }

    hook.embed = function() {
      return new Embed(this);
    };

    let channel = `<#${message.channel.id}>`;
    let links = `<@${message.author.id}>`
    if(message.channel.type === 'text') {
      channel = `#${message.channel.name} - ${message.guild.name}`
      links = `<#${message.channel.id}>\n<@${message.author.id}>`
    }

    hook.embed()
      .author(message.author.username, null, message.author.avatarURL)
      .fields('Info', `Reported in; ${channel} \nBy user; ${message.author.username}`)
      .fields('Links', links)
      .description(context.params.join(' '))
      .timestamp()
      .sendHook(false)
      .then(function() {
        message.embed = function() {
          return new Embed(this);
        };

        message.embed()
          .description('Your message was sent.')
          .send()
      })
      .catch(function (e) {
        console.log(e)
        message.embed = function() {
          return new Embed(this);
        };

        message.embed()
          .description('Failed to send message.')
          .send()
      })

  },
  async help(context, message) {

    message.embed = function() {
      return new Embed(this);
    };

    message.embed()
      .description('Please incluse a small summary of your issue.')
      .fields('Example;', 'val report Failed to show me information for my BattleTag LazyGamer#11985.')
      .send()

  }
};
