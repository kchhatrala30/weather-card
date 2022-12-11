let scale = "imperial";
let currentCity;

const root = ReactDOM.createRoot(document.querySelector(".current-temperature"));

function fetchWeather(city)
{
    currentCity = city;
    let key = "10aade587740d37f361ec56082945ae6";
    let url = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=" + scale + "&appid=" + key;
    // fetch("https://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + long + "&units=imperial&appid=" + key)
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

function displayWeatherF(data)
{
    // console.log(data);
    let {name} = data;
    let {country} = data.sys;
    let {description, icon} = data.weather[0];
    let {temp, feels_like} = data.main;
    temp = Math.round(temp);
    feels_like = Math.round(feels_like);

    document.querySelector(".city-name").innerText = "Weather in " + name + ", " + country;
    document.querySelector(".current-temperature").innerText = temp + "°F";
    document.querySelector(".icon").src = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
    document.querySelector(".description").innerText = description;
    document.querySelector(".feels-like").innerText = "Feels like: " + feels_like + "°F";

    document.querySelector(".main-info").classList.remove("loading");

    if (temp <= 32) {
        document.querySelector("body").style.background = "linear-gradient(azure, lightskyblue)";
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

function displayWeatherC(data)
{
    // console.log(data);
    let {name} = data;
    let {country} = data.sys;
    let {description, icon} = data.weather[0];
    let {temp, feels_like} = data.main;
    temp = Math.round(temp);
    feels_like = Math.round(feels_like);

    document.querySelector(".city-name").innerText = "Weather in " + name + ", " + country;
    document.querySelector(".current-temperature").innerText = temp + "°C";
    document.querySelector(".icon").src = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
    document.querySelector(".description").innerText = description;
    document.querySelector(".feels-like").innerText = "Feels like: " + feels_like + "°C";

    document.querySelector(".main-info").classList.remove("loading");

    if (temp <= 0) {
        document.querySelector("body").style.background = "linear-gradient(azure, lightskyblue)";
    }
    else if (temp <= 12.778) {
        document.querySelector("body").style.background = "linear-gradient(cyan, blue)";
    }
    else if (temp <= 23.889) {
        document.querySelector("body").style.background = "linear-gradient(yellow, cyan)";
    }
    else if (23.889 < temp) {
        document.querySelector("body").style.background = "linear-gradient(orange, gold)";
    }
}

document.querySelector(".search-location button").addEventListener("click", function () {
    // fetchWeather(document.querySelector(".search-bar-lat").value, document.querySelector(".search-bar-long").value);
    fetchWeather(document.querySelector(".search-bar").value);
})

document.querySelector(".current-temperature").addEventListener("click", function () {
    root.render(e(SwitchDegreeScale));
    // console.log("THIS IS A GOOD SIGN");
})

class SwitchDegreeScale extends React.Component {
    constructor(props) {
        super(props);
        this.state = { inC: false };
    }

    render() {
        if (this.state.inC) {
            scale = "imperial";
            fetchWeather("charlotte");
        }
        else {
            scale = "metric";
            fetchWeather("toronto");
        }

        return e(
            { onClick: () => this.setState( (state) => {return { inC: !inC }} ) }
        );
    }
}

// fetchWeather(35.22709, -80.84313);
fetchWeather("New York");
