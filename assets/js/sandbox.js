function getCityData(uaSlug) {
    // var cityName = "Peoria%20Illinois";
    $.ajax({
        url: "https://api.teleport.org/api/urban_areas/slug:" + uaSlug + "/scores/",
        method: "GET"
    }).then(function (response) {
        console.log(response);
    })
}

//TELEPORTS AUTO COMPLETE
var $results = document.querySelector('.results');
var appendToResult = $results.insertAdjacentHTML.bind($results, 'afterend');
TeleportAutocomplete.init('.my-input').on('change', function (value) {
    appendToResult('<pre>' + JSON.stringify(value, null, 2) + '</pre>');
    getCityData(value.uaSlug);
});

//TRYNG TO AUTO COMPLETE ON THE LIMITED LIST
// var cityArray = JSON.parse("https://developers.teleport.org/assets/urban_areas.json");
$( "#limitedCityInput" ).autocomplete({
    source: citiesArray
  });

// $('#limitedCityInput').autocomplete({
//     source: function (request, response) {
//         $.getJSON("https://developers.teleport.org/assets/urban_areas.json?term=" + request.term, function (data) {
//             response($.map(data.dealers, function (value, key) {
//                 return {
//                     label: value,
//                     value: key
//                 };
//             }));
//         });
//     },
//     minLength: 2,
//     delay: 100
// });