const directoryData = [
  {
    id: 1,
    name: "Rainforest Eco Lodge",
    category: "Accommodation",
    city: "Kuching",
    description: "A solar-powered eco-lodge that uses rainwater harvesting and supports local conservation.",
    ecoTag: "Renewable energy",
    price: "RM220/night"
  },
  {
    id: 2,
    name: "Green Plate Cafe",
    category: "Restaurant",
    city: "Kuching",
    description: "Farm-to-table cafe serving seasonal ingredients with low-waste packaging.",
    ecoTag: "Locally sourced menu",
    price: "RM25 avg meal"
  },
  {
    id: 3,
    name: "CityCycle Rental",
    category: "Transport",
    city: "Penang",
    description: "Bike rental service that promotes low-carbon city exploration with mapped cycling routes.",
    ecoTag: "Low-emission transport",
    price: "RM18/day"
  },
  {
    id: 4,
    name: "Mangrove Discovery Walk",
    category: "Activity",
    city: "Langkawi",
    description: "Guided nature walk focused on wildlife education and responsible tourism practices.",
    ecoTag: "Nature conservation",
    price: "RM45/person"
  },
  {
    id: 5,
    name: "Harbor Green Suites",
    category: "Accommodation",
    city: "Malacca",
    description: "A boutique hotel with refill stations, energy-efficient rooms, and plastic-free amenities.",
    ecoTag: "Plastic-free stay",
    price: "RM260/night"
  },
  {
    id: 6,
    name: "Eco Bites Kitchen",
    category: "Restaurant",
    city: "Penang",
    description: "Plant-forward dining spot that composts kitchen waste and partners with local farmers.",
    ecoTag: "Waste reduction",
    price: "RM30 avg meal"
  },
  {
    id: 7,
    name: "EV Shuttle Hub",
    category: "Transport",
    city: "Kuala Lumpur",
    description: "Electric shuttle transfer service connecting travelers to major attractions sustainably.",
    ecoTag: "Electric transport",
    price: "RM15/trip"
  },
  {
    id: 8,
    name: "Community Farm Experience",
    category: "Activity",
    city: "Cameron Highlands",
    description: "Hands-on visit to a sustainable farm with eco-education and local produce tasting.",
    ecoTag: "Community tourism",
    price: "RM35/person"
  },
  {
    id: 9,
    name: "Riverleaf Retreat",
    category: "Accommodation",
    city: "Ipoh",
    description: "A riverside retreat built with natural materials and guided by water-saving operations.",
    ecoTag: "Water conservation",
    price: "RM210/night"
  },
  {
    id: 10,
    name: "TransitGo Pass",
    category: "Transport",
    city: "Malacca",
    description: "Integrated public transit pass designed for easy, low-impact travel across town.",
    ecoTag: "Public transport",
    price: "RM12/day"
  },
  {
    id: 11,
    name: "Roots & Seasons",
    category: "Restaurant",
    city: "Ipoh",
    description: "A sustainable dining concept focused on seasonal ingredients and reusable serviceware.",
    ecoTag: "Seasonal ingredients",
    price: "RM28 avg meal"
  },
  {
    id: 12,
    name: "Heritage Walking Tour",
    category: "Activity",
    city: "Malacca",
    description: "A guided city walk highlighting local heritage, culture, and low-impact exploration.",
    ecoTag: "Walkable tourism",
    price: "RM20/person"
  }
];

const directoryGrid = document.getElementById("directoryGrid");
const favoritesGrid = document.getElementById("favoritesGrid");
const searchInput = document.getElementById("searchInput");
const categoryFilter = document.getElementById("categoryFilter");
const favoritesOnly = document.getElementById("favoritesOnly");
const resetFilters = document.getElementById("resetFilters");
const clearFavorites = document.getElementById("clearFavorites");
const emptyState = document.getElementById("emptyState");
const favoritesEmptyState = document.getElementById("favoritesEmptyState");
const resultsCount = document.getElementById("resultsCount");

function getFavorites() {
  return JSON.parse(localStorage.getItem("ecoFavorites")) || [];
}

function saveFavorites(favorites) {
  localStorage.setItem("ecoFavorites", JSON.stringify(favorites));
}

function isFavorite(id) {
  return getFavorites().includes(id);
}

function toggleFavorite(id) {
  const favorites = getFavorites();
  const updatedFavorites = favorites.includes(id)
    ? favorites.filter((favoriteId) => favoriteId !== id)
    : [...favorites, id];

  saveFavorites(updatedFavorites);
  renderDirectory();
  renderFavorites();
}

function getBadgeClass(category) {
  switch (category) {
    case "Accommodation":
      return "badge-accommodation";
    case "Restaurant":
      return "badge-restaurant";
    case "Transport":
      return "badge-transport";
    default:
      return "badge-activity";
  }
}

function createCard(item) {
  const favorite = isFavorite(item.id);

  return `
    <div class="col-md-6 col-xl-4">
      <article class="directory-card h-100">
        <div class="card-top d-flex justify-content-between align-items-start gap-3">
          <div>
            <span class="category-badge ${getBadgeClass(item.category)}">${item.category}</span>
            <h3 class="h5 fw-bold mt-3 mb-2">${item.name}</h3>
          </div>
          <button
            class="favorite-btn ${favorite ? "active" : ""}"
            aria-label="${favorite ? "Remove from favorites" : "Add to favorites"}"
            onclick="toggleFavorite(${item.id})"
          >
            ${favorite ? "♥" : "♡"}
          </button>
        </div>
        <div class="card-body-custom">
          <p class="meta-text mb-2"><strong>City/Town:</strong> ${item.city}</p>
          <p class="meta-text">${item.description}</p>
          <div class="mt-3">
            <span class="info-chip">${item.ecoTag}</span>
            <span class="info-chip">${item.price}</span>
          </div>
        </div>
      </article>
    </div>
  `;
}

function filterDirectory() {
  const searchValue = searchInput.value.trim().toLowerCase();
  const categoryValue = categoryFilter.value;
  const favoritesValue = favoritesOnly.value;

  return directoryData.filter((item) => {
    const matchesCity = item.city.toLowerCase().includes(searchValue);
    const matchesCategory = categoryValue === "all" || item.category === categoryValue;
    const matchesFavorite = favoritesValue === "all" || isFavorite(item.id);

    return matchesCity && matchesCategory && matchesFavorite;
  });
}

function renderDirectory() {
  const filteredItems = filterDirectory();
  resultsCount.textContent = filteredItems.length;

  if (filteredItems.length === 0) {
    directoryGrid.innerHTML = "";
    emptyState.classList.remove("d-none");
    return;
  }

  emptyState.classList.add("d-none");
  directoryGrid.innerHTML = filteredItems.map(createCard).join("");
}

function renderFavorites() {
  const favoriteItems = directoryData.filter((item) => isFavorite(item.id));

  if (favoriteItems.length === 0) {
    favoritesGrid.innerHTML = "";
    favoritesEmptyState.classList.remove("d-none");
    return;
  }

  favoritesEmptyState.classList.add("d-none");
  favoritesGrid.innerHTML = favoriteItems.map(createCard).join("");
}

function resetAllFilters() {
  searchInput.value = "";
  categoryFilter.value = "all";
  favoritesOnly.value = "all";
  renderDirectory();
}

searchInput.addEventListener("input", renderDirectory);
categoryFilter.addEventListener("change", renderDirectory);
favoritesOnly.addEventListener("change", renderDirectory);
resetFilters.addEventListener("click", resetAllFilters);

clearFavorites.addEventListener("click", () => {
  saveFavorites([]);
  renderDirectory();
  renderFavorites();
});

renderDirectory();
renderFavorites();
