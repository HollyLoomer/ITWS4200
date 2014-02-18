//tests whether geolocation is supported, and starts off the function calls
function findLocation() {
	if (navigator.geolocation) { //if the navigator is supported, get the position
    	navigator.geolocation.getCurrentPosition(savePosition,locatorError);
    }
    else { // if not supported, present the error
    	$("#mainDiv").prepend("<p class='error'><strong>Geolocation is not supported by this browser. Try another browser.</strong></p>");
    }
}

//savePosition has the position object parameter
//loadPosition uses this object to access the AJAX call in the function declaration
//loadPosition uses the lat and long paramters found from position object
function savePosition(position) {  //to save the latitude/longitude for API access
	loadPosition(position.coords.latitude,position.coords.longitude);
}


//error incase the location could not be found
function locatorError() {
	$("#mainDiv").prepend("<p class='error'><strong>Geolocation has encountered an error trying to load the location. </strong></p>");
}

//AJAX call that has a function surrounding it
// to grab the position coordinates from savePosition
function loadPosition(lat, long) {
	$.ajax({
		type: "GET",
		url: "https://api.forecast.io/forecast/c752689c0e3bc0bef5a3ba67651eba3c/" + lat + "," + long,
		dataType: "jsonp",
		success: function(responseData, status) {
			//used for testing to see what data would come up
			console.log(responseData); 

			//sets up the weather icons
			iconDefinerCurrent(responseData);
			iconDefinerTmrw(responseData);

			//function to get the current degrees, daily high/low
			currentTemp(responseData);

			//function to get the city/state //NOTE: COULD NOT GET TO WORK IN TIME
			getLocationNames(responseData);

			//function to get miscellaneous data (summary, icon, chance of precipitation, precip type, windspeed)
			miscData(responseData);

			//function to get tomorrow's weather (summary, icon (smaller), high/low temps, chance of precipitation, precip type)
			weatherTmrw(responseData);


		},
		error: function(msg) {
			alert("There was an error with loading the data: " + msg.status + " " + msg.statusText);
		}

	});
}



//area for defining what each icon for the weather representation means
function iconDefinerCurrent(responseData) {
	if (responseData.currently.icon == "clear-day") {
		var iconDef = "<img src='Climacons/SVG/Sun.svg' alt='clear-day'>";
	}
	else if (responseData.currently.icon == "clear-night") {
		var iconDef = "<img src='Climacons/SVG/Moon.svg' alt='clear-night'>";
	}
	else if (responseData.currently.icon == "rain") {
		var iconDef = "<img src='Climacons/SVG/Cloud-Rain.svg' alt='rain'>";
	}
	else if (responseData.currently.icon == "snow") {
		var iconDef = "<img src='Climacons/SVG/Cloud-Snow.svg' alt='snow'>";
	} 
	else if (responseData.currently.icon == "sleet") {
		var iconDef = "<img src='Climacons/SVG/Cloud-Rain.svg' alt='sleet'>";
	}
	else if (responseData.currently.icon == "wind") {
		var iconDef = "<img src='Climacons/SVG/Cloud-Wind.svg' alt='wind'>";
	}
	else if (responseData.currently.icon == "fog") {
		var iconDef = "<img src='Climacons/SVG/Cloud-Fog.svg' alt='fog'>";
	}
	else if (responseData.currently.icon == "cloudy") {
		var iconDef = "<img src='Climacons/SVG/Cloud.svg' alt='cloudy'>";
	}
	else if (responseData.currently.icon == "partly-cloudy-day") {
		var iconDef = "<img src='Climacons/SVG/Cloud-Sun.svg' alt='partly-cloudy-day'>";
	}
	else if (responseData.currently.icon == "partly-cloudy-night") {
		var iconDef = "<img src='Climacons/SVG/Cloud-Moon.svg' alt='partly-cloudy-night'>";
	}
	else if (responseData.currently.icon == "hail") {
		var iconDef = "<img src='Climacons/SVG/Cloud-Hail-Alt.svg' alt='hail'>";
	}
	else if (responseData.currently.icon == "thunderstorm") {
		var iconDef = "<img src='Climacons/SVG/Cloud-Lightning.svg' alt='thunderstorm'>";
	}
	else if (responseData.currently.icon == "tornado") {
		var iconDef = "<img src='Climacons/SVG/Tornado.svg' alt='tornado'>";
	}
	else {
		var iconDef = "Icon unavailable";
	}
	return iconDef;
}

function iconDefinerTmrw(responseData) {
	if (responseData.daily.data[1].icon == "clear-day") {
		var iconDef = "<img src='Climacons/SVG/Sun.svg' alt='clear-day'>";
	}
	else if (responseData.daily.data[1].icon == "clear-day") {
		var iconDef = "<img src='Climacons/SVG/Moon.svg' alt='clear-night'>";
	}
	else if (responseData.daily.data[1].icon == "rain") {
		var iconDef = "<img src='Climacons/SVG/Cloud-Rain.svg' alt='rain'>";
	}
	else if (responseData.daily.data[1].icon == "snow") {
		var iconDef = "<img src='Climacons/SVG/Cloud-Snow.svg' alt='snow'>";
	}
	else if (responseData.daily.data[1].icon == "sleet") {
		var iconDef = "<img src='Climacons/SVG/Cloud-Rain.svg' alt='sleet'>";
	}
	else if (responseData.daily.data[1].icon == "wind") {
		var iconDef = "<img src='Climacons/SVG/Cloud-Wind.svg' alt='wind'>";
	}
	else if (responseData.daily.data[1].icon == "fog") {
		var iconDef = "<img src='Climacons/SVG/Cloud-Fog.svg' alt='fog'>";
	}
	else if (responseData.daily.data[1].icon == "cloudy") {
		var iconDef = "<img src='Climacons/SVG/Cloud.svg' alt='cloudy'>";
	}
	else if (responseData.daily.data[1].icon == "partly-cloudy-day") {
		var iconDef = "<img src='Climacons/SVG/Cloud-Sun.svg' alt='partly-cloudy-day'>";
	}
	else if (responseData.daily.data[1].icon == "partly-cloudy-night") {
		var iconDef = "<img src='Climacons/SVG/Cloud-Moon.svg' alt='partly-cloudy-night'>";
	}
	else if (responseData.daily.data[1].icon == "hail") {
		var iconDef = "<img src='Climacons/SVG/Cloud-Hail-Alt.svg' alt='hail'>";
	}
	else if (responseData.daily.data[1].icon == "thunderstorm") {
		var iconDef = "<img src='Climacons/SVG/Cloud-Lightning.svg' alt='thunderstorm'>";
	}
	else if (responseData.daily.data[1].icon == "tornado") {
		var iconDef = "<img src='Climacons/SVG/Tornado.svg' alt='tornado'>";
	}
	else {
		var iconDef = "Icon unavailable";
	}
	return iconDef;
}

function currentTemp(responseData) {
	var currentTemp = Math.round(responseData.currently.temperature);
	var feelsLike = Math.round(responseData.currently.apparentTemperature);
	$("#crtTemp").html("Currently <strong><span class='degrees'>" + currentTemp + "&deg;</span></strong></br>Feels like <strong><span class='degrees'>" + feelsLike + "&deg;</span></strong>");
}


function getLocationNames(responseData) {
	//Google API for geocoding, use reverse geocoding
	
	var geocoder = new google.maps.Geocoder();
	var latlng = new google.maps.LatLng(responseData.latitude, responseData.longitude);
   
    geocoder.geocode({'latLng': latlng}, function(results, status) {
		if (status == google.maps.GeocoderStatus.OK) {
	        var locationName = results[1].formatted_address;
	        $("#location").html(locationName);
        }
    });
}

function miscData(responseData) {
	//summary, icon, windspeed
	var summary = responseData.currently.summary;
	var icon = iconDefinerCurrent(responseData);
	var windspeed = responseData.currently.windSpeed;
	$("#rightMisc").html(icon + "</br>Wind: " + windspeed + " mph");
	$(".summary").html("Currently: " + summary);
}

function weatherTmrw(responseData) {
	//summary, icon (smaller), high/low temps, chance of precipitation, precip type
	var summary2 = responseData.daily.data[1].summary;
	var icon = iconDefinerTmrw(responseData);
	var high = Math.round(responseData.daily.data[1].temperatureMax);
	var low = Math.round(responseData.daily.data[1].temperatureMin);

	if (responseData.daily.data[1].precipProbability > 0) {
		var precip = responseData.daily.data[1].precipProbability*100 + "% chance of ";
		precip += responseData.daily.data[1].precipType;
	}
	else {
		var precip = '0% chance of precipitation';
	}
	$("#iconTmrw").html(icon);
	$("#highTemp").html("<strong>" + high + "&deg;</strong>");
	$("#lowTemp").html("<strong>" + low + "&deg;</strong>");
	$(".summary2").html("Summary: " + summary2);
	$("#precip").html(precip)
}

$( document ).ready(function() {

	//start execution of functions on DOM load
	findLocation();


});