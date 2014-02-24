
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var http = require('http');
var path = require('path');

var app = express();

// start additional sockjs line
var sockjs = require('sockjs');

var connections = [];

var chat = sockjs.createServer();
chat.on('connection', function(conn){
  
  connections.push(conn);
  
  var number = connections.length;
  conn.write("Welcome, User " + number);
  conn.on('data', function(message){
    for(var i=0; i<connections.length; i++){
      connections[i].write("User " + number + " says: " + message);
    }
  });
  conn.on('close', function(){
    for(var i=0; i<connections.length; i++){
      connections[i].write("User " + number + " has disconnected");
    }
  });
});

// end of sockjs line

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(__dirname, '/bower_components'));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);
app.get('/users', user.list);

var server = http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});

chat.installHandlers(server, {prefix: '/chat'});
