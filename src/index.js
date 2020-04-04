import "./main.css";
require('dotenv').config();

$(function(){
	$("#request").submit(function(){
		getWeatherByCity( $("#city").val() );
    $(".ajax-section").show();
		return false;
	});

	$(".state-icon").attr( "onerror", "$(this).hide()" );
});

function getWeatherByCity( request ){
	var key = process.env.API_KEY;
	var apiUrl = "https://api.openweathermap.org/data/2.5/weather?appid=" + key + "&units=metric&lang=eng&q=";

	$.ajax({
		dataType: "json",
		url: apiUrl + request,
		data: "",
		success: function(){ console.log("Request Completed!") },
		statusCode: {
			400: function(){
				swal({
					text: "La tua ricerca non è valida. Prova ad inserire un'altra città.",
					icon: "error"
				});
			},

			404: function(){
				swal({
					text: "Sicuro che la città sia scritta in modo corretto?",
					icon: "warning"
				});
			}
		}
	});
	$('#city').val("");

	$.getJSON( apiUrl + request,  function( data ){
		assign(data);
	});
}

function assign( data ){
	$(".city-name").html( data.name );
	$(".country-name").html( data.sys.country );
  $(".city-temp").html( data.main.temp + "°C" );
	$(".city-icon").attr( "src", "icons/" + data.weather[0].icon + ".png" );
	// $("#state-icon").attr( "title", data.weather[0].main );
	$(".description").html( data.weather[0].description );
	$(".temp-max").html( data.main.temp_max + "°C" );
	$(".temp-min").html( data.main.temp_min + "°C" );
	$(".humidity").html( data.main.humidity + "%" );
	$(".pressure").html( data.main.pressure + " hpa" );
  $(".speed").html( data.wind.speed + " m/s" );
	$(".deg").html( data.wind.deg + "°" );
}
