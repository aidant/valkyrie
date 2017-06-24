import rp from 'request-promise';
import path from 'path';

import Embed from '../utils/embed';
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

    rp({uri: encodeURI(`${settings.apiURL}/api/v1/profile/${input.accountTag.replace('#', '-')}/${input.region || ''}`), json: true})
      .then(account => {

        let embed = new Embed(message);

        if(account.competitive.rank === null) { account.competitive.rank = 'Unranked'; }

        embed
          .author(input.accountTag.split('#')[0], account.profile.url, account.images.player_icon, input.isAccountTagHidden)
          .color(convColor(account.images.rank))
          .footer(settings.name, account.images.rank)
          .timestamp()
          .thumbnail('attachment://profile.png')

        if(input.gamemode === 'quickplay') {
          let qp = qpGamesPL(account.career_stats)
          let qpGames = [];
          qpGames.push(`Played: **${convNumber(qp.games_played)}**`)
          qpGames.push(`Won: **${convNumber(account.quickplay.games_won)}**`)
          qpGames.push(`Lost: **${convNumber(qp.games_lost)}**`)
          qpGames.push(`Winrate: **${Math.floor(account.quickplay.games_won / qp.games_played * 100)}**%`)
          qpGames = qpGames.join(' \n');

          embed
            .description('Quickplay Career Profile:')
            .fields('Level', account.profile.level)
            .fields('Total Time Played', fromSeconds(account.quickplay.time_played_seconds))
            .fields('Career Best', careerStats(account.career_stats, 'quickplay', 'all'))
            .fields('Time Played', mostPlayedHeroes(account.quickplay.heroes.time_played_seconds, 8))
            //.fields('Combat', combat(account.career_stats, 'quickplay', 'all'))
            .fields('Games', qpGames)
            .fields('K/D Ratio', convNumber(kdRatio(account.career_stats, 'quickplay', 'all')))
        }

        if(input.gamemode === 'competitive') {
          let compGames = [];
          compGames.push(`Played: **${convNumber(account.competitive.games_played)}**`)
          compGames.push(`Won: **${convNumber(account.competitive.games_won)}**`)
          compGames.push(`Lost: **${convNumber(account.competitive.games_lost)}**`)
          compGames.push(`Tied: **${convNumber(account.competitive.games_tied)}**`)
          compGames.push(`Winrate: **${Math.floor(account.competitive.games_won / account.competitive.games_played * 100)}**%`)
          compGames = compGames.join(' \n');

          embed
            .description('Competitive Career Profile:')
            .fields('Skill Rating', account.competitive.rank)
            .fields('Total Time Played', fromSeconds(account.competitive.time_played_seconds))
            .fields('Career Best', careerStats(account.career_stats, 'competitive', 'all'))
            .fields('Time Played', mostPlayedHeroes(account.competitive.heroes.time_played_seconds, 8))
            //.fields('Combat', combat(account.career_stats, 'competitive', 'all'))
            .fields('Games', compGames)
            .fields('K/D Ratio', convNumber(kdRatio(account.career_stats, 'competitive', 'all')))
        }

        profileImage(account.images.portrait.border, account.images.portrait.star, account[input.gamemode].heroes.time_played_seconds[0].hero, function(file){
          embed
            .attach(path.join(__dirname, '..', 'img', file), 'profile.png')
            .send(true)
        })

      })
      .catch(e => {
        console.error(e)
        params.embed
          .color(15746887)
          .description('Failed to find an account.')
          .send()
      });

  },
  async help(context, message) {
    let embed = new Embed(message);

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


