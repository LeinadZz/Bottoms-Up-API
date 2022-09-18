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
  console.log(breweryURL);
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
        $();

        tableData.textContent = `${i + 1} ${data[i].name}`;
        websiteUrl.textContent = data[i].website_url;
        websiteUrl.href = data[i].website_url;
        phoneNumber.textContent = `Phone Number: ${data[i].phone}`;

        createTableRow.appendChild(tableData);
        tableBody.appendChild(createTableRow);
        tableData.appendChild(lineBreak);
        tableData.appendChild(websiteUrl);
        tableBody.appendChild(phoneNumber);
        createTableRow.appendChild(phoneNumber);
      }
    })
    .catch((err) => console.error(err));
}

// initialized variables for use later
// var long = '0.0'
// var lat = '0.0'

//Google Maps API
const options2 = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": "48c1efcdf0mshbc4f579e09271eep1736d1jsn77c5309cc348",
    "X-RapidAPI-Host": "google-maps28.p.rapidapi.com",
  },
};

// Example URL/Query
fetch(
  "https://google-maps28.p.rapidapi.com/maps/api/place/textsearch/json?query=White%20House&region=en&language=en",
  options2
)
  .then((response) => response.json())
  .then((response) => console.log(response))
  .catch((err) => console.error(err));
