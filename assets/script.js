
// Yelp API
const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '48c1efcdf0mshbc4f579e09271eep1736d1jsn77c5309cc348',
		'X-RapidAPI-Host': 'yelp-reviews.p.rapidapi.com'
	}
};
// Example URL/Query's
fetch('https://yelp-reviews.p.rapidapi.com/business-reviews?business_id=pearls-deluxe-burgers-san-francisco-3&page=1&query=cheese&language=en&num_pages=1', options)
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

