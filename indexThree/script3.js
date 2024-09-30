document.addEventListener("DOMContentLoaded", () => {
    // Load the selected location's weather data from localStorage
    const selectedLocation = JSON.parse(localStorage.getItem("selectedLocation"));

    console.log(selectedLocation)

    if (selectedLocation) {
        // Display today's weather data
        document.querySelector('.cityName').textContent = selectedLocation.location;
        document.querySelector('.day1weatherCode').textContent = selectedLocation.weatherCode;
        document.querySelector('.currTemp').textContent = `${selectedLocation.currTemp}°C`;
        document.querySelector('.tempMinMax1').textContent = `${selectedLocation.tempMin} - ${selectedLocation.tempMax}°C`;
        document.querySelector('.day1Rainsum').textContent = `${selectedLocation.rain} mm`;
        document.querySelector('.day1WindSpeed').textContent = `${selectedLocation.windSpeed} m/s`;

        // Display the 5-day forecast
        const forecast = selectedLocation.fiveDayForecast;
        
        if (forecast) {
            for (let i = 0; i < 5; i++) {
                // Dynamically target the HTML elements for days 1 to 5
                document.querySelector(`.day${i+1}weatherCode`).innerHTML = getWeatherEmoji(forecast.weatherCodes[i]);
                document.querySelector(`.tempMinMax${i+1}`).innerHTML = `${forecast.minTemps[i]} - ${forecast.maxTemps[i]}°C`;
                document.querySelector(`.day${i+1}Rainsum`).innerHTML = `${forecast.rainSums[i]} mm`;
                document.querySelector(`.day${i+1}WindSpeed`).innerHTML = `${forecast.windSpeeds[i]} m/s`;
            }
                //calculate average temp for each day
            for (let i = 0; i < 4; i++) {
                const tempMin = forecast.minTemps[i];
                const tempMax = forecast.maxTemps[i];
                const avgTemp = (tempMin + tempMax) / 2;
            
                document.querySelector(`.day${i+1}Temp`).innerHTML = `${avgTemp.toFixed(1)}°C`;
            }
        }
    } else {
        document.querySelector('.cityName').textContent = "No location data available.";
    }
});


//get the date for each day 
const dayDateClasses = ["day1Date", "day2Date", "day3Date", "day4Date", "day5Date"];
const todayDate2 = new Date();
const dateFormat2 = {month: 'short', day: 'numeric' };

for (let i = 0; i < dayDateClasses.length; i++) {
    const futureDate = new Date(todayDate);
    futureDate.setDate(todayDate.getDate() + i);
    
    const formattedDate = futureDate.toLocaleDateString('en-US', dateFormat);
    const dateElement = document.querySelector(`.${dayDateClasses[i]}`);

if (dateElement) {
  dateElement.innerHTML = `${formattedDate}`
}
}



// Weather Emoji Function
function getWeatherEmoji(weatherCode) {
    const weatherCodeMap = {
      0: "☀️",
      1: "🌤️",
      2: "⛅",
      3: "☁️",
      45: "🌫️",
      48: "🌫️",
      51: "🌧️",
      61: "🌦️",
      63: "🌧️",
      71: "🌨️",
      80: "🌧️",
      85: "🌨️",
      95: "⛈️"
    };
    return weatherCodeMap[weatherCode] || "🌈";
}