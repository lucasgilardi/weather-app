const API_KEY = "e46b8ef9c896d1ff8db913b7d638c234";

const fetchData = position => {
    const { latitude, longitude } = position.coords;
    fetch(`http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&lang=es&units=metric&appid=${API_KEY}`)
        .then(response => response.json())
        .then(data => setWeatherData(data))
}

const setWeatherData = data => {
    console.log(data)
    const weatherData = {
        location: data.name,
        description: data.weather[0].description,
        icon: `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`,
        humidity: data.main.humidity,
        pressure: data.main.pressure,
        temperature: data.main.temp,
        temp_max: data.main.temp_max,
        temp_min: data.main.temp_min,
        feels_like: data.main.feels_like,
        wind: data.wind.speed,
        date: getDate(),
        time: getTime(),
    }

    Object.keys(weatherData).forEach(key => {
        document.getElementById(key).textContent = weatherData[key];
    });

    document.getElementById("icon").src = weatherData.icon;
    document.getElementById("temperature").textContent += "°C";
    document.getElementById("temp_min").textContent += "°C";
    document.getElementById("temp_max").textContent += "°C";
    document.getElementById("feels_like").textContent += "°C";
    document.getElementById("humidity").textContent += "%";
    document.getElementById("wind").textContent += " km/h";
    document.getElementById("pressure").textContent += " hPa";

    cleanUp();
}

const cleanUp = () => {
    let container = document.getElementById("container");
    let loader = document.getElementById("loader");

    loader.style.display = "none";
    container.style.display = "flex";
}

const getDate = () => {
    let date = new Date();
    let month = date.toLocaleString('default', { month: 'long' });

    return `${date.getDate()} de ${month} de ${date.getFullYear()}`;
}
const getTime = () => {
    let date = new Date();
    return ` ${date.getHours()}:${date.getMinutes()}hs`
}

const onLoad = () => {
    navigator.geolocation.getCurrentPosition(fetchData);
}

let currentTime = new Date().getHours();

if (7 <= currentTime && currentTime < 20) {
    document.getElementById("container").style.backgroundImage = "url(img/day.webp)";
} else {
    document.getElementById("container").style.backgroundImage = "url(img/night.webp)";
}