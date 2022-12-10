function fetchWeather(city)
{
    const key = "10aade587740d37f361ec56082945ae6";
    // fetch("https://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + long + "&units=imperial&appid=" + key)
    fetch("https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&appid=" + key)
    .then(response => 
        response.json()
    )
    .then(data => 
        displayWeather(data)
    );
}

function displayWeather(data)
{
    console.log(data);
    let {name} = data;
    let {country} = data.sys;
    let {description, icon} = data.weather[0];
    let {temp, feels_like} = data.main;

    document.querySelector(".city-name").innerText = "Weather in " + name + ", " + country;
    document.querySelector(".current-temperature").innerText = temp + "°F";
    document.querySelector(".icon").src = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
    document.querySelector(".description").innerText = description;
    document.querySelector(".feels-like").innerText = "Feels like: " + feels_like + "°F";

    document.querySelector(".main-info").classList.remove("loading");

    if (temp <= 32) {
        document.querySelector("body").style.background = "linear-gradient(rgb(83, 168, 218), rgb(43, 71, 228))";
    }
    else if (temp <= 55) {
        document.querySelector("body").style.background = "linear-gradient(cyan, blue)";
    }
    else if (temp <= 75) {
        document.querySelector("body").style.background = "linear-gradient(yellow, cyan)";
    }
    else if (75 < temp) {
        document.querySelector("body").style.background = "linear-gradient(orange, gold)";
    }
}

document.querySelector(".search-location button").addEventListener("click", function () {
    // fetchWeather(document.querySelector(".search-bar-lat").value, document.querySelector(".search-bar-long").value);
    fetchWeather(document.querySelector(".search-bar").value);
})

// fetchWeather(35.22709, -80.84313);
fetchWeather("New York");