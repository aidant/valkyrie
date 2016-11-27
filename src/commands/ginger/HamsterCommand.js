import { GINGER_SERVER_ID } from '../../consts';

export default {
  command: ['hamster'],
  restrictToServer: [ GINGER_SERVER_ID ],

  handler(context, message) {
    let date = new Date();
    let bladder = Math.round(date.getMinutes() / 59 * 100);
    if (bladder < 100) {
      message.channel.sendMessage(`Ginger's bladder is ${bladder}% full`);
    } else {
      message.channel.sendMessage(':hamster:')
    }
  }
};
