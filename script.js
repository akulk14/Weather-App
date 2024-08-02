//Variable declaration
const apiKey = "307e05fcf6cbd12372aa59b41a26638c";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?&units=metric&q=";
const searchBar = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon img");

// To display weather
async function checkWeather(city) {

    //Fetch data in JSON format
    const response = await fetch(apiUrl + city + `&appid=${apiKey}`);

    if(response.status == 404){
        document.querySelector(".error").style.display = "block";
        document.querySelector(".main").style.display = "none";
        document.querySelector(".bottom").style.display = "none";
    }

    else{
        var data = await response.json();

    //Update display on app
    document.querySelector(".location").innerHTML = data.name;
    document.querySelector(".temperature").innerHTML = Math.round(data.main.temp) + "\u00B0" + "C";
    document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
    document.querySelector(".wind-speed").innerHTML = data.wind.speed + " kmph";

    //Update weather icon
    if(data.weather[0].main == "Clear"){
        weatherIcon.src = "images/clear.png";
    }
    else if(data.weather[0].main == "Clouds"){
        weatherIcon.src = "images/clouds.png";
    }
    else if(data.weather[0].main == "Drizzle"){
        weatherIcon.src = "images/drizzle.png";
    }
    else if(data.weather[0].main == "Mist"){
        weatherIcon.src = "images/mist.png";
    }
    else if(data.weather[0].main == "Rain"){
        weatherIcon.src = "images/rain.png";
    }
    else if(data.weather[0].main == "Snow"){
        weatherIcon.src = "images/snow.png";
    }

    //Display changes after search
    document.querySelector(".main").style.display = "block";
    document.querySelector(".bottom").style.display = "flex";
    document.querySelector(".error").style.display = "none";
    }
}

//Search button action
searchBtn.addEventListener("click", () => {
    checkWeather(searchBar.value);
})

//Enter key enables search
searchBar.addEventListener("keydown", (e) => {
    if (e.key === "Enter"){
        checkWeather(searchBar.value);
    }
})