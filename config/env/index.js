import path from 'path';

const env = process.env.NODE_ENV || 'development';
const config = require(`./${env}`)

const rootPath = path.join(__dirname, '..', '..', '..');

const defaults = {
  token: false,
  activator: 'val',
  name: 'Valkyrie',
  role: '#f04747',
  footer: 'Built by LazyGamer & Akira',
  databaseUri: 'nedb://' + path.join(rootPath, 'data'),
  voice_lines: [
    "Did someone call for a witch?",
    "Right beside you.",
    "Valkyrie im Bereitschaftsdienst.",
    "I'm here.",
    "I'll enjoy the quiet while it lasts.",
    "Valkyrie online.",
    "Operating at maximum efficiency.",
    "Medic!... Wait, that's me!"
  ],
};

export default Object.assign(defaults, config);
