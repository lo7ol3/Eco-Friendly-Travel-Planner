async function searchWeather() {
    const city = document.getElementById('cityInput').value;
    const card = document.getElementById('weatherCard');
    
    if (!city) return alert("Please enter a city!");

    try {
        // Step A: Geocoding (City -> Coords)
        const geoResponse = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1&language=en&format=json`);
        const geoData = await geoResponse.json();

        if (!geoData.results) throw new Error("City not found");

        const { latitude, longitude, name } = geoData.results[0];

        // Step B: Weather Fetch
        const weatherResponse = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`);
        const weatherData = await weatherResponse.json();

        // Step C: Update UI
        document.getElementById('cityName').innerText = name;
        document.getElementById('tempDisplay').innerText = `${weatherData.current_weather.temperature}°C`;
        
        // Show the card
        card.classList.remove('d-none');
        
        // Logic for "Eco-Friendly Travel suggestions" (Based on weather)
        const temp = weatherData.current_weather.temperature;
        const advice = temp > 20 ? "Perfect for cycling!" : "Great for walking tours!";
        document.getElementById('weatherAdvice').innerText = advice;

    } catch (error) {
        alert(error.message);
    }
}