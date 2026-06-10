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

  document.getElementById("username").value =
    fullName.replace(/\s+/g, "").toLowerCase();

  const initials =
    ((names[0]?.[0] || "") +
      (names[1]?.[0] || "")).toUpperCase();

  document.getElementById("avatarInitials").textContent =
    initials;
    // Trips Planned
const { count: tripCount } = await window.supabaseClient
  .from("user_trips")
  .select("*", { count: "exact", head: true })
  .eq("user_id", user.id);

document.getElementById("tripCount").textContent =
  tripCount || 0;


// Favourites
const { count: favCount } = await window.supabaseClient
  .from("user_favorites")
  .select("*", { count: "exact", head: true })
  .eq("user_id", user.id);

document.getElementById("favCount").textContent =
  favCount || 0;


// CO₂ Saved (temporary)
document.getElementById("co2Saved").textContent =
  "0 kg";

  // Load additional profile data
  const { data: profile } =
    await window.supabaseClient
      .from("user_profiles")
      .select("*")
      .eq("user_id", user.id)
      .single();

  if (profile) {
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