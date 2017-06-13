import Embed from '../../utils/embed';

export default {
  command: ['hamster'],
  restrictToServer: ['213569537000472576'],
  isHidden: true,

  async handler(context, message) {
    let date = new Date();
    let bladder = Math.round(date.getMinutes() / 59 * 100)
    if (bladder < 100) {
      message.embed = function() {
        return new Embed(this);
      }
      message.embed()
        .description(`Ginger's bladder is ${bladder}% full`)
        .send()
    } else {
      message.channel.send(':hamster:')
    }
  }
}
