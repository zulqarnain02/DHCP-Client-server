var dhcp = require('dhcp');

var s = dhcp.createServer({
  // System settings
  range: [
    "192.168.100.1","192.168.100.100"
  ],
  forceOptions: ['hostname'], // Options that need to be sent, even if they were not requested
  randomIP: true, // Get random new IP from pool instead of keeping one ip
  static: {
    "11:22:33:44:55:65": "192.168.100.161"// meaning it will always asign given ip address for mac address
  },

  // Option settings (there are MUCH more)t
  subnetmask: '255.255.255.0',
  router: [
    '192.168.0.1'
  ],
  // timeServer: null,
  // nameServer: null,
  dns: ["8.8.8.8", "8.8.4.4"],
  hostname: "Zulqarnain",
  // domainName: "xarg.org",
  broadcast: '255.255.255.255',
  server: '192.168.152.161', // This is us
  maxMessageSize: 1500,
  leaseTime: 86400,
  renewalTime: 60,
  rebindingTime: 120,
  ignoreOptions: [0],
  // onDiscover: (discoverMessage) => {
  //   console.log('DHCP DISCOVER from ' + discoverMessage.chaddr);
  //   // Handle the discover message and send a DHCPOFFER
  // },
  // onRequest: (requestMessage) => {
  //   console.log('DHCP REQUEST from ' + requestMessage.chaddr);
  //   // Handle the request message and send a DHCPACK
  // },
  // onRelease: (releaseMessage) => {
  //   console.log('DHCP RELEASE from ' + releaseMessage.chaddr);
  //   // Handle the release message and release the IP address
  // },
  bootFile: function (req, res) {

    // res.ip - the actual ip allocated for the client

    if (req.clientId === 'foo bar') {
      return 'x86linux.0';
    } else {
      return 'x64linux.0';
    }
  }
});   

s.on('error', function (err, data) {
  console.error('DHCP server error:', err);``
});

s.on("listening", function(sock) {
  var address = sock.address();
  console.info('Server Listening: ' + address.address + ':' + address.port);
});


// s.on('discover', (packet) => {
//   console.log('DHCP DISCOVER from ' + packet.chaddr);
//   // handle the packet and send DHCPOFFER
// });

// s.on('request', (packet) => {
//   console.log('DHCP REQUEST from ' + packet.chaddr);
//   // handle the packet and send DHCPACK
// });

// s.on('release', (packet) => {
//   console.log('DHCP RELEASE from ' + packet.chaddr);
//   // handle the packet and release the IP address
// });

// s.on("listening", function(sock) {
//   var address = sock.address();
//   console.info('Server Listening: ' + address.address + ':' + address.port);
// });

s.on('clientConnected', (state) => {
  console.log(`Client ${state.clientId} has connected to the DHCP server.`);
  console.log('hello world !');
});

s.on("close", function() {
  console.log('close');
});

s.listen();

