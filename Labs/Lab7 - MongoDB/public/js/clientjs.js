$( document ).ready(function() {

	var socket = io.connect('http://localhost');

	var i = 0; //counter
	$("#buildButton").click(function() {
		socket.emit("buildJson", "Loading tweets into file...");
		//check if user has already done a twitter file
		if (i == 0) {
			alert("Your twitter file has been created.");
			i++;
		}
		else if (i > 0) {
			alert("Your twitter file has been overwritten.");
		}
	});




	$("#convertButton").click(function() {
		//if have not pressed the build button first
		if (i == 0) {
			alert("You must first build your JSON file. Click on the 'Build JSON' button.")
		}
		else if (i > 0) {
			socket.emit("convertToCSV", "Converting JSON to CSV...");
			alert("Your twitter file has been converted to CSV.");
		}
	});
	var j = 0; //counter
	$("#buildDB").click(function() {
		socket.emit("buildDB", "Building the MongoDB...");
		//error checking
		if (j==0) {
			alert("Your MongoDB has been filled with tweets.")
			j++;
		}
		else if (j > 0) {
			alert("Your MongoDB has been added with more tweets.");
		}
	});
	$("#displayTweets").click(function() {
		//error checking
		if (j==0) {
			alert("You must first build your MongoDB with tweets. Click the 'Build Tweet Database' button.")
		}
		else if (j > 0) {
		
		$.get('/DBtweets', function(data) {
			//start parsing the data
			//data == tweetsArray from database
			var username = new Array();
			var picture = new Array();
			var tweetText = new Array();
			var hashtag = new Array();

			$.each(data,function(i,item) {
				//console.log(i + ": " + item.user.name);
				username.push(item.user.name); //pulling wanted data and putting into arrays
				picture.push("<img id='tweetpic' src='" + item.user.profile_image_url + "'height='50' width='50'>");
				tweetText.push(item.text);
					//pulling hashtags from json and putting into array
				$.each(item.entities.hashtags, function(j, hash) {
					hashtag.push(hash.text);
				});

				});
			
			var tickerhtml = '';
			var hashhtml = '';
			 //putting array items into html items
			for (var i=0; i<tweetText.length; i++){
				tickerhtml += '<li class="tweet"><span class="username"><strong>' + username[i] + ' </strong></span>';
			 	tickerhtml += '<span class="profpic">' + picture[i] + '</span>';
			 	tickerhtml += '<span class="text"> ' + tweetText[i] + '</span></li>';
			}
			for (var i=0; i<hashtag.length; i++) {
			 	hashhtml += '<li class="tag"><span class="tagcontents">#' + hashtag[i] + '</span></li>';
			}

			//loading html items into the divs
			$('#tickerlist').html(tickerhtml);
			$('#hashtaglist').html(hashhtml);


		});

		//socket.emit("displayTweets", "Displaying tweets onto the page...");
		alert("Your tweets have been displayed. Close this alert to see the pretty tweets!");
		}


	});

	//functions to help with animation of tweets
	function run() { 
		    var first = $("#tickerlist li:first-child"); //slides up first item in list
		    $.unique(first).each(function(i) { //unique gets rid of duplicates
		      $(this).slideUp(function() { //acts on the first node to slide up
		      	$(this).appendTo(this.parentNode).slideDown(); //appends this item to the bottom of list
		      });
		    });
	}

	function runhashtags() { //same as the run function, but for hashtags
		var first = $("#hashtaglist li:first-child");
		$.unique(first).each(function(i) {
			$(this).slideUp(function() {
				$(this).appendTo(this.parentNode).slideDown();
			});
		});
	}

	//sets the time interval (3 seconds) before rotating the tweets
	window.setInterval(function() { run(); runhashtags(); }, 3000); 


});






