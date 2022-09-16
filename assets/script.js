let locationInput = localStorage.getItem("Location");
console.log(locationInput);
//event handler for saving user-input upon hitting submit
$(document).ready(function () {
	$("#submit-btn").on("click", function(event) {
		event.preventDefault();
	
		var userLocation = $('#input-location').val().trim().split(" ").join("_");
		var userRadius = $('#input-radius').val().trim();
	  
		// fix the URL injection setup here?
		localStorage.setItem("Location", JSON.stringify(userLocation));
		localStorage.setItem("Radius", JSON.stringify(userRadius));
	
		getResult();
		});
	});
	
	// Breweries API
	// example URL = "https://api.openbrewerydb.org/breweries?by_city=san_diego&per_page=3"

	// TODO: fix the location injection in the URL
	let breweryURL = "https://api.openbrewerydb.org/breweries?by_city=" + locationInput.replace(/['"]+/g, '') +"&per_page=3"
	console.log(breweryURL);
	
function getResult(){fetch(breweryURL)
		.then(function (response) {
			return response.json();
	  	})
		.then(function (data){
			console.log(data);
			for(let i = 0; i < 3; i++){
				console.log(data[i].name + " located at " + data[i].latitude + ", " + data[i].longitude)
			}
		})
		.catch(err => console.error(err));
}
	
	// initialized variables for use later
	var long = '0.0'
	var lat = '0.0'
	
	
	/* Google Maps API
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
	
	*/