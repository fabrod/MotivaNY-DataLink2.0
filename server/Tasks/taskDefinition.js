const NodeResque = require('node-resque');

// ////////////////////////
// SET UP THE CONNECTION //
// ////////////////////////

const connectionDetails = {
  pkg: 'ioredis',
  host: 'rd',
  password: null,
  port: 6379,
  database: 0
}

module.exports.workR = (qName,jobs) => {
  const worker = new NodeResque.Worker({
    connection: connectionDetails,
    queues: [qName]
  }, jobs)
  return worker;
}

module.exports.schedulR = () => {
  const scheduler = new NodeResque.Scheduler({
    connection: connectionDetails
  });
  return scheduler;
}

module.exports.queueR = (jobs) => {
  const queue = new NodeResque.Queue({
    connection: connectionDetails
  }, jobs)
  queue.on('error', function(error) {
    console.log(error)
  })
  return queue;
}
