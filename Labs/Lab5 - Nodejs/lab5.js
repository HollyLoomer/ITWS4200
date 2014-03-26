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

var app = express();
var server = require('http').createServer(app);
//start server
server.listen(3000, function () {
	
var tofile = [];
var count = 0;

function reportResults(tofile) {
	//erase file each time before writing again
	fs.truncateSync('C:/Users/loomeh/Dropbox/Spring 2014/WEBSYS2/GIT/Labs/Lab5 - Nodejs/ITWS4200-lab5-loomeh.json',
		0);
	//array brackets to be put into the file to work with lab1 AJAX
	fs.appendFileSync('C:/Users/loomeh/Dropbox/Spring 2014/WEBSYS2/GIT/Labs/Lab5 - Nodejs/ITWS4200-lab5-loomeh.json', 
	'{"tweet":[');
	for (var i=0; i<tofile.length; i++) {
    	//append the 1000 tweets
		fs.appendFileSync('C:/Users/loomeh/Dropbox/Spring 2014/WEBSYS2/GIT/Labs/Lab5 - Nodejs/ITWS4200-lab5-loomeh.json', 
		tofile[i]); //write this (a tweet) to file
    	//put commas inbetween each JSON when not at the last one
    	if (i!=(tofile.length-1)) {
    		fs.appendFileSync('C:/Users/loomeh/Dropbox/Spring 2014/WEBSYS2/GIT/Labs/Lab5 - Nodejs/ITWS4200-lab5-loomeh.json', 
			","); //write a comma after every json object to turn into array
    	}
    	
    	console.log("Tweet " + (i+1) + " written.");
	}
	//close JSON with array bracket
	fs.appendFileSync('C:/Users/loomeh/Dropbox/Spring 2014/WEBSYS2/GIT/Labs/Lab5 - Nodejs/ITWS4200-lab5-loomeh.json',
	 ']}');
	
	console.log("File writing complete.");
}

twit.stream('statuses/sample', function(stream) {
	console.log('Loading tweets...')
  	stream.on('data', function (tweet) {
		tofile.push(JSON.stringify(tweet)); //push new tweets and make them into JSON instead of other objects
		count++;
		if (count == 20) { //reach up to 1000 tweets when counter hits 1000
			stream.destroy(); //stop streaming and pushing into my array
			reportResults(tofile); //jump to function to begin writing file
		} 
		//debugging
		// console.log("ToFile:" + tofile)
		// console.log("data" + tweet)
	});
});
	//close server
  server.close()
})