import { valBattleTag, valOnlineID, valGamerTag, valRegion, valHeroes, valGamemode, valMouseDpi, valSensitivity, valIsAccountTagHidden, valDiscordId, valDebug } from './validation';
import Joi from 'joi';
import Embed from './embed';
import hideAccountTag from './hideAccountTag';
import User from '../schema/User'

export default class Params {
  constructor(context, message) {
    this.context = context;
    this.message = message;
    this.result = {};
    this.require = {};
    this.triggered = {};
    this.default = {};
    this.error = false;
    this.embed = new Embed(this.message);
    this.embed.description('Mising one or more arguments.')

    for (var i = 0; i < this.context.params.length; i++) {
      if(Joi.validate(this.context.params[i], valDebug()).error === null) {
        this.error = true;
        this.context.params.splice(i, 1)
      }
    }

  }

  accountTag(required) {
    this.require.accountTag = required;
    this.triggered.accountTag = true;

    for (var i = 0; i < this.context.params.length; i++) {
      if(Joi.validate(this.context.params[i], valBattleTag()).error === null || Joi.validate(this.context.params[i], valOnlineID()).error === null || Joi.validate(this.context.params[i], valGamerTag()).error === null) {
        this.result.accountTag = this.context.params[i]
        this.context.params.splice(i, 1)
      }
    }

    return this
  }

  gamemode(required, mode) {
    this.require.gamemode = required;
    this.triggered.gamemode = true;
    this.default.gamemode = mode;

    for (var i = 0; i < this.context.params.length; i++) {
      if(Joi.validate(this.context.params[i], valGamemode()).error === null) {
        this.result.gamemode = this.context.params[i].toLowerCase().replace('qp', 'quickplay').replace('comp', 'competitive')
        this.context.params.splice(i, 1)
      }
    }

    return this
  }

  region(required) {
    this.require.region = required;
    this.triggered.region = true;

    for (var i = 0; i < this.context.params.length; i++) {
      if(Joi.validate(this.context.params[i], valRegion()).error === null) {
        this.result.region = this.context.params[i].toLowerCase()
        this.context.params.splice(i, 1)
      }
    }

    return this
  }

  hero(required) {
    this.require.hero = required;
    this.triggered.hero = true;

    for (var i = 0; i < this.context.params.length; i++) {
      let hero = this.context.params[i].toLowerCase()
      hero = hero
        .replace(/:|./g, '')
        .replace('ö', 'o')
        .replace('ú', 'u')
      if(Joi.validate(hero, valHeroes()).error === null) {
        this.result.hero = hero
        this.context.params.splice(i, 1)
      }
    }

    return this
  }

  mouseDpi(required) {
    this.require.mouseDpi = required;
    this.triggered.mouseDpi = true;

    for (var i = 0; i < this.context.params.length; i++) {
      if(Joi.validate(this.context.params[i], valMouseDpi()).error === null) {
        this.result.mouseDpi = parseFloat(this.context.params[i].split(':')[1]);
        this.context.params.splice(i, 1)
      }
    }

    return this
  }

  sensitivity(required) {
    this.require.sensitivity = required;
    this.triggered.sensitivity = true;

    for (var i = 0; i < this.context.params.length; i++) {
      if(Joi.validate(this.context.params[i], valSensitivity()).error === null) {
        this.result.sensitivity = parseFloat(this.context.params[i].split(':')[1]);
        this.context.params.splice(i, 1)
      }
    }

    return this
  }

  isAccountTagHidden(required) {
    this.require.isAccountTagHidden = required;
    this.triggered.isAccountTagHidden = true;

    for (var i = 0; i < this.context.params.length; i++) {
      if(Joi.validate(this.context.params[i], valIsAccountTagHidden()).error === null) {
        this.result.isAccountTagHidden = this.context.params[i].split(':')[1];
        if(this.result.isAccountTagHidden === 'false') {
          this.result.isAccountTagHidden = false;
        }
        if(this.result.isAccountTagHidden === 'true') {
          this.result.isAccountTagHidden = true;
        }
        this.context.params.splice(i, 1)
      }
    }
    return this
  }

  db() {
    if(!this.context.user) { return this };
    if(!this.result.accountTag && !this.result.region) {
      this.result.accountTag = this.context.user.accountTag
      this.result.region = this.context.user.region
      this.result.isAccountTagHidden = this.context.user.isAccountTagHidden
    }
    if(!this.result.accountTag) {
      this.result.accountTag = this.context.user.accountTag
      this.result.isAccountTagHidden = this.context.user.isAccountTagHidden
    }
    if(!this.result.gamemode) {
      this.result.gamemode = this.context.user.gamemode
    }
    if(!this.result.mouseDpi) {
      this.result.mouseDpi = this.context.user.mouseDpi
    }
    if(!this.result.sensitivity) {
      this.result.sensitivity = this.context.user.sensitivity
    }
    return this
  }

  required() {
    this.result.gamemode = this.result.gamemode || this.default.gamemode;

    if (this.require.accountTag && !this.result.accountTag) {
      this.embed.fields('Account', 'None provided')
      this.error = true;
    } else if (this.triggered.accountTag){
      this.embed.fields('Account', hideAccountTag(this.result.accountTag, this.result.isAccountTagHidden))
    }

    if (this.require.gamemode && !this.result.gamemode) {
      this.embed.fields('Gamemode', 'None provided')
      this.error = true;
    } else if (this.triggered.gamemode){
      this.embed.fields('Gamemode', this.result.gamemode)
    }

    if (this.require.region && !this.result.region) {
      this.embed.fields('Region', 'None provided')
      this.error = true;
    } else if (this.triggered.region){
      this.embed.fields('Region', this.result.region)
    }

    if (this.require.hero && !this.result.hero) {
      this.embed.fields('Hero', 'None provided')
      this.error = true;
    } else if (this.triggered.hero){
      this.embed.fields('Hero', this.result.hero)
    }

    if (this.require.mouseDpi && !this.result.mouseDpi) {
      this.embed.fields('Mouse DPI', 'None provided')
      this.error = true;
    } else if (this.triggered.mouseDpi) {
      this.embed.fields('Mouse DPI', this.result.mouseDpi)
    }

    if (this.require.sensitivity && !this.result.sensitivity) {
      this.embed.fields('Sensitivity', 'None provided')
      this.error = true;
    } else if (this.triggered.sensitivity) {
      this.embed.fields('Sensitivity', this.result.sensitivity)
    }

    if(this.error) {
      this.embed.send()
      this.result.error = true;
    }
    return this
  }
}
