import moment from 'moment-timezone';
import request from 'async-request';
import { Toolkit } from 'actions-toolkit'

async function suspend(ms) {
  return new Promise(resolve => {
    setTimeout(resolve, ms);
  });
}

Toolkit.run(async (tools) => {
  const webhook = process.env.MEDSTACK_WEBHOOK;
  const nowval = moment().tz('America/Toronto').valueOf();
  const schedule = moment().tz('America/Toronto').endOf('day').add(2, 'hours').valueOf();
  const deploy_milliseconds = schedule - nowval;

  try {
    if(!webhook) {
      throw new Error('Webhoook is required.');
    }
    console.log('Will deploy in milliseconds: ', deploy_milliseconds);
    await suspend(deploy_milliseconds);
    const res = await request(webhook, { method: 'POST' });
    if (res.statusCode != 200) {
      throw new Error(`[Deploy Failed] Returned ${ res.status }`);
    }
    console.log(res);
  } catch (e) {
    tools.log.fatal(e);
    tools.exit.failure(e);
  }
  tools.exit.success('Deploy was initiated.');
});
