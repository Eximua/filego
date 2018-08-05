const pull = require('pull-stream');
const parallel = require('async/parallel');
const createNode = require('./src/p2p/createNode');
  
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

parallel([
    (cb) => createNode('/ip4/0.0.0.0/tcp/0', cb),
    (cb) => createNode(['/ip4/0.0.0.0/tcp/0', '/ip4/127.0.0.1/tcp/10000/ws'], cb),
    (cb) => createNode('/ip4/127.0.0.1/tcp/20000/ws', cb)
  ], (err, nodes) => {
    if (err) { throw err }
  
    const node1 = nodes[0]
    const node2 = nodes[1]
    const node3 = nodes[2]
  
    printAddrs(node1, '1')
    printAddrs(node2, '2')
    printAddrs(node3, '3')
  
    node1.handle('/print', print)
    node2.handle('/print', print)
    node3.handle('/print', print)
  
    // node 1 (TCP) dials to node 2 (TCP+WebSockets)
    node1.dialProtocol(node2.peerInfo, '/print', (err, conn) => {
      if (err) { throw err }
  
      pull(pull.values(['node 1 dialed to node 2 successfully']), conn)
    })
  
    // node 2 (TCP+WebSockets) dials to node 2 (WebSockets)
    node2.dialProtocol(node3.peerInfo, '/print', (err, conn) => {
      if (err) { throw err }
  
      pull(pull.values(['node 2 dialed to node 3 successfully']), conn)
    })
  
    // node 3 (WebSockets) attempts to dial to node 1 (TCP)
    node3.dialProtocol(node1.peerInfo, '/print', (err, conn) => {
      if (err) {
        console.log('node 3 failed to dial to node 1 with:', err.message)
      }
    })
})