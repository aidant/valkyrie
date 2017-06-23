import rp from 'request-promise';
import Embed from '../../utils/embed';
import catFacts from 'cat-facts';

export default {
  command:['cat'],
  isHidden: true,
  restrictToServer: ['213569537000472576'],
  async handler(context, message) {
  let randomFact = catFacts.random();
  let num = Math.floor(Math.random() * 9001) + 1
  message.embed = () => { return new Embed(message); };
  message.embed()
    .title(`Cat fact No. ${num}`)
    .description(randomFact)
    .send()
  }
};
