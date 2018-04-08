// Inspiration:
// https://stackoverflow.com/questions/3489460/how-to-get-visitors-location-i-e-country-using-geolocation
// https://home.openweathermap.org/api_keys in FF
// icons: https://openweathermap.org/weather-conditions


$(document).ready(function() {

var cTemperature = 0;
var fTemperature = 0;

	// Get location data
	$.ajax({
		url: "http://ip-api.com/json",
		jsonp: "jsonp",
		success: function(response) {
			console.log(response.city, response.country); 
			
		}
	})
	
	// Make sure to continue
	.done(function(response) {
		console.log(response.city); 
		let city_call = "http://api.openweathermap.org/data/2.5/weather?q=" + response.city + "&appid=f3fb12a5d102bd1c3c6c6a68e03830ca";
		$("#location").html(response.city);
		
		// Get weather data
		$.ajax({
			url: city_call,
			jsonp: "jsonp",
			success: function(weather_data) {
				// reference: "weather":[{"id":300,"main":"Drizzle","description":"light intensity drizzle","icon":"09d"}]
				// icons: http://openweathermap.org/img/w/10d.png
				// console.log(weather_data); 
				// celsius and f - &#x2103; &#x2109; https://www.w3schools.com/charsets/ref_utf_letterlike.asp
				
				cTemperature = Math.round(weather_data.main.temp-273) + "&#x2103; with";
				fTemperature = Math.round((weather_data.main.temp-273) * 1.8 + 32) + "&#x2109; with";
				$("#temperature").html(cTemperature);
				
				let description = weather_data.weather[0].description;
				$("#description").html(description);
				
				let icon =  "<img src=http://openweathermap.org/img/w/" + weather_data.weather[0].icon + ".png />";
				$("#icon").html(icon);
				
				// Background image
				if(weather_data.main.temp-273 < 0) {
					$("body").css("background-image", "url(http://mvravn.dk/fcc_projects/images/weather_cold.jpg)");
				}
				
				if(weather_data.main.temp-273 > 20) {
					$("body").css("background-image", "url(http://mvravn.dk/fcc_projects/images/weather_warm.jpg)");
				}
				
				console.log('Temp:', weather_data.main.temp-273);
			}
		})	
	});
	
	// Button change temperature settings
	$("#inF").click(function(){
		$("#temperature").html(fTemperature);
		$("#inF").css("display", "none");
		$("#inC").css("display", "inline-block");
	});
	
	$("#inC").click(function(){
		$("#temperature").html(cTemperature);
		$("#inC").css("display", "none");
		$("#inF").css("display", "inline-block");
	});
	

});






