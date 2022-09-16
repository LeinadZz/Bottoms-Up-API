let locationInput = localStorage.getItem("Location");
var tableBody = document.getElementById('repo-table');

//event handler for saving user-input upon hitting submit
$(document).ready(function () {
	$("#submit-btn").on("click", function(event) {
		event.preventDefault();
	
		var userLocation = $('#input-location').val().trim().split(" ").join("_");
		var userRadius = $('#input-radius').val().trim();
	  
		localStorage.setItem("Location", JSON.stringify(userLocation));
		localStorage.setItem("Radius", JSON.stringify(userRadius));
	
		getResult();
		});
	});
	
	// Breweries API
	// example URL = "https://api.openbrewerydb.org/breweries?by_postal=44107&per_page=5"

	// TODO: fix the location injection in the URL
	let breweryURL = "https://api.openbrewerydb.org/breweries?by_city=" + JSON.parse(localStorage.getItem("Radius")) + "&per_page=3"
	console.log(breweryURL);
	
function getResult(){fetch(breweryURL)
		.then(function (response) {
			return response.json();
	  	})
		.then(function (data){
			console.log(data);
			for(let i = 1; i < 20; i++){
				var createTableRow = document.createElement('tr');
       			var tableData = document.createElement('td');
				var websiteUrl = document.createElement('a');

        		tableData.textContent = `${i} ${data[i].name}`;
				websiteUrl.textContent = data[i].website_url;
				websiteUrl.href = data[i].website_url;
				phoneNumber.textContent = `Phone Number: ${data[i].phone}`;

        		createTableRow.appendChild(tableData);
        		tableBody.appendChild(createTableRow);
				tableBody.appendChild(websiteUrl);
				tableBody.appendChild(phoneNumber);
			}
		})
		.catch(err => console.error(err));
}
	
	// initialized variables for use later
	// var long = '0.0'
	// var lat = '0.0'
	
	
	//Google Maps API
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
	
	