const NodeResque = require('node-resque');
const schedule = require('node-schedule');
const task = require('./taskDefinition');
const client = require('../products/connectWise/restClient');

// Prepare variable to hold the previous rest response for comparison
var prevResp;

// ///////////////////////////
// DEFINE YOUR WORKER TASKS //
// ///////////////////////////

const jobs = {
  poll: async (instance) => {
    if (prevResp === undefined) {
      client.connect(instance, "add").then(function(responses) {
         console.log(responses);
         prevResp = responses;
      });
    }
    else {
      client.connect(instance, "poll").then(function(responses) {
         console.log("POLLING");
         prevResp = responses;
      });
    }
  }
}

async function cue(instance) {

  // START A WORKER //
  worker = task.workR(`CW_${instance.id}`,jobs);
  await worker.connect()
  worker.start()

  // START A SCHEDULER //
  scheduler = task.schedulR();
  await scheduler.connect()
  scheduler.start()

  // DEFINE JOBS //
  queue = task.queueR(jobs);
  await queue.connect()
  schedule.scheduleJob(`${instance.id}`, '0,10,20,30,40,50 * * * * *', async () => {
    if (scheduler.master) {
      console.log('>>> enquing a job')
      await queue.enqueue(`CW_${instance.id}`, 'poll', instance)
    }
  })

  // ////////////////////
  // SHUTDOWN HELPERS //
  // ////////////////////

  const shutdown = async () => {
    await scheduler.end()
    await worker.end()
    console.log('bye.')
    process.exit()
  }

  process.on('SIGTERM', shutdown)
  process.on('SIGINT', shutdown)
}

async function stop(instance) {
  client.delete(instance).then(function(responses) {
     console.log(responses);
  });
  var jobCTX = schedule.scheduledJobs[`${instance.id}`];
  jobCTX.cancel();
  console.log(`Killed process : ${instance.id}`);
  queue = task.queueR(jobs);
  await queue.connect();
  await queue.delQueue(`CW_${instance.id}`);
  // await queue.end();
}

module.exports = {
  queue: cue,
  kick: stop
}
