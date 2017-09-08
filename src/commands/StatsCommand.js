import profile from '../utils/profileImage';
import stats from '../utils/parseAccount'
import Params from '../utils/params';
import rp from 'request-promise';
import settings from '../../config/env';

export default {
  command:['stats'],
  helpShort: 'Show off your Quickplay or Competitive stats.',
  async handler(context, message) {
    let params = await Params(context, message, {
      accountTag: {
        required: true
      },
      hero: {
        required: true,
        default: ['all']
      },
      region: true,
      gamemode: {
        required: true,
        default: ['competitive']
      },
      db: true,
      mentions: true
    })
    let input = params.result
    if (params.error) return;
    message.typing.start()

    try {
      let account = await rp({
        uri: encodeURI(`${settings.apiURL}/api/v1/profile/${input.accountTag.replace('#', '~')}/${input.region || ''}`),
        json: true
      })
      let image = await profile(
        account.images.portrait.border,
        account.images.portrait.star,
        input.hero === 'all' ? account[input.gamemode].heroes.time_played_seconds[0].hero : input.hero,
        input.gamemode === 'competitive' ? account.images.rank : null
      )
      let embed = stats(account, input)

      embed.message = message
      embed
        .attach(image)
        .send(false)
      message.typing.stop()

    } catch (e) {
      console.error(e)
      params.embed
        .color(15746887)
        .description('Failed to find an account.')
        .send()
      message.typing.stop()
    }
  },
  async help(context, message) {
  let embed = message.embed();

  if(!context.user || (!context.user.accountTag)) {
    embed.description(`Tip: Save your information with \`${settings.activator} save\``)
  }

  embed
    .fields('Account *', 'Any valid BattleTag, GamerTag or OnlineID')
    .fields('Region', 'Americas or us, Europe or eu, Asia or kr, xbl, psn')
    .fields('Gamemode', 'Quickplay or qp, Competitive or comp')
    .fields('Hero', 'Any hero in Overwatch')
    .footer('* Required')
    .send(false)
}
};
