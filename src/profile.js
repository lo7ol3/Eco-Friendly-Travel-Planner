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

  document.getElementById("email").value =
    user.email;

document.getElementById("username").value = "";

  const initials =
    ((names[0]?.[0] || "") +
      (names[1]?.[0] || "")).toUpperCase();

  document.getElementById("avatarInitials").textContent =
    initials;
   const savedPlans =
  JSON.parse(localStorage.getItem("ecotravel-saved-plans")) || [];

document.getElementById("tripCount").textContent =
  savedPlans.length;


// ===== CO2 Saved =====
let totalCO2 = 0;

savedPlans.forEach(plan => {
  plan.items?.forEach(item => {
    totalCO2 += Number(item.co2 || 0);
  });
});

document.getElementById("co2Saved").textContent =
  `${totalCO2} kg`;


// ===== Favourites =====
const favourites =
  JSON.parse(localStorage.getItem("ecotravel-favorites")) || [];

document.getElementById("favCount").textContent =
  favourites.length;

  // Load additional profile data
  const { data: profile } =
    await window.supabaseClient
      .from("user_profiles")
      .select("*")
      .eq("user_id", user.id)
      .single();

  if (profile) {
    if (profile.username) {

  document.getElementById("profileName").textContent =
    profile.username;

  document.getElementById("username").value =
    profile.username;
}
    document.getElementById("firstName").readOnly = true;
document.getElementById("lastName").readOnly = true;

    document.getElementById("firstName").value =
      profile.first_name || names[0] || "";

    document.getElementById("lastName").value =
      profile.last_name || names.slice(1).join(" ");

    document.getElementById("phone").value =
      profile.phone || "";

    document.getElementById("country").value =
      profile.country || "Malaysia";

    document.getElementById("budget").value =
      profile.budget || 500;
  } else {
    document.getElementById("firstName").value =
      names[0] || "";

    document.getElementById("lastName").value =
      names.slice(1).join(" ");
  }
}

loadProfile();

async function saveProfile(event) {
  event.preventDefault();

  const {
    data: { user }
  } = await window.supabaseClient.auth.getUser();

  const profileData = {
    user_id: user.id,
    first_name:
      document.getElementById("firstName").value,
    last_name:
      document.getElementById("lastName").value,
    username:
      document.getElementById("username").value,
    phone:
      document.getElementById("phone").value,
    country:
      document.getElementById("country").value,
    budget: parseInt(
      document.getElementById("budget").value
    )
  };

  const { error } =
    await window.supabaseClient
      .from("user_profiles")
      .upsert(profileData, {
        onConflict: "user_id"
      });

  if (error) {
  alert(error.message);
  return;
}

alert("Profile updated successfully!");

// Update username shown on profile card
document.getElementById("profileName").textContent =
  document.getElementById("username").value;

  alert("Profile updated successfully!");
  

}
 const savedImage =
  localStorage.getItem("profileImage");

if (savedImage) {

  const img =
    document.getElementById("profileImage");

  img.src = savedImage;
  img.style.display = "block";

  document.getElementById(
    "avatarInitials"
  ).style.display = "none";
}
async function updatePassword() {
  const newPassword =
    document.getElementById("newPassword").value;

  if (newPassword.length < 6) {
    alert("Password must be at least 6 characters.");
    return;
  }

  const { error } =
    await window.supabaseClient.auth.updateUser({
      password: newPassword
    });

  if (error) {
    alert(error.message);
    return;
  }

  alert("Password updated successfully!");

  document.getElementById("newPassword").value = "";
}
const avatarUpload =
  document.getElementById("avatarUpload");

const profileImage =
  document.getElementById("profileImage");

avatarUpload?.addEventListener(
  "change",
  function () {

    const file = this.files[0];

    if (!file) return;

    const reader = new FileReader();

    reader.onload = function (e) {

      profileImage.src = e.target.result;

profileImage.style.display = "block";

document.getElementById(
  "avatarInitials"
).style.display = "none";

      localStorage.setItem(
        "profileImage",
        e.target.result
      );
    };

    reader.readAsDataURL(file);
  }
);