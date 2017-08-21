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
  'dva': 'D.va',
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

const stats = {};

stats.dps = [
  { eliminations_most_in_game: 'Eliminations'},
  { kill_streak_best: 'Kill Streak'},
  { multikills_best: 'Multikill'},
  { all_damage_done_most_in_game: 'All Damage Done'},
  { hero_damage_done_most_in_game: 'Hero Damage Done'}
]

stats.heroes = {
  'all': [
    { eliminations_most_in_game: 'Eliminations'},
    { final_blows_most_in_game: 'Final Blows'},
    { objective_kills_most_in_game: 'Objective Kills'},
    { objective_time_most_in_game_seconds: 'Objective Time'},
    { all_damage_done_most_in_game: 'All Damage Done'},
    { healing_done_most_in_game: 'Healing Done'},
    { time_spent_on_fire_most_in_game_seconds: 'Time on Fire'},
    { solo_kills_most_in_game: 'Solo Kills'}
  ],
  'doomfist': [
    ...stats.dps,
    { meteor_strike_kills_most_in_game: 'Meteor Strike Kills'}
  ],
  'genji': [
    ...stats.dps,
    { dragonblade_kills_most_in_game: 'Dragonblade Kills'},
    { damage_reflected_most_in_game: 'Damage Reflected'}
  ],
  'mccree': [
    ...stats.dps,
    { deadeye_kills_most_in_game: 'Deadeye Kills'},
    { fan_the_hammer_kills_most_in_game: 'Fan The Hammer Kills'}
  ],
  'pharah': [
    ...stats.dps,
    { barrage_kills_most_in_game: 'Barrage Kills'},
    { rocket_direct_hits_most_in_game: 'Direct Hits'}
  ],
  'reaper': [
    ...stats.dps,
    { death_blossom_kills_most_in_game: 'Death Blossom Kills'},
    { self_healing_most_in_game: 'Self Healing'}
  ],
  'soldier76': [
    ...stats.dps,
    { tactical_visor_kills_most_in_game: 'Tactical Visor Kills'},
    { healing_done_most_in_game: 'Healing Done'}
  ],
  'sombra': [
    ...stats.dps,
    { enemies_empd_most_in_game: 'Enemies Emp\'d'},
    { enemies_hacked_most_in_game: 'Enemies Hacked'}
  ],
  'tracer': [
    ...stats.dps,
    { pulse_bomb_kills_most_in_game: 'Pulse Bomb Kills'},
    { pulse_bombs_attached_most_in_game: 'Pulse Bombs Attached'}
  ],
  'bastion': [
    ...stats.dps,
    { sentry_kills_most_in_game: 'Sentry Kills'},
    { recon_kills_most_in_game: 'Recon Kills'},
    { tank_kills_most_in_game: 'Tank Kills'}
  ],
  'hanzo': [
    ...stats.dps,
    { dragonstrike_kills_most_in_game: 'Dragonstrike Kills'},
    { scatter_arrow_kills_most_in_game: 'Scatter Kills'},
    { recon_assists_most_in_game: 'Recon Assists'}
  ],
  'junkrat': [
    ...stats.dps,
    { enemies_trapped_most_in_game: 'Enemies Trapped'},
    { riptire_kills_most_in_game: 'Riptire Kills'}
  ],
  'mei': [
    ...stats.dps,
    { enemies_frozen_most_in_game: 'Enemies Frozen'},
    { blizzard_kills_most_in_game: 'Blizzard Kills'}
  ],
  'torbjorn': [
    { torbjorn_kills_most_in_game: 'Torbjorn Kills'},
    { turret_kills_most_in_game: 'Turret Kills'},
    { kill_streak_best: 'Kill Streak'},
    { multikills_best: 'Multikill'},
    { all_damage_done_most_in_game: 'All Damage Done'},
    { hero_damage_done_most_in_game: 'Hero Damage Done'},
    { molten_core_kills_most_in_game: 'Molten Core Kills'},
    { armor_packs_created_most_in_game: 'Armor Packs'}
  ],
  'widowmaker': [
    ...stats.dps,
    { scoped_critical_hits_most_in_game: 'Scoped Crits'},
    { venom_mine_kills_most_in_game: 'Venom Mine Kills'},
    { recon_assists_most_in_game: 'Recon Assists'}
  ],
  'dva': [
    { eliminations_most_in_game: 'Eliminations'},
    { kill_streak_best: 'Kill Streak'},
    { all_damage_done_most_in_game: 'All Damage Done'},
    { damage_blocked_most_in_game: 'Damage Blocked'},
    { mechs_called_most_in_game: 'Mechs Called'},
    { self_destruct_kills_most_in_game: 'Self-destruct Kills'}
  ],
  'orisa': [
    { eliminations_most_in_game: 'Eliminations'},
    { kill_streak_best: 'Kill Streak'},
    { all_damage_done_most_in_game: 'All Damage Done'},
    { damage_blocked_most_in_game: 'Damage Blocked'},
    { damage_amplified_most_in_game: 'Damage Amped'},
  ],
  'reinhardt': [
    { eliminations_most_in_game: 'Eliminations'},
    { kill_streak_best: 'Kill Streak'},
    { all_damage_done_most_in_game: 'All Damage Done'},
    { damage_blocked_most_in_game: 'Damage Blocked'},
    { earthshatter_kills_most_in_game: 'Earthshatter Kills'}
  ],
  'roadhog': [
    { eliminations_most_in_game: 'Eliminations'},
    { kill_streak_best: 'Kill Streak'},
    { all_damage_done_most_in_game: 'All Damage Done'},
    { whole_hog_kills_most_in_game: 'Whole Hog Kills'},
    { enemies_hooked_most_in_game: 'Enemies Hooked'},
    { self_healing_most_in_game: 'Self Healing'},
  ],
  'winston': [
    { eliminations_most_in_game: 'Eliminations'},
    { kill_streak_best: 'Kill Streak'},
    { all_damage_done_most_in_game: 'All Damage Done'},
    { primal_rage_kills_most_in_game: 'Primal Rage Kills'},
    { damage_blocked_most_in_game: 'Damage Blocked'},
    { players_knocked_back_most_in_game: 'Players Knocked Back'},
    { jump_pack_kills_most_in_game: 'Jump Pack Kills'}
  ],
  'zarya': [
    { eliminations_most_in_game: 'Eliminations'},
    { kill_streak_best: 'Kill Streak'},
    { high_energy_kills_most_in_game: 'High Energy Kills'},
    { graviton_surge_kills_most_in_game: 'Graviton Kills'},
    { all_damage_done_most_in_game: 'All Damage Done'},
    { damage_blocked_most_in_game: 'Damage Blocked'},
  ],
  'ana': [
    { eliminations_most_in_game: 'Eliminations'},
    { kill_streak_best: 'Kill Streak'},
    { all_damage_done_most_in_game: 'All Damage Done'},
    { healing_done_most_in_game: 'Healing Done'},
    { enemies_slept_most_in_game: 'Enemies Slept'},
    { nano_boost_assists_most_in_game: 'Assists Nano'},
    { defensive_assists_most_in_game: 'Assists Defense'},
    { offensive_assists_most_in_game: 'Assists Offense'}
  ],
  'lucio': [
    { eliminations_most_in_game: 'Eliminations'},
    { kill_streak_best: 'Kill Streak'},
    { sound_barriers_provided_most_in_game: 'Barries Applied'},
    { healing_done_most_in_game: 'Healing Done'},
    { defensive_assists_most_in_game: 'Assists Defense'},
    { offensive_assists_most_in_game: 'Assists Offense'}
  ],
  'mercy': [
    { eliminations_most_in_game: 'Eliminations'},
    { kill_streak_best: 'Kill Streak'},
    { players_resurrected_most_in_game: 'Players Resurrected'},
    { healing_done_most_in_game: 'Healing Done'},
    { damage_amplified_most_in_game: 'Damage Amped'},
    { defensive_assists_most_in_game: 'Assists Defense'},
    { offensive_assists_most_in_game: 'Assists Offense'}
  ],
  'symmetra': [
    ...stats.dps,
    { players_teleported_most_in_game: 'Players Teleported'},
    { sentry_turret_kills_most_in_game: 'Turret Kills'}
  ],
  'zenyatta': [
    { eliminations_most_in_game: 'Eliminations'},
    { kill_streak_best: 'Kill Streak'},
    { transcendence_healing_best: 'Transcendence'},
    { healing_done_most_in_game: 'Healing Done'},
    { defensive_assists_most_in_game: 'Assists Defense'},
    { offensive_assists_most_in_game: 'Assists Offense'}
  ]
}

export function heroToStats(name) {
  return stats.heroes[name];
};

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
