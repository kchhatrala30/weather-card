let scale = "imperial";
let key = "4727f6a2078ba4ade6f8ab2691b946b7";
let currentCity;

const root = ReactDOM.createRoot(document.querySelector(".current-temperature"));

function fetchLocation(city)
{
    currentCity = city;
    let geocoder = "http://api.openweathermap.org/geo/1.0/direct?q=" + city + "&limit=&appid=" + key;

    fetch(geocoder)
    .then(response => 
        response.json()
    )
    .then(data => {
        const {lat, lon} = data[0];
        fetchWeather(lat, lon);
        displayLocation(data[0]);
    });  
}

function fetchWeather(lat, lon)
{
    let url = "https://api.openweathermap.org/data/3.0/onecall?lat=" + lat + "&lon=" + lon + "&units=" + scale + "&exclude=minutely,hourly,alerts&appid=" + key;
    
    fetch(url)
    .then(response =>
        response.json()
    )
    .then(data => 
        displayWeather(data)
        // displaySolar(data)
    );
}

function displayWeather(data)
{
    let {description, icon} = data.current.weather[0];
    let {temp, feels_like} = data.current;
    temp = Math.round(temp);
    feels_like = Math.round(feels_like);

    if (scale == "metric") {
        document.querySelector(".current-temperature").innerText = temp + "°C";
        document.querySelector(".feels-like").innerText = "Feels like: " + feels_like + "°C";
    }
    else {
        document.querySelector(".current-temperature").innerText = temp + "°F";
        document.querySelector(".feels-like").innerText = "Feels like: " + feels_like + "°F";
    }
    
    document.querySelector(".icon").src = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
    document.querySelector(".description").innerText = description;
    

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

function displayLocation(data)
{
    let {name, state, country} = data;
    if (state != undefined)
    {
        document.querySelector(".city-name").innerText = "Weather in " + name + ", " + state + ", " + country;
    }
    else {
        document.querySelector(".city-name").innerText = "Weather in " + name + ", " + country;
    }
    
}

// function displaySolar(data)
// {
//     let {sunrise, sunset, moon_phase} = data.daily[0];
//     document.querySelector(".sunrise-sunset").innerText = "Sunrise: " + sunrise + "\nSunset: " + sunset + "\nMoon phase: " + moon_phase;
// }

document.querySelector(".search-bar").addEventListener("keyup",  function (event) {
    if (event.key == "Enter") {
        const element = fetchLocation(document.querySelector(".search-bar").value);
        root.render(element);
    }
})

document.querySelector(".search-location button").addEventListener("click", function () {
    const element = fetchLocation(document.querySelector(".search-bar").value);
    root.render(element);
})

document.querySelector(".current-temperature").addEventListener("click", function () {
    if (scale == "metric") {
        scale = "imperial";
    }
    else {
        scale = "metric";
    }
    const element = fetchLocation(currentCity);
    root.render(element);
})

document.querySelector(".feels-like").addEventListener("click", function () {
    if (scale == "metric") {
        scale = "imperial";
    }
    else {
        scale = "metric";
    }
    const element = fetchLocation(currentCity);
    root.render(element);
})

// document.querySelector(".solar-data button").addEventListener("click", function () {
//     document.querySelector(".main-info").classList.remove("hidden");
// })

fetchLocation("Manhattan");