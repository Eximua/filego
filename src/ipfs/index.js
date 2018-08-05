const ipfs = require('./startNode');

ipfs.on('ready', () => {
    // Your node is now ready to use \o/
    console.log('IPFS node start')
})


