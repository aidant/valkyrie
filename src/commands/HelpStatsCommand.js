export default function helpStatsCommand(context, message) {
  const embed = {
    color: 15746887,
    author: { name: 'Usage: val stats User Platform Region' },
    url: 'http://overcomp.akira.gg/',
    fields: [
      { name: 'User', value: 'Can be a BattleTag or discord user', inline: true },
      { name: 'Platform', value: 'Platforms: pc || xbl || psn || Deafult: pc ', inline: true },
      { name: 'Region', value: 'Regions: eu || us || kr || cn || Deafult: us ', inline: true },
    ],
    footer: { text: 'Built by LazyGamer & AkiraYasha' }
  };
  message.channel.sendMessage('', { embed });
}
