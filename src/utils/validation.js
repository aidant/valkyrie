import Joi from 'joi'

const common = 'a-zA-Z0-9'
const battleTagTypes = [
  // Chinese
  `[${common}\u3400-\u4dbf\u4e00-\u9fff\uf900-\ufaff]{2,8}`,
  // Cyrillic
  `[${common}\u0400-\u04ff\u0500-\u052f]{3,12}`,
  // Japanese
  `[${common}\u3000-\u30FF\uFF00-\uFFEF\u4E00-\u9FAF]{2,8}`,
  // Korean
  `[${common}\uac00-\ud7af]{2,8}`,
  // Latin
  `[${common}\u00c0-\u00d6\u00d8-\u00f6\u00f8-\u017e\u0180-\u0188\u0190-\u0198\u01c0-\u0217]{3,12}`,
  // Thai
  `[${common}\u0E00-\u0E7F]{2,8}`
].join('|')

export const regex = {
  battleTag: new RegExp(`(?<=\\s|^)(?![0-9])(${battleTagTypes})#([0-9]{4,6})(?=\\s|$)`, 'g'),
  onlineID: /\b([a-zA-Z]{1}[a-zA-Z0-9_-]{2,15})(?=\s|$)/g,
  gamerTag: /\b[a-zA-Z]{1}([a-zA-Z0-9 ]{0,13}[a-zA-Z]{1})?(?=\s|$)/g,
  hero: /\b(doomfist|genji|mccree|pharah|reaper|soldier:? ?(76)?|sombra|tracer|bastion|hanzo|junk(rat)?|mei|torb(j(o|\u00F6)rn)?|widow(maker)?|d\.?va|orisa|rein(hardt)?|roadhog|winston|zarya|ana|l(u|\u00FA)cio|mercy|sym(metra)?|zen(yatta)?|moira)(?=\s|$)/ig,
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
