import { validateBattleTag } from '../utils/Validation';

export default function storeCommand(command, message) {

  let battleTag = command.params.shift();

  if (!validateBattleTag(battleTag)) {
    message.channel.sendMessage('I require medical attention. \nNo valid BattleTag provided.');
    return;
  }

  console.log(battleTag);
  console.log(message.author['id']);
}
