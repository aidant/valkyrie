import CommandRouter from '../CommandRouter';

import HelpCommand from './HelpCommand';
import HelpStatsCommand from './HelpStatsCommand';
import HelpHelpCommand from './HelpHelpCommand';
import HelpHeroesCommand from './HelpHeroesCommand';
import HamsterCommand from './ginger/HamsterCommand';
import LoganCommand from './ginger/LoganCommand';
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
  .add(HamsterCommand)
  .add(LoganCommand)
  .add(HeroesCommand)
  .add(InviteCommand)
  .add(StatsCommand)
  .add(StoreCommand)
;

export default router;
