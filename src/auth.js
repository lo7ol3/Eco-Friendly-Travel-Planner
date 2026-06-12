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
    showNotification("Registration Failed", error.message, "error");
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
  showNotification("Success", "Account created successfully!", "success", () => {
    window.location.href = "login.html";
  });
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
    showNotification("Login Failed", error.message, "error");
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
    showNotification("Action Required", "Please log in to continue.", "error", () => {
      window.location.href = 'login.html';
    });
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

async function updateNavbar() {
  const loggedIn = await isAuthenticated();
  
  const navbarNav = document.getElementById("navbarNav") || document.getElementById("navMenu");
  if (!navbarNav) return;

  const ul = navbarNav.querySelector("ul.navbar-nav");
  if (!ul) return;

  const page = window.location.pathname.split('/').pop() || 'index.html';

  let navItemsHtml = "";

  const directoryActive = page === "directory.html" ? "active" : "";
  const itineraryActive = page === "itinerary.html" ? "active" : "";
  const calculatorActive = page === "calculator.html" || page === "offset-options.html" ? "active" : "";

  navItemsHtml += `<li class="nav-item"><a class="nav-link ${directoryActive}" href="directory.html">Directory</a></li>`;
  navItemsHtml += `<li class="nav-item"><a class="nav-link ${itineraryActive}" href="itinerary.html">Itinerary</a></li>`;
  navItemsHtml += `<li class="nav-item"><a class="nav-link ${calculatorActive}" href="calculator.html">Carbon Calculator</a></li>`;

  if (loggedIn) {
    const profileActive = page === "profile.html" ? "active" : "";
    navItemsHtml += `<li class="nav-item"><a class="nav-link ${profileActive}" href="profile.html">Profile</a></li>`;
    navItemsHtml += `<li class="nav-item"><a class="nav-link" href="javascript:void(0)" onclick="logout()">Logout</a></li>`;
  } else {
    const loginActive = page === "login.html" || page === "register.html" ? "active" : "";
    navItemsHtml += `<li class="nav-item"><a class="nav-link ${loginActive}" href="login.html">Login</a></li>`;
  }

  ul.innerHTML = navItemsHtml;
}

async function initAuth() {
  await handleAuthRedirect();
  await updateNavbar();
}

initAuth();

let notificationCallback = null;

function showNotification(title, message, type = 'success', onClose = null) {
  notificationCallback = onClose;
  let modalEl = document.getElementById('notificationModal');
  if (!modalEl) {
    const modalHtml = `
      <div class="custom-modal-overlay hidden" id="notificationModal">
        <div class="custom-modal-backdrop" onclick="closeNotificationModal()"></div>
        <div class="custom-modal p-4 text-center position-relative"
          style="background: white; border-radius: 1.5rem; max-width: 400px; width: 92%; box-shadow: 0 12px 30px rgba(0,0,0,0.18);">
          <button type="button" class="btn-close position-absolute" style="top: 1.25rem; right: 1.25rem;" onclick="closeNotificationModal()"></button>
          <div id="notificationModalIcon" class="mb-3 mt-3" style="font-size: 3.5rem;">🎉</div>
          <h3 class="fw-bold mb-2 text-success" id="notificationModalTitle" style="font-size: 1.25rem;">Success</h3>
          <p class="text-muted small mb-0" id="notificationModalMessage"></p>
        </div>
      </div>
    `;
    document.body.insertAdjacentHTML('beforeend', modalHtml);
    modalEl = document.getElementById('notificationModal');
  }

  const modalIcon = document.getElementById('notificationModalIcon');
  const modalTitle = document.getElementById('notificationModalTitle');
  const modalMsg = document.getElementById('notificationModalMessage');

  if (modalTitle) modalTitle.textContent = title;
  if (modalMsg) modalMsg.textContent = message;

  if (type === 'error') {
    if (modalIcon) {
      modalIcon.textContent = '⚠️';
      modalIcon.style.display = 'block';
    }
    if (modalTitle) {
      modalTitle.classList.remove('text-success');
      modalTitle.classList.add('text-danger');
    }
  } else {
    if (modalIcon) {
      modalIcon.textContent = '🎉';
      modalIcon.style.display = 'block';
    }
    if (modalTitle) {
      modalTitle.classList.remove('text-danger');
      modalTitle.classList.add('text-success');
    }
  }

  if (modalEl) {
    modalEl.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
  }
}

function closeNotificationModal() {
  const modalEl = document.getElementById('notificationModal');
  if (modalEl) {
    modalEl.classList.add('hidden');
    document.body.style.overflow = '';
  }
  if (typeof notificationCallback === 'function') {
    const cb = notificationCallback;
    notificationCallback = null;
    cb();
  }
}

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape') {
    closeNotificationModal();
  }
});