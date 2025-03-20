const API_KEY = "392fc470c1ac8b42b2f40951a9a96cc4";
const weatherContainer = document.getElementById("weather");
const forecastContainer = document.getElementById("forecast");
const errorContainer = document.getElementById("error");

window.onload = () => {
  const defaultCity = "Karachi";
  fetchWeatherData(
    `https://api.openweathermap.org/data/2.5/weather?q=${defaultCity}&units=metric&appid=${API_KEY}`
  );
  fetchForecastData(
    `https://api.openweathermap.org/data/2.5/forecast?q=${defaultCity}&units=metric&appid=${API_KEY}`
  );
};

function getWeather() {
  const city = document.getElementById("city").value.trim();
  if (!city) {
    errorContainer.textContent = "Please enter a city name.";
    return;
  }
  errorContainer.textContent = "";
  fetchWeatherData(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`
  );
  fetchForecastData(
    `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${API_KEY}`
  );
}

function fetchWeatherData(url) {
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      const { name, main, weather } = data;
      weatherContainer.innerHTML = `
        <h2>${name}</h2>
        <p>Temperature: ${Math.round(main.temp)}°C</p>
        <p>${weather[0].description}</p>
      `;
    })
    .catch(() => (errorContainer.textContent = "City not found."));
}

function fetchForecastData(url) {
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      const forecasts = data.list.filter((item) =>
        item.dt_txt.includes("12:00:00")
      );
      forecastContainer.innerHTML = "<h3>3-Day Forecast</h3>";
      forecasts.slice(0, 3).forEach((forecast) => {
        const { main, weather } = forecast;
        forecastContainer.innerHTML += `
          <div class="forecast-item">
            <p>${forecast.dt_txt.split(" ")[0]}</p>
            <img src="https://openweathermap.org/img/wn/${
              weather[0].icon
            }@2x.png" alt="${weather[0].description}" />
            <p>${weather[0].description}</p>
            <p>${Math.round(main.temp)}°C</p>
          </div>
        `;
      });
    });
}