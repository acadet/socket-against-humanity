var express = require('express')
var app = express();
var bodyParser = require('body-parser');
var http = require('http').Server(app);
var io = require('socket.io')(http);

// Global vars
var sockets = {};

app.use(bodyParser.json());

app.use(function(req, res, next) { // Allow CORS
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000, https://socket-against-humanity.herokuapp.com/');

    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    next();
});

app.get('/', function(req, res){
    res.send('<h1>Server up</h1>');
});