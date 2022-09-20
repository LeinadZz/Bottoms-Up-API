//DOM elements for adding table to correct page section
var tableBody = document.getElementById("repo-table");
var contentCard = document.getElementsByClassName("card-content");

//HTTP header for second api request - Google Maps Places API
const options2 = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": "e71dc4f159mshf0a7f2ba40a213fp1e4151jsn78daa4f97ba6",
    "X-RapidAPI-Host": "google-maps28.p.rapidapi.com",
  },
};

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

  //first api - fetch request for populating results section with breweries
  fetch(breweryURL)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);

      //for loop to iterate through JSON response and populate results section in a formatted table
      for (let i = 0; i < data.length; i++) {
        var createTableRow = document.createElement("tr");
        var tableData = document.createElement("td");
        tableData.setAttribute('id', 'tableInfo-' + i);
        var websiteUrl = document.createElement("a");
        var phoneNumber = document.createElement("td");
        var lineBreak = document.createElement("br");

        //var streetName = document.createElement("td");
        var googleNames = data[i].name;
        var latitude = data[i].latitude;
        var longitude = data[i].longitude;

        tableData.textContent = `${i + 1} ${data[i].name}`;
        websiteUrl.textContent = data[i].website_url;
        websiteUrl.href = data[i].website_url;
        phoneNumber.textContent = `Phone Number: ${data[i].phone}`;
        streetName.textContent = data[i].street;

        createTableRow.appendChild(tableData);
        tableBody.appendChild(createTableRow);
        tableData.appendChild(lineBreak);
        tableData.appendChild(websiteUrl);
        tableBody.appendChild(phoneNumber);
        tableData.appendChild(streetName);
        createTableRow.appendChild(phoneNumber);

        // Google Maps Places API
        // example URL = "https://google-maps28.p.rapidapi.com/maps/api/place/textsearch/json?query=White House"

        //second api - fetch request for adding Google Places star ratings for initial brewery search
        fetch(
          "https://google-maps28.p.rapidapi.com/maps/api/place/textsearch/json?query=" +
            googleNames +
            "&location=" +
            latitude +
            "%2C" +
            longitude +
            "&region=en&language=en",
          options2
        )
          .then(function (response) {
            return response.json();
          })
          .then(function (data2) {
            console.log(data2);

            //for loop to iterate through breweries and display appropriate Google Places ratings in results table
            //for (let j = 0; j < data.length; j++) {
              console.log(data2.results[0].rating);

              var placeRating = document.createElement("td");
              var tableInfo = document.getElementById('tableInfo-'+ i);

              placeRating.textContent = `Rating: ${data2.results[0].rating}`;

              tableInfo.appendChild(placeRating);
           // }
          });
      }
    })
    .catch((err) => console.error(err));
}
