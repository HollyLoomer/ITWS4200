//get fs module running
var fs = require('fs');
//get express running
var express = require('express');

//get twitter running
var twitter = require('ntwitter');
var twit = new twitter({
  consumer_key: 'mfB46z0g1HiuxPRqsUSAQ',
  consumer_secret: '1qPPwUAzxiQk6jbaPGGEkt0otPnFbNx1ozoa6HeppN0',
  access_token_key: '192306695-NrP72oalKgdz9FsCMyHlFD5KaHdNPIz08uBYOcED',
  access_token_secret: 'h6aZ2zMzcs6XjomayrAsxb7IT95UVpPOZlRE9qJFQJtab'
});

//set up server
var app = express();
var server = require('http').createServer(app);
io = require('socket.io').listen(server); //start socket

//start server
var port = 3000; 
server.listen(port, function () {
	console.log("Listening on " + port)
});

	// routes to serve the static HTML file
	app.get('/', function(req, res) {
	    res.sendfile('mainhtml.html');
	});

	app.get('/buildJSON', function(req, res) {
		TwitterStream();
	});
	


	io.sockets.on('connection', function(socket) {
		// socket.on('buildJson', function(data) {
		// 	console.log(data);
		// 	TwitterStream();
		// });
		socket.on('convertToCSV', function(data) {
			console.log(data);
			CSVconverter();
		})
	})
  		// server.close()


function TwitterStream() {
	//from lab 5 solution
	var i=0;
	//counter is the variable to hold the tweets
	var counter = [];
	//connect to twitter's sample stream using ntwitter
	//writes tweets into a file
	twit.stream('statuses/sample', function(stream) {
	  stream.on('data', function (data) {
	  	if (i<10){ 	//amount of tweets written
	  		counter[i++] = data;
	    }
	    else if( i == 10){
	    	fs.writeFile('ITWS4200-lab6-loomeh-tweets.json', JSON.stringify(counter, null, 2), function (err) {
			  if (err) throw err;
			  console.log('It is saved!');
			  stream.destroy();
			});
	    	i++;
	    }
	  }); //stream funct
	}); //stream off

}


function ConvertToCSV(objArray) {
            var array = typeof objArray != 'object' ? JSON.parse(objArray) : objArray;
            var str = '';
            //for heading
            for (var j = 0; j < array.length; j++) {
            	var head = '';
            	for (var jindex in array[j]) {
            		// console.log(jindex);
            		if (head != '') head += ',' //add comma after items
            		head += '"' + jindex + '"';
            	}
            }
            str += head + '\r\n\r\n';

            for (var i = 0; i < array.length; i++) {
                var line = '';
                for (var index in array[i]) {
                    if (line != '') line += ','

                    line += '"' + array[i][index] + '"';
                }

                str += line + '\r\n\r\n'; //newline
            }

            return head + str;
}


function CSVconverter() {

	//convert file to variable
	var json = fs.readFileSync('ITWS4200-lab6-loomeh-tweets.json','utf8');
	fs.writeFile('ITWS4200-lab6-loomeh-tweets.csv', ConvertToCSV(json), function (err) {
		if (err) throw err;
		console.log('CSV saved');
	});

	//proposed solution but was not successful on being able to 
	//	use jquery in my javascript file (trouble on server/client connecting)
	//do a for loop through the json file
	//write a minified json file
	// for (int i=0; i<jsonPREflat.length(); i++) {//for each array item
	// 	for (int k=0; k<jsonPREflat[i].length(); k++) { //for each key in the json
	// 		//if the key has more than one value..
	// 			//for (int j=0; j<key.length();j++) {
	// 				//add value to original key name
	// 				//}
	// 			//else...
	// 				//write the current line to file
	// 	}
	// }
	//then to convert to csv with getJSON use key to print headers
	//use getJSON to print each entry piece of each tweet 
	//with a line separation in between
	//

}


