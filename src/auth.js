// Register user
async function registerUser(e) {
  e.preventDefault();

  const name =
    document.getElementById("regName").value;

  const email =
    document.getElementById("regEmail").value;

  const password =
    document.getElementById("regPassword").value;

  const { data, error } =
    await window.supabaseClient.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: name
        }
      }
    });

  if (error) {
    alert(error.message);
    return;
  }
const names = name.trim().split(" ");

const firstName = names[0] || "";

const lastName =
  names.slice(1).join(" ");

const username =
  name.replace(/\s+/g, "").toLowerCase();

await window.supabaseClient
  .from("user_profiles")
  .insert([
    {
      user_id: data.user.id,
      first_name: firstName,
      last_name: lastName,
      username: username
    }
  ]);
  alert("Account created successfully!");
  window.location.href = "login.html";
}

// Login user
async function loginUser(e) {
  e.preventDefault();

  const email = document.getElementById("loginEmail").value;
  const password = document.getElementById("loginPassword").value;

  const { data, error } =
    await window.supabaseClient.auth.signInWithPassword({
      email,
      password
    });

  if (error) {
    alert(error.message);
    return;
  }

  localStorage.setItem("loggedIn", "true");

  window.location.href = "directory.html";
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

async function logout() {
  await window.supabaseClient.auth.signOut();

  clearSessionData();

  window.location.href = "login.html";
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

async function isAuthenticated() {
  const {
    data: { session }
  } = await window.supabaseClient.auth.getSession();

  return !!session;
}

async function requireLogin() {
  const loggedIn = await isAuthenticated();

  if (!loggedIn) {
    alert('Please log in to continue.');
    window.location.href = 'login.html';
    return false;
  }

  return true;
}

async function handleAuthRedirect() {
  const loggedIn = await isAuthenticated();
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