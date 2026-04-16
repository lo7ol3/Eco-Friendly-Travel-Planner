// ========== REGISTER ==========
if (document.getElementById("registerForm")) {
  document.getElementById("registerForm").addEventListener("submit", function(e) {
    e.preventDefault();

    let name = document.getElementById("name").value;
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;

    let users = JSON.parse(localStorage.getItem("users")) || [];

    let exists = users.find(u => u.email === email);
    if (exists) {
      alert("User already exists!");
      return;
    }

    users.push({ name, email, password });
    localStorage.setItem("users", JSON.stringify(users));

    alert("Account created!");
    window.location.href = "login.html";
  });
}


// ========== LOGIN ==========
if (document.getElementById("loginForm")) {
  document.getElementById("loginForm").addEventListener("submit", function(e) {
    e.preventDefault();

    let email = document.getElementById("loginEmail").value;
    let password = document.getElementById("loginPassword").value;

    let users = JSON.parse(localStorage.getItem("users")) || [];

    let user = users.find(u => u.email === email && u.password === password);

    if (!user) {
      alert("Invalid login!");
      return;
    }

    sessionStorage.setItem("loggedInUser", JSON.stringify(user));

    alert("Login successful!");
    window.location.href = "index.html"; // or dashboard page in your branch
  });
}


// ========== LOGOUT FUNCTION ==========
function logout() {
  sessionStorage.removeItem("loggedInUser");
  alert("Logged out!");
  window.location.href = "login.html";
}


// ========== SESSION CHECK ==========
function requireLogin() {
  let user = JSON.parse(sessionStorage.getItem("loggedInUser"));

  if (!user) {
    alert("Please login first!");
    window.location.href = "login.html";
  }
}