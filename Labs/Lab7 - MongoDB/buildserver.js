//get express running
var express = require('express');
//file module
fs = require('fs');
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

//start nodejs server
server.listen(3000, function () {
	console.log("Server is listening...");
});


//MongoDB
var MongoClient = require('mongodb').MongoClient;
var tweets;
//start mongdb connection
MongoClient.connect('mongodb://127.0.0.1:27017/twitter', function(err, db) {
	if(!err) console.log('We are connected to mongodb twitter.');
	    // Fetch the collection test
	    tweets = db.collection('tweet'); //tweets collection
	    // // Remove all records in collection if any
    	// tweets.remove(function(err, result) {});
});

// routes to serve the files
app.use(express.static(__dirname + '/public'));

app.get('/',function(req,res){
	res.sendfile(__dirname + '/index.html');
});

app.get('/css/:filename',function(req,res){
	var filename = req.params.filename;
	res.sendfile(__dirname + '/css/' + filename);
});

app.get('/js/:jsname',function(req,res){
	var jsname = req.params.jsname;
	res.sendfile(__dirname + '/js/' + jsname);
});


//socket for button responses	
io.sockets.on('connection', function(socket) {
	//build json button
	socket.on('buildJson', function(data) {
		console.log(data);
		TwitterStream();
	});
	//convert to csv button
	socket.on('convertToCSV', function(data) {
		console.log(data);
		CSVconverter();
	});
	//build tweet database button
	socket.on('buildDB', function(data) {
		console.log(data);
		DBstream();
	});
});

//display tweets button
app.get('/DBtweets', function(req, res) {
	//inserts data into an array saved with callback as tweetsArray
	tweets.find().toArray(function(err, tweetsArray) {
		//console.log(tweetsArray));
          res.send(tweetsArray); //sent on the response to the client
    });

});


function TwitterStream() {
	//from lab 5 solution
	var i=0;
	//counter is the variable to hold the tweets
	var counter = '{\n"tweet": [\n\t';
	//connect to twitter's sample stream using ntwitter
	//writes tweets into a file
	twit.stream('statuses/sample', function(stream) {
	  stream.on('data', function (data) {
	  	if (i<10){ 	//amount of tweets written
	  		if (i!= 9) {
	  			counter+= JSON.stringify(data, null, 2) + ',';
	  			i++;
	  		}
	  		else {
	  			counter+= JSON.stringify(data, null, 2) + ']}';
	  			i++;
	  		}

	    }
	    else if( i == 10){
	    	fs.writeFile('ITWS4200-lab7-loomeh-tweets.json', counter, function (err) {
			  if (err) throw err;
			  console.log('It is saved!');
			  stream.destroy();
			});
	    	i++;
	    }
	  }); //stream funct
	}); //stream off

}

//helper function for converting to CSV
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
	var json = fs.readFileSync('ITWS4200-lab7-loomeh-tweets.json','utf8');
	fs.writeFile('ITWS4200-lab7-loomeh-tweets.csv', ConvertToCSV(json), function (err) {
		if (err) throw err;
		console.log('CSV saved');
	});
}

//function for putting tweets into the database
function DBstream() {
	var i=0;
	var tweetTotal = 20; //how many tweets I want to save
	//connect to twitter's sample stream using ntwitter
	//writes to mongodb ("twitter") database collection called tweets
	twit.stream('statuses/sample', function(stream) {
	  	stream.on('data', function (tweet) {	//insert tweet into db
	  		if(i<tweetTotal) {
		        tweets.insert(tweet, {safe: true}, function(err, result) {
		        	if (err) console.log(err.message);
		            if (err && err.message.indexOf('E11000 ') !== -1) {
		     			console.log("this id was already inserted in the database"); //error checking
		     		}
		        });
		        i++;
		    }
			if (i==tweetTotal) { //once reached total, tell prompt
				console.log("Streamed " + i + " tweets into database");
				stream.destroy(); //finish the stream 
				i++;
			}
			


	  }); //stream funct
	}); //stream off
}
