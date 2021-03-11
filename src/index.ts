import { Toolkit } from 'actions-toolkit'

Toolkit.run(async (tools) => {
  const schedule = process.env.SCHEDULE
  const webhook = process.env.MEDSTACK_WEBHOOK

  try {
    if(!webhook) {
      // TODO: throw an error
    }
  } catch (e) {
    tools.log.fatal(e);
    tools.exit.failure('Failed Scheduled Deploy');
  }
  tools.exit.success('Deploy is Schedule');
});
