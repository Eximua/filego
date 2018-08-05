const pull = require('pull-stream');
const parallel = require('async/parallel');
const series = require('async/series');
const createNode = require('./src/p2p/createNode');
const CID = require('cids')

function printAddrs (node, number) {
    console.log('node %s is listening on:', number)
    node.peerInfo.multiaddrs.forEach((ma) => console.log(ma.toString()))
}

function print (protocol, conn) {
    pull(
      conn,
      pull.map((v) => v.toString()),
      pull.log()
    )
}

// parallel([
//     (cb) => createNode(['/ip4/0.0.0.0/tcp/0', '/ip4/127.0.0.1/tcp/10000/ws'], cb),
//     (cb) => createNode(['/ip4/0.0.0.0/tcp/0', '/ip4/127.0.0.1/tcp/20000/ws'], cb),
//   ], (err, nodes) => {
//     if (err) { throw err }
  
//     const node1 = nodes[0]
//     const node2 = nodes[1]
  
//     printAddrs(node1, '1')
//     printAddrs(node2, '1')

//     node1.on('peer:discovery', (peer) => console.log('Discovered:', peer.id.toB58String()))
//     node2.on('peer:discovery', (peer) => console.log('Discovered:', peer.id.toB58String()))
// })

parallel([
    (cb) => createNode(['/ip4/0.0.0.0/tcp/0', '/ip4/127.0.0.1/tcp/10000/ws'],cb),
    (cb) => createNode(['/ip4/0.0.0.0/tcp/0', '/ip4/127.0.0.1/tcp/20000/ws'],cb),
    // (cb) => createNode(['/ip4/0.0.0.0/tcp/0', '/ip4/127.0.0.1/tcp/30000/ws'],cb)
  ], (err, nodes) => {
    if (err) { throw err }
  
    const node1 = nodes[0]
    const node2 = nodes[1]
    // const node3 = nodes[2]

    series([
        (cb) => node1.once('peer:discovery', (peer) => node1.dial(peer, cb)),
        (cb) => setTimeout(cb, 500)
      ], (err) => {
        if (err) { throw err }

        console.log('start subing');
    
        // Subscribe to the topic 'news'
        node1.pubsub.subscribe('news',
          (msg) => console.log(msg.from, msg.data.toString()),
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
      })
    
  
    // parallel([
    //   (cb) => node1.dial(node2.peerInfo, cb),
    //   (cb) => node2.dial(node3.peerInfo, cb),
    //   // Set up of the cons might take time
    //   (cb) => setTimeout(cb, 300)
    // ], (err) => {
    //   if (err) { throw err }

    //     const cid = new CID('QmTp9VkYvnHyrqKQuFPiuZkiX9gPcqj6x5LJ1rmWuSySnL')

    //     node1.contentRouting.provide(cid, (err) => {
    //         if (err) { throw err }
    
    //         console.log('Node %s is providing %s', node1.peerInfo.id.toB58String(), cid.toBaseEncodedString())
    
    //         node3.contentRouting.findProviders(cid, 5000, (err, providers) => {
    //         if (err) { throw err }
    
    //         console.log('Found provider:', providers[0].id.toB58String())
    //         })
    //     })      
  
    //     // node1.peerRouting.findPeer(node3.peerInfo.id, (err, peer) => {
    //     //     if (err) { throw err }
    
    //     //     console.log('Found it, multiaddrs are:')
    //     //     peer.multiaddrs.forEach((ma) => console.log(ma.toString()))
    //     // })
    // })
  })