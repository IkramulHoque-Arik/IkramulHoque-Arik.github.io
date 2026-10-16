// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    setupEventListeners();
    initializeAnimations();
}

// Setup event listeners
function setupEventListeners() {
    // Theme toggle
    const themeToggle = document.getElementById('theme-toggle');
    themeToggle.addEventListener('click', toggleTheme);

    // Menu toggle
    const menuToggle = document.getElementById('menu-toggle');
    const dropdownMenu = document.getElementById('dropdown-menu');
    menuToggle.addEventListener('click', () => {
        dropdownMenu.style.display = dropdownMenu.style.display === 'flex' ? 'none' : 'flex';
    });

    // Navbar hide on scroll
    let lastScroll = 0;
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        if (currentScroll > lastScroll && currentScroll > 100) {
            navbar.classList.add('hide');
        } else {
            navbar.classList.remove('hide');
        }
        lastScroll = currentScroll;
    });

    // Close dropdown when clicking outside
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.fixed-buttons') && !e.target.closest('.dropdown-menu')) {
            document.getElementById('dropdown-menu').style.display = 'none';
        }
    });

    // Add hover effects to project cards
    setupCardInteractions();
}

// Theme functionality
function toggleTheme() {
    document.body.classList.toggle('dark');
    const icon = document.getElementById('theme-toggle');
    icon.textContent = document.body.classList.contains('dark') ? '💡' : '💡';
}

// Initialize animations
function initializeAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
            }
        });
    }, observerOptions);

    // Observe all project and research cards
    const cards = document.querySelectorAll('.project-card, .research-card');
    cards.forEach(card => {
        observer.observe(card);
    });
}

// Setup card interactions
function setupCardInteractions() {
    const cards = document.querySelectorAll('.project-card, .research-card');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-10px)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0)';
        });
    });
}

// Smooth scrolling for anchor links
function smoothScrollTo(target) {
    const element = document.querySelector(target);
    if (element) {
        element.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Add loading animation for images
function preloadImages() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));
}