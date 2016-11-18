const Discord = require('discord.js');
const client = new Discord.Client();
const request = require('request');
const settings = require('./config/env');

client.on('ready', () => {
  console.log('Valkyrie online.');
  client.user.setStatus('dnd');
  client.user.setGame('val help');
});

const command = 'val';

client.on('message', message => {
  //init command
  let msg = message.content.split(' ').reverse();
  let prefix = msg.pop();
  if (prefix === command) {
    let argument = msg.pop();
    //val
    if (!argument) {
      message.channel.sendMessage('Did someone call a doctor?');
    }
    //val invite
    if (argument === 'invite') {
      message.channel.sendMessage('Support has arrived.\nhttps://discordapp.com/oauth2/authorize?permissions=67226688&scope=bot&client_id=248780846201438209')
    }
    //val help
    if (argument === 'help') {
      let sub_command = msg.pop();
      if (!sub_command) {
        let embed = { color: 15746887, author: {name: 'Usage: val command argument'}, url: 'http://overcomp.akira.gg/',
          fields: [
            {name: 'Stats', value: 'Arguments: Battle#Tag/@User Platform Region', inline: true},
            {name: 'Invite', value: 'Info: Generates an invite link', inline: true}
          ], footer: {text: 'Built by LazyGamer#7000'}
        };
        message.channel.sendMessage('', { embed });
      }
      //val help stats
      if (sub_command === 'stats'){
        let embed = { color: 15746887, author: {name: 'Usage: val stats User Platform Region'}, url: 'http://overcomp.akira.gg/',
          fields: [
            {name: 'User', value: 'Can be a BattleTag or discord user', inline: true},
            {name: 'Platform', value: 'Platforms: pc || xbl || psn || Deafult: pc ', inline: true},
            {name: 'Region', value: 'Regions: eu || us || kr || cn || Deafult: us ', inline: true}
          ], footer: {text: 'Built by LazyGamer#7000'}
        };
        message.channel.sendMessage('', { embed })
      }
    }
    //val stats
    if (argument === 'stats') {
      message.channel.sendMessage('I\'ve got you.');
      let battletag = msg.pop();
      if (!battletag) {
        battletag = 'LazyGamer#11985'
      }
      battletag = battletag.replace('#', '-');
      const platform = msg.pop() || 'pc';
      const region = msg.pop() || 'us';
      request({url: 'https://api.lootbox.eu/' + platform + '/' + region + '/' + battletag + '/profile', json: true }, function (error, response, body) {
          if (!error && response.statusCode == 200 && body.statusCode != '404') {
            let embed = {color: 16426522, author: {name: body.data.username, icon_url: body.data.avatar},
              title: body.data.username + '\'s PlayOverwatch Stats',
              url: 'https://playoverwatch.com/en-us/career/' + platform + '/' + region + '/' + battletag,
              description: 'Quick summary of ' + body.data.username +'\'s PlayOverwatch stats:',
              fields: [
                {name: 'Skill Rating', value: body.data.competitive.rank, inline: true},
                {name: 'Competitive win rate', value: Math.round(body.data.games.competitive.wins / body.data.games.competitive.played * 100) + '%', inline: true},
                {name: 'Time played in Comp', value: body.data.playtime.competitive, inline: true},
                {name: 'Level', value: body.data.level, inline: true},
                {name: 'QP Wins', value: body.data.games.quick.wins, inline: true},
                {name: 'Time played in QP', value: body.data.playtime.quick, inline: true}
              ], timestamp: new Date(), footer: { icon_url: body.data.competitive.rank_img, text: 'Stats as of '}
            }
            message.channel.sendMessage('', { embed });
          } else {
            console.log(body)
            message.channel.sendMessage('I require medical attention. \n```' + body.error + '```')
          }
      });
    }
  }
});

if (!settings.token) {
  console.error('Please configure a discord login token.');
  process.exit(1);
}

client.login(settings.token);
