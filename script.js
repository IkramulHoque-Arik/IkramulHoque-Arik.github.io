// Theme toggle
const themeToggle = document.getElementById('theme-toggle');
themeToggle.addEventListener('click', () => {
  document.body.classList.toggle('dark');
  const icon = themeToggle.querySelector('i');
  icon.classList.toggle('fa-moon');
  icon.classList.toggle('fa-sun');
});

// Menu toggle
const menuToggle = document.getElementById('menu-toggle');
const dropdownMenu = document.getElementById('dropdown-menu');

menuToggle.addEventListener('click', () => {
  if (dropdownMenu.style.display === 'flex') {
    dropdownMenu.style.display = 'none';
  } else {
    dropdownMenu.style.display = 'flex';
    dropdownMenu.classList.remove('animate');
    void dropdownMenu.offsetWidth; // restart animation
    dropdownMenu.classList.add('animate');
  }
});

// Navbar hide on scroll
let lastScroll = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
  let currentScroll = window.pageYOffset;
  if (currentScroll > lastScroll) {
    navbar.classList.add('hide');
  } else {
    navbar.classList.remove('hide');
  }
  lastScroll = currentScroll;
});