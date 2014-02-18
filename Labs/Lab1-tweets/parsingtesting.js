$.getJSON('tweets-clean.js', function(data){ 
    for (var i=0; i<data.tweets.length; i++){
    	var tweeter = data.tweets[i].user.name; //grabs username
	    var tweetText = data.tweets[i].text; //grabs text from 
	    var tweetText = tweetText.substring(0, 139); //makes it 140 chars or less
	    tweetText = tweetText.replace(/http:\/\/\S+/g, '<a href="$&" target="_blank">$&</a>');
	    tweetText = tweetText.replace(/(@)(\w+)/g, ' $1<a href="http://twitter.com/$2" target="_blank">$2</a>');
	    tweetText = tweetText.replace(/(#)(\w+)/g, ' $1<a href="http://search.twitter.com/search?q=%23$2" target="_blank">$2</a>');
	    $('#tweetdeck').append('<li class="tweet"><div class="tweetImage"><a href="http://twitter.com/'+tweeter+'" target="_blank"><img src="'+data.tweets[i].user[i].profile_image_url+'" width="48" border="0" /></a></div><div class="tweetBody">'+tweetText+'</div></li>');
	}
}

