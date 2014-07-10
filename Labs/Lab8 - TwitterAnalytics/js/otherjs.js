$(document).ready(function () {
	 $("#chart1").hide();
	 $("#chart2").hide();
	 $("#chart3").hide();


	//when click start button
	//build database (sends response to $.get success)
	//display tweets
	//present analytics
	

	$("#startButton").click(function() {
		$("#chart1").show();
		$("#chart2").show();
		$("#chart3").show();
	
		$.get( "/startButton", success);
		function success(data){ //data is the array

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



		}

		$.get( "/pieChart", success2, "json" );
		function success2(dat){
			// console.log(dat);
			var data = 
			[
				{
					value : dat[0],
					color : "#00CDEF"
				},
				{
					value : dat[1],
					color : "#C2F30D"
				}

			]
		//Get the context of the canvas element we want to select
		var ctx = document.getElementById("myChart").getContext("2d");
		var myNewChart = new Chart(ctx).Pie(data);
		}

		$.get( "/lineChart", success3, "json" );
		function success3(dat){
			// console.log(dat);
			var data = {
				labels : ["0-100","100-500","500-1000","1000-5000","5000-10,000","10,000+"],
				datasets : [
				// { fillColor : "rgba(220,220,220,0.5)",
				// strokeColor : "rgba(220,220,220,1)",
				// pointColor : "rgba(220,220,220,1)",
				// pointStrokeColor : "#fff",
				// data : [65,59,90,81,56,55,40]
				// },
				{ fillColor : "rgba(151,187,205,0.5)",
				strokeColor : "rgba(151,187,205,1)",
				pointColor : "rgba(151,187,205,1)",
				pointStrokeColor : "#fff",
				data : dat //json data is returned here
				}			]
			}

			var ctx = document.getElementById("lineChart").getContext("2d");
			var myNewChart = new Chart(ctx).Line(data);
		}

		$.get( "/barChart", success4, "json" );
		function success4(dat){
			// console.log(dat);
			var labelArr = [];
			var dataArr = [];
			$.each(dat, function(key, val) {
				// console.log(key);
				// console.log(val);
				labelArr.push(key);
				dataArr.push(val);
			});
			var data = {
				labels : labelArr,
				datasets : [ 
				// { fillColor : "rgba(220,220,220,0.5)",
				// strokeColor : "rgba(220,220,220,1)",
				// data : [65,59,90,81,56,55,40]
				// },
				{ fillColor : "rgba(151,187,205,0.5)",
				strokeColor : "rgba(151,187,205,1)",
				data : dataArr
				}			]
			}
			//Get the context of the canvas element we want to select
			var ctx = document.getElementById("barChart").getContext("2d");
			var myNewChart = new Chart(ctx).Bar(data);
		}
		

	});

	//attempted at getting all pieces of info again
	// $("#againButton").click(function() {
	// 	$.get( "/againButton", function () {
	// 		$.get( "/pieChart", success2, "json" );
	// 		$.get( "/lineChart", success3, "json" );
	// 		$.get( "/barChart", success4, "json" );
	// 	});
	// 	alert("More tweets have been added to the database and analytics");
	// });


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