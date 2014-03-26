function loadPosts(app_token, page_id) {
	$.ajax({
		type: "GET",
		//limit the results of all their posts to 4
		url: "https://graph.facebook.com/" + page_id + "/posts?limit=4&access_token=" + app_token,
		dataType: "jsonp",
		success: function(responseData, status) {
			//used for testing to see what data would come up
			console.log(responseData); 
			getBasicData(responseData);

		},
		error: function(msg) {
			alert("There was an error with loading the data: " + msg.status + " " + msg.statusText);
		}

	});
}

//function to change the ISO8601 string date to a readable , converted format
function ISODateString(d) {
  var date = new Date(d);
  var converted_time = date.toLocaleString();
  return converted_time;
}

//from stack overflow -- to replace URLs in text with links
function replaceURLWithHTMLLinks(text) {
      var exp = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig;
      return text.replace(exp,"<a href='$1'>$1</a>"); 
}

//main function that returns the data depending on what type of post it is
function getBasicData(responseData) {
	var htmlData = '<div class="section group">';

	for (var i=0; i<responseData.data.length; i++){
		htmlData += '<div class="col span_1_of_4">';

		if (responseData.data[i].type == "photo") {
			htmlData += '<div class="imgContainer"><img src="' + responseData.data[i].picture + '"></div>';
		}
		else if (responseData.data[i].type == "link") {
			htmlData += '<div class="imgContainer"><img src="' + responseData.data[i].picture + '" class="linkPic"></div>';
			htmlData += '<a class="typeLink" href="' + responseData.data[i].link + '">' + responseData.data[i].name + '</a></br>';
		}
		else if (responseData.data[i].type == "video") {
			htmlData += '<a href="' + responseData.data[i].source + '">View Video Post in Fullscreen</a></br>';

		}
		else {
			//do nothing.. the types of status, checkin, etc, are of no importance
			//to this facebook feed
		}

		//for each type, no matter what, get the message, when it was created, and the link
		htmlData += '<span class="message">' + replaceURLWithHTMLLinks(responseData.data[i].message) + '</span>';
		htmlData += '</br><span class="createdOn">Posted ' + ISODateString(responseData.data[i].created_time) + '</span>';
		htmlData += '<a class="postLink" href="' + responseData.data[i].link + '">Source</a>';
		htmlData += '</div>';
	}

	htmlData+= '</div>';

	$("#grid").html(htmlData);

}


//execute ajax function
var app_token = '662026867186803|rQIln_nKGiMGYYu6tnYAE89U57c'; //my specific app token
var page_id = '15687409793'; //world wildlife fund page id
loadPosts(app_token,page_id);