let locationInput = localStorage.getItem("Location");
var tableBody = document.getElementById('repo-table');

var contentCard = document.getElementsByClassName('card-content');


console.log(locationInput);



//event handler for saving user-input upon hitting submit
$(document).ready(function () {
	
	$("#submit-btn").on("click", function(event) {
		event.preventDefault();
	
		var userLocation = $('#input-location').val().trim().split(" ").join("_");
	  
		localStorage.setItem("Location", JSON.stringify(userLocation));

	
		getResult();
	});
});

// TODO: fix functionality. should update value of dropdown selection to localstorage every time the dropdown is changed
$("#input-type").onchange = function(event){
	event.preventDefault();
	var userType = $('#input-type')
	localStorage.setItem("Type", JSON.stringify(userType));

}
	
// Breweries API
// example URL = "https://api.openbrewerydb.org/breweries?by_postal=44107&per_page=5"



let breweryURL = "https://api.openbrewerydb.org/breweries?by_postal=" + JSON.parse(localStorage.getItem("Location")) + "&"

//let breweryURL2 = "https://google-maps28.p.rapidapi.com/maps/api/place/textsearch/json?query="+ googleNames.replace(/['"]+/g, '') +"&region=en&language=en"

//let googleNames = document.getElementsByClassName("#google");

if(localStorage.getItem("Type")!="any"){
	breweryURL += JSON.parse(localStorage.getItem("Type"))
}
breweryURL += "&per_page=5"
console.log(breweryURL)
	
function getResult(){fetch(breweryURL)
		.then(function (response) {
			return response.json();
	  	})
		.then(function (data){
			console.log(data);
			for(let i = 1; i < 20; i++){
				var createTableRow = document.createElement('tr');
       			var tableData = document.createElement('td');
				tableData.classList.add('google');
				var websiteUrl = document.createElement('a');
				var phoneNumber = document.createElement('td');

        		tableData.textContent = `${i} ${data[i].name}`;
				websiteUrl.textContent = data[i].website_url;
				websiteUrl.href = data[i].website_url;
				phoneNumber.textContent = `Phone Number: ${data[i].phone}`;

        		createTableRow.appendChild(tableData);
        		tableBody.appendChild(createTableRow);
				tableBody.appendChild(websiteUrl);
				tableBody.appendChild(phoneNumber);
			}
		Promise.then(function getResult2(){fetch(breweryURL2)
		.then(function (response2) {
			return response2.json();
		})
		.then(function (data2){
			console.log(data2);
			for(let i = 1; i < 20; i++){
			let breweryURL2 = "https://google-maps28.p.rapidapi.com/maps/api/place/textsearch/json?query="+ googleNames.replace(/['"]+/g, '') +"&region=en&language=en"

			let googleNames = document.getElementsByClassName("#google");
			console.log(data2)
			}
		})
	})
})
		.catch(err => console.error(err));
}
	
	// initialized variables for use later
	// var long = '0.0'
	// var lat = '0.0'
	
	
	//Google Maps API
	const options = {
		method: 'GET',
		headers: {
			'X-RapidAPI-Key': '48c1efcdf0mshbc4f579e09271eep1736d1jsn77c5309cc348',
			'X-RapidAPI-Host': 'google-maps28.p.rapidapi.com'
		}
	};
	
	fetch('https://google-maps28.p.rapidapi.com/maps/api/place/textsearch/json?query=bear%20republic&region=en&language=en', options)
		.then(response => response.json())
		.then(response => console.log(response))
		.catch(err => console.error(err));
