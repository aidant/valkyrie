const COLOR = {
    'default': '15746887',
    'https://blzgdapipro-a.akamaihd.net/game/rank-icons/season-2/rank-1.png': '10635553',
    'https://blzgdapipro-a.akamaihd.net/game/rank-icons/season-2/rank-2.png': '10263708',
    'https://blzgdapipro-a.akamaihd.net/game/rank-icons/season-2/rank-3.png': '14796130',
    'https://blzgdapipro-a.akamaihd.net/game/rank-icons/season-2/rank-4.png': '12439245',
    'https://blzgdapipro-a.akamaihd.net/game/rank-icons/season-2/rank-5.png': '5924807',
    'https://blzgdapipro-a.akamaihd.net/game/rank-icons/season-2/rank-6.png': '16170069',
    'https://blzgdapipro-a.akamaihd.net/game/rank-icons/season-2/rank-7.png': '16777215'
 };

export function color(color) {
  return COLOR[color];
};

const HEROES = {
  'all': 'All',
  'doomfist': 'Doomfist',
  'genji': 'Genji',
  'mccree': 'McCree',
  'pharah': 'Pharah',
  'reaper': 'Reaper',
  'soldier76': 'Soldier: 76',
  'sombra': 'Sombra',
  'tracer': 'Tracer',
  'bastion': 'Bastion',
  'hanzo': 'Hanzo',
  'junkrat': 'Junkrat',
  'mei': 'Mei',
  'torbjorn': 'Torbjörn',
  'widowmaker': 'Widowmaker',
  'dva': 'D.Va',
  'orisa': 'Orisa',
  'reinhardt': 'Reinhardt',
  'roadhog': 'Roadhog',
  'winston': 'Winston',
  'zarya': 'Zarya',
  'ana': 'Ana',
  'lucio': 'Lúcio',
  'mercy': 'Mercy',
  'symmetra': 'Symmetra',
  'zenyatta': 'Zenyatta'

}

export function heroName(hero) {
  return HEROES[hero];
}

const gamemodes = {
  'quickplay': 'Quickplay',
  'competitive': 'Competitive'
}

export function gamemode(gamemode) {
  return gamemodes[gamemode];
}

const regions = {
  'kr': 'Asia',
  'eu': 'Europe',
  'us': 'Americas',
  'psn': 'PlayStation',
  'xbl': 'Xbox'
}

export function region(region) {
  return regions[region];
}

export function number(num) {
  if (num === undefined) return;
  let parts = num.toString().split('.');
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  return parts.join('.');
}
