import CommandRouter from '../CommandRouter';

import HelpCommand from './HelpCommand';
import InfoCommand from './InfoCommand';
import InviteCommand from './InviteCommand';
import SaveCommand from './SaveCommand';
import SenseCommand from './SenseCommand';
import StatsCommand from './StatsCommand';
import CatCommand from './ginger/CatCommand';
import HamsterCommand from './ginger/HamsterCommand';
import ReportCommand from './ReportCommand';

const router = new CommandRouter();
router
  .add(HelpCommand)
  .add(InfoCommand)
  .add(InviteCommand)
  .add(SaveCommand)
  .add(SenseCommand)
  .add(StatsCommand)
  .add(CatCommand)
  .add(HamsterCommand)
  .add(ReportCommand)

export default router;
