var express = require('express')
var app = express();
var bodyParser = require('body-parser');
var http = require('http').Server(app);
var io = require('socket.io')(http);
var data = require('./data');

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

function join(slug) {
    var sessionName = slug;

    if (sessionName == null) {
        sessionName = data.generateName();
    }

    if (sockets[sessionName] == null) {
        sockets[sessionName] = io.of('/sessions/' + slug);
    }
}

app.get('/', function(req, res){
    res.send('<h1>Server up</h1>');
});

app.post('/sessions', function(req, res) {
    join();
    res.sendStatus(204);
});

app.put('/sessions/:slug', function(req, res) {
    join(req.params.slug);
    res.sendStatus(200);
});

http.listen(process.env.PORT || 4000, function() {
    var port = (process.env.PORT) ? process.env.PORT : 4000;
    console.log("Server is up on :" + port);
});