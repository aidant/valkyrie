import CommandRouter from '../CommandRouter';

import HelpCommand from './HelpCommand';
import HelpStatsCommand from './HelpStatsCommand';
import InviteCommand from './InviteCommand';
import StatsCommand from './StatsCommand';

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

export default router;
