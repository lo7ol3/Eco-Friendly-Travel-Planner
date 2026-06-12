# Weather API Integration Guide

## Overview

The Eco-Friendly Travel Planner now features a comprehensive weather integration using the **Open-Meteo API**, a free, open-source weather API that provides accurate forecasts without requiring API keys.

## Features

### 1. **Daily Weather Forecast**
- 7-day weather forecast for your destination
- Automatically updates when you select a destination and trip dates
- Displays:
  - Temperature (max/min in °C)
  - Weather condition with emoji icons
  - Precipitation probability
  - Wind speed
  - UV index with risk level
  - Suitability for outdoor activities

### 2. **Weather Alerts**
- **Storm Alerts** ⛈️ - Warns about thunderstorms
- **Heavy Rain Warnings** 🌧️ - Alerts about heavy precipitation
- **Heat Warnings** 🌡️ - Warns when temperature exceeds 35°C
- **High Precipitation Chance** ☔ - Alerts at 80%+ rain chance
- **Snow Warnings** ❄️ - Notifies about snow conditions

### 3. **Activity-Weather Compatibility**
Check if weather is suitable for specific activity types:
- Hiking
- Beach activities
- Water sports
- General outdoor activities

### 4. **Responsive UI**
- Loading states while fetching data
- Error handling with user-friendly messages
- Mobile-friendly card layout
- Color-coded alerts

## API Reference

### Main Components

#### `weather.js` - Weather Service Module

A standalone utility module that handles all Open-Meteo API interactions.

**Key Methods:**

```javascript
// Get coordinates for a location
await weatherService.getCoordinates(locationName)
// Returns: { name, country, latitude, longitude, timezone }

// Get daily forecast for date range
await weatherService.getDailyForecast(latitude, longitude, startDate, endDate)
// Returns: Array of daily forecast objects

// Get hourly forecast
await weatherService.getHourlyForecast(latitude, longitude, days)
// Returns: Array of hourly forecast objects

// Check if weather is suitable for outdoor activities
weatherService.isSuitableForOutdoor(forecast)
// Returns: boolean

// Get UV index risk level
weatherService.getUVRiskLevel(uvIndex)
// Returns: { level: string, color: string }
```

#### `itinerary.js` - Integration Functions

**Main Functions:**

```javascript
// Render the weather widget (called automatically)
renderWeatherWidget()

// Check activity suitability based on weather
await checkActivityWeatherSuitability(activityDate, activityType)
// Parameters:
//   - activityDate: 'YYYY-MM-DD'
//   - activityType: 'hiking' | 'beach' | 'water' | 'outdoor'
// Returns: { suitable: boolean | null, reason: string, icon: string }
```

## Usage Examples

### Example 1: Display Weather Widget
The weather widget is automatically rendered when you:
1. Select a destination city
2. Choose travel dates
3. The forecast updates in the right sidebar

### Example 2: Check Activity Suitability
```javascript
// Check if hiking is suitable on a specific date
const result = await checkActivityWeatherSuitability('2026-05-15', 'hiking');
console.log(result);
// Output: { suitable: true, reason: "Good conditions - sunny", icon: "✅" }
```

### Example 3: Get Forecast Data
```javascript
// Get detailed forecast for planning
const location = await weatherService.getCoordinates('Cameron Highlands');
const forecast = await weatherService.getDailyForecast(
    location.latitude,
    location.longitude,
    '2026-05-10',
    '2026-05-15'
);

forecast.forEach(day => {
    console.log(`${day.date}: ${day.condition}, ${day.maxTemp}°C, UV: ${day.uvIndex}`);
});
```

## Weather Code Reference (WMO)

The Open-Meteo API uses WMO weather codes:

| Code | Description |
|------|-------------|
| 0 | Clear sky |
| 1-2 | Mainly clear / Partly cloudy |
| 3 | Overcast |
| 45-48 | Foggy |
| 51-55 | Drizzle |
| 61-65 | Rain |
| 71-77 | Snow |
| 80-82 | Rain showers |
| 85-86 | Snow showers |
| 95-99 | Thunderstorm |

## Alert System

### Alert Types

**High Severity:**
- Thunderstorms (codes 95, 96, 99)
- Heavy rain (codes 65, 82)
- Violent rain showers (code 82)

**Medium Severity:**
- Precipitation chance ≥ 80%
- Extreme heat (≥ 35°C)
- Snow conditions

**Low Severity:**
- General snow information

### How Alerts Work

1. When forecast data is retrieved, each day is analyzed
2. Alerts are generated based on weather codes and thresholds
3. Alerts appear in colored boxes on weather cards:
   - `alert-danger` (red) - High severity
   - `alert-warning` (yellow) - Medium severity
   - `alert-info` (blue) - Low severity

## Performance & Caching

- The weather service doesn't use caching by default
- Forecasts are fetched fresh when the widget renders
- Optimize by:
  - Limiting forecast requests to trip date range only
  - Using date boundaries to reduce API response size

## Data Points Provided

Each daily forecast includes:
- **date** - Date string (YYYY-MM-DD)
- **maxTemp** - Maximum temperature (°C)
- **minTemp** - Minimum temperature (°C)
- **condition** - Human-readable weather description
- **icon** - Emoji representation
- **precipitation** - Rainfall amount (mm)
- **precipitationChance** - Probability of precipitation (%)
- **windSpeed** - Maximum wind speed (km/h)
- **uvIndex** - UV index value
- **alert** - Array of weather alerts (if any)
- **weathercode** - WMO code (0-99)

## Error Handling

The system includes robust error handling:

```
✅ Location found → Fetch forecast → Display widget
❌ Location not found → Show "Location not found" error
❌ API error → Show "Unable to load weather" message
❌ No data for dates → Show "No weather data available" message
```

Users see clear, actionable error messages in all scenarios.

## API Limits

**Open-Meteo Free Tier:**
- No API key required
- Rate limit: ~10 requests/second
- Max 16 days forecast
- Unlimited calls per day

## Future Enhancements

Potential improvements:
1. Hourly forecast view
2. Historical weather data
3. Weather alerts via email/notification
4. Packing recommendations based on forecast
5. Activity warnings integrated into itinerary timeline
6. Weather impact on carbon footprint calculations
7. Precipitation prediction for eco-friendly transportation choices

## Troubleshooting

### Weather widget not loading
- Check browser console for errors
- Verify destination city name is spelled correctly
- Ensure trip dates are set and valid
- Check internet connection

### Coordinates not found
- Try using a different city name (more specific or less specific)
- Ensure the location exists (e.g., "Cameron Highlands, Malaysia")
- Check spelling and accents

### Forecast data missing
- Trip dates might be too far in the future (max 16 days)
- Try selecting dates within next 2 weeks
- Verify the destination has weather data available

## Technical Details

### Open-Meteo API Endpoints Used

1. **Geocoding API**
   ```
   https://geocoding-api.open-meteo.com/v1/search
   ```
   - Converts location names to coordinates

2. **Weather Forecast API**
   ```
   https://api.open-meteo.com/v1/forecast
   ```
   - Provides daily and hourly weather data

### Parameters Requested
- **Daily**: temperature_2m_max, temperature_2m_min, precipitation_sum, precipitation_probability_max, weathercode, windspeed_10m_max, uv_index_max
- **Hourly**: temperature_2m, precipitation, weathercode, windspeed_10m, relative_humidity_2m

### Timezone Handling
- Automatically detects timezone from coordinates
- All times displayed in local destination timezone

## Support & Documentation

For more information about Open-Meteo:
- Website: https://open-meteo.com
- Documentation: https://open-meteo.com/en/docs
- GitHub: https://github.com/open-meteo/open-meteo
