import rp from 'request-promise';
import Embed from '../../utils/embed';

export default {
  command:['cat'],
  isHidden: true,
  restrictToServer: ['213569537000472576'],

  async handler(context, message) {

    rp('http://catfacts-api.appspot.com/api/facts')
      .then(function (body) {

        let num = Math.floor(Math.random() * 9001) + 1

        message.embed = function() {
          return new Embed(this);
        }

        message.embed()
          .title(`Cat fact No. ${num}`)
          .description(JSON.parse(body).facts[0])
          .send()

      })
      .catch(function (err) {

        console.log(err);
        message.embed = function() {
          return new Embed(this);
        }

        message.embed()
          .description(`I've failed you.`)
          .send()
      })

  }
}
