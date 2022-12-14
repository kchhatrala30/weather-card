let scale = "imperial";
let currentCity;

const root = ReactDOM.createRoot(document.querySelector(".current-temperature"));

function fetchWeather(city)
{
    currentCity = city;
    let key = "10aade587740d37f361ec56082945ae6";
    let url = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=" + scale + "&appid=" + key;
    
    fetch(url)
    .then(response => 
        response.json()
    )
    .then(data => {
        if (scale == "imperial") {
            displayWeatherF(data);
        }
        else {
            displayWeatherC(data);
        }
    });
}

function displayWeather(data)
{
    // console.log(data);
    let {name} = data;
    let {country} = data.sys;
    let {description, icon} = data.weather[0];
    let {temp, feels_like} = data.main;
    temp = Math.round(temp);
    feels_like = Math.round(feels_like);

    document.querySelector(".city-name").innerText = "Weather in " + name + ", " + country;
    document.querySelector(".icon").src = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
    document.querySelector(".description").innerText = description;
    
    if (scale == "metric") {
        document.querySelector(".current-temperature").innerText = temp + "°C";
        document.querySelector(".feels-like").innerText = "Feels like: " + feels_like + "°C";
    }
    else {
        document.querySelector(".current-temperature").innerText = temp + "°F";
        document.querySelector(".feels-like").innerText = "Feels like: " + feels_like + "°F";
    }

    document.querySelector(".main-info").classList.remove("loading");

    if (scale == "metric") {
        if (temp <= 0) {
            document.querySelector("body").style.background = "linear-gradient(azure, lightskyblue)";
        }
        else if (temp <= 12.778) {
            document.querySelector("body").style.background = "linear-gradient(skyblue, royalblue)";
        }
        else if (temp <= 23.889) {
            document.querySelector("body").style.background = "linear-gradient(palegreen, plum)";
        }
        else if (23.889 < temp) {
            document.querySelector("body").style.background = "linear-gradient(gold, orangered)";
        }
    }
    else {
        if (temp <= 32) {
            document.querySelector("body").style.background = "linear-gradient(azure, lightskyblue)";
        }
        else if (temp <= 55) {
            document.querySelector("body").style.background = "linear-gradient(skyblue, royalblue)";
        }
        else if (temp <= 75) {
            document.querySelector("body").style.background = "linear-gradient(palegreen, plum)";
        }
        else if (75 < temp) {
            document.querySelector("body").style.background = "linear-gradient(gold, orangered)";
        }
    }
}

document.querySelector(".search-bar").addEventListener("keyup",  function (event) {
    if (event.key == "Enter") {
        const element = fetchWeather(document.querySelector(".search-bar").value);
        root.render(element);
    }
})

document.querySelector(".search-location button").addEventListener("click", function () {
    const element = fetchWeather(document.querySelector(".search-bar").value);
    root.render(element);
})

document.querySelector(".current-temperature").addEventListener("click", function () {
    if (scale == "metric") {
        scale = "imperial";
    }
    else {
        scale = "metric";
    }
    const element = fetchWeather(currentCity);
    root.render(element);
})

fetchWeather("New York");
