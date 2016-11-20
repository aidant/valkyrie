import { validateBattleTag } from '../utils/Validation';

export default function storeCommand(command, message) {

  let battleTag = command.params.shift();

  if (!validateBattleTag(battleTag)) {
    message.channel.sendMessage('I require medical attention. \nI can\'t do anything without a valid BattleTag');
    return;
  }

  console.log(battleTag);
  console.log(message.author.id);
}
