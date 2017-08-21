import * as convert from './convert';
import fromSeconds from './fromSeconds';
import moment from 'moment';
import 'moment-duration-format';
import Embed from './embed';
import settings from '../../config/env';
import _ from 'lodash';

export default function stats(account, input) {
  if (!account) return new Error('No account provided');
  const gamemode = input.gamemode;
  const hero = input.hero || 'all';
  const gmComp = gamemode === 'competitive';
  const gmQp = gamemode === 'quickplay';

  let embed = new Embed();

  embed
    .timestamp()
    .thumbnail()
    .author(input.accountTag.split('#')[0], account.profile.url, account.images.player_icon, input.isAccountTagHidden)
    .description(`${gmComp ? 'Competitive' : 'Quickplay'} Career Profile: ${ hero === 'all' ? '' : convert.heroName(hero)}`)
    .color(convert.color(account.images.rank))
    .footer(settings.name, 'https://blzgdapipro-a.akamaihd.net/game/unlocks/0x0250000000000C40.png')
    .fields(gmComp ? 'Skill Rating' : 'Level', gmComp ? account.competitive.rank : account.profile.level)

  if (hero === 'all') {
    embed
      .fields('Total Time Played', fromSeconds(account[gamemode].time_played_seconds, true))
      .color(gmQp ? account.images.color[account[input.gamemode].heroes.time_played_seconds[0].hero] : convert.color(account.images.rank))
  } else {
    embed
      .fields('Time Played', fromSeconds(_.find(account[gamemode].heroes.time_played_seconds, { hero }).value, true))
      .color(gmQp ? account.images.color[hero] : convert.color(account.images.rank))
  }

  embed
    .fields('Career Best', careerBest(account, gamemode, hero))

    if (hero === 'all') {
      embed
        .fields('Time Played', mostPlayedHeroes(account[gamemode].heroes.time_played_seconds, 8))
    } else {
      embed
        .fields('Career Average', '\u200B')
    }

  embed
    .fields('Games', games(account, gamemode, hero))
    .fields('K.D Ratio', kdRatio(account.career_stats, gamemode, hero))


  return embed

}

export function careerBest(account, gamemode, hero) {
  let result = [];
  let stats = convert.heroToStats(hero);
  stats.forEach((val, i, obj) => {
    let tmp = _.find(account.career_stats, { gamemode, hero, stat: Object.keys(val)[0]}) || { value: 0 };
    result.push(`${val[Object.keys(val)]}: **${tmp.value}**`)
  })
  return result.join('\n')
}

export function humanize(val) {

  let time = false;
  let accucacy = false;

  val.stat.split('_').forEach(val => {

  })

  return convert.number(val.value);
}

export function mostPlayedHeroes(data, num) {
  let heroes = [];

  for (var i = 0; i < num; i++) {
    if (data[i].value && data[i].value != 0) {
      heroes.push(`${convert.heroName(data[i].hero)} - ${fromSeconds(data[i].value)}`)
    }
  }

  return heroes.join(' \n')
}

export function kdRatio(stats, gamemode, hero) {
  let tmp = {};

  for (var i = 0; i < stats.length; i++) {
    if (stats[i].gamemode === gamemode && stats[i].hero === hero && stats[i].stat === 'deaths') {
      tmp.deaths = stats[i].value;
    }
    if (stats[i].gamemode === gamemode && stats[i].hero === hero && stats[i].stat === 'eliminations') {
      tmp.eliminations = stats[i].value;
    }
  }

  let kd = tmp.eliminations / tmp.deaths;
  kd = isNaN(kd) ? 0 : kd.toFixed(2);
  return kd;
}

export function games(account, gamemode, hero) {
  let result = [];
  let games = {};

  games.played = _.find(account.career_stats, { gamemode, hero, stat: 'games_played'}) || { value: 0 };
  games.won = _.find(account.career_stats, { gamemode, hero, stat: 'games_won'}) || { value: 0 };
  games.lost = _.find(account.career_stats, { gamemode, hero, stat: 'games_lost'}) || { value: 0 };
  games.tied = _.find(account.career_stats, { gamemode, hero, stat: 'games_tied'}) || { value: 0 };

  games.winrate = games.won.value / ( games.played.value - games.tied.value);
  games.winrate = isFinite(games.winrate) ? games.winrate * 100 : 0;
  games.winrate = games.winrate.toFixed(2)

  result.push(`Won: **${convert.number(games.won.value)}**`)

  if (gamemode === 'competitive') {
    result = [`Played: **${convert.number(games.played.value)}**`, ...result]
    result.push(`Lost: **${convert.number(games.lost.value)}**`)
    result.push(`Tied: **${convert.number(games.tied.value)}**`)
    result.push(`Winrate: **${games.winrate}**%`)
  }

  return result.join(' \n');
}
