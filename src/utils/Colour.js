const COLOUR = {
    'default': '15746887',
    'https://blzgdapipro-a.akamaihd.net/game/rank-icons/season-2/rank-1.png': '12346195',
    'https://blzgdapipro-a.akamaihd.net/game/rank-icons/season-2/rank-2.png': '9013384',
    'https://blzgdapipro-a.akamaihd.net/game/rank-icons/season-2/rank-3.png': '15390075',
    'https://blzgdapipro-a.akamaihd.net/game/rank-icons/season-2/rank-4.png': '12439245',
    'https://blzgdapipro-a.akamaihd.net/game/rank-icons/season-2/rank-5.png': '4284808',
    'https://blzgdapipro-a.akamaihd.net/game/rank-icons/season-2/rank-6.png': '16170069',
    'https://blzgdapipro-a.akamaihd.net/game/rank-icons/season-2/rank-7.png': '16777215'
  };

export function marginColour(colour) {
  return COLOUR[colour] || COLOUR['default'];
}
