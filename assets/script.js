
//event handler for saving user-input upon hitting submit
$(document).ready(function () {
$("#submit-btn").on("click", function(event) {
	event.preventDefault();

	var userLocation = $('#input-location').val().trim();
	var userRadius = $('#input-radius').val().trim();
  
  	localStorage.setItem("Location", JSON.stringify(userLocation));
	localStorage.setItem("Radius", JSON.stringify(userRadius));
	});
});

// Breweries API
fetch('https://api.openbrewerydb.org/breweries?by_city=san_diego&per_page=3')
	.then(response => response.json())
	.then(response => console.log(response))
	.catch(err => console.error(err));



// Google Maps API
const options2 = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '48c1efcdf0mshbc4f579e09271eep1736d1jsn77c5309cc348',
		'X-RapidAPI-Host': 'google-maps28.p.rapidapi.com'
	}
};

// Example URL/Query
fetch('https://google-maps28.p.rapidapi.com/maps/api/place/textsearch/json?query=White%20House&region=en&language=en', options2)
	.then(response => response.json())
	.then(response => console.log(response))
	.catch(err => console.error(err));

