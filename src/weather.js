// WEATHER UTILITY MODULE (Open-Meteo API)

class WeatherService {
    constructor() {
        this.baseUrl = 'https://api.open-meteo.com/v1/forecast';
        this.geoUrl = 'https://geocoding-api.open-meteo.com/v1/search';
        this.coordinateCache = {};
        this.forecastCache = {};
    }

    async getCoordinates(locationName) {
        try {
            const cacheKey = locationName.trim().toLowerCase();
            if (this.coordinateCache[cacheKey]) return this.coordinateCache[cacheKey];

            const response = await fetch(
                `${this.geoUrl}?name=${encodeURIComponent(locationName)}&count=1&language=en&format=json`
            );

            if (!response.ok) {
                throw new Error(`Geocoding request failed (${response.status})`);
            }

            const data = await response.json();

            if (!data.results || data.results.length === 0) {
                throw new Error(`Location "${locationName}" not found`);
            }

            const location = {
                name: data.results[0].name,
                country: data.results[0].country,
                latitude: data.results[0].latitude,
                longitude: data.results[0].longitude,
                timezone: data.results[0].timezone
            };

            this.coordinateCache[cacheKey] = location;
            return location;
        } catch (error) {
            console.error('Geocoding error:', error);
            throw error;
        }
    }

    async getDailyForecast(latitude, longitude, startDate = null, endDate = null) {
        try {
            const cacheKey = [latitude, longitude, startDate || 'auto', endDate || 'auto'].join('|');
            if (this.forecastCache[cacheKey]) return this.forecastCache[cacheKey];

            const params = new URLSearchParams({
                latitude: latitude,
                longitude: longitude,
                daily: 'temperature_2m_max,temperature_2m_min,precipitation_sum,precipitation_probability_max,weather_code,wind_speed_10m_max,uv_index_max',
                timezone: 'auto'
            });

            if (startDate && endDate) {
                params.set('start_date', startDate);
                params.set('end_date', endDate);
            } else {
                params.set('forecast_days', '16');
            }

            const response = await fetch(`${this.baseUrl}?${params}`);

            if (!response.ok) {
                throw new Error(`Forecast request failed (${response.status})`);
            }

            const data = await response.json();

            if (!data.daily) {
                throw new Error(data.reason || 'No daily forecast data available');
            }

            const forecast = this.parseDailyData(data);
            this.forecastCache[cacheKey] = forecast;
            return forecast;
        } catch (error) {
            console.error('Daily forecast error:', error);
            throw error;
        }
    }

    async getHourlyForecast(latitude, longitude, days = 7) {
        try {
            const params = new URLSearchParams({
                latitude: latitude,
                longitude: longitude,
                hourly: 'temperature_2m,precipitation,weather_code,wind_speed_10m,relative_humidity_2m',
                timezone: 'auto',
                forecast_days: days
            });

            const response = await fetch(`${this.baseUrl}?${params}`);

            if (!response.ok) {
                throw new Error(`Hourly forecast request failed (${response.status})`);
            }

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

    parseDailyData(data) {
        const {
            time,
            temperature_2m_max,
            temperature_2m_min,
            precipitation_sum,
            precipitation_probability_max,
            weather_code,
            weathercode,
            wind_speed_10m_max,
            windspeed_10m_max,
            uv_index_max
        } = data.daily;
        const weatherCodes = weather_code || weathercode || [];
        const windSpeeds = wind_speed_10m_max || windspeed_10m_max || [];

        return time.map((date, i) => ({
            date: date,
            day: this.formatDayLabel(date),
            temp: this.roundTemperature((temperature_2m_max[i] + temperature_2m_min[i]) / 2),
            maxTemp: this.roundTemperature(temperature_2m_max[i]),
            minTemp: this.roundTemperature(temperature_2m_min[i]),
            weathercode: weatherCodes[i],
            condition: this.getWeatherCondition(weatherCodes[i]),
            icon: this.getWeatherIcon(weatherCodes[i]),
            precipitation: this.roundNumber(precipitation_sum[i], 1),
            precipitationChance: precipitation_probability_max[i] ?? 0,
            windSpeed: this.roundNumber(windSpeeds[i], 1),
            uvIndex: this.roundNumber(uv_index_max[i], 1),
            alert: this.generateWeatherAlert(weatherCodes[i], temperature_2m_max[i], precipitation_probability_max[i] ?? 0)
        }));
    }

    parseHourlyData(data) {
        const {
            time,
            temperature_2m,
            precipitation,
            weather_code,
            weathercode,
            wind_speed_10m,
            windspeed_10m,
            relative_humidity_2m
        } = data.hourly;
        const weatherCodes = weather_code || weathercode || [];
        const windSpeeds = wind_speed_10m || windspeed_10m || [];

        return time.map((datetime, i) => ({
            datetime: datetime,
            temperature: temperature_2m[i],
            precipitation: precipitation[i],
            condition: this.getWeatherCondition(weatherCodes[i]),
            windSpeed: windSpeeds[i],
            humidity: relative_humidity_2m[i]
        }));
    }

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

    getWeatherIcon(code) {
        if ([0].includes(code)) return '&#9728;&#65039;';
        if ([1, 2].includes(code)) return '&#127780;&#65039;';
        if ([3].includes(code)) return '&#9729;&#65039;';
        if ([45, 48].includes(code)) return '&#127787;&#65039;';
        if ([51, 53, 55, 80, 81, 82].includes(code)) return '&#127782;&#65039;';
        if ([61, 63, 65].includes(code)) return '&#127783;&#65039;';
        if ([71, 73, 75, 77, 85, 86].includes(code)) return '&#10052;&#65039;';
        if ([95, 96, 99].includes(code)) return '&#9928;&#65039;';
        return '&#127781;&#65039;';
    }

    generateWeatherAlert(code, maxTemp, precipitationChance) {
        const alerts = [];

        if ([95, 96, 99].includes(code)) {
            alerts.push({
                type: 'danger',
                message: 'Thunderstorm expected - avoid outdoor activities',
                severity: 'high'
            });
        }

        if ([65, 82].includes(code)) {
            alerts.push({
                type: 'warning',
                message: 'Heavy rain expected',
                severity: 'medium'
            });
        }

        if (precipitationChance >= 80) {
            alerts.push({
                type: 'warning',
                message: `${precipitationChance}% chance of rain`,
                severity: 'medium'
            });
        }

        if (maxTemp >= 35) {
            alerts.push({
                type: 'warning',
                message: `Extreme heat (${this.roundTemperature(maxTemp)} C) - stay hydrated`,
                severity: 'medium'
            });
        }

        if ([71, 73, 75, 77, 85, 86].includes(code)) {
            alerts.push({
                type: 'info',
                message: 'Snow expected',
                severity: 'low'
            });
        }

        return alerts.length > 0 ? alerts : null;
    }

    getUVRiskLevel(uvIndex) {
        if (uvIndex < 3) return { level: 'Low', color: 'success' };
        if (uvIndex < 6) return { level: 'Moderate', color: 'warning' };
        if (uvIndex < 8) return { level: 'High', color: 'danger' };
        return { level: 'Very High', color: 'danger' };
    }

    formatDate(dateStr) {
        const date = this.parseApiDate(dateStr);
        return date.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            weekday: 'short'
        });
    }

    formatDayLabel(dateStr) {
        return this.parseApiDate(dateStr).toLocaleDateString('en-US', { weekday: 'short' });
    }

    parseApiDate(dateStr) {
        const [year, month, day] = dateStr.split('-').map(Number);
        return new Date(year, month - 1, day);
    }

    roundTemperature(value) {
        return Number.isFinite(value) ? Math.round(value) : '--';
    }

    roundNumber(value, decimals = 0) {
        if (!Number.isFinite(value)) return 0;
        const factor = 10 ** decimals;
        return Math.round(value * factor) / factor;
    }

    isSuitableForOutdoor(forecast) {
        if (!forecast) return false;

        const badCodes = [65, 82, 95, 96, 99, 71, 73, 75, 77, 85, 86];

        if (badCodes.includes(forecast.weathercode)) return false;
        if (forecast.precipitationChance >= 80) return false;

        return true;
    }
}

const weatherService = new WeatherService();