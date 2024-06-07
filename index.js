const searchBar = document.getElementById("search");
const searchBtn = document.getElementById("search-btn");
const celcius = document.getElementById("celcius");
const cityWeather = document.getElementById("city");
const cityHumidity = document.getElementById("humidity");
const windSpeed = document.getElementById("speed");
const weatherImage = document.getElementById("weather-img");
const description = document.getElementById("description");
const date = document.getElementById("date");

searchBtn.addEventListener("click", async function () {
  const city = searchBar.value;

  const appId = "cadc2c51e9c2c2c10d21f275735318b1";

  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${appId}&units=metric`,
    {
      method: "GET",
    }
  );

  const data = await response.json();

  if (data) {
    let timestamp = data.dt;
    const convertedDate = new Date(timestamp * 1000).toDateString();
    date.textContent = convertedDate;
  }

  if (data && data.weather && data.weather.length > 0) {
    celcius.textContent = data.main.temp + "°C";
    cityHumidity.textContent = data.main.humidity + "%";
    windSpeed.textContent = data.wind.speed + "Km/hr";
    cityWeather.textContent = city;

    data.weather.forEach((cli) => {
      if (cli.main === "Rain") {
        weatherImage.innerHTML = `<img src="images/rain.png" alt="Rain">`;
      } else if (cli.main === "Mist") {
        weatherImage.innerHTML = `<img src="images/mist.png" alt="Mist">`;
      } else if (cli.main === "Clouds") {
        weatherImage.innerHTML = `<img src="images/clouds.png" alt="Clouds">`;
      } else if (cli.main === "Clear") {
        weatherImage.innerHTML = `<img src="images/clear.png" alt="Clear">`;
      } else {
        weatherImage.innerHTML = `<img src="images/snow.png" alt="Default">`;
      }
    });
    if (data && data.weather) {
      data.weather.map((desc) => {
        description.textContent = desc.description;
      });
    }
  }
});
