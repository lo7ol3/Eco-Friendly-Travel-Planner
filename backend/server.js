const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());

const API_KEY = process.env.GEOAPIFY_API_KEY;

function cleanText(text) {
  return String(text || "")
    .replace(/\n/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function isEnglishText(text) {
  if (!text) return false;

  const name = cleanText(text);

  if (name.length < 3) return false;
  if (name.toLowerCase().includes("unnamed")) return false;

  // reject Thai, Japanese, Korean, Arabic, Chinese, etc.
  if (/[^\x00-\x7F]/.test(name)) return false;

  // must contain English alphabet
  return /[A-Za-z]/.test(name);
}

function getEnglishName(place) {
  const p = place.properties;
  const raw = p.datasource?.raw || {};

  const possibleNames = [
    raw["name:en"],
    raw["int_name"],
    raw["name:latin"],
    p.name
  ];

  for (const item of possibleNames) {
    const cleaned = cleanText(item);
    if (isEnglishText(cleaned)) {
      return cleaned;
    }
  }

  return null;
}

function isEnglishName(name) {
  if (!name) return false;

  // Remove names like "Unnamed Destination"
  if (name.toLowerCase().includes("unnamed")) return false;

  // Allow only English letters, numbers, spaces, and common symbols
  return /^[A-Za-z0-9\s&'.,()\-–]+$/.test(name);
}

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

      const limit = cityQuery ? 100 : 30;

      const placesUrl = `https://api.geoapify.com/v2/places?categories=tourism.sights,tourism.attraction,entertainment,leisure,natural&filter=circle:${lon},${lat},50000&limit=${limit}&lang=en&apiKey=${API_KEY}`;

      const placesResponse = await fetch(placesUrl);
      const placesData = await placesResponse.json();

      if (!placesData.features) continue;

const destinations = placesData.features
  .map((place, index) => {
    const p = place.properties;
    const englishName = getEnglishName(place);

    if (!englishName) return null;

    return {
      id: p.place_id || `${city}-${index}`,
      name: englishName,
      city: city,
      country: country || "Unknown",
      price: 100 + index * 25,
      co2: 20 + index * 4,
      transport: index % 2 === 0 ? "bus" : "train",
      interests: ["eco", "culture"],
      image: "https://via.placeholder.com/400x250?text=EcoTravel",
      description: p.categories ? p.categories.join(", ") : "Tourist destination"
    };
  })
  .filter(destination => destination !== null);

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