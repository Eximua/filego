const libp2p = require('libp2p');
const TCP = require('libp2p-tcp');
const PeerInfo = require('peer-info');
const waterfall = require('async/waterfall');
const defaultsDeep = require('@nodeutils/defaults-deep');

class FilegoBundles extends libp2p {
    constructor (_options) {
      const defaults = {
        modules: {
          transport: [
            TCP
          ]
        }
      }
  
      super(defaultsDeep(_options, defaults))
    }
}

let filegoNode;

waterfall([
  (cb) => PeerInfo.create(cb),
  (peerInfo, cb) => {
    peerInfo.multiaddrs.add('/ip4/0.0.0.0/tcp/0')
    filegoNode = new FilegoBundles({ peerInfo: peerInfo })
    filegoNode.start(cb)
  }
], (err) => {
  if (err) { throw err }

  console.log('filego node has started (true/false):', filegoNode.isStarted())
  console.log('listening on:')
  filegoNode.peerInfo.multiaddrs.forEach((ma) => console.log(ma.toString()))
})

