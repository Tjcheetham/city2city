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
var $cityOneTeleSum = $('#city-1-teleport-summary');
var $cityTwoTeleSum = $('#city-2-teleport-summary');
var $cityOneImage = $('#city-1-image');
var $cityTwoImage = $('#city-2-image');
var $cityOneBox = $('#box1');
var $cityTwoBox = $('#box2');
var cityOneHasData = false;
var cityTwoHasData = false;
var cityOneDataArray = [];
var cityTwoDataArray = [];

function getCityData(uaSlug, uaId, whichCity) {
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
                        .attr("class", "style-name-" + response.categories[i].score_out_of_10.toFixed(0))
                        .attr("style", "width: 200px; display: inline")
                        .text(response.categories[i].name)
                        .append($("<span>")
                            .text(response.categories[i].score_out_of_10.toFixed(1)))
                        .append($("<br>"))
                )
                //OVERALL SCORE CALCULATED BY TELEPORT
                $cityOneTeleOverall.text(response.teleport_city_score.toFixed(2));
                $cityOneTeleSum.text(response.summary);
            }
            else {
                $cityTwoResults.append(
                    $("<div>")
                        .attr("style", "background: " + response.categories[i].color)
                        .text(response.categories[i].name + " Score of: " + response.categories[i].score_out_of_10.toFixed(1))
                )
                //OVERALL SCORE CALCULATED BY TELEPORT
                $cityTwoTeleOverall.text(response.teleport_city_score.toFixed(2));
                $cityTwoTeleSum.text(response.summary);
            }
        }
    })

    console.log(uaId)
    $.ajax({
        url: "https://api.teleport.org/api/urban_areas/slug:" + uaSlug + "/images/",
        method: "GET"
    }).then(function (response) {
        console.log(response.photos[0].image.web);
        if (whichCity == 1) {
            // $cityOneImage.attr("src", response.photos[0].image.web);
            $cityOneBox.css("background-image", "url(" + response.photos[0].image.web + ")");
        }
        else {
            // $cityTwoImage.attr("src", response.photos[0].image.web);
            $cityTwoBox.css("background-image", "url(" + response.photos[0].image.web + ")");
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
    $cityOneResults.empty();
    $cityOneTeleOverall.text("");
    $cityOneTeleSum.text("");
    $cityOneImage.attr("src", "#")
    //USING THE LAT LON FROM THE RESULTS TO GET THE PROPER WX
    $cityOneName.html(value.name + "<br>" + value.country);
    getCityWx(value.latitude, value.longitude, 1)
    //CHECKING TO MAKE SURE WE CAN GET URBAN DATA
    if (value.uaSlug) {
        cityOneHasData = true;
        getCityData(value.uaSlug, value.uaId, 1);
    }
});

//TELEPORTS AUTO COMPLETE FOR CITY 2
TeleportAutocomplete.init('#city-choice-2').on('change', function (value) {
    console.log(value);
    $cityTwoResults.empty();
    $cityTwoTeleOverall.text("");
    $cityTwoTeleSum.text("");
    $cityTwoImage.attr("src", "#")
    //USING THE LAT LON FROM THE RESULTS TO GET THE PROPER WX
    $cityTwoName.html(value.name + "<br>" + value.country);
    getCityWx(value.latitude, value.longitude, 2)
    //CHECKING TO MAKE SURE WE CAN GET URBAN DATA
    if (value.uaSlug) {
        cityTwoHasData = true;
        getCityData(value.uaSlug, value.uaId, 2);
    }
});