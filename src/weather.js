// WEATHER UTILITY MODULE (Open-Meteo API)

class WeatherService {
    constructor() {
        this.baseUrl = 'https://api.open-meteo.com/v1/forecast';
        this.geoUrl = 'https://geocoding-api.open-meteo.com/v1/search';
        this.cache = {};
    }

    /**
     * Get coordinates for a location name
     */
    async getCoordinates(locationName) {
        try {
            const response = await fetch(
                `${this.geoUrl}?name=${encodeURIComponent(locationName)}&count=1&language=en&format=json`
            );
            const data = await response.json();

            if (!data.results || data.results.length === 0) {
                throw new Error(`Location "${locationName}" not found`);
            }

            return {
                name: data.results[0].name,
                country: data.results[0].country,
                latitude: data.results[0].latitude,
                longitude: data.results[0].longitude,
                timezone: data.results[0].timezone
            };
        } catch (error) {
            console.error('Geocoding error:', error);
            throw error;
        }
    }

    /**
     * Get daily forecast for a location and date range
     */
    async getDailyForecast(latitude, longitude, startDate = null, endDate = null) {
        try {
            const params = new URLSearchParams({
                latitude: latitude,
                longitude: longitude,
                daily: 'temperature_2m_max,temperature_2m_min,precipitation_sum,precipitation_probability_max,weathercode,windspeed_10m_max,uv_index_max',
                timezone: 'auto',
                forecast_days: 16  // Max available from API
            });

            const response = await fetch(`${this.baseUrl}?${params}`);
            const data = await response.json();

            if (!data.daily) {
                throw new Error('No daily forecast data available');
            }

            const forecast = this.parseDailyData(data);

            // Filter by date range if provided
            if (startDate && endDate) {
                const start = new Date(startDate);
                const end = new Date(endDate);
                return forecast.filter(day => {
                    const dayDate = new Date(day.date);
                    return dayDate >= start && dayDate <= end;
                });
            }

            return forecast;
        } catch (error) {
            console.error('Daily forecast error:', error);
            throw error;
        }
    }

    /**
     * Get hourly forecast for a location
     */
    async getHourlyForecast(latitude, longitude, days = 7) {
        try {
            const params = new URLSearchParams({
                latitude: latitude,
                longitude: longitude,
                hourly: 'temperature_2m,precipitation,weathercode,windspeed_10m,relative_humidity_2m',
                timezone: 'auto',
                forecast_days: days
            });

            const response = await fetch(`${this.baseUrl}?${params}`);
            const data = await response.json();

            if (!data.hourly) {
                throw new Error('No hourly forecast data available');
            }

            return this.parseHourlyData(data);
        } catch (error) {
            console.error('Hourly forecast error:', error);
            throw error;
        }
    }

    /**
     * Parse daily weather data into readable format
     */
    parseDailyData(data) {
        const { time, temperature_2m_max, temperature_2m_min, precipitation_sum, 
                precipitation_probability_max, weathercode, windspeed_10m_max, uv_index_max } = data.daily;

        return time.map((date, i) => ({
            date: date,
            day: new Date(date).toLocaleDateString('en-US', { weekday: 'short' }),
            temp: Math.round((temperature_2m_max[i] + temperature_2m_min[i]) / 2),
            maxTemp: temperature_2m_max[i],
            minTemp: temperature_2m_min[i],
            weathercode: weathercode[i],
            condition: this.getWeatherCondition(weathercode[i]),
            icon: this.getWeatherIcon(weathercode[i]),
            precipitation: precipitation_sum[i],
            precipitationChance: precipitation_probability_max[i],
            windSpeed: windspeed_10m_max[i],
            uvIndex: uv_index_max[i],
            alert: this.generateWeatherAlert(weathercode[i], temperature_2m_max[i], precipitation_probability_max[i])
        }));
    }

    /**
     * Parse hourly weather data
     */
    parseHourlyData(data) {
        const { time, temperature_2m, precipitation, weathercode, windspeed_10m, relative_humidity_2m } = data.hourly;

        return time.map((datetime, i) => ({
            datetime: datetime,
            temperature: temperature_2m[i],
            precipitation: precipitation[i],
            condition: this.getWeatherCondition(weathercode[i]),
            windSpeed: windspeed_10m[i],
            humidity: relative_humidity_2m[i]
        }));
    }

    /**
     * Get human-readable weather condition from WMO code
     */
    getWeatherCondition(code) {
        const conditions = {
            0: 'Clear sky',
            1: 'Mainly clear',
            2: 'Partly cloudy',
            3: 'Overcast',
            45: 'Foggy',
            48: 'Foggy with rime',
            51: 'Light drizzle',
            53: 'Moderate drizzle',
            55: 'Dense drizzle',
            61: 'Slight rain',
            63: 'Moderate rain',
            65: 'Heavy rain',
            71: 'Slight snow',
            73: 'Moderate snow',
            75: 'Heavy snow',
            77: 'Snow grains',
            80: 'Slight rain showers',
            81: 'Moderate rain showers',
            82: 'Violent rain showers',
            85: 'Slight snow showers',
            86: 'Heavy snow showers',
            95: 'Thunderstorm',
            96: 'Thunderstorm with hail',
            99: 'Thunderstorm with heavy hail'
        };
        return conditions[code] || 'Unknown';
    }

    /**
     * Get emoji icon for weather code
     */
    getWeatherIcon(code) {
        if ([0].includes(code)) return '☀️';           // Clear
        if ([1, 2].includes(code)) return '🌤️';       // Partly cloudy
        if ([3].includes(code)) return '☁️';          // Overcast
        if ([45, 48].includes(code)) return '🌫️';     // Foggy
        if ([51, 53, 55, 80, 81, 82].includes(code)) return '🌦️';  // Rain
        if ([61, 63, 65].includes(code)) return '🌧️';  // Heavy rain
        if ([71, 73, 75, 77, 85, 86].includes(code)) return '❄️';  // Snow
        if ([95, 96, 99].includes(code)) return '⛈️';  // Thunderstorm
        return '🌥️';  // Default
    }

    /**
     * Generate weather alert for adverse conditions
     */
    generateWeatherAlert(code, maxTemp, precipitationChance) {
        const alerts = [];

        // Severe weather
        if ([95, 96, 99].includes(code)) {
            alerts.push({
                type: 'danger',
                message: '⛈️ Thunderstorm expected - avoid outdoor activities',
                severity: 'high'
            });
        }

        // Heavy rain
        if ([65, 82].includes(code)) {
            alerts.push({
                type: 'warning',
                message: '🌧️ Heavy rain expected',
                severity: 'medium'
            });
        }

        // High precipitation chance
        if (precipitationChance >= 80) {
            alerts.push({
                type: 'warning',
                message: `☔ ${precipitationChance}% chance of rain`,
                severity: 'medium'
            });
        }

        // Extreme heat
        if (maxTemp >= 35) {
            alerts.push({
                type: 'warning',
                message: `🌡️ Extreme heat (${maxTemp}°C) - stay hydrated`,
                severity: 'medium'
            });
        }

        // Snow
        if ([71, 73, 75, 77, 85, 86].includes(code)) {
            alerts.push({
                type: 'info',
                message: '❄️ Snow expected',
                severity: 'low'
            });
        }

        return alerts.length > 0 ? alerts : null;
    }

    /**
     * Get UV index risk level
     */
    getUVRiskLevel(uvIndex) {
        if (uvIndex < 3) return { level: 'Low', color: 'success' };
        if (uvIndex < 6) return { level: 'Moderate', color: 'warning' };
        if (uvIndex < 8) return { level: 'High', color: 'danger' };
        return { level: 'Very High', color: 'danger' };
    }

    /**
     * Format date for display
     */
    formatDate(dateStr) {
        const date = new Date(dateStr);
        return date.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            weekday: 'short'
        });
    }

    /**
     * Check if conditions are suitable for outdoor activities
     */
    isSuitableForOutdoor(forecast) {
        if (!forecast) return false;

        // Not suitable if:
        // - Heavy rain or worse
        // - Thunderstorm
        // - Snow
        const badCodes = [65, 82, 95, 96, 99, 71, 73, 75, 77, 85, 86];
        
        if (badCodes.includes(forecast.weathercode)) return false;
        if (forecast.precipitationChance >= 80) return false;
        
        return true;
    }
}

// Export singleton instance
const weatherService = new WeatherService();
