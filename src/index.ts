import { Toolkit } from 'actions-toolkit'
import request from 'async-request';
import scheduler from 'node-schedule';
import moment from 'moment'

Toolkit.run(async (tools) => {
  const schedule = moment().add(5, 'minutes').toDate();
  // const schedule = moment().endOf('day').add(2, 'hours').toDate();
  const webhook = process.env.MEDSTACK_WEBHOOK;

  try {
    if(!webhook) {
      throw new Error('Webhoook is required.');
    }

    scheduler.scheduleJob(schedule, async () => {
      const res = await request(webhook);
      console.log(res);

      if (res.status != 200) {
        throw new Error(`Returned ${ res.status }`);
      }
    });
  } catch (e) {
    tools.log.fatal(e);
    tools.exit.failure(e);
  }
  tools.exit.success('Deploy was initiated.');
});
