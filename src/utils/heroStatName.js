const STATS = {
  'mercy': ['players_resurrected', 'healing_done', 'deaths', 'damage_amplified', 'offensive_assists', 'defensive_assists']
}

export default function (name) {
  return STATS[name];
};
