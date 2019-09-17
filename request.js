
var today = new Date();
var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
var dateTime = date+' '+time;


var request = new XMLHttpRequest();
console.log("begin");
console.log(config.ENDPOINT);
var url = config.ENDPOINT + 'filmsNowShowing/?n=10';
console.log(url);

fetch(
  url, {
    method: "GET",
    headers: {
      'Authorization' : config.AUTHORIZATION,
      'client' : config.USERNAME,
      'x-api-key' : config.MY_KEY,
      'territory' : config.TERRITORY,
      'api-version' : 'v200',
      'geolocation' : config.GEOLOCATION,
      'device-datetime' : dateTime
    }
  }
).then(function(response) {
  if (response.ok) {
    console.log("YES!");
    console.log(response);
  } else {
    console.log("NO!");
  }
});
