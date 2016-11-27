import CommandRouter from '../CommandRouter';

import HelpCommand from './HelpCommand';
import HelpStatsCommand from './HelpStatsCommand';
import HelpHelpCommand from './HelpHelpCommand';
import HelpHeroesCommand from './HelpHeroesCommand';
import InviteCommand from './InviteCommand';
import StatsCommand from './StatsCommand';
import StoreCommand from './StoreCommand';
import HeroesCommand from './HeroesCommand';

const router = new CommandRouter();
router
  .add(HelpCommand)
  .add(HelpHelpCommand)
  .add(HelpHeroesCommand)
  .add(HelpStatsCommand)
  .add(HeroesCommand)
  .add(InviteCommand)
  .add(StatsCommand)
  .add(StoreCommand)
;

export default router;
