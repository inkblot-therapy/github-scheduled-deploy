import { Toolkit } from 'actions-toolkit'
import request from 'async-request';
import moment from 'moment'

async function suspend(ms) {
  return new Promise(resolve => {
    setTimeout(resolve, ms);
  });
}

Toolkit.run(async (tools) => {
  const schedule = moment().endOf('day').add(2, 'hours').valueOf() - moment().valueOf();
  const webhook = process.env.MEDSTACK_WEBHOOK;

  try {
    if(!webhook) {
      throw new Error('Webhoook is required.');
    }
    await suspend(schedule);
    const res = await request(webhook, { method: 'POST' });
    if (res.statusCode != 200) {
      throw new Error(`[Deploy Failded] Returned ${ res.status }`);
    }
    console.log(res);
  } catch (e) {
    tools.log.fatal(e);
    tools.exit.failure(e);
  }
  tools.exit.success('Deploy was initiated.');
});
