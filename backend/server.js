const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());

const API_KEY = process.env.GEOAPIFY_API_KEY;

app.get("/api/destinations", async (req, res) => {
  try {
    const cityQuery = req.query.city;

    const worldCities = [
      "Bangkok",
      "Tokyo",
      "Seoul",
      "Singapore",
      "Bali",
      "Paris",
      "London",
      "Rome",
      "Barcelona",
      "Amsterdam",
      "New York",
      "Sydney",
      "Istanbul",
      "Cape Town",
      "Dubai",
      "Kyoto",
      "Vancouver",
      "Zurich",
      "Oslo",
      "Queenstown"
    ];

    const citiesToSearch = cityQuery ? [cityQuery] : worldCities;

    let allDestinations = [];

    for (const city of citiesToSearch) {
      const geoUrl = `https://api.geoapify.com/v1/geocode/search?text=${encodeURIComponent(city)}&format=json&lang=en&apiKey=${API_KEY}`;
      const geoResponse = await fetch(geoUrl);
      const geoData = await geoResponse.json();

      if (!geoData.results || geoData.results.length === 0) continue;

      const { lat, lon, country } = geoData.results[0];

      const limit = cityQuery ? 40 : 8;

      const placesUrl = `https://api.geoapify.com/v2/places?categories=tourism.sights,tourism.attraction,entertainment,leisure,natural&filter=circle:${lon},${lat},50000&limit=${limit}&lang=en&apiKey=${API_KEY}`;

      const placesResponse = await fetch(placesUrl);
      const placesData = await placesResponse.json();

      if (!placesData.features) continue;

      const destinations = placesData.features
        .filter(place => place.properties.name)
        .map((place, index) => {
          const p = place.properties;

          return {
            id: p.place_id || `${city}-${index}`,
            name: p.name,
            city: city,
            country: country || "Unknown",
            price: 100 + index * 25,
            co2: 20 + index * 4,
            transport: index % 2 === 0 ? "bus" : "train",
            interests: ["eco", "culture"],
            image: "https://via.placeholder.com/400x250?text=EcoTravel",
            description: p.categories ? p.categories.join(", ") : "Tourist destination"
          };
        });

      allDestinations = allDestinations.concat(destinations);
    }

    res.json(allDestinations);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch destinations" });
  }
});

app.listen(3000, () => {
  console.log("Backend running on http://localhost:3000");
});