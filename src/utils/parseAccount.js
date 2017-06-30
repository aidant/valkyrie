import { convHeroName, convNumber } from './convert';
import fromSeconds from './fromSeconds';
import moment from 'moment'
require("moment-duration-format");

export function mostPlayedHeroes(data, num) {
  let heroes = [];

  for (var i = 0; i < num; i++) {
    if (data[i].value && data[i].value != 0) {
      heroes.push(`${convHeroName(data[i].hero)} - ${fromSeconds(data[i].value)}`)
    }
  }

  return heroes.join(' \n')
}

export function careerStats(stats, gamemode, hero) {
  let result = [];

  for (var i = 0; i < stats.length; i++) {
    if (stats[i].gamemode === gamemode && stats[i].hero === hero && stats[i].stat === 'eliminations_most_in_game') {
      result.push(`Eliminations: **${convNumber(stats[i].value)}**`)
    }
    if (stats[i].gamemode === gamemode && stats[i].hero === hero && stats[i].stat === 'final_blows_most_in_game') {
      result.push(`Final Blows: **${convNumber(stats[i].value)}**`)
    }
    if (stats[i].gamemode === gamemode && stats[i].hero === hero && stats[i].stat === 'objective_kills_most_in_game') {
      result.push(`Objective kills: **${convNumber(stats[i].value)}**`)
    }
    if (stats[i].gamemode === gamemode && stats[i].hero === hero && stats[i].stat === 'objective_time_most_in_game_seconds') {
      result.push(`Objective time: **${moment.duration(stats[i].value, 'seconds').format('m:ss')}**`)
    }
    if (stats[i].gamemode === gamemode && stats[i].hero === hero && stats[i].stat === 'damage_done_most_in_game') {
      result.push(`Damage done: **${convNumber(stats[i].value)}**`)
    }
    if (stats[i].gamemode === gamemode && stats[i].hero === hero && stats[i].stat === 'healing_done_most_in_game') {
      result.push(`Healing done: **${convNumber(stats[i].value)}**`)
    }
    if (stats[i].gamemode === gamemode && stats[i].hero === hero && stats[i].stat === 'time_spent_on_fire_most_in_game_seconds') {
      result.push(`Time on fire: **${moment.duration(stats[i].value, 'seconds').format('m:ss')}**`)
    }
    if (stats[i].gamemode === gamemode && stats[i].hero === hero && stats[i].stat === 'solo_kills_most_in_game') {
      result.push(`Solo kills: **${convNumber(stats[i].value)}**`)
    }
  }

  return result.join(' \n');
}

export function combat(stats, gamemode, hero) {
  let result = [];
  let tmp = {};

  for (var i = 0; i < stats.length; i++) {
    if (stats[i].gamemode === gamemode && stats[i].hero === hero && stats[i].stat === 'deaths') {
      tmp.deaths = stats[i].value;
    }
    if (stats[i].gamemode === gamemode && stats[i].hero === hero && stats[i].stat === 'eliminations') {
      tmp.eliminations = stats[i].value;
    }
    if (stats[i].gamemode === gamemode && stats[i].hero === hero && stats[i].stat === 'damage_done_average') {
      result.push(`Avg. Damage done: **${convNumber(stats[i].value)}**`)
    }
    if (stats[i].gamemode === gamemode && stats[i].hero === hero && stats[i].stat === 'healing_done_average') {
      result.push(`Avg. Healing done: **${convNumber(stats[i].value)}**`)
    }
    if (stats[i].gamemode === gamemode && stats[i].hero === hero && stats[i].stat === 'deaths_average') {
      result.push(`Avg. Deaths: **${convNumber(stats[i].value)}**`)
    }
    if (stats[i].gamemode === gamemode && stats[i].hero === hero && stats[i].stat === 'eliminations_average') {
      result.push(`Avg. Eliminations: **${convNumber(stats[i].value)}**`)
    }
  }
  let kd = tmp.eliminations / tmp.deaths;
  result.push(`K/D Ratio: **${convNumber(kd.toFixed(2))}**`);
  return result.join(' \n');
}

export function qpGamesPL(stats, hero) {
  if (!hero) { hero = 'all'};
  if (!stats) { return; };
  let heroData = {};

  for (var i = 0; i < stats.length; i++) {
    if (stats[i].gamemode === 'quickplay' && stats[i].stat === 'healing_done') {
      if (heroData[stats[i].hero] === undefined) { heroData[stats[i].hero] = []; };
      heroData[stats[i].hero][0] = stats[i].value
    }
    if (stats[i].gamemode === 'quickplay' && stats[i].stat === 'healing_done_average') {
      if (heroData[stats[i].hero] === undefined) { heroData[stats[i].hero] = []; };
      heroData[stats[i].hero][1] = stats[i].value
    }
    if (stats[i].gamemode === 'quickplay' && stats[i].stat === 'games_won') {
      if (heroData[stats[i].hero] === undefined) { heroData[stats[i].hero] = []; };
      heroData[stats[i].hero][2] = stats[i].value
    }
  }

  let math = {};

  Object.values(heroData).forEach(function(elem, i) {
    math[Object.keys(heroData)[i]] = [Math.round(elem[0] / elem[1]), elem[2]];
  })

  let result = {};
  result.games_lost = Object.values(math[hero])[0] - Object.values(math[hero])[1] || 0;
  result.games_played = Object.values(math[hero])[0] || 0;
  return result;
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
  return kd.toFixed(2);
}
