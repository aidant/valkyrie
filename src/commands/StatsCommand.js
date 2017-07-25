import rp from 'request-promise';
import path from 'path';

import settings from '../../config/env';
import fromSeconds from '../utils/fromSeconds';
import profileImage from '../utils/profileImage';
import Params from '../utils/params';
import { convHeroName, convColor, convNumber } from '../utils/convert'
import User from '../schema/User';
import { mostPlayedHeroes, careerStats, combat, qpGamesPL, kdRatio } from '../utils/parseAccount';

export default {
  command: ['stats'],
  helpShort: 'Show off your Quickplay or Competitive stats.',

  async handler(context, message) {
    let params = new Params(context, message).region().gamemode(true, 'competitive').accountTag(true).db().required()
    let input = params.result
    if(input.error) { return }
    message.typing.start()

    rp({uri: encodeURI(`${settings.apiURL}/api/v1/profile/${input.accountTag.replace('#', '~')}/${input.region || ''}`), json: true})
      .then(async account => {

        const gm = input.gamemode === 'competitive';
        if (account.competitive.rank === null) { account.competitive.rank = 'Unranked'; }
        const image = await profileImage(account.images.portrait.border, account.images.portrait.star, account[input.gamemode].heroes.time_played_seconds[0].hero, input.gamemode === 'competitive' ? account.images.rank : null)
        const qp = qpGamesPL(account.career_stats)
        let games = [];
        games.push(`Played: **${convNumber(gm ? account.competitive.games_played : qp.games_played)}**`)
        games.push(`Won: **${convNumber(account[gm ? 'competitive' : 'quickplay'].games_won)}**`)
        games.push(`Lost: **${convNumber(gm ? account.competitive.games_lost : qp.games_lost)}**`)
        if (gm) games.push(`Tied: **${convNumber(account.competitive.games_tied)}**`);
        games.push(`Winrate: **${Math.floor(account[gm ? 'competitive' : 'quickplay'].games_won / (gm ? account.competitive.games_played : qp.games_played) * 100)}**%`)
        games = games.join(' \n');

        message.embed()
          .author(input.accountTag.split('#')[0], account.profile.url, account.images.player_icon, input.isAccountTagHidden)
          .color(convColor(account.images.rank))
          .footer(settings.name, 'https://cdn.discordapp.com/avatars/248780846201438209/432e5dd48f8a6a93503c7d05a9f1cd8b.jpg')
          .timestamp()
          .thumbnail()
          .description(gm ? 'Competitive Career Profile:' : 'Quickplay Career Profile:')
          .fields(gm ? 'Skill Rating' : 'Level', gm ? account.competitive.rank : account.profile.level)
          .fields('Total Time Played', fromSeconds(account[gm ? 'competitive' : 'quickplay'].time_played_seconds))
          .fields('Career Best', careerStats(account.career_stats, gm ? 'competitive' : 'quickplay', 'all'))
          .fields('Time Played', mostPlayedHeroes(account[gm ? 'competitive' : 'quickplay'].heroes.time_played_seconds, 8))
          .fields('Games', games)
          .fields('K/D Ratio', convNumber(kdRatio(account.career_stats, gm ? 'competitive' : 'quickplay', 'all')))
          .attach(image)
          .send(true)
        message.typing.stop()

      })
      .catch(e => {
        console.error(e)
        params.embed
          .color(15746887)
          .description('Failed to find an account.')
          .send()
        message.typing.stop()
      });

  },
  async help(context, message) {
    let embed = message.embed();

    if(!context.user || (!context.user.accountTag)) {
      embed.description(`Tip: Save your information with \`${settings.activator} save\``)
    }

    embed
      .fields('Account', 'Nothing fancy, just your BattleTag, GamerTag or OnlineID')
      .fields('Region (optional)', '`us`, `eu`, `kr`, `xbl`, `psn`')
      .fields('Gamemode (optional)', '`quickplay`, (`qp`) or `competitive`, (`comp`)')
      .footer()
      .send(false)
  }
};
