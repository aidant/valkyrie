const Discord = require('discord.js');
const client = new Discord.Client();
const request = require('request');
const settings = require('./settings.json');

client.on('ready', () => {  
  console.log('Valkyrie online.\n');
  client.user.setStatus('dnd');
  client.user.setGame('val help');
});

var prefix = 'val';

let embed = { color: 15746887, author: {name: 'Usage: val command argument'}, url: 'http://overcomp.akira.gg/',
  fields: [
    {name: 'Stats', value: 'Arguments: Battle#Tag/@User Platform Region', inline: true},
    {name: 'Invite', value: 'Info: Generates an invite link', inline: true}
  ], footer: {text: 'Built by LazyGamer#7000'}
};

client.on('message', message => {
  msg = message.content.split(' ');
  console.log(msg);
});
client.login(settings.token);