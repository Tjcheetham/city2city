var apiKey = "dbf364bc39a4580a03a0dd92d999aa37";
var $cityOneName = $("#city-1-name");
var $cityOneIcon = $("#city-1-wx-icon");
var $cityOneTemp = $("#city-1-temp");
var $cityOneHumidity = $("#city-1-humidity");
var $cityTwoName = $("#city-2-name");
var $cityTwoIcon = $("#city-2-wx-icon");
var $cityTwoTemp = $("#city-2-temp");
var $cityTwoHumidity = $("#city-2-humidity");
var $cityOneResults = $('#city-one-results');
var $cityTwoResults = $('#city-two-results');

function getCityData(uaSlug, whichCity) {
    console.log("I made it!")
    $.ajax({
        url: "https://api.teleport.org/api/urban_areas/slug:" + uaSlug + "/scores/",
        method: "GET"
    }).then(function (response) {
        for (i = 0; i < response.categories.length; i++) {
            console.log(response.categories[i].color);
            console.log(response.categories[i].name);
            console.log(response.categories[i].score_out_of_10);
            if (whichCity == 1) {
                $cityOneResults.append(
                    $("<div>")
                        .attr("style", "background: " + response.categories[i].color)
                        .text(response.categories[i].name + " Score of: " + response.categories[i].score_out_of_10.toFixed(1))
                )
            }
            else {
                $cityTwoResults.append(
                    $("<div>")
                        .attr("style", "background: " + response.categories[i].color)
                        .text(response.categories[i].name + " Score of: " + response.categories[i].score_out_of_10.toFixed(1))
                )
            }
        }
    })
}

//TELEPORTS AUTO COMPLETE

TeleportAutocomplete.init('#city-choice-1').on('change', function (value) {
    console.log(value);
    getCityWx(value.latitude, value.longitude, 1)
    if (value.uaSlug) {
        getCityData(value.uaSlug, 1);
    }
});

TeleportAutocomplete.init('#city-choice-2').on('change', function (value) {
    console.log(value);
    getCityWx(value.latitude, value.longitude, 2)
    if (value.uaSlug) {
        getCityData(value.uaSlug, 2);
    }
});



function getCityWx(lat, lon, whichCity) {
    $.ajax({
        url: "https://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + lon + "&units=imperial&appid=" + apiKey,
        method: "GET"
    }).then(function (response) {
        //UPDATING THE CURRENT WEATHER FOR THE CURRENT CITY
        if (whichCity == 1) {
            $cityOneTemp.text(response.main.temp.toFixed(1));
            $cityOneHumidity.text(response.main.humidity);
            $cityOneIcon.attr("src", "https://openweathermap.org/img/w/" + response.weather[0].icon + ".png")
        }
        else {
            $cityTwoTemp.text(response.main.temp.toFixed(1));
            $cityTwoHumidity.text(response.main.humidity);
            $cityTwoIcon.attr("src", "https://openweathermap.org/img/w/" + response.weather[0].icon + ".png")
        }
    })
}

// function getCityTwoWx(lat, lon) {
//     $.ajax({
//         url: "https://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + lon + "&units=imperial&appid=" + apiKey,
//         method: "GET"
//     }).then(function (response) {
//         //UPDATING THE CURRENT WEATHER FOR THE CURRENT CITY
//         $cityTwoTemp.text(response.main.temp.toFixed(1));
//         $cityTwoHumidity.text(response.main.humidity);
//         $cityTwoIcon.attr("src", "https://openweathermap.org/img/w/" + response.weather[0].icon + ".png")
//     })
// }