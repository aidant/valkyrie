import * as val from './validation';
import Joi from 'joi';
import User from '../schema/User'
import * as convert from './convert';

export default async function (context, message, options) {
  let msg = context.params.join(' ');
  let node = {
    accountTag: [],
    battleTag: [],
    gamerTag: [],
    onlineID: [],
    hero: [],
    gamemode: [],
    region: [],
    sensitivity: [],
    mouseDpi: []
  };
  let misc = {
    hero: []
  };
  let error = null;
  let embed = message.embed();
  embed.description('Missing one or more parameters.')
  let mentionsTriggerd = false;

  //parse the input.

  if (options.sensitivity) {
    if (Joi.validate(msg, val.sensitivity()).error === null) {
      node.sensitivity = msg.match(val.regex.sensitivity)
      msg = msg.replace(val.regex.sensitivity, '')

      node.sensitivity = node.sensitivity.map(val => {
        val = val
          .toLowerCase()
          .replace(/^sens(e|itivity)/, '')
        return parseFloat(val)
      })
    }
  }

  if (options.mouseDpi) {
    if (Joi.validate(msg, val.mouseDpi()).error === null) {
      node.mouseDpi = msg.match(val.regex.mouseDpi)
      msg = msg.replace(val.regex.mouseDpi, '')

      node.mouseDpi = node.mouseDpi.map(val => {
        val = val
          .toLowerCase()
          .replace(/^(c|d)pi/, '')
          .replace(/,/g, '')
        return parseFloat(val)
      })
    }
  }

  if (options.gamemode) {
    if (Joi.validate(msg, val.gamemode()).error === null) {
      node.gamemode = msg.match(val.regex.gamemode)
      msg = msg.replace(val.regex.gamemode, '')

      node.gamemode = node.gamemode.map(val => {
        return val
          .toLowerCase()
          .replace(/^qp|quick$/, 'quickplay')
          .replace(/^comp$/, 'competitive')
      })
    }
  }

  if (options.region) {
    if (Joi.validate(msg, val.region()).error === null) {
      node.region = msg.match(val.regex.region)
      msg = msg.replace(val.regex.region, '')

      node.region = node.region.map(val => {
        return val
          .toLowerCase()
          .replace(/^europe$/, 'eu')
          .replace(/^americas?$/, 'us')
          .replace(/^asia$/, 'kr')
      })
    }
  }

  if (options.hero) {
    if (Joi.validate(msg, val.hero()).error === null) {
      node.hero = msg.match(val.regex.hero)
      msg = msg.replace(val.regex.hero, '')

      misc.hero = node.hero;
      node.hero = node.hero.map(val => {
        return val
          .toLowerCase()
          .replace(/ |:|\./g, '')
          .replace('ö', 'o')
          .replace('ú', 'u')
          .replace(/^soldier$/, 'soldier76')
          .replace(/^rein$/, 'reinhardt')
          .replace(/^zen$/, 'zenyatta')
          .replace(/^torb$/, 'torbjorn')
          .replace(/^widow$/, 'widowmaker')
          .replace(/^sym$/, 'symmetra')
          .replace(/^junk$/, 'junkrat')
      })
    }
  }

  if (options.accountTag) {
    if (val.accountTag.validate(msg).error === null) {
      let tmp = {};
      tmp.battleTag = msg.match(val.regex.battleTag)
      tmp.gamerTag = msg.match(val.regex.gamerTag)
      tmp.onlineID = msg.match(val.regex.onlineID)

      if (tmp.battleTag) {
        node.battleTag.push(...tmp.battleTag);
        node.accountTag.push(...tmp.battleTag);
      }

      if (tmp.gamerTag) {
        node.gamerTag.push(...tmp.gamerTag);
        node.accountTag.push(...tmp.gamerTag);
      }

      if (tmp.onlineID) {
        node.onlineID.push(...tmp.onlineID);
        node.accountTag.push(...tmp.onlineID);
      }

    }
  }

  if (options.mentions) {
    if (Joi.validate(msg, val.discordID()).error === null) {
      node.mentions = msg.match(val.regex.discordID)
      msg = msg.replace(val.regex.discordID, '')

      node.mentions = node.mentions.map(val => {
        return val.replace(/<|>|@/g, '')
      })

      let user = await User.findOne({ discordId: node.mentions[0] })
      mentionsTriggerd = true;

      if (user) {
        if (user.region && user.accountTag && node.accountTag.length < 1) node.region.push(user.region);
        if (user.accountTag) node.accountTag.push(user.accountTag);
        if (user.gamemode) node.gamemode.push(user.gamemode);
        if (user.mouseDpi) node.mouseDpi.push(user.mouseDpi);
        if (user.sensitivity) node.sensitivity.push(user.sensitivity);
      }
    }
  }

  if (options.db && context.user && !mentionsTriggerd) {
    if (context.user.region && context.user.accountTag && node.accountTag.length < 1) node.region.push(context.user.region);
    if (context.user.accountTag) node.accountTag.push(context.user.accountTag);
    if (context.user.gamemode) node.gamemode.push(context.user.gamemode);
    if (context.user.mouseDpi) node.mouseDpi.push(context.user.mouseDpi);
    if (context.user.sensitivity) node.sensitivity.push(context.user.sensitivity);
  }

  //validate the output.

  if (options.accountTag) {
    if (node.accountTag.length < 1 && options.accountTag.default) node.accountTag.push(...options.accountTag.default);
    if (options.accountTag.required === true && node.accountTag.length < 1) {
      if (node.hero.length > 0) {
        let match = false;
        misc.hero.forEach((obj, i) => {
          if (!match && !/\u00F6|\u00FA/ig.test(obj)) {
            let tmp = {
              gamerTag: [],
              onlineID: []
            };
            tmp.xbl = obj.match(val.regex.gamerTag)
            tmp.psn = obj.match(val.regex.onlineID)

            if (tmp.xbl) {
              tmp.gamerTag.push(...tmp.xbl)
              match = true;
            }

            if (tmp.psn) {
              tmp.onlineID.push(...tmp.psn)
              match = true;
            }

            if (match) {
              node.hero.splice(i, 1);
              if (tmp.gamerTag.length > 0) node.accountTag.push(...tmp.gamerTag);
              if (tmp.onlineID.length > 0) node.accountTag.push(...tmp.onlineID);
            }
          }
        })
      }
      if (node.accountTag.length < 1) error = true;
    }
    if (options.accountTag.required === true || node.accountTag.length > 0) embed.fields('Account', node.accountTag[0] || 'None Provided');
  }

  if (options.hero) {
    if (node.hero.length < 1 && options.hero.default) node.hero.push(...options.hero.default);
    if (options.hero.required === true && node.hero.length < 1) error = true;
    if (node.hero[0] != 'all' && (options.hero.required === true || node.hero.length > 0)) embed.fields('Hero', convert.heroName(node.hero[0]) || 'None Provided');
  }

  if (options.gamemode) {
    if (node.gamemode.length < 1 && options.gamemode.default) node.gamemode.push(...options.gamemode.default);
    if (options.gamemode.required === true && node.gamemode.length < 1) error = true;
    if (options.gamemode.required === true || node.gamemode.length > 0) embed.fields('Gamemode', convert.gamemode(node.gamemode[0]) || 'None Provided');
  }

  if (options.region) {
    if (node.region.length < 1 && options.region.default) node.region.push(...options.region.default);
    if (options.region.required === true && node.region.length < 1) error = true;
    if (options.region.required === true || node.region.length > 0) embed.fields(node.region[0] === 'psn' || node.region[0] === 'xbl' ? 'Platform' : 'Region', convert.region(node.region[0]) || 'None Provided');
  }

  if (options.sensitivity) {
    if (node.sensitivity.length < 1 && options.sensitivity.default) node.sensitivity.push(...options.sensitivity.default);
    if (options.sensitivity.required === true && node.sensitivity.length < 1) error = true;
    if (options.sensitivity.required === true || node.sensitivity.length > 0) embed.fields('Sensitivity', node.sensitivity[0] || 'None Provided');
  }

  if (options.mouseDpi) {
    if (node.mouseDpi.length < 1 && options.mouseDpi.default) node.mouseDpi.push(...options.mouseDpi.default);
    if (options.mouseDpi.required === true && node.mouseDpi.length < 1) error = true;
    if (options.mouseDpi.required === true || node.mouseDpi.length > 0) embed.fields('Mouse DPI', node.mouseDpi[0] || 'None Provided');
  }

  if (error) embed.send();
  return { embed, error, result: {
    accountTag: node.accountTag[0],
    battleTag: node.battleTag[0],
    gamerTag: node.gamerTag[0],
    onlineID: node.onlineID[0],
    hero: node.hero[0],
    gamemode: node.gamemode[0],
    region: node.region[0],
    sensitivity: node.sensitivity[0],
    mouseDpi: node.mouseDpi[0]
  }, all: node}


}
