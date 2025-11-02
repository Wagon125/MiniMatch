// Initialize lucide icons
lucide.createIcons();

// Active nav highlight
const navItems = document.querySelectorAll('.nav-item');
navItems.forEach(item => {
  item.addEventListener('click', () => {
    navItems.forEach(i => i.classList.remove('active'));
    item.classList.add('active');
  });
});

// Initialize lucide icons
lucide.createIcons();

// Active nav highlight
const navItemsAgain = document.querySelectorAll('.nav-item');
navItemsAgain.forEach(item => {
  item.addEventListener('click', () => {
    navItemsAgain.forEach(i => i.classList.remove('active'));
    item.classList.add('active');
  });
});

// ===== Personalized Welcome =====
const storedUser = localStorage.getItem('miniMatchUser');

if (storedUser) {
  const user = JSON.parse(storedUser);
  const username = user.name || 'User';
  const userImage = user.profilePic || 'https://i.pravatar.cc/150?img=47'; // ✅ Added fallback

  // Replace static name in the header and sidebar
  const welcomeText = document.querySelector('.header h2');
  const userNameSpans = document.querySelectorAll('.user-info span');
  const profileImgs = document.querySelectorAll('.user-info img'); // ✅ Added to target dashboard images

  if (welcomeText) {
    welcomeText.innerHTML = `Welcome back, ${username} 💫`;
  }

  userNameSpans.forEach(span => {
    span.textContent = username;
  });

  // ✅ Update user image everywhere
  profileImgs.forEach(img => {
    img.src = userImage;
  });

} else {
  // If no user info is stored, redirect to login or registration
  window.location.href = 'login.html';
}

// ===== Logout Functionality =====
const logoutItem = document.querySelector('.nav-item i[data-lucide="log-out"]')?.closest('.nav-item');

if (logoutItem) {
  logoutItem.addEventListener('click', () => {
    localStorage.removeItem('miniMatchUser');
    alert('You have been logged out 💔');
    window.location.href = 'login.html';
  });
}
