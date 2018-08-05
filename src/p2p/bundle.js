const libp2p = require('libp2p');
const TCP = require('libp2p-tcp');
const WebSockets = require('libp2p-websockets');
const defaultsDeep = require('@nodeutils/defaults-deep');
const SPDY = require('libp2p-spdy');

class FilegoBundles extends libp2p {
    constructor (_options) {
      const defaults = {
        modules: {
          transport: [
            TCP,
            WebSockets
          ],

          streamMuxer: [ SPDY ]
        }
      }
  
      super(defaultsDeep(_options, defaults))
    }
}

module.exports = FilegoBundles;