const form = document.getElementById('loginForm');

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const email = document.getElementById('email').value.trim().toLowerCase();
  const password = document.getElementById('password').value.trim();
  const rememberMe = document.getElementById('rememberMe').checked;

  const users = JSON.parse(localStorage.getItem('users')) || [];
  const validUser = users.find(u => u.email === email && u.password === password);

  if (!validUser) {
    alert('Invalid email or password. Please try again.');
    return;
  }

  // Save session depending on "Remember Me"
  if (rememberMe) {
    localStorage.setItem('currentUser', JSON.stringify(validUser));
  } else {
    sessionStorage.setItem('currentUser', JSON.stringify(validUser));
  }

  alert(`Welcome back, ${validUser.username}! 💞`);
  window.location.href = 'dashboard.html';
});
