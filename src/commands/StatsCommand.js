import rp from 'request-promise';
import Embed from '../utils/embed';
import settings from '../../config/env';
import marginColor from '../utils/Color';
import fromSeconds from '../utils/FromSeconds';
import profileImage from '../utils/profileImage';
import path from 'path';
import heroName from '../utils/HeroName';
import Params from '../utils/params';

export default {
  command: ['stats'],
  helpShort: 'Look up your basic Overwatch stats.',

  async handler(context, message) {

    let input = new Params(context, message).region().gamemode().accountTag().db().result

    rp({uri: `http://localhost:3000/api/profile/${input.accountTag.replace('#', '-')}/${input.region}`, json: true})
      .then(function (account) {

        message.embed = function() {
          return new Embed(this);
        };

        let accountURL = account.profile.url
        let accountTag = account.profile.platform_username

        if(input.isAccountTagHidden === true) { accountURL = ''; accountTag = account.profile.username.split('#')[0]; }
        if(account.competitive.rank === null) { account.competitive.rank = 'unranked'; }

        let messE = message.embed()

        messE
          .author(accountTag, accountURL, account.images.player_icon)
          .color(marginColor(account.images.rank))
          .footer('Valkyrie', account.images.rank)
          .description(`A brief overview of ${account.profile.username}'s Overwatch stats.`)
          .timestamp()
          .thumbnail('attachment://profile.png')

        if(input.gamemode === 'quickplay') {
          messE
            .fields('Level', account.profile.level)
            .fields('Quickplay playtime', fromSeconds(account.quickplay.time_played_seconds))
            .fields('Quickplay wins', account.quickplay.games_won)
            .fields('Most played hero', `${heroName(account.quickplay.heroes.time_played_seconds[0].hero)} - ${fromSeconds(account.quickplay.heroes.time_played_seconds[0].value)}`)
        }

        if(input.gamemode === 'competitive') {
          messE
            .fields('Skill rating', account.competitive.rank)
            .fields('Competitive playtime', fromSeconds(account.competitive.time_played_seconds))
            .fields('Competitive games', `${account.competitive.games_won} Won, ${account.competitive.games_lost} Lost, ${account.competitive.games_tied} Tied\n${Math.floor(account.competitive.games_won / account.competitive.games_played * 100)}%`)
            .fields('Most played hero', `${heroName(account.competitive.heroes.time_played_seconds[0].hero)} - ${fromSeconds(account.competitive.heroes.time_played_seconds[0].value)}`)
        }

        profileImage(account.images.portrait.border, account.images.portrait.star, account[input.gamemode].heroes.time_played_seconds[0].hero, function(file){
          messE
          .attach(path.join(__dirname, '..', 'img', file), 'profile.png')
          .send()
        })

      })
      .catch(function (err) {

        console.log(err)
        message.embed = function() {
          return new Embed(this);
        };

        message.embed()
          .description(`I've failed you.`)
          .send()

      });

  },
  async help(context, message) {
    message.embed = function() {
      return new Embed(this);
    };

    message.embed()
      .description('You can save your information in the store command')
      .fields('Account', 'Nothing fancy, just your BattleTag, GamerTag or OnlineID')
      .fields('Region (optional)', 'us, eu, kr, xbl, psn')
      .fields('Gamemode', 'quickplay (qp) or competitive (comp)')
      .footer()
      .send(false)

  }
};


