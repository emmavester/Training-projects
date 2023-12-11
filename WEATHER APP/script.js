document.addEventListener("DOMContentLoaded", function () {
    const apiKey = "bf62d48e5db2524acc211e58be39d372";
    const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

    const searchBox = document.querySelector(".search input");
    const searchBtn = document.querySelector(".search button");
    const weatherIcon = document.querySelector(".weather_icon");
    const dateNtimeElement = document.querySelector(".dateNtime");

    async function checkWeather(city) {
        try {
            const response = await fetch(apiUrl + city + `&appid=${apiKey}`);

            if (response.status === 404) {
                document.querySelector(".error").style.display = "block";
                document.querySelector(".weather").style.display = "none";
            } else {
                var data = await response.json();

                document.querySelector(".city").innerHTML = data.name;
                document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°c";
                document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
                document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";

                if (data.weather[0].main == "Clouds") {
                    weatherIcon.src = "images/cloudy.png";
                } else if (data.weather[0].main == "Clear") {
                    weatherIcon.src = "images/sun.png";
                } else if (data.weather[0].main == "Rain") {
                    weatherIcon.src = "images/rain.png";
                } else if (data.weather[0].main == "Snow") {
                    weatherIcon.src = "images/snow.png";
                } else if (data.weather[0].main == "Mist") {
                    weatherIcon.src = "images/foggy.png";
                }

                if (data.timezone) {
                    updateLiveTime(data.timezone);
                } else {
                    // Handle case where timezone is not available
                    console.error("Timezone information not available in the API response.");
                }
            }
        } catch (error) {
            console.error("Error fetching weather data:", error);
        }
    }

    function updateLiveTime(timezone) {
        const timeElement = document.querySelector(".dateNtime");
        const currentTime = new Date();

        // Get the UTC time
        const utcTime = currentTime.getTime() + currentTime.getTimezoneOffset() * 60 * 1000;

        // Calculate the local time using the provided timezone offset
        const localTime = new Date(utcTime + timezone * 1000);

        const options = {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            hour12: false, // Set to false for 24-hour clock
        };

        const formattedTime = localTime.toLocaleString(undefined, options);
        timeElement.textContent = formattedTime;
    }

    updateLiveTime();

    function handleSearch() {
        checkWeather(searchBox.value);
    }

    if (searchBtn) {
        searchBtn.addEventListener("click", handleSearch);
    }

    if (searchBox) {
        searchBox.addEventListener("keypress", function (e) {
            if (e.key === "Enter") {
                handleSearch();
            }
        });
    }
});
