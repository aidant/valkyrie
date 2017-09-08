const best = {};

best.dps = [
  { stat: 'eliminations_most_in_game', name: 'Eliminations' },
  { stat: 'kill_streak_best', name: 'Kill Streak' },
  { stat: 'multikills_best', name: 'Multikill' },
  { stat: 'all_damage_done_most_in_game', name: 'All Damage Done' },
  { stat: 'hero_damage_done_most_in_game', name: 'Hero Damage Done' }
]

best.tank = [
  { stat: 'eliminations_most_in_game', name: 'Eliminations' },
  { stat: 'kill_streak_best', name: 'Kill Streak' },
  { stat: 'all_damage_done_most_in_game', name: 'All Damage Done' }
]

best.stats = {
  'all': [
    { stat: 'eliminations_most_in_game', name: 'Eliminations' },
    { stat: 'final_blows_most_in_game', name: 'Final Blows' },
    { stat: 'objective_kills_most_in_game', name: 'Objective Kills' },
    { stat: 'objective_time_most_in_game_seconds', name: 'Objective Time' },
    { stat: 'all_damage_done_most_in_game', name: 'All Damage Done' },
    { stat: 'healing_done_most_in_game', name: 'Healing Done' },
    { stat: 'time_spent_on_fire_most_in_game_seconds', name: 'Time on Fire' },
    { stat: 'solo_kills_most_in_game', name: 'Solo Kills' }
  ],
  'doomfist': [
    ...best.dps,
    { stat: 'meteor_strike_kills_most_in_game', name: 'Meteor Strike Kills' }
  ],
  'genji': [
    ...best.dps,
    { stat: 'dragonblade_kills_most_in_game', name: 'Dragonblade Kills' },
    { stat: 'damage_reflected_most_in_game', name: 'Damage Reflected' }
  ],
  'mccree': [
    ...best.dps,
    { stat: 'deadeye_kills_most_in_game', name: 'Deadeye Kills' },
    { stat: 'fan_the_hammer_kills_most_in_game', name: 'Fan The Hammer Kills' }
  ],
  'pharah': [
    ...best.dps,
    { stat: 'barrage_kills_most_in_game', name: 'Barrage Kills' },
    { stat: 'rocket_direct_hits_most_in_game', name: 'Direct Hits' }
  ],
  'reaper': [
    ...best.dps,
    { stat: 'death_blossom_kills_most_in_game', name: 'Death Blossom Kills' },
    { stat: 'self_healing_most_in_game', name: 'Self Healing' }
  ],
  'soldier76': [
    ...best.dps,
    { stat: 'tactical_visor_kills_most_in_game', name: 'Tactical Visor Kills' },
    { stat: 'healing_done_most_in_game', name: 'Healing Done' }
  ],
  'sombra': [
    ...best.dps,
    { stat: 'enemies_empd_most_in_game', name: 'Enemies Emp\'d'},
    { stat: 'enemies_hacked_most_in_game', name: 'Enemies Hacked' }
  ],
  'tracer': [
    ...best.dps,
    { stat: 'pulse_bomb_kills_most_in_game', name: 'Pulse Bomb Kills' },
    { stat: 'pulse_bombs_attached_most_in_game', name: 'Pulse Bombs Attached' }
  ],
  'bastion': [
    ...best.dps,
    { stat: 'sentry_kills_most_in_game', name: 'Sentry Kills' },
    { stat: 'recon_kills_most_in_game', name: 'Recon Kills' },
    { stat: 'tank_kills_most_in_game', name: 'Tank Kills' }
  ],
  'hanzo': [
    ...best.dps,
    { stat: 'dragonstrike_kills_most_in_game', name: 'Dragonstrike Kills' },
    { stat: 'scatter_arrow_kills_most_in_game', name: 'Scatter Kills' },
    { stat: 'recon_assists_most_in_game', name: 'Recon Assists' }
  ],
  'junkrat': [
    ...best.dps,
    { stat: 'enemies_trapped_most_in_game', name: 'Enemies Trapped' },
    { stat: 'riptire_kills_most_in_game', name: 'Riptire Kills' }
  ],
  'mei': [
    ...best.dps,
    { stat: 'enemies_frozen_most_in_game', name: 'Enemies Frozen' },
    { stat: 'blizzard_kills_most_in_game', name: 'Blizzard Kills' }
  ],
  'torbjorn': [
    { stat: 'torbjorn_kills_most_in_game', name: 'Torbjorn Kills' },
    { stat: 'turret_kills_most_in_game', name: 'Turret Kills' },
    { stat: 'kill_streak_best', name: 'Kill Streak' },
    { stat: 'multikills_best', name: 'Multikill' },
    { stat: 'all_damage_done_most_in_game', name: 'All Damage Done' },
    { stat: 'hero_damage_done_most_in_game', name: 'Hero Damage Done' },
    { stat: 'molten_core_kills_most_in_game', name: 'Molten Core Kills' },
    { stat: 'armor_packs_created_most_in_game', name: 'Armor Packs' }
  ],
  'widowmaker': [
    ...best.dps,
    { stat: 'scoped_critical_hits_most_in_game', name: 'Scoped Crits' },
    { stat: 'venom_mine_kills_most_in_game', name: 'Venom Mine Kills' },
    { stat: 'recon_assists_most_in_game', name: 'Recon Assists' }
  ],
  'dva': [
    ...best.tank,
    { stat: 'damage_blocked_most_in_game', name: 'Damage Blocked' },
    { stat: 'mechs_called_most_in_game', name: 'Mechs Called' },
    { stat: 'self_destruct_kills_most_in_game', name: 'Self-destruct Kills' }
  ],
  'orisa': [
    ...best.tank,
    { stat: 'damage_blocked_most_in_game', name: 'Damage Blocked' },
    { stat: 'damage_amplified_most_in_game', name: 'Damage Amped' },
  ],
  'reinhardt': [
    ...best.tank,
    { stat: 'damage_blocked_most_in_game', name: 'Damage Blocked' },
    { stat: 'earthshatter_kills_most_in_game', name: 'Earthshatter Kills' }
  ],
  'roadhog': [
    ...best.tank,
    { stat: 'whole_hog_kills_most_in_game', name: 'Whole Hog Kills' },
    { stat: 'enemies_hooked_most_in_game', name: 'Enemies Hooked' },
    { stat: 'self_healing_most_in_game', name: 'Self Healing' },
  ],
  'winston': [
    ...best.tank,
    { stat: 'primal_rage_kills_most_in_game', name: 'Primal Rage Kills' },
    { stat: 'damage_blocked_most_in_game', name: 'Damage Blocked' },
    { stat: 'players_knocked_back_most_in_game', name: 'Players Knocked Back' },
    { stat: 'jump_pack_kills_most_in_game', name: 'Jump Pack Kills' }
  ],
  'zarya': [
    ...best.tank,
    { stat: 'high_energy_kills_most_in_game', name: 'High Energy Kills' },
    { stat: 'graviton_surge_kills_most_in_game', name: 'Graviton Kills' },
    { stat: 'damage_blocked_most_in_game', name: 'Damage Blocked' },
  ],
  'ana': [
    { stat: 'eliminations_most_in_game', name: 'Eliminations' },
    { stat: 'kill_streak_best', name: 'Kill Streak' },
    { stat: 'all_damage_done_most_in_game', name: 'All Damage Done' },
    { stat: 'healing_done_most_in_game', name: 'Healing Done' },
    { stat: 'enemies_slept_most_in_game', name: 'Enemies Slept' },
    { stat: 'nano_boost_assists_most_in_game', name: 'Assists Nano' },
    { stat: 'defensive_assists_most_in_game', name: 'Assists Defense' },
    { stat: 'offensive_assists_most_in_game', name: 'Assists Offense' }
  ],
  'lucio': [
    { stat: 'eliminations_most_in_game', name: 'Eliminations' },
    { stat: 'kill_streak_best', name: 'Kill Streak' },
    { stat: 'sound_barriers_provided_most_in_game', name: 'Barries Applied' },
    { stat: 'healing_done_most_in_game', name: 'Healing Done' },
    { stat: 'defensive_assists_most_in_game', name: 'Assists Defense' },
    { stat: 'offensive_assists_most_in_game', name: 'Assists Offense' }
  ],
  'mercy': [
    { stat: 'players_resurrected_most_in_game', name: 'Players Resurrected' },
    { stat: 'healing_done_most_in_game', name: 'Healing Done' },
    { stat: 'damage_amplified_most_in_game', name: 'Damage Amped' },
    { stat: 'defensive_assists_most_in_game', name: 'Assists Defense' },
    { stat: 'offensive_assists_most_in_game', name: 'Assists Offense' }
  ],
  'symmetra': [
    ...best.dps,
    { stat: 'players_teleported_most_in_game', name: 'Players Teleported' },
    { stat: 'sentry_turret_kills_most_in_game', name: 'Turret Kills' }
  ],
  'zenyatta': [
    { stat: 'eliminations_most_in_game', name: 'Eliminations' },
    { stat: 'kill_streak_best', name: 'Kill Streak' },
    { stat: 'transcendence_healing_best', name: 'Transcendence' },
    { stat: 'healing_done_most_in_game', name: 'Healing Done' },
    { stat: 'defensive_assists_most_in_game', name: 'Assists Defense' },
    { stat: 'offensive_assists_most_in_game', name: 'Assists Offense' }
  ]
}

export function careerBest(name) {
  return best.stats[name];
};

const average = {};

average.dps = [
  { stat: 'eliminations', name: 'Eliminations' },
  { stat: 'kill_streak_best', name: 'Kill Streak' },
  { stat: 'multikills_best', name: 'Multikill' },
  { stat: 'all_damage_done', name: 'All Damage Done' },
  { stat: 'hero_damage_done', name: 'Hero Damage Done' }
]

average.tank = [
  { stat: 'eliminations', name: 'Eliminations' },
  { stat: 'kill_streak_best', name: 'Kill Streak' },
  { stat: 'all_damage_done', name: 'All Damage Done' }
]

average.stats = {
  'doomfist': [
    ...average.dps,
    { stat: 'meteor_strike_kills', name: 'Meteor Strike Kills' }
  ],
  'genji': [
    ...average.dps,
    { stat: 'dragonblade_kills', name: 'Dragonblade Kills' },
    { stat: 'damage_reflected', name: 'Damage Reflected' }
  ],
  'mccree': [
    ...average.dps,
    { stat: 'deadeye_kills', name: 'Deadeye Kills' },
    { stat: 'fan_the_hammer_kills', name: 'Fan The Hammer Kills' }
  ],
  'pharah': [
    ...average.dps,
    { stat: 'barrage_kills', name: 'Barrage Kills' },
    { stat: 'rocket_direct_hits', name: 'Direct Hits' }
  ],
  'reaper': [
    ...average.dps,
    { stat: 'death_blossom_kills', name: 'Death Blossom Kills' },
    { stat: 'self_healing', name: 'Self Healing' }
  ],
  'soldier76': [
    ...average.dps,
    { stat: 'tactical_visor_kills', name: 'Tactical Visor Kills' },
    { stat: 'healing_done', name: 'Healing Done' }
  ],
  'sombra': [
    ...average.dps,
    { stat: 'enemies_empd', name: 'Enemies Emp\'d'},
    { stat: 'enemies_hacked', name: 'Enemies Hacked' }
  ],
  'tracer': [
    ...average.dps,
    { stat: 'pulse_bomb_kills', name: 'Pulse Bomb Kills' },
    { stat: 'pulse_bombs_attached', name: 'Pulse Bombs Attached' }
  ],
  'bastion': [
    ...average.dps,
    { stat: 'sentry_kills', name: 'Sentry Kills' },
    { stat: 'recon_kills', name: 'Recon Kills' },
    { stat: 'tank_kills', name: 'Tank Kills' }
  ],
  'hanzo': [
    ...average.dps,
    { stat: 'dragonstrike_kills', name: 'Dragonstrike Kills' },
    { stat: 'scatter_arrow_kills', name: 'Scatter Kills' },
    { stat: 'recon_assists', name: 'Recon Assists' }
  ],
  'junkrat': [
    ...average.dps,
    { stat: 'enemies_trapped', name: 'Enemies Trapped' },
    { stat: 'riptire_kills', name: 'Riptire Kills' }
  ],
  'mei': [
    ...average.dps,
    { stat: 'enemies_frozen', name: 'Enemies Frozen' },
    { stat: 'blizzard_kills', name: 'Blizzard Kills' }
  ],
  'torbjorn': [
    { stat: 'torbjorn_kills', name: 'Torbjorn Kills' },
    { stat: 'turret_kills', name: 'Turret Kills' },
    { stat: 'kill_streak_best', name: 'Kill Streak' },
    { stat: 'multikills_best', name: 'Multikill' },
    { stat: 'all_damage_done', name: 'All Damage Done' },
    { stat: 'hero_damage_done', name: 'Hero Damage Done' },
    { stat: 'molten_core_kills', name: 'Molten Core Kills' },
    { stat: 'armor_packs_created', name: 'Armor Packs' }
  ],
  'widowmaker': [
    ...average.dps,
    { stat: 'scoped_critical_hits', name: 'Scoped Crits' },
    { stat: 'venom_mine_kills', name: 'Venom Mine Kills' },
    { stat: 'recon_assists', name: 'Recon Assists' }
  ],
  'dva': [
    ...average.tank,
    { stat: 'damage_blocked', name: 'Damage Blocked' },
    { stat: 'mechs_called', name: 'Mechs Called' },
    { stat: 'self_destruct_kills', name: 'Self-destruct Kills' }
  ],
  'orisa': [
    ...average.tank,
    { stat: 'damage_blocked', name: 'Damage Blocked' },
    { stat: 'damage_amplified', name: 'Damage Amped' },
  ],
  'reinhardt': [
    ...average.tank,
    { stat: 'damage_blocked', name: 'Damage Blocked' },
    { stat: 'earthshatter_kills', name: 'Earthshatter Kills' }
  ],
  'roadhog': [
    ...average.tank,
    { stat: 'whole_hog_kills', name: 'Whole Hog Kills' },
    { stat: 'enemies_hooked', name: 'Enemies Hooked' },
    { stat: 'self_healing', name: 'Self Healing' },
  ],
  'winston': [
    ...average.tank,
    { stat: 'primal_rage_kills', name: 'Primal Rage Kills' },
    { stat: 'damage_blocked', name: 'Damage Blocked' },
    { stat: 'players_knocked_back', name: 'Players Knocked Back' },
    { stat: 'jump_pack_kills', name: 'Jump Pack Kills' }
  ],
  'zarya': [
    ...average.tank,
    { stat: 'high_energy_kills', name: 'High Energy Kills' },
    { stat: 'graviton_surge_kills', name: 'Graviton Kills' },
    { stat: 'damage_blocked', name: 'Damage Blocked' },
  ],
  'ana': [
    { stat: 'eliminations', name: 'Eliminations' },
    { stat: 'kill_streak_best', name: 'Kill Streak' },
    { stat: 'all_damage_done', name: 'All Damage Done' },
    { stat: 'healing_done', name: 'Healing Done' },
    { stat: 'enemies_slept', name: 'Enemies Slept' },
    { stat: 'nano_boost_assists', name: 'Assists Nano' },
    { stat: 'defensive_assists', name: 'Assists Defense' },
    { stat: 'offensive_assists', name: 'Assists Offense' }
  ],
  'lucio': [
    { stat: 'eliminations', name: 'Eliminations' },
    { stat: 'kill_streak_best', name: 'Kill Streak' },
    { stat: 'sound_barriers_provided', name: 'Barries Applied' },
    { stat: 'healing_done', name: 'Healing Done' },
    { stat: 'defensive_assists', name: 'Assists Defense' },
    { stat: 'offensive_assists', name: 'Assists Offense' }
  ],
  'mercy': [
    { stat: 'players_resurrected', name: 'Players Resurrected' },
    { stat: 'healing_done', name: 'Healing Done' },
    { stat: 'damage_amplified', name: 'Damage Amped' },
    { stat: 'defensive_assists', name: 'Assists Defense' },
    { stat: 'offensive_assists', name: 'Assists Offense' }
  ],
  'symmetra': [
    ...average.dps,
    { stat: 'players_teleported', name: 'Players Teleported' },
    { stat: 'sentry_turret_kills', name: 'Turret Kills' }
  ],
  'zenyatta': [
    { stat: 'eliminations', name: 'Eliminations' },
    { stat: 'kill_streak_best', name: 'Kill Streak' },
    { stat: 'transcendence_healing_best', name: 'Transcendence' },
    { stat: 'healing_done', name: 'Healing Done' },
    { stat: 'defensive_assists', name: 'Assists Defense' },
    { stat: 'offensive_assists', name: 'Assists Offense' }
  ]
}

export function careerAverage(name) {
  return average.stats[name];
};
