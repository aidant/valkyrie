import * as convert from './convert'
import * as slurp from './statsLookup'
import fromSeconds from './fromSeconds'
import moment from 'moment'
import 'moment-duration-format'
import Embed from './embed'
import settings from '../../config/env'
import _ from 'lodash'

export default function stats (account, input) {
  if (!account) return new Error('No account provided')
  const gamemode = input.gamemode
  const hero = input.hero || 'all'
  const gmComp = gamemode === 'competitive'

  let embed = new Embed()

  embed
    .timestamp()
    .thumbnail()
    .author(input.accountTag.split('#')[0], account.profile.url, account.images.player_icon, input.isAccountTagHidden)
    .description(`${gmComp ? 'Competitive' : 'Quickplay'} Career Profile: ${hero === 'all' ? '' : convert.heroName(hero)}`)
    .footer(settings.name, 'https://blzgdapipro-a.akamaihd.net/game/unlocks/0x0250000000000C40.png')
    .fields(gmComp ? 'Skill Rating' : 'Level', gmComp ? account.competitive.rank || 'Unranked' : account.profile.level, true)

  if (hero === 'all') {
    embed
      .fields('Total Time Played', fromSeconds(account[gamemode].time_played_seconds, true), true)
      .color(account.images.color[account[input.gamemode].heroes.time_played_seconds[0].hero])
  } else {
    embed
      .fields('Time Played', fromSeconds(_.find(account[gamemode].heroes.time_played_seconds, { hero }).value, true), true)
      .color(account.images.color[hero])
  }

  if (hero === 'all') {
    embed
        .fields('Career Best', careerBest(account, gamemode, hero), true)
        .fields('Time Played', mostPlayedHeroes(account[gamemode].heroes.time_played_seconds, 8), true)
  } else {
    embed
      .fields('Career Best', careerBest(account, gamemode, hero), false)
      // .fields('Career Avg per 10 Min', careerAverage(account, gamemode, hero))
  }

  embed
    .fields('Games', games(account, gamemode, hero), true)
    .fields('K.D Ratio', kdRatio(account.career_stats, gamemode, hero), true)

  return embed
}

export function careerBest (account, gamemode, hero) {
  let result = []
  let stats = slurp.careerBest(hero)
  stats.forEach((val, i, obj) => {
    let tmp = _.find(account.career_stats, { gamemode, hero, stat: val.stat }) || { value: 0 }
    result.push(`${val.name}: **${humanize(tmp)}**`)
  })
  return result.join('\n')
}

export function careerAverage (account, gamemode, hero) {
  let result = []
  let stats = slurp.careerAverage(hero)
  stats.forEach((val, i, obj) => {
    let tmp = {}
    tmp.stat = _.find(account.career_stats, { gamemode, hero, stat: val.stat }) || { value: 0 }
    tmp.time = _.find(account.career_stats, { gamemode, hero, stat: 'time_played_seconds' }) || { value: 0 }

    tmp.number = Math.round(tmp.stat.value / tmp.time.value * 60 * 10)
    result.push(`${val.name}: **${humanize({ value: tmp.number, stat: val.stat })}**`)
  })
  return result.join('\n')
}

export function humanize (obj) {
  let time = /seconds$/.test(obj.stat)
  let accuracy = /accuracy/.test(obj.stat)

  if (time) {
    return moment.duration(obj.value, 'seconds').format('m:ss')
  }

  if (accuracy) {
    return stats.value * 100
  }

  return convert.number(obj.value)
}

export function mostPlayedHeroes (data, num) {
  let heroes = []

  for (var i = 0; i < num; i++) {
    if (data[i].value && data[i].value !== 0) {
      heroes.push(`${convert.heroName(data[i].hero)} - ${fromSeconds(data[i].value)}`)
    }
  }

  return heroes.join(' \n')
}

export function kdRatio (stats, gamemode, hero) {
  let tmp = {}

  for (var i = 0; i < stats.length; i++) {
    if (stats[i].gamemode === gamemode && stats[i].hero === hero && stats[i].stat === 'deaths') {
      tmp.deaths = stats[i].value
    }
    if (stats[i].gamemode === gamemode && stats[i].hero === hero && stats[i].stat === 'eliminations') {
      tmp.eliminations = stats[i].value
    }
  }

  let kd = tmp.eliminations / tmp.deaths
  kd = isNaN(kd) ? 0 : kd.toFixed(2)
  return kd
}

export function games (account, gamemode, hero) {
  let result = []
  let games = {}

  games.played = _.find(account.career_stats, { gamemode, hero, stat: 'games_played' }) || { value: 0 }
  games.won = _.find(account.career_stats, { gamemode, hero, stat: 'games_won' }) || { value: 0 }
  games.lost = _.find(account.career_stats, { gamemode, hero, stat: 'games_lost' }) || { value: 0 }
  games.tied = _.find(account.career_stats, { gamemode, hero, stat: 'games_tied' }) || { value: 0 }

  games.winrate = games.won.value / (games.played.value - games.tied.value)
  games.winrate = isFinite(games.winrate) ? games.winrate * 100 : 0
  games.winrate = games.winrate.toFixed(2)

  result.push(`Won: **${convert.number(games.won.value)}**`)

  if (gamemode === 'competitive') {
    result = [`Played: **${convert.number(games.played.value)}**`, ...result]
    result.push(`Lost: **${convert.number(games.lost.value)}**`)
    result.push(`Tied: **${convert.number(games.tied.value)}**`)
    result.push(`Winrate: **${games.winrate}**%`)
  }

  return result.join(' \n')
}
