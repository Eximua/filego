const pull = require('pull-stream');
const parallel = require('async/parallel');
const series = require('async/series');
const createNode = require('./p2p/createNode');
const CID = require('cids');

const levelDB = require('./levelDB');
const ipfs = require('./ipfs/startNode');

const log4js = require('log4js');
const logger = log4js.getLogger();
logger.level = 'debug';

levelDB.put('TEST_IS_LEVELDB_AVAILABLE', 'YES', function (err) {
    if (err) return logger.fatal('Ooops!', err);
  
    levelDB.get('TEST_IS_LEVELDB_AVAILABLE', function (err, value) {
      if (err) return logger.fatal('Ooops!', err);
  
      if (value === 'YES') {
        logger.debug('Level DB is available.');

        ipfs.on('ready', () => {
            logger.debug('IPFS node started.')
        });

        ipfs.on('error', (error) => {
            logger.fatal(error);
        });
      }
    });
});

parallel([
    (cb) => createNode(['/ip4/0.0.0.0/tcp/0', '/ip4/127.0.0.1/tcp/10000/ws'], cb),
    (cb) => createNode(['/ip4/0.0.0.0/tcp/0', '/ip4/127.0.0.1/tcp/20000/ws'], cb)
  ], (err, nodes) => {
    if (err) { logger.fatal(err); }
  
    const node1 = nodes[0];
    const node2 = nodes[1];

    logger.debug('Starting libp2p nodes...');

    series([
        (cb) => node1.once('peer:discovery', (peer) => node1.dial(peer, cb)),
        (cb) => setTimeout(cb, 0)
      ], (err) => {
        if (err) { logger.fatal(err); }

        logger.debug('P2P Node started, listening for pub/sub...');
    
        // Subscribe to the topic 'news'
        node1.pubsub.subscribe('news',
          (msg) => logger.debug(msg.from, msg.data.toString()),
          () => {
            setInterval(() => {
              // Publish the message on topic 'news'
              node2.pubsub.publish(
                'news',
                Buffer.from('Bird bird bird, bird is the word!'),
                () => {}
              )
            }, 1000)
          }
        )

      });
  });
