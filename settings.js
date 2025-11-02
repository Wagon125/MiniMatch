lucide.createIcons();

const storedUser = localStorage.getItem('miniMatchUser');
const user = storedUser ? JSON.parse(storedUser) : {};

const nameInput = document.getElementById('nameInput');
const emailInput = document.getElementById('emailInput');
const passwordInput = document.getElementById('passwordInput');
const userNameDisplay = document.getElementById('userNameDisplay');
const statusText = document.querySelector('.update-status');
const profileImage = document.getElementById('profileImage');
const uploadPic = document.getElementById('uploadPic');

// Fill existing info if available
if (user.name) nameInput.value = user.name;
if (user.email) emailInput.value = user.email;
if (user.name) userNameDisplay.textContent = user.name;
if (user.profilePic) profileImage.src = user.profilePic; // ✅ Show saved image on load

// Profile picture upload
uploadPic.addEventListener('change', e => {
  const file = e.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = () => {
      profileImage.src = reader.result;
      user.profilePic = reader.result;
      localStorage.setItem('miniMatchUser', JSON.stringify(user));
    };
    reader.readAsDataURL(file);
  }
});

// Collapsible interests
const collapsible = document.querySelector('.collapsible');
const collapsibleHeader = collapsible.querySelector('.collapsible-header');
collapsibleHeader.addEventListener('click', () => {
  collapsible.classList.toggle('active');
  const icon = collapsibleHeader.querySelector('i');
  icon.setAttribute('data-lucide', collapsible.classList.contains('active') ? 'chevron-up' : 'chevron-down');
  lucide.createIcons();
});

// Save form data
const form = document.getElementById('settingsForm');
form.addEventListener('submit', e => {
  e.preventDefault();

  user.name = nameInput.value.trim() || user.name;
  user.email = emailInput.value.trim() || user.email;
  user.password = passwordInput.value.trim() || user.password;

  // ✅ Keep profile picture persistent
  if (!user.profilePic && profileImage.src) {
    user.profilePic = profileImage.src;
  }

  // Update localStorage
  localStorage.setItem('miniMatchUser', JSON.stringify(user));

  statusText.textContent = "Profile updated 💫";
  setTimeout(() => statusText.textContent = "", 3000);
});
