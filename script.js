const cityInput = document.querySelector("#city");

const searchButton = document.querySelector("button");

const weatherInfo = document.querySelector(".weather-info");

const cityElement = document.querySelector("#city-resume");
const temperatureElement = document.querySelector("#temperature");
const conditionElement = document.querySelector("#condition");
const humidityElement = document.querySelector("#humidity");
const sensationElement = document.querySelector("#sensation");

async function searchWeather() {
  const city = cityInput.value;
  console.log(city);

  const url = `https://geocoding-api.open-meteo.com/v1/search?name=${city}`;
  console.log(url);

  const response = await fetch(url);

  const data = await response.json();

  const location = data.results[0];

  const latitude = location.latitude;
  const longitude = location.longitude;

  const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,apparent_temperature,weather_code`;
  console.log(weatherUrl);

  const weatherResponse = await fetch(weatherUrl);

  const weatherData = await weatherResponse.json();
  console.log(weatherData);

  const current = weatherData.current;

  const temperature = current.temperature_2m;
  const humidity = current.relative_humidity_2m;
  const sensation = current.apparent_temperature;
  const weatherCode = current.weather_code;

  const condition = getWeatherCondition(weatherCode);

  console.log(
    `a temperatura é: ${temperature}°, a humidade é: ${humidity}, a sensação termica é: ${sensation}° e o codigo do clime é: ${weatherCode}.`,
  );

  cityElement.innerText = `Cidade: ${location.name}`;
  temperatureElement.innerText = `Temperatura: ${temperature} °C`;
  sensationElement.innerText = `Sensação térmica: ${sensation} °C`;
  humidityElement.innerText = `Umidade: ${humidity}%`;
  conditionElement.innerText = `Condição: ${condition}`;

  weatherInfo.classList.remove("hidden");
}

function getWeatherCondition(code) {
  if (code === 0) {
    return "Céu limpo";
  } else if (code === 1) {
    return "Predominantemente limpo";
  } else if (code === 2) {
    return "Parcialmente nublado";
  } else if (code === 3) {
    return "Nublado";
  } else if (code === 45 || code === 48) {
    return "Nevoeiro";
  } else if (code === 51 || code === 53 || code === 55) {
    return "Garoa";
  } else if (code === 61 || code === 63 || code === 65) {
    return "Chuva";
  } else if (code === 80 || code === 81 || code === 82) {
    return "Pancadas de chuva";
  } else {
    return "Condição desconhecida";
  }
}

searchButton.addEventListener("click", searchWeather);
