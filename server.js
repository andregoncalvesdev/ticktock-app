/* eslint strict: 0, no-console: 0 */
'use strict';

const path = require('path');
const express = require('express');
const webpack = require('webpack');
const config = require('./webpack.config.development');
const Curl = require( './node_modules/node-libcurl/lib/Curl' ), querystring = require( 'querystring' );

const app = express();
const compiler = webpack(config);

const PORT = 3000;

//get Tasks
var curl = new Curl(),
url  = 'https://mrticktock.com/app/api/get_tasks',
data = { //Data to send, inputName : value
  'email' : 'andre.goncalves@tekzenit.com',
  'password' : 'Tekgenpt1234'
};

//You need to build the query string,
// node has this helper function, but it's limited for real use cases (no support for array values for example)
data = querystring.stringify( data );

curl.setOpt( Curl.option.URL, url );
curl.setOpt( Curl.option.POSTFIELDS, data );
curl.setOpt( Curl.option.HTTPHEADER, ['User-Agent: node-libcurl/1.0'] );
curl.setOpt( Curl.option.VERBOSE, true );

console.log( querystring.stringify( data ) );

curl.perform();

curl.on( 'end', function( statusCode, body ) {

    console.log( body );

    this.close();
});

curl.on( 'error', curl.close.bind( curl ) );
//eogetTasks

app.use(require('webpack-dev-middleware')(compiler, {
  publicPath: config.output.publicPath,
  stats: {
    colors: true
  }
}));

app.use(require('webpack-hot-middleware')(compiler));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'app', 'hot-dev-app.html'));
});

app.listen(PORT, 'localhost', err => {
  if (err) {
    console.log(err);
    return;
  }

  console.log(`Listening at http://localhost:${PORT}`);
});

//socket io
const http = require('http');
const server = http.createServer(app);
const io = require('socket.io').listen(server);

server.listen(3000);

io.sockets.on('connection', function (socket) {
  socket.on('urEvent', function (data) {
    socket.emit('cc', 'cenas');
  });
});
