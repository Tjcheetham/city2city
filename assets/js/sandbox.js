var apiKey = "dbf364bc39a4580a03a0dd92d999aa37";

function getCityData(uaSlug) {
    console.log("I made it!")
    $.ajax({
        url: "https://api.teleport.org/api/urban_areas/slug:" + uaSlug + "/scores/",
        method: "GET"
    }).then(function (response) {
        console.log(response);
    })
}

//TELEPORTS AUTO COMPLETE
var $cityOneResults = document.querySelector('#city-one-results');
var $cityTwoResults = document.querySelector('#city-two-results');
var cityOneResult = $cityOneResults.insertAdjacentHTML.bind($cityOneResults, 'afterend');
var cityTwoResult = $cityTwoResults.insertAdjacentHTML.bind($cityTwoResults, 'afterend');

TeleportAutocomplete.init('#city-choice-1').on('change', function (value) {
    console.log(value);
    cityOneResult('<pre>' + JSON.stringify(value, null, 2) + '</pre>');
    getCityOneWx(value.latitude, value.longitude)
    if (value.uaSlug) {
        getCityData(value.uaSlug);
    }
});

TeleportAutocomplete.init('#city-choice-2').on('change', function (value) {
    console.log(value);
    cityTwoResult('<pre>' + JSON.stringify(value, null, 2) + '</pre>');
    getCityTwoWx(value.latitude, value.longitude)
    if (value.uaSlug) {
        getCityData(value.uaSlug);
    }
});


$cityOneName = $("#city-1-name");
$cityOneIcon = $("#city-1-wx-icon");
$cityOneTemp = $("#city-1-temp");
$cityOneHumidity = $("#city-1-humidity");
$cityTwoName = $("#city-2-name");
$cityTwoIcon = $("#city-2-wx-icon");
$cityTwoTemp = $("#city-2-temp");
$cityTwoHumidity = $("#city-2-humidity");

function getCityOneWx(lat, lon) {
    $.ajax({
        url:"https://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + lon + "&units=imperial&appid=" + apiKey,
        method: "GET"
    }).then(function (response) {
        //UPDATING THE CURRENT WEATHER FOR THE CURRENT CITY
        $cityOneTemp.text(response.main.temp.toFixed(1));
        $cityOneHumidity.text(response.main.humidity);
        $cityOneIcon.attr("src", "https://openweathermap.org/img/w/" + response.weather[0].icon + ".png")
    })
}

function getCityTwoWx(lat, lon) {
    $.ajax({
        url: "https://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + lon + "&units=imperial&appid=" + apiKey,
        method: "GET"
    }).then(function (response) {
        //UPDATING THE CURRENT WEATHER FOR THE CURRENT CITY
        $cityTwoTemp.text(response.main.temp.toFixed(1));
        $cityTwoHumidity.text(response.main.humidity);
        $cityTwoIcon.attr("src", "https://openweathermap.org/img/w/" + response.weather[0].icon + ".png")
    })
}