import CommandRouter from '../CommandRouter';

import HelpCommand from './HelpCommand';
import InviteCommand from './InviteCommand';
import StatsCommand from './StatsCommand';
import StoreCommand from './StoreCommand';
import HeroesCommand from './HeroesCommand';
import SenseCommand from './SenseCommand';

const router = new CommandRouter();
router
  .add(HelpCommand)
  .add(HeroesCommand)
  .add(InviteCommand)
  .add(StatsCommand)
  .add(StoreCommand)
  .add(SenseCommand)
;

export default router;
