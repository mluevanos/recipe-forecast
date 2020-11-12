var baseUrl = 'http://api.worldweatheronline.com/premium/v1/weather.ashx?q=';
var apiKey = 'd22e5db08ccb4da289d190837201211';

var testUrl = "http://api.worldweatheronline.com/premium/v1/weather.ashx?q=Los Angeles&format=json&num_of_days=1&date=today&includelocation=yes&key=" + apiKey;

var tailBaseUrl = '&format=json&num_of_days=1&date=today&includelocation=yes&key=d22e5db08ccb4da289d190837201211';
//test to make sure the API is accessible and working
// $.ajax({
//     url: testUrl,
//     method: "GET"
// })
// .then(function(response) {
//     console.log(testUrl);
//     console.log(response);
// })

//new base Url to allow space for manual input
//var baseUrlV2 = "http://api.worldweatheronline.com/premium/v1/weather.ashx?q=" + localInput + "&format=json&num_of_days=1&date=today&includelocation=yes&key=" + apiKey;

$("#confirm").on("click", function() {
    $(".container3").show();
    let localInput = document.querySelector(".myLocation").value;
    console.log(localInput);
    let queryTest = baseUrl + localInput + tailBaseUrl;
    console.log(queryTest);
})


