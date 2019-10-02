
var today = new Date();
var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
var dateTime = date+' '+time;

function getLocation(callback) {
    var promise = new Promise(function(resolve, reject) {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                function(position){
                  document.getElementById("dataDump").innerHTML += "" + position.coords.latitude + "; " + position.coords.longitude + "<br><ul>"
                  document.getElementById("cinemaDump").innerHTML += "" + position.coords.latitude + "; " + position.coords.longitude + "<br><ul>"

                    resolve("" + position.coords.latitude + "; " + position.coords.longitude)
                }
            );
        } else {
          reject("Unknown");
        }
    });

    return promise;
}
var location;
var locationPromise = getLocation();
locationPromise
      .then(function(loc) {
console.log(loc)
var request = new XMLHttpRequest();
var url = config.ENDPOINT + 'filmsNowShowing/?n=10';
fetch(
  url, {
    method: "GET",
    headers: {
      'Authorization' : config.AUTHORIZATION,
      'client' : config.USERNAME,
      'x-api-key' : config.MY_KEY,
      'territory' : config.TERRITORY,
      'api-version' : 'v200',
      'geolocation' : loc,
      'device-datetime' : dateTime
    }
  }
).then(function(response) {
  if (response.ok) {
    return response.json();
  } else {
    console.log("NO!");
  }
}).then(function(myJson) {
  for (var i = 0; i < 10; i++) {
    document.getElementById("dataDump").innerHTML += "<li>" + myJson.films[i].film_name + "</li>";
  }
  document.getElementById("dataDump").innerHTML += "</ul>"
});
var request = new XMLHttpRequest();
var url = config.ENDPOINT + 'cinemasNearby/?n=5';
console.log(locationPromise)
fetch(
  url, {
    method: "GET",
    headers: {
      'Authorization' : config.AUTHORIZATION,
      'client' : config.USERNAME,
      'x-api-key' : config.MY_KEY,
      'territory' : config.TERRITORY,
      'api-version' : 'v200',
      'geolocation' : loc,
      'device-datetime' : dateTime
    }
  }
).then(function(response) {
  if (response.ok) {
    return response.json();
  } else {
console.log("Could not get theaters near you")
  }
}).then(function(myJson) {
  for (var i = 0; i < 5; i++) {
    document.getElementById("cinemaDump").innerHTML += "<li>" + myJson.cinemas[i].cinema_name + "</li>";

  }
  document.getElementById("cinemaDump").innerHTML += "</ul>"

})

       })
      .catch(function(err) { console.log("No location"); });
