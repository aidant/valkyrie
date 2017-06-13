import Joi from 'joi';

export function valDiscordId() {
  return Joi.string().regex(/^<@[0-9]+>$/);
}

export function valRegion() {
  return Joi.string().lowercase().valid('eu', 'us', 'kr', 'psn', 'xbl');
}

export function valBattleTag() {
  return Joi.string().regex(/^[a-zA-Z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u00FF\u0100-\u017E\u0180-\u0188\u01C0-\u0217]{1}[a-zA-Z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u00FF\u0100-\u017E\u0180-\u0188\u01C0-\u02170-9]{2,12}(#|-)[0-9]{4,6}$/);
}

export function valOnlineID() {
  return Joi.string().regex(/^[\w-]{3,16}$/);
}

export function valGamerTag() {
  return Joi.string().regex(/^[A-Za-z0-9]{1,15}$/);
}

export function valHeroes() {
  return Joi.string().lowercase().valid('genji', 'mccree', 'pharah', 'reaper', 'soldier76', 'sombra', 'tracer', 'bastion', 'Hanzo', 'junkrat', 'mei', 'torbjorn', 'widowmaker', 'dva', 'orisa', 'reinhardt', 'roadhog', 'winston', 'zarya', 'ana', 'lucio', 'mercy', 'symmetra', 'zenyatta');
}

export function valGamemode() {
  return Joi.string().lowercase().valid('quickplay', 'competitive', 'qp', 'comp');
}

export function valMouseDpi() {
  return Joi.string().regex(/^dpi:[0-9]+$/i);
}

export function valSensitivity() {
  return Joi.string().regex(/^sense:([0-9]|[0-9].[0-9]{1,2})$/i);
}

export function valIsAccountTagHidden() {
  return Joi.string().regex(/^hidden:(false|true)$/i);
}
