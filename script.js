const cityInput = document.querySelector("#city");

const searchButton = document.querySelector("button");

const weatherInfo = document.querySelector(".weather-info");

const cityElement = document.querySelector("#city-resume");
const temperatureElement = document.querySelector("#temperature");
const conditionElement = document.querySelector("#condition");
const humidityElement = document.querySelector("#humidity");
const sensationElement = document.querySelector("#sensation");

async function searchWeather() {
  const city = cityInput.value.trim();

  if (city === "") {
    alert("Digite o nome de uma cidade.");
    cityInput.value = "";
    cityInput.focus();
    return;
  }

  try {
    const url = `https://geocoding-api.open-meteo.com/v1/search?name=${city}`;

    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Erro ao buscar localização");
    }

    const data = await response.json();

    if (!data.results || data.results.length === 0) {
      alert("Cidade não encontrada.");
      return;
    }

    const location = data.results[0];

    const latitude = location.latitude;
    const longitude = location.longitude;

    const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,apparent_temperature,weather_code`;

    const weatherResponse = await fetch(weatherUrl);
    if (!weatherResponse.ok) {
      throw new Error("Erro ao buscar clima.");
    }

    const weatherData = await weatherResponse.json();

    const current = weatherData.current;

    const temperature = current.temperature_2m;
    const humidity = current.relative_humidity_2m;
    const sensation = current.apparent_temperature;
    const weatherCode = current.weather_code;

    const condition = getWeatherCondition(weatherCode);

    cityElement.innerText = `${location.name}`;
    temperatureElement.innerText = ` ${temperature} °C`;
    sensationElement.innerText = ` ${sensation} °C`;
    humidityElement.innerText = ` ${humidity}%`;
    conditionElement.innerText = ` ${condition}`;

    weatherInfo.classList.remove("hidden");
  } catch (error) {
    console.error(error);
    alert("Não foi possível buscar os dados do clima");
  } finally {
    cityInput.value = "";
    cityInput.focus();
  }
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

cityInput.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    searchWeather();
  }
});

searchButton.addEventListener("click", searchWeather);
