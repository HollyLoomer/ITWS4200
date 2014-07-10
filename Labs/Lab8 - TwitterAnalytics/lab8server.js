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
});


var pieChartWords = [0, 0]; //replies vs not replies
var followerNumbers = [0, 0, 0, 0, 0, 0] //each slot is number range
var pair = {}; //for languages
//array that reads in file of languages
var twitlangdoc = fs.readFileSync('js/twitlanguages.json', 'utf8');
var twitlangJSON = JSON.parse(twitlangdoc);

//function for putting tweets into the database
function DBstream() {
	var i=0;
	var tweetTotal = 100; //how many tweets I want to save
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
				tweets.find().toArray(function(err, docs) {
         			docs.forEach(function(doc) {
            			piechartCounter(doc.in_reply_to_status_id);
            			followersCounter(doc.user.followers_count);
            			languageCounter(doc.lang, twitlangJSON);
            		});
          		});
         		
				
				// stream.destroy(); //finish the stream 
				i++;
			}
			

	  }); //stream funct
	}); //stream off
}


DBstream();

function piechartCounter(tweetreply) {
	if(tweetreply != null) pieChartWords[0]++ ; //replied tweet
	else pieChartWords[1]++; //otherwise its not a reply
}

function followersCounter(followers) {
	if (followers <= 100) {
		followerNumbers[0]++; //add 1 to first data point, 0-100
	}
	else if (followers > 100 && followers <= 500) {
		followerNumbers[1]++; //add 1 to second data point, 100-500
	}
	else if (followers > 500 && followers <= 1000) {
		followerNumbers[2]++; //add 1 to third point, 500-1000
	}
	else if (followers > 1000 && followers <= 5000) {
		followerNumbers[3]++; //add 1 to fourth point, 1000-5000
	}
	else if (followers > 5000 && followers <= 10000) {
		followerNumbers[4]++; //add 1 to fifth point, 5000-10000
	}
	else if (followers > 10000) {
		followerNumbers[5]++; //add 1 to sixth point, 10000+
	}

}


function languageCounter(currentLang, twitlangJSON) {
	for (var i = 0; i<28; i++) { //supports 28 languages
		if (currentLang == twitlangJSON[i].code) {
			if (pair[twitlangJSON[i].name]) { //if exists
				pair[twitlangJSON[i].name]++;
			}
			else {
				pair[twitlangJSON[i].name] = 1;
			}
		}
	}
	var languages = JSON.stringify(pair);
	return languages;
}



//ROUTERS

app.get("/lineChart", function(req, res) {
	console.log("before sending followers to client " + followerNumbers);
	res.json(followerNumbers);
});

app.get("/barChart", function(req, res) {
	var languages = pair;
	console.log("before sending languages to client " + JSON.stringify(languages));
	res.json(languages);
});


app.get("/pieChart", function(req, res) {
	 console.log("before sending replies to client " + pieChartWords);
	 res.json(pieChartWords);
});

// start button action
app.get('/startButton', function(req, res) {
	// DBstream();
	streamDB(res); //inserts data into an array saved with callback as tweetsArray
});

function streamDB(res) {
	tweets.find().toArray(function(err, tweetsArray) {
		res.send(tweetsArray); //send out the response to the client
	});
}

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



//attempted at getting analyses again
//app.get('/againButton', function(req,res) {
// 	console.log("Getting analyses again...");
// 	// RUN();
// 	DBstream();

// 	app.get("/pieChart", function(req, res) {
// 		 console.log("again " + pieChartWords);
// 		 res.json(pieChartWords);
// 	});

// 	app.get("/lineChart", function(req, res) {
// 		console.log("again " + followerNumbers);
// 		res.json(followerNumbers);
// 	});

// 	app.get("/barChart", function(req, res) {
// 		var languages = pair;
// 		console.log("again " + JSON.stringify(languages));
// 		res.json(languages);
// 	});
// });