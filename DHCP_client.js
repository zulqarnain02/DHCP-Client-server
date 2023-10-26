var dhcp = require("dhcp");

var s = dhcp.createClient({
  mac: "12:23:34:45:56:67",
  broadcast: "192.168.100.255",
  server: "192.168.100.161",
  port: 68,
});

s.on("error", function (err, data) {
  console.error("DHCP client error:", err);
});

s.on("listening", function (sock) {
  var address = sock.address();
  console.log("client listening:" + address.address + ":" + address.port);
});

s.on("bound", function (state) {
  console.log("State: ", state);
  s.close();
});

s.listen();

s.sendDiscover();