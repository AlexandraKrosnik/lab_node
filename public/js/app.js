var fetchWeather = "/weather";

const ref = {
  weatherForm: document.querySelector(".header__form"),
  search: document.querySelector(".header__input"),
  cardElement: document.querySelector(".card"),
};
ref.weatherForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const locationApi = fetchWeather + "?address=" + ref.search.value;
  fetch(locationApi)
    .then((r) => r.json())
    .then((data) => {
      if (data.error) {
        throw new Error("Address entered incorrectly!");
      }
      let icon = "";
      if (data.description === "rain" || data.description === "fog") {
        icon = "wi wi-day-" + data.description;
      } else {
        icon = "wi wi-day-cloudy";
      }
      let temperature =
        (data.temperature - 273.5).toFixed(2) + String.fromCharCode(176);
      let params = { ...data, icon, temperature };
      addCard(params);
    })
    .catch((error) => {
      resetCard(error.message);
    })
    .finally((d) => {
      ref.weatherForm.reset();
    });
});

function addCard(data) {
  let cards = `<p class="card__title">weather in  ${data.cityName}</p><span class="card__span"></span>
<div class="weatherIcon"><i class="${data.icon}"></i></div>
        <table class="card__table">
          <tr>
            <td>Pressure</td>
            <td class="pressure">${data.pressure}</td>
          </tr>
          <tr>
            <td>Humidity</td>
            <td class="humidity">${data.humidity}</td>
          </tr>
          <tr>
            <td>Temperature</td>
            <td class="temperature">${data.temperature}</td>
          </tr>
        </table>`;
  ref.cardElement.innerHTML = cards;
}
function resetCard(data) {
  ref.cardElement.innerHTML = data;
}
