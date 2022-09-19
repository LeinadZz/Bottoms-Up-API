var tableBody = document.getElementById("repo-table");
var contentCard = document.getElementsByClassName("card-content");

// Breweries API
// example URL = "https://api.openbrewerydb.org/breweries?by_postal=44107&per_page=5"

//event handler for saving user-input upon hitting submit
$("#submit-btn").on("click", function (event) {
  event.preventDefault();

  //local storage for user-input postal code
  var userLocation = $("#input-location").val();
  localStorage.setItem("Location", JSON.stringify(userLocation));

  //local storage for user-input brewery type
  var userType = $("#input-type").val();
  localStorage.setItem("Type", JSON.stringify(userType));

  getResult();
});

//event handler for clearing user-input & respective local storage upon hitting clear
$("#clear-btn").on("click", function (event) {
  event.preventDefault();
  $("#input-location").val("");
  $("#input-type").val("any");
  localStorage.clear();
});

function getResult() {
  //initializing brewery URL for future iteration
  var breweryURL = "https://api.openbrewerydb.org/breweries?";

  //conditional statement to read user-input and decide if there is a brewery type-specific search
  if ($("#input-type").val() == "any") {
    //brewery query URL for general search
    breweryURL += "by_postal=" + JSON.parse(localStorage.getItem("Location"));
  } else if ($("#input-type").val() != "any") {
    //brewery query URL for brewery type-specific search
    breweryURL +=
      "by_postal=" +
      JSON.parse(localStorage.getItem("Location")) +
      "&by_type=" +
      JSON.parse(localStorage.getItem("Type"));
  }

  fetch(breweryURL)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      for (let i = 0; i < data.length; i++) {
        var createTableRow = document.createElement("tr");
        var tableData = document.createElement("td");
        var websiteUrl = document.createElement("a");
        var phoneNumber = document.createElement("td");
        var lineBreak = document.createElement("br");
        var streetName = document.createElement("td");
        var directions = document.createElement("a");
        var googleNames = data[i].name;
        var latitude = data[i].latitude;
        var longitude = data[i].longitude;

        tableData.textContent = `${i + 1} ${data[i].name}`;
        websiteUrl.textContent = data[i].website_url;
        websiteUrl.href = data[i].website_url;
        phoneNumber.textContent = `Phone Number: ${data[i].phone}`;
        streetName.textContent = data[i].street;
        // TODO: Index through object/array to get html_attribute
        //directions.textContent = 
        
        createTableRow.appendChild(tableData);
        tableBody.appendChild(createTableRow);
        tableData.appendChild(lineBreak);
        tableData.appendChild(websiteUrl);
        tableBody.appendChild(phoneNumber);
        tableData.appendChild(streetName);
        createTableRow.appendChild(phoneNumber);


          //Google Maps API
          const options2 = {
           method: "GET",
           headers: {
           "X-RapidAPI-Key": "48c1efcdf0mshbc4f579e09271eep1736d1jsn77c5309cc348",
           "X-RapidAPI-Host": "google-maps28.p.rapidapi.com",
           },
          };


        
        fetch(
          "https://google-maps28.p.rapidapi.com/maps/api/place/textsearch/json?query="+googleNames+"&location="+latitude+"%2C"+longitude+"&region=en&language=en",
          options2
        )
          .then((response) => response.json())
          .then((response) => console.log(response))

          /*.then((response) => console.log(response.results[0].photos[0].html_attributions[0]))  

          1. ^^How to index image href content. If console reads "cannot read properties of undefined it's bc it has no image to reference
          (e.g., Google has no history of location's image)
          2. If we choose to implement this, there will be missing links for the locations without any google image metadata. Totally fine tho
          */
      }
    })
    .catch((err) => console.error(err));
}

    /* 
         fetch(
          "https://google-maps28.p.rapidapi.com/maps/api/place/streetview?location=" +latitude + "," + longitude+ "&size=600x400",
          options2
        )
          or 

        fetch(
          "https://google-maps28.p.rapidapi.com/maps/api/place/streetview?location=" streetName + "&size=600x400",
          options2
        )

        1. Alternatively, we could use the Street View API to get the street view images for the breweries.
        2. Degree of image utility varies, this is because the Street View Static API will snap to the panorama 
          photographed closest to this location. When an address text string is provided, the API 
          may use a different (maybe more accurate?) camera location to better display the specified location.
      */


