export default function helpCommand(context, message) {
  const embed = {
    color: 15746887,
    author: { name: 'Usage: val command argument' },
    url: 'http://overcomp.akira.gg/',
    fields: [
      { name: 'Stats', value: 'Arguments: Battle#Tag/@User Platform Region', inline: true },
      { name: 'Invite', value: 'Info: Generates an invite link', inline: true },
    ],
    footer: { text: 'Built by LazyGamer#7000' },
  };
  message.channel.sendMessage('', { embed });
}
