/**
 * Retrieves the weather data for a given city from the OpenWeatherMap API.   
 */

let input = document.querySelector(".search input");
let btn = document.querySelector(".search button");
const wimg = document.querySelector(".wicon");
const apikey = "3c635331b8950800c212b336da8d7330";
const url = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

async function weather(city) {
    const response = await fetch(`${url}${city}&appid=${apikey}`);

    if (response.status == 404) {
        document.querySelector(".error").style.display = "block";
        document.querySelector(".weather").style.display = "none";
    } else {
        var data = await response.json();
        document.querySelector(".city").innerHTML = data.name;
        document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°c";
        document.querySelector(".humd").innerHTML = data.main.humidity + " %";
        document.querySelector(".speed").innerHTML = data.wind.speed + " km/hr";

        /**
         * Sets the weather icon based on the weather condition.
         *
         * condition - The weather condition (e.g. "Clear", "Mist", "Clouds", etc.)
         */
        function setWeatherIcon(condition) {
            switch (condition) {
                case "Clear":
                    wimg.src = "img/clear.png";
                    break;
                case "Mist":
                    wimg.src = "img/mist.png";
                    break;
                case "Clouds":
                    wimg.src = "img/clouds.png";
                    break;
                case "Rain":
                    wimg.src = "img/rain.png";
                    break;
                case "Snow":
                    wimg.src = "img/snow.png";
                    break;
                case "Drizzle":
                    wimg.src = "img/drizzle.png";
                    break;
                default:
                    console.log("Unknown weather condition");
            }
        }

        setWeatherIcon(data.weather[0].main);

        document.querySelector(".weather").style.display = "block";
        document.querySelector(".error").style.display = "none";
    }
}


/**
 * Event listener for the search button.
 */
btn.addEventListener("click", () => {
    weather(input.value);
})