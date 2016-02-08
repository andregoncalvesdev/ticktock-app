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
var server = require('http').Server(app);
var io = require('socket.io')(server);

server.listen(3000);

app.get('/', function (req, res) {
  res.sendfile(__dirname + '/index.html');
});

io.on('connection', function (socket) {
  socket.on('login', function (loginData) {
    var curl = new Curl(),
    url  = 'https://mrticktock.com/app/api/get_tasks',

    //You need to build the query string,
    // node has this helper function, but it's limited for real use cases (no support for array values for example)
    loginData = querystring.stringify(loginData);

    curl.setOpt(Curl.option.URL, url);
    curl.setOpt(Curl.option.POSTFIELDS, loginData);
    curl.setOpt(Curl.option.HTTPHEADER, ['User-Agent: node-libcurl/1.0']);
    curl.setOpt(Curl.option.VERBOSE, true);

    curl.perform();

    curl.on('end', function(statusCode, tasks) {
        socket.emit('logged', tasks);

        this.close();
    });

    curl.on('error', curl.close.bind(curl));
  });
});
