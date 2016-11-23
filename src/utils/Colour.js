const COLOUR = {
    'default': '15746887',
    'https://blzgdapipro-a.akamaihd.net/game/rank-icons/season-2/rank-1.png': '12346195',
    'https://blzgdapipro-a.akamaihd.net/game/rank-icons/season-2/rank-2.png': '9013384',
    'https://blzgdapipro-a.akamaihd.net/game/rank-icons/season-2/rank-3.png': '15390075',
    'https://blzgdapipro-a.akamaihd.net/game/rank-icons/season-2/rank-4.png': '12439245',
    'https://blzgdapipro-a.akamaihd.net/game/rank-icons/season-2/rank-5.png': '4284808',
    'https://blzgdapipro-a.akamaihd.net/game/rank-icons/season-2/rank-6.png': '16170069',
    'https://blzgdapipro-a.akamaihd.net/game/rank-icons/season-2/rank-7.png': '16777215',
    'Genji': '9826357',
    'McCree': '11620176',
    'Pharah': '3503554',
    'Reaper': '7613761',
    'Soldier: 76': '6253450',
    'Sombra': '7360948',
    'Tracer': '14389044',
    'Bastion': '7307629',
    'Hanzo': '11314812',
    'Junkrat': '15447619',
    'Mei': '6924778',
    'Torbjörn': '12610659',
    'Widowmaker': '10117022',
    'D.Va': '15896259',
    'Reinhardt': '9608607',
    'Roadhog': '11172672',
    'Winston': '9869491',
    'Zarya': '14577067',
    'Ana': '6981037',
    'Lúcio': '8505156',
    'Mercy': '15788215',
    'Symmetra': '8499654',
    'Zenyatta': '15918711'
  };

export function marginColour(colour) {
  return COLOUR[colour] || COLOUR['default'];
};
