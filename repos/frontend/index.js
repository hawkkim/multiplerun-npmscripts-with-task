const http = require("http");

const requestListener = function (req, res) {
  res.writeHead(200);
};

const server = http.createServer(requestListener);
server.listen(55668);

console.log(
  "$$$$ Front-end pages built and serves at http://localhost:55668,\n$$$$ BUT it's socket server actually!"
);
