var baseUrl = 'http://api.worldweatheronline.com/premium/v1/weather.ashx?q=';
var tailBaseUrl = '&format=json&num_of_days=1&date=today&includelocation=yes&key=d22e5db08ccb4da289d190837201211';



$("#confirm").on("click", function() {
    
    // if ($("#main").has(".container3")) {
    //     $(".container3").detach();
    // }

    $(".container3").show();
    let localInput = document.querySelector(".myLocation").value;
    console.log(localInput);

    let queryUrl = baseUrl + localInput + tailBaseUrl;
    $.ajax({
        url: queryUrl,
        method: "GET"
    })
    .then(function(response) {
        //to test the url and response from weather API
        console.log(queryUrl);
        console.log(response.data);

        //setting current weather conditions to variables which will be displayed
        let responseData = response.data.current_condition[0];
        let tempNowFar = responseData.temp_F;
        let weatherCode = responseData.weatherCode;
        console.log(tempNowFar);
        console.log(weatherCode);

        let currentDesc = responseData.weatherDesc[0].value;
        let tempIcon = responseData.weatherIconUrl[0].value;
        console.log(currentDesc);
        console.log(tempIcon);

        //Displaying current weather conditions on the page
        $(".openWeather").prepend("<hr>" + "Current Temperature : " + tempNowFar + "F" + "<br>" + "Current Condition : " + currentDesc );
        $(".icon-holder").attr("src", tempIcon);
    

        //setting the Hot weather conditional to pull up appropriate recipes
        if (weatherCode === "113") {
            $("#sunnyVideo").show();
            $("#homeVideo").hide();
            let urlHot = "https://api.edamam.com/search?q=salad&app_id=c814663e&app_key=0c4b0756ea6a4474bc365916d73a84b7";
            $.ajax({
                url: urlHot,
                method: "GET"
            })
            .then(recipeResponse);
        }

        //setting the Cold weather conditional to surface appropriate recipes
        else if (weatherCode === "323"|| weatherCode === "326" || weatherCode === "329" || weatherCode === "332" || weatherCode === "335" || weatherCode === "338") {
            console.log("weather code is snow");
            $("#windyVideo").show();
            $("#homeVideo").hide();
            let urlCold = "https://api.edamam.com/search?q=soup&app_id=c814663e&app_key=0c4b0756ea6a4474bc365916d73a84b7";
            $.ajax({
                url: urlCold,
                method: "GET"
            })
            .then(recipeResponse);
        }

        //setting the Rain weather conditional to surface appropriate recipes
        else if (weatherCode ==="308" || weatherCode === "305" || weatherCode === "302" || weatherCode === "299" || weatherCode === "296" || weatherCode === "293") {
            $("#rainVideo").show();
            $("#homeVideo").hide();
            let urlRain = "https://api.edamam.com/search?q=crockpot&app_id=c814663e&app_key=0c4b0756ea6a4474bc365916d73a84b7";
            $.ajax({
                url: urlRain,
                method: "GET"
            })
            .then(recipeResponse);
        }

        //setting the Snow weather conditional to surface appropriate recipes
        else if(weatherCode === "122" || weatherCode === "230") {
            $("#snowVideo").show();
            $("#homeVideo").hide();
            let urlSnow = "https://api.edamam.com/search?q=roast&app_id=c814663e&app_key=0c4b0756ea6a4474bc365916d73a84b7";
            $.ajax({
            url: urlSnow,
            method: "GET"
            })
            .then(recipeResponse);
            }
            
        //setting the conditional for other weather conditions under a cloudy gen response
        else {
            $("#cloudyVideo").show();
            $("#homeVideo").hide();
            let urlDessert = "https://api.edamam.com/search?q=dessert&app_id=c814663e&app_key=0c4b0756ea6a4474bc365916d73a84b7";
                $.ajax({
                url: urlDessert,
                method: "GET"
                })
            .then(recipeResponse);
        }
    })
})

//Function to render recipes based on ajax call
let recipeResponse = (response) => {
    console.log(response);
    let recipeList = response.hits;
    console.log(recipeList[0].recipe.label);
    console.log(recipeList[0].recipe.shareAs);
    for (let i = 0; i < recipeList.length; i++) {
        let picDiv = $("<div>");
        let recipeName = recipeList[i].recipe.label;
        let recipeUrl = recipeList[i].recipe.shareAs;
        let recipeImg = recipeList[i].recipe.image;
        console.log(recipeImg);
        let recipeText = recipeName.link(recipeUrl);
        let recipeIcon = $("<img>").attr("src", recipeImg);
        picDiv.prepend("<br><hr>" + recipeText + "<br>");
        picDiv.append(recipeIcon);
        $(".food").append(picDiv);
    }
}

