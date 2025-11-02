const form = document.getElementById('registerForm');

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const username = document.getElementById('username').value.trim();
  const selected = [...document.querySelectorAll('input[type="checkbox"]:checked')].map(i => i.value);

  if (!username) {
    alert('Please enter your name!');
    return;
  }

  if (selected.length === 0) {
    alert('Please select at least one interest.');
    return;
  }

  if (selected.length > 5) {
    alert('You can only pick up to 5 interests!');
    return;
  }

  const user = { username, interests: selected };

  const users = JSON.parse(localStorage.getItem('users')) || [];
  const existingUser = users.find(u => u.username.toLowerCase() === username.toLowerCase());

  if (existingUser) {
    alert('Username already exists. Please log in instead.');
    window.location.href = 'login.html';
    return;
  }

  users.push(user);
  localStorage.setItem('users', JSON.stringify(users));
  localStorage.setItem('currentUser', JSON.stringify(user));

  alert('Profile created successfully! 💞');
  window.location.href = 'dashboard.html';
});
