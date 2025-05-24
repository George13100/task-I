// Generate random stars
    const starsContainer = document.querySelector('.stars');
    for (let i = 0; i < 40; i++) {
      const star = document.createElement('div');
      star.className = 'star';
      star.style.top = Math.random() * 100 + 'vh';
      star.style.left = Math.random() * 100 + 'vw';
      star.style.animationDuration = (2 + Math.random() * 2) + 's';
      star.style.opacity = 0.5 + Math.random() * 0.5;
      star.style.width = star.style.height = (1 + Math.random() * 2) + 'px';
      starsContainer.appendChild(star);

    }

    const SUPABASE_URL = "https://umgwaqoazwbczepffhxg.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVtZ3dhcW9hendiY3plcGZmaHhnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDgwMjU0ODYsImV4cCI6MjA2MzYwMTQ4Nn0.Gjt0GrOhd0e2NXiVSRg82xoyp4ijJpuHAxVNhqlHL-0";

const client = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

document.getElementById("signup-form")?.addEventListener("submit", async (e) => {
  e.preventDefault();

  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const avatarFile = document.getElementById("avatar").files[0];

  const { data: signUpData, error: signUpError } = await client.auth.signUp({
    email,
    password
  });

  if (signUpError) {
    alert("Signup failed: " + signUpError.message);
    return;
  }

  const userId = signUpData.user.id;
  const fileExt = avatarFile.name.split('.').pop();
  const fileName = `${userId}.${fileExt}`;
  const filePath = `avatars/${fileName}`;

  const { error: uploadError } = await client.storage
    .from("avatars")
    .upload(filePath, avatarFile, {
      cacheControl: "3600",
      upsert: true
    });

  if (uploadError) {
    alert("Image upload failed: " + uploadError.message);
    return;
  }

  const { data: avatarUrlData } = client.storage.from("avatars").getPublicUrl(filePath);
  const avatar_url = avatarUrlData.publicUrl;

  const { error: dbError } = await client.from("profiles").insert({
    name,
    email,
    avatar_url,
    user_id: userId
  });

  if (dbError) {
    alert("Error saving profile: " + dbError.message);
    return;
  }

  alert("✅ Signup complete! Your data was saved.");
  window.location.href = "log.html";
});