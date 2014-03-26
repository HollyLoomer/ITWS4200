function loadData(app_token, page_id) {
	$.ajax({
		type: "GET",
		//limit the results of all their posts to 5
		url: "https://graph.facebook.com/" + page_id + "/posts?limit=5&access_token=" + app_token,
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