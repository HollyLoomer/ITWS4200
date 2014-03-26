$( document ).ready(function() {

	$.ajax({
		type: "GET",
		url: "tweets-clean.json",
		dataType: "json",
		success: function(responseData, status) {

			var username = new Array();
			var picture = new Array();
			var tweetText = new Array();
			var hashtag = new Array();

			$.each(responseData.tweet,function(i,item) {
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
				tickerhtml += '<li class="tweet"><span class="username">' + username[i] + '</span>';
			 	tickerhtml += '<span class="profpic">' + picture[i] + '</span>';
			 	tickerhtml += '<span class="text">' + tweetText[i] + '</span></li>';
			}
			for (var i=0; i<hashtag.length; i++) {
			 	hashhtml += '<li class="tag"><span class="tagcontents">#' + hashtag[i] + '</span></li>';
			}

			//loading html items into the divs
			$('#tickerlist').html(tickerhtml);
			$('#hashtaglist').html(hashhtml);

		},
		error: function(msg) {
			alert("There was an error: " + msg.status + " " + msg.statusText);
		}

	});


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