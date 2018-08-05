const libp2p = require('libp2p');
const TCP = require('libp2p-tcp');
const WebSockets = require('libp2p-websockets');
const defaultsDeep = require('@nodeutils/defaults-deep');
const SPDY = require('libp2p-spdy');
const SECIO = require('libp2p-secio');
const Bootstrap = require('libp2p-railing');
const MulticastDNS = require('libp2p-mdns');
const kadDHT = require('libp2p-kad-dht');

const bootstrapers = [
    '/ip4/104.131.131.82/tcp/4001/ipfs/QmaCpDMGvV2BGHeYERUEnRQAwe3N8SzbUtfsmvsqQLuvuJ',
    '/ip4/104.236.176.52/tcp/4001/ipfs/QmSoLnSGccFuZQJzRadHn95W2CrSFmZuTdDWP8HXaHca9z',
    '/ip4/104.236.179.241/tcp/4001/ipfs/QmSoLPppuBtQSGwKDZT2M73ULpjvfd3aZ6ha4oFGL1KrGM',
    '/ip4/162.243.248.213/tcp/4001/ipfs/QmSoLueR4xBeUbY9WZ9xGUUxunbKWcrNFTDAadQJmocnWm',
    '/ip4/128.199.219.111/tcp/4001/ipfs/QmSoLSafTMBsPKadTEgaXctDQVcqN88CNLHXMkTNwMKPnu',
    '/ip4/104.236.76.40/tcp/4001/ipfs/QmSoLV4Bbm51jM9C4gDYZQ9Cy3U6aXMJDAbzgu2fzaDs64',
    '/ip4/178.62.158.247/tcp/4001/ipfs/QmSoLer265NRgSp2LA3dPaeykiS1J6DifTC88f5uVQKNAd',
    '/ip4/178.62.61.185/tcp/4001/ipfs/QmSoLMeWqB7YGVLJN3pNLQpmmEk35v6wYtsMGLzSr5QBU3',
    '/ip4/104.236.151.122/tcp/4001/ipfs/QmSoLju6m7xTh3DuokvT3886QRYqxAzb1kShaanJgW36yx'
]

class FilegoBundles extends libp2p {
    constructor (_options) {
      const defaults = {
        modules: {
          transport: [
            TCP,
            WebSockets
          ],

          streamMuxer: [ SPDY ],

          connEncryption: [ SECIO ],

        //   peerDiscovery: [ MulticastDNS ],

          dht: kadDHT
        },
        config: {
        //   peerDiscovery: {
        //     bootstrap: {
        //       interval: 2000,
        //       enabled: true
        //     }
        //   },

          dht: {
            kBucketSize: 20
          },

          EXPERIMENTAL: {
            dht: true
          }          
        }        
      }
  
      super(defaultsDeep(_options, defaults))
    }
}

module.exports = FilegoBundles;