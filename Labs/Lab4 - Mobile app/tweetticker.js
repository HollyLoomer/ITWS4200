$( document ).ready(function() {

	$.ajax({
		type: "GET",
		url: "",
		dataType: "jsonp",
		success: function(responseData, status) {
			var html = '';
			$.each(responseData.tweet,function(i,item) {
				username.push(item.user.name); //pulling wanted data and putting into arrays
				picture.push("<img id='tweetpic' src='" + item.user.profile_image_url + "'height='50' width='50'>");
				tweetText.push(item.text);
					//pulling hashtags from json and putting into array
				$.each(item.entities.hashtags, function(j, hash) {
					hashtag.push(hash.text);
				});

			});