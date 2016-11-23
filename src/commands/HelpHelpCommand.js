const HELP = [
'There\'s no prescription to treat what you have.',
'You might not want to tell your friends about that.',
'I\'ll send you my consultation fee.',
'I\'m not a miracle worker. Well... Not always.',
'Take two, and call me in the morning.',
'The prognosis is not good.',
'Immer unterbricht mich jemand bei der Arbeit.'
];

export default function helpHelpCommand(context, message) {
  message.channel.sendMessage(HELP[Math.floor(Math.random()*HELP.length)]);
};
