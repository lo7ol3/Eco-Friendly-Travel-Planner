async function loadProfile() {
  const {
    data: { user },
    error
  } = await window.supabaseClient.auth.getUser();

  if (error || !user) {
    window.location.href = "login.html";
    return;
  }

  const fullName =
    user.user_metadata.full_name || "EcoTravel User";

  document.getElementById("profileName").textContent =
    fullName;

  document.getElementById("profileEmail").textContent =
    user.email;

  const names = fullName.split(" ");

  document.getElementById("firstName").value =
    names[0] || "";

  document.getElementById("lastName").value =
    names.slice(1).join(" ");

  document.getElementById("email").value =
    user.email;

  const initials =
    ((names[0]?.[0] || "") +
      (names[1]?.[0] || "")).toUpperCase();

  document.getElementById("avatarInitials").textContent =
    initials;
}

loadProfile();