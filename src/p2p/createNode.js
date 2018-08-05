const waterfall = require('async/waterfall');
const PeerInfo = require('peer-info');
const FilegoBundles = require('./bundle');

function createNode (addrs, callback) {
    if (!Array.isArray(addrs)) {
      addrs = [addrs]
    }
  
    let node
  
    waterfall([
      (cb) => PeerInfo.create(cb),
      (peerInfo, cb) => {
        addrs.forEach((addr) => peerInfo.multiaddrs.add(addr))
        node = new FilegoBundles({ peerInfo: peerInfo })
        node.start(cb)
      }
    ], (err) => callback(err, node))
}

module.exports = createNode;