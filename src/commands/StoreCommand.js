import { validateBattleTag } from '../utils/Validation';

export default function storeCommand(context, message) {

  let battleTag = context.params.shift();

  if (!validateBattleTag(battleTag)) {
    message.channel.sendMessage('I require medical attention. \nI can\'t do anything without a valid BattleTag');
    return;
  }
}
