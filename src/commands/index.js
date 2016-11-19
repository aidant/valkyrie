import CommandRouter from '../CommandRouter';

import HelpCommand from './HelpCommand';
import HelpStatsCommand from './HelpStatsCommand';
import InviteCommand from './InviteCommand';
import StatsCommand from './StatsCommand';
import HeroStatsCommand from './HeroStatsCommand';
import TestCommand from './TestCommand';

const router = new CommandRouter();
router
  .add({
    command: ['help'],
    handler: HelpCommand,
  })
  .add({
    command: ['help', 'stats'],
    handler: HelpStatsCommand,
  })
  .add({
    command: ['invite'],
    handler: InviteCommand,
  })
  .add({
    command: ['stats'],
    handler: StatsCommand,
  })
  .add({
    command: ['hero'],
    handler: HeroStatsCommand,
  })
  .add({
    command: ['help', 'test'],
    handler: TestCommand,
  })

export default router;
