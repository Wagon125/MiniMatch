const form = document.getElementById('registerForm');

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const username = document.getElementById('username').value.trim();
  const email = document.getElementById('email').value.trim().toLowerCase();
  const password = document.getElementById('password').value.trim();
  const gender = document.getElementById('gender').value;
  const selected = [...document.querySelectorAll('input[type="checkbox"]:checked')].map(i => i.value);

  // Validation
  if (!username || !email || !password || !gender) {
    alert('Please fill in all required fields, including gender.');
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

  const users = JSON.parse(localStorage.getItem('users')) || [];
  const existingUser = users.find(u => u.email === email);

  if (existingUser) {
    alert('This email is already registered. Please log in instead.');
    window.location.href = 'login.html';
    return;
  }

  // Create user object including gender
  const user = { username, email, password, gender, interests: selected };
  users.push(user);

  // Save data
  localStorage.setItem('users', JSON.stringify(users));
  localStorage.setItem('currentUser', JSON.stringify(user));

  alert('Account created successfully! 💞');
  window.location.href = 'dashboard.html';
});
