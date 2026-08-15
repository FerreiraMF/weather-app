const cityInput = document.querySelector("#city");

const searchButton = document.querySelector("button");

const weatherInfo = document.querySelector(".weather-info");

const 

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

  console.log(
    `a temperatura é: ${temperature}°, a humidade é: ${humidity}, a sensação termica é: ${sensation}° e o codigo do clime é: ${weatherCode}.`,
  );
}

searchButton.addEventListener("click", searchWeather);
