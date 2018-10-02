const ipfs = require('./startNode');
const log4js = require('log4js');
const logger = log4js.getLogger();
logger.level = 'debug';

ipfs.on('ready', () => {
    logger.debug('IPFS node started.');
    
    const files = [{
        path: './hello_world',
        content: Buffer.from('hello world a')
    }];

    ipfs.ls('QmUFqACJZrn7kV9YAF57RKuFvZzKZ9vsjS8GNGmt8kd7iK', function (err, files) {
        files.forEach((file) => {
          logger.debug(file.path);
        })
    })
      
    ipfs.files.add(files, function (err, files) {
        // 'files' will be an array of objects containing paths and the multihashes of the files added
        if(err) {
            logger.error(err);
        }

        const hash = files[0].hash;

        logger.debug(files);

        logger.debug(hash);

        ipfs.files.cat(hash, (err, data) => {
            if (err) { logger.error(err); }
            logger.debug(data.toString());
        });
    });
});

ipfs.on('error', (error) => {
    logger.fatal(error)
});
