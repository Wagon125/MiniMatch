// Initialize Lucide icons
lucide.createIcons();

const form = document.getElementById('matchForm');
const status = document.querySelector('.match-status');
const checkboxes = document.querySelectorAll('.interests input[type="checkbox"]');

// Create warning message dynamically
const warning = document.createElement('p');
warning.classList.add('interest-warning');
warning.textContent = "Please select at least 3 interests 💫";
form.querySelector('.interests').after(warning);

// Create spinner element (hidden by default)
const spinner = document.createElement('div');
spinner.classList.add('loading-spinner');
spinner.style.display = 'none';
if (status) status.after(spinner);

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const selected = [...checkboxes].filter(cb => cb.checked).length;

  // Check minimum interests
  if (selected < 3) {
    warning.style.display = 'block';
    warning.style.opacity = '1';
    if (status) status.textContent = "";

    // Smooth fade-out after 3 seconds
    setTimeout(() => {
      warning.style.transition = 'opacity 0.8s ease';
      warning.style.opacity = '0';
      setTimeout(() => (warning.style.display = 'none'), 800);
    }, 3000);

    return;
  }

  // Hide warning and start “loading”
  warning.style.display = 'none';
  if (status) {
    status.textContent = "✨ Creating your MiniMatch profile...";
    status.classList.add('fade-in');
  }
  spinner.style.display = 'inline-block'; // show spinner

  // Get basic info
  const name = form.querySelector('input[type="text"]').value.trim();
  const email = form.querySelector('input[type="email"]').value.trim();
  const password = form.querySelector('input[type="password"]').value.trim();

  if (!name || !email || !password) {
    alert('Please fill in all required fields.');
    spinner.style.display = 'none';
    return;
  }

  // Create user object
  const user = {
    name,
    email: email.toLowerCase(),
    password,
    interests: [...checkboxes].filter(cb => cb.checked).map(cb => cb.value),
  };

  // Retrieve existing users or create new array
  const users = JSON.parse(localStorage.getItem('users')) || [];

  // Prevent duplicate registrations
  if (users.some(u => u.email === user.email)) {
    alert('This email is already registered. Try logging in.');
    spinner.style.display = 'none';
    return;
  }

  // Add new user and save to localStorage
  users.push(user);
  localStorage.setItem('users', JSON.stringify(users));

  // Optionally save the current user session
  localStorage.setItem('currentUser', JSON.stringify(user));

  // Simulate short delay before redirect
  setTimeout(() => {
    if (status) status.textContent = "💞 Registration successful! Redirecting...";
    spinner.style.display = 'none'; // hide spinner before redirect
    setTimeout(() => {
      window.location.href = 'dashboard.html';
    }, 1200);
  }, 2000);
});
