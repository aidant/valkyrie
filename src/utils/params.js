import { valBattleTag, valOnlineID, valGamerTag, valRegion, valHeroes, valGamemode, valMouseDpi, valSensitivity, valIsAccountTagHidden } from './validation';
import Joi from 'joi';

export default class Params {
  constructor(context, message) {
    this.context = context;
    this.message = message;
    this.result = {};
  }

  accountTag() {
    for (var i = 0; i < this.context.params.length; i++) {
      if(Joi.validate(this.context.params[i], valBattleTag()).error === null || Joi.validate(this.context.params[i], valOnlineID()).error === null || Joi.validate(this.context.params[i], valGamerTag()).error === null) {
        this.result.accountTag = this.context.params[i]
        this.context.params.splice(i, 1)
      }
    }
    return this
  }

  gamemode() {
    for (var i = 0; i < this.context.params.length; i++) {
      if(Joi.validate(this.context.params[i], valGamemode()).error === null) {
        this.result.gamemode = this.context.params[i].replace('qp', 'quickplay').replace('comp', 'competitive')
        this.context.params.splice(i, 1)
      }
    }
    return this
  }

  region() {
    for (var i = 0; i < this.context.params.length; i++) {
      if(Joi.validate(this.context.params[i], valRegion()).error === null) {
        this.result.region = this.context.params[i]
        this.context.params.splice(i, 1)
      }
    }
    return this
  }

  hero() {
    for (var i = 0; i < this.context.params.length; i++) {
      if(Joi.validate(this.context.params[i], valHeroes()).error === null) {
        this.result.hero = this.context.params[i]
        this.context.params.splice(i, 1)
      }
    }
    return this
  }

  mouseDpi() {
    for (var i = 0; i < this.context.params.length; i++) {
      if(Joi.validate(this.context.params[i], valMouseDpi()).error === null) {
        this.result.mouseDpi = parseFloat(this.context.params[i].split(':')[1]);
        this.context.params.splice(i, 1)
      }
    }
    return this
  }

  sensitivity() {
    for (var i = 0; i < this.context.params.length; i++) {
      if(Joi.validate(this.context.params[i], valSensitivity()).error === null) {
        this.result.sensitivity = parseFloat(this.context.params[i].split(':')[1]);
        this.context.params.splice(i, 1)
      }
    }
    return this
  }

  isAccountTagHidden() {
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

  discordId() {

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
    return this
  }
}
