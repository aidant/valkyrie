const HEROES = {
  'genji': 'Genji',
  'mccree': 'McCree',
  'pharah': 'Pharah',
  'reaper': 'Reaper',
  'soldier76': 'Soldier: 76',
  'sombra': 'Sombra',
  'tracer': 'Tracer',
  'bastion': 'Bastion',
  'Hanzo': 'Hanzo',
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

export default function(hero) {
  return HEROES[hero];
}
