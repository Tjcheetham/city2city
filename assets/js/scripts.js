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
var $cityOneTeleOverall = $('#city-1-teleport-overall');
var $cityTwoTeleOverall = $('#city-2-teleport-overall');
var cityOneHasData = false;
var cityTwoHasData = false;
var cityOneDataArray = [];
var cityTwoDataArray = [];

function getCityData(uaSlug, whichCity) {
    $.ajax({
        url: "https://api.teleport.org/api/urban_areas/slug:" + uaSlug + "/scores/",
        method: "GET"
    }).then(function (response) {
        console.log(response);
        //STORE THE DATA TO COMPARE LATER
        if (whichCity == 1) {
            cityOneDataArray = response.categories;
        }
        else {
            cityTwoDataArray = response.categories;
        }

        //lOOPING THROUGH THE CATECORIES AND DISPLAYING THEM TO SEE WHAT WE HAVE
        for (i = 0; i < response.categories.length; i++) {
            //DETERMINING WHICH DIV TO POPULATE
            if (whichCity == 1) {
                $cityOneResults.append(
                    $("<div>")
                        .attr("style", "background: " + response.categories[i].color)
                        .text(response.categories[i].name + " Score of: " + response.categories[i].score_out_of_10.toFixed(1))
                )
                //OVERALL SCORE CALCULATED BY TELEPORT
                $cityOneTeleOverall.text(response.teleport_city_score.toFixed(2));
            }
            else {
                $cityTwoResults.append(
                    $("<div>")
                        .attr("style", "background: " + response.categories[i].color)
                        .text(response.categories[i].name + " Score of: " + response.categories[i].score_out_of_10.toFixed(1))
                )
                //OVERALL SCORE CALCULATED BY TELEPORT
                $cityTwoTeleOverall.text(response.teleport_city_score.toFixed(2));
            }
        }
    })
}

function getCityWx(lat, lon, whichCity) {
    $.ajax({
        url: "https://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + lon + "&units=imperial&appid=" + apiKey,
        method: "GET"
    }).then(function (response) {
        //PUTTING THE RESULTS IN THE RIGHT PLACE
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

//TELEPORTS AUTO COMPLETE FOR CITY 1
TeleportAutocomplete.init('#city-choice-1').on('change', function (value) {
    console.log(value);
    //USING THE LAT LON FROM THE RESULTS TO GET THE PROPER WX
    getCityWx(value.latitude, value.longitude, 1)
    //CHECKING TO MAKE SURE WE CAN GET URBAN DATA
    if (value.uaSlug) {
        cityOneHasData = true;
        getCityData(value.uaSlug, 1);
    }
});

//TELEPORTS AUTO COMPLETE FOR CITY 2
TeleportAutocomplete.init('#city-choice-2').on('change', function (value) {
    console.log(value);
    //USING THE LAT LON FROM THE RESULTS TO GET THE PROPER WX
    getCityWx(value.latitude, value.longitude, 2)
    //CHECKING TO MAKE SURE WE CAN GET URBAN DATA
    if (value.uaSlug) {
        cityTwoHasData = true;
        getCityData(value.uaSlug, 2);
    }
});