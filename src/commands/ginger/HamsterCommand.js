export default {
  command: ['hamster'],
  restrictToServer: ['213569537000472576'],
  isHidden: true,
  async handler(context, message) {
    const t = new Date();
    const bladder = Math.round(t.getHours() % 3 * (100 / 3) + t.getMinutes() / 59 * (100 / 3))
    if (bladder < 100)
      message.embed()
        .description(`Ginger's bladder is ${bladder}% full`)
        .send();
    else
      message.channel.send(':hamster:');
  }
}
