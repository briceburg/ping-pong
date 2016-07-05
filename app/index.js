// dependencies
// /////////////

// core
var express = require('express'),
    app = express(),
    server = require('http').Server(app);

var util = require('util');

// configuration
// //////////////

app.locals.PORT = process.env.VIRTUAL_PORT || 80;

// routes
// ///////

app.all('/ping', function(req, res) {
  res.send('pong');
});

// runtime
// ////////

// start server
server.listen(app.locals.PORT, function() {
   console.log(util.format('ping-pong listening on http://%s:%s',
     process.env.VIRTUAL_HOST || 'localhost',
     server.address().port)
   );
});

function shutdown() {
  process.exit(0);
}

// allow sigterm to kill app
process.on('SIGTERM', shutdown);
process.on('SIGINT', shutdown);
