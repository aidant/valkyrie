import Joi from 'joi'

export const regex = {
  battleTag: /\b([a-zA-Z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u00FF\u0100-\u017E\u0180-\u0188\u01C0-\u0217]{1}[a-zA-Z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u00FF\u0100-\u017E\u0180-\u0188\u01C0-\u02170-9]{2,12})(#[0-9]{4,6})(?=\s|$)/g,
  onlineID: /\b([a-zA-Z]{1}[a-zA-Z0-9_-]{2,15})(?=\s|$)/g,
  gamerTag: /\b[a-zA-Z]{1}([a-zA-Z0-9 ]{0,13}[a-zA-Z]{1})?(?=\s|$)/g,
  hero: /\b(doomfist|genji|mccree|pharah|reaper|soldier:? ?(76)?|sombra|tracer|bastion|hanzo|junk(rat)?|mei|torb(j(o|\u00F6)rn)?|widow(maker)?|dva|orisa|rein(hardt)?|roadhog|winston|zarya|ana|l(u|\u00FA)cio|mercy|sym(metra)?|zen(yatta)?|moira)(?=\s|$)/ig,
  gamemode: /\b(qp|quick(play)?|comp(etitive)?)(?=\s|$)/ig,
  region: /\b(eu|europe|us|americas?|kr|asia|psn|xbl)(?=\s|$)/ig,
  discordID: /<@[0-9]+>(?=\s|$)/g,
  sensitivity: /\bsens(e|itivity) ([0-9]{1,2}(\.[0-9]{1,2})?|100(\.0{1,2})?)(?=\s|$)/ig,
  mouseDpi: /\b(d|c)pi ([0-9]{1,5}|[0-9]{1,2},[0-9]{2,3})(?=\s|$)/ig
}

export const accountTag = Joi.alternatives().try(battleTag(), onlineID(), gamerTag())

export function discordID () {
  return Joi.string().regex(regex.discordID)
}

export function region () {
  return Joi.string().regex(regex.region)
}

export function battleTag () {
  return Joi.string().regex(regex.battleTag)
}

export function onlineID () {
  return Joi.string().regex(regex.onlineID)
}

export function gamerTag () {
  return Joi.string().regex(regex.gamerTag)
}

export function hero () {
  return Joi.string().regex(regex.hero)
}

export function gamemode () {
  return Joi.string().regex(regex.gamemode)
}

export function mouseDpi () {
  return Joi.string().regex(regex.mouseDpi)
}

export function sensitivity () {
  return Joi.string().regex(regex.sensitivity)
}
