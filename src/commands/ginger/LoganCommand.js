import { GINGER_SERVER_ID } from '../../consts';

const LOGAN = [
  'Logan isn\'t drunk at all! Drinking must make him sober',
  'Logan is tipsy. Free competitive tips for all',
  'Logan is drinking because I said we couldn\'t try the backdoor tonight',
  'Logan is as drunk as your father is every night',
  'Logan is as drunk as skunk. So not drunk at all since skunks don\'t drink.',
  'Logan is as drunk as he is dank',
  'Logan is as drunk as the average russian child',
  'Logan is so drunk he\'s actually experiencing tranquility',
  'Logan is so drunk he thinks Widowmaker is a viable character',
  'Logan is dead. And my resurrect is only at 10% charge'
];

export default {
  command: ['logan'],
  restrictToServer: [ GINGER_SERVER_ID ],

  handler(context, message) {
    message.channel.sendMessage(LOGAN[Math.floor(Math.random()*LOGAN.length)]);
  }
};
