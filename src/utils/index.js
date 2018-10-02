function printAddrs (node, number) {
    console.log('node %s is listening on:', number)
    node.peerInfo.multiaddrs.forEach((ma) => console.log(ma.toString()))
}

module.exports = {
    printAddrs,
}