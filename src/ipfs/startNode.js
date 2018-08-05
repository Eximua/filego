const IPFS = require('ipfs');
const configs = require('../configs');

const node = new IPFS(configs.ipfs.options);

module.exports = node;
