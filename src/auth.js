// Register user
function registerUser(e) {
  e.preventDefault();

  const user = {
    name: document.getElementById("regName").value,
    email: document.getElementById("regEmail").value,
    password: document.getElementById("regPassword").value
  };

  localStorage.setItem("user", JSON.stringify(user));

  alert("Account created successfully!");
  window.location.href = "login.html";
}

// Login user
function loginUser(e) {
  e.preventDefault();

  const email = document.getElementById("loginEmail").value;
  const password = document.getElementById("loginPassword").value;

  const user = JSON.parse(localStorage.getItem("user"));

  if (!user) {
    alert("No account found. Please register.");
    return;
  }

  if (email === user.email && password === user.password) {
    localStorage.setItem("loggedIn", "true");
    localStorage.setItem("currentUser", JSON.stringify(user));
    window.location.href = "directory.html";
  } else {
    alert("Invalid email or password");
  }
}

// Logout
function clearSessionData() {
  const sessionKeys = [
    'loggedIn',
    'currentUser',
    'ecotravel-favorites',
    'ecotravel-itinerary',
    'ecotravel-saved-activities',
    'ecotravel-saved-plans',
    'ecotravel-trip',
    'carbonEmissions'
  ];

  sessionKeys.forEach(key => localStorage.removeItem(key));
}

function logout() {
  clearSessionData();
  window.location.href = 'login.html';
}

// Protect pages
function protectPage() {
  if (localStorage.getItem('loggedIn') !== 'true') {
    window.location.href = 'login.html';
  }
}

// Get current user
function getCurrentUser() {
  return JSON.parse(localStorage.getItem("currentUser"));
}

function getCurrentPage() {
  const page = window.location.pathname.split('/').pop();
  return page === '' ? 'index.html' : page;
}

function isPublicPage() {
  const page = getCurrentPage();
  return page === 'login.html' || page === 'register.html' || page === 'index.html' || page === 'directory.html';
}

function isAuthenticated() {
  return localStorage.getItem('loggedIn') === 'true';
}

function requireLogin() {
  if (!isAuthenticated()) {
    alert('Please log in to continue.');
    window.location.href = 'login.html';
    return false;
  }
  return true;
}

function handleAuthRedirect() {
  const loggedIn = isAuthenticated();
  const page = getCurrentPage();

  if (isPublicPage()) {
    if (loggedIn && (page === 'login.html' || page === 'register.html')) {
      window.location.href = 'directory.html';
    }
    return;
  }

  if (!loggedIn) {
    window.location.href = 'login.html';
  }
}

handleAuthRedirect();