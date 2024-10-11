const apiKey = '201058bd3de23aafb34605c4d19da542'; // Replace with your OpenWeatherMap API key

document.getElementById('search-btn').addEventListener('click', () => {
    const city = document.getElementById('city-input').value;
    if (city) {
        getWeather(city);
    }
});

function getWeather(city) {
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            if (data.cod === 200) {
                updateWeather(data);
                // Show the weather details after data is fetched
                document.getElementById('weather-details').style.display = 'block';
            } else {
                alert('City not found');
            }
        })
        .catch(error => console.log('Error fetching data:', error));
}

function updateWeather(data) {
    // Update temperature
    const temperature = Math.round(data.main.temp);
    document.getElementById('temperature').innerText = `${temperature}°C`;

    // Update city name
    document.getElementById('city-name').innerText = data.name.toUpperCase();

    // Update humidity
    document.getElementById('humidity').innerText = `${data.main.humidity}%`;

    // Update wind speed
    document.getElementById('wind-speed').innerText = `${Math.round(data.wind.speed)} KM/HR`;

    // Update weather icon
    const weatherIcon = document.getElementById('weather-icon');
    const iconCode = data.weather[0].icon;
    weatherIcon.src = `http://openweathermap.org/img/wn/${iconCode}.png`;

    // Update background based on weather conditions or temperature
    updateBackground(temperature, data.weather[0].main);
}

function updateBackground(temperature, weatherCondition) {
    const card = document.querySelector('.card');

    // Determine background based on temperature or weather condition
    if (weatherCondition === 'Clear' || temperature >= 30) {
        card.style.background = 'linear-gradient(135deg, #87CEEB, #FFD700)'; // Sunny gradient
    } else if (weatherCondition === 'Clouds') {
        card.style.background = 'linear-gradient(135deg, #d3d3d3, #808080)'; // Cloudy gradient
    } else if (weatherCondition === 'Rain') {
        card.style.background = 'linear-gradient(135deg, #4A6C92, #B0C4DE)'; // Rainy gradient
    } else if (weatherCondition === 'Thunderstorm') {
        card.style.background = 'linear-gradient(135deg, #2F4F4F, #483D8B)'; // Stormy gradient
    } else if (weatherCondition === 'Snow' || temperature <= 0) {
        card.style.background = 'linear-gradient(135deg, #B0E0E6, #FFFFFF)'; // Snowy gradient
    } else if (weatherCondition === 'Drizzle') {
        card.style.background = 'linear-gradient(135deg, #4A6C92, #B0C4DE)'; // Rainy gradient
    } else if (weatherCondition === 'Haze' || weatherCondition === 'Mist') {
        card.style.background = 'linear-gradient(135deg, #d3d3d3, #808080)'; // Foggy gradient
    } else {
        card.style.background = 'linear-gradient(135deg, #FF4500, #FF69B4)'; // Sunset gradient
    }
}
