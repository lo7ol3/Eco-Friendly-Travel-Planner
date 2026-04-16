document.getElementById("loginForm").addEventListener("submit", function(e) {
  e.preventDefault();

  const email = document.getElementById("loginEmail").value;
  const password = document.getElementById("loginPassword").value;

  let users = JSON.parse(localStorage.getItem("users")) || [];

  const user = users.find(u => u.email === email && u.password === password);

  if (!user) {
    alert("Invalid login!");
    return;
  }

  // create session
  sessionStorage.setItem("loggedInUser", JSON.stringify(user));

  alert("Login successful!");
  window.location.href = "profile.html"; // your existing page
});