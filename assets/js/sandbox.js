function getCityData() {
    var cityName = "Peoria%20Illinois";
    $.ajax({
        url: "https://api.teleport.org/api/cities/?search=" + cityName,
        method: "GET"
    }).then(function (response) {
        console.log(response);
    })
}

      var $results = document.querySelector('.results');
      var appendToResult = $results.insertAdjacentHTML.bind($results, 'afterend');
      TeleportAutocomplete.init('.my-input').on('change', function(value) {
        appendToResult('<pre>' + JSON.stringify(value, null, 2) + '</pre>');
      });

getCityData();