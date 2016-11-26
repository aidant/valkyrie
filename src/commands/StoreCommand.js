import { validateBattleTag } from '../utils/Validation';
var Datastore = require('nedb')
  , db = new Datastore({ filename: 'BattleTags.db', autoload: true });


export default function storeCommand(context, message) {

  let battleTag = context.params.shift();

  if (!validateBattleTag(battleTag)) {
    message.channel.sendMessage('I require medical attention. \nI can\'t do anything without a valid BattleTag');
    return;
  };

  let doc = { hello: 'world'
                 , n: 5
                 , today: new Date()
                 , nedbIsAwesome: true
                 , notthere: null
                 , notToBeSaved: undefined
                 , fruits: [ 'apple', 'orange', 'pear' ]
                 , infos: { name: 'nedb' }
                 };

  db.insert(doc, function (err, newDoc) {
    console.log(err);
    console.log(newDoc);
  });
};
