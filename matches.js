lucide.createIcons();

// Personalized header
const storedUser = JSON.parse(localStorage.getItem('miniMatchUser'));
const allUsers = JSON.parse(localStorage.getItem('miniMatchUsers')) || [];
const matchesContainer = document.getElementById('matchesContainer');
const userNameDisplay = document.getElementById('userNameDisplay');
const profilePicHeader = document.getElementById('profilePicHeader');

if (!storedUser) {
  window.location.href = "login.html";
}

userNameDisplay.textContent = storedUser.name;
if (storedUser.profilePic) profilePicHeader.src = storedUser.profilePic;

// ===== Matching logic =====
function findMatches() {
  return allUsers.filter(u =>
    u.email !== storedUser.email &&
    u.gender !== storedUser.gender &&
    u.interests?.some(i => storedUser.interests?.includes(i))
  );
}

const matches = findMatches();
matchesContainer.innerHTML = '';

if (matches.length > 0) {
  matches.forEach(match => {
    const card = document.createElement('div');
    card.classList.add('match-card');
    card.innerHTML = `
      <img src="${match.profilePic || 'https://via.placeholder.com/150'}" alt="${match.name}">
      <h3>${match.name}</h3>
      <p>${match.interests?.slice(0,3).join(', ') || 'No interests listed'}</p>

      <div class="match-actions">
        <button class="like-btn"><i data-lucide="heart"></i> Like</button>
        <button class="msg-btn"><i data-lucide="message-circle"></i> Message</button>
      </div>
    `;
    matchesContainer.appendChild(card);
  });

  lucide.createIcons();

  // === Add Like + Message functionality ===
  document.querySelectorAll('.like-btn').forEach(btn => {
    btn.addEventListener('click', e => {
      const name = e.target.closest('.match-card').querySelector('h3').textContent;
      let liked = JSON.parse(localStorage.getItem('likedUsers')) || [];

      if (!liked.includes(name)) {
        liked.push(name);
        localStorage.setItem('likedUsers', JSON.stringify(liked));
        btn.innerHTML = '<i data-lucide="heart"></i> Liked 💕';
        btn.disabled = true;
        lucide.createIcons();
      }
    });
  });

  document.querySelectorAll('.msg-btn').forEach(btn => {
    btn.addEventListener('click', e => {
      const name = e.target.closest('.match-card').querySelector('h3').textContent;
      alert(`💬 Starting chat with ${name}... (feature coming soon!)`);
    });
  });

} else {
  matchesContainer.innerHTML = `<p class="no-matches">No compatible match found yet 💔</p>`;
}

// ===== Logout Functionality =====
const logoutItem = document.querySelector('.logout');
logoutItem.addEventListener('click', () => {
  localStorage.removeItem('miniMatchUser');
  alert('Logged out 💔');
  window.location.href = 'login.html';
});
