//for quiz 1


//get express running
var express = require('express');
var app = express();
var server = require('http').createServer(app);

server.listen(8000)
console.log ('Listening on port 8000...')
// a convenient variable to refer to the HTML directory
var html_dir = 'C:/Users/loomeh/Dropbox/Spring 2014/WEBSYS2/GIT/Labs/Lab5 - Nodejs/';

// routes to serve the static HTML files
app.get('/', function(req, res) {
    res.sendfile(html_dir + 'sendhtml.html');
});


// var http=require('http');

// http.createServer(function(request, response) {
//    response.writeHead(200, {
//       'Content-type': 'text/html'
//    });
//    response.end('Quiz 1 - Hello World!');
// }).listen(8000);
//  console.log('Listening on http://127.0.0.1:8000');


//test server by running $node webserver.js in one terminal session
//then either go to localhost:8000 or in another terminal session