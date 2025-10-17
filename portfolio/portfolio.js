// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    setupEventListeners();
    initializeScrollingBanners();
    initializeSkillAnimations();
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
}

// Theme functionality
function toggleTheme() {
    document.body.classList.toggle('dark');
    const icon = document.getElementById('theme-toggle');
    icon.textContent = document.body.classList.contains('dark') ? '💡' : '💡';
}

// Initialize scrolling banners
function initializeScrollingBanners() {
    const banners = document.querySelectorAll('.scrolling-banner');
    
    banners.forEach(banner => {
        const track = banner.querySelector('.banner-track');
        const cards = track.querySelectorAll('.portfolio-card');
        
        // Duplicate cards for seamless scrolling
        cards.forEach(card => {
            const clone = card.cloneNode(true);
            track.appendChild(clone);
        });
        
        // Pause on hover
        banner.addEventListener('mouseenter', () => {
            track.style.animationPlayState = 'paused';
        });
        
        banner.addEventListener('mouseleave', () => {
            track.style.animationPlayState = 'running';
        });
    });
}

// Initialize skill animations
function initializeSkillAnimations() {
    const observerOptions = {
        threshold: 0.3,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateSkillBars(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe skills section
    const skillsSection = document.querySelector('.skills-section');
    if (skillsSection) {
        observer.observe(skillsSection);
    }
}

// Animate skill bars
function animateSkillBars(skillsSection) {
    const skillBars = skillsSection.querySelectorAll('.skill-bar');
    
    skillBars.forEach(bar => {
        const width = bar.style.width;
        bar.style.width = '0%';
        
        setTimeout(() => {
            bar.style.transition = 'width 1.5s ease-in-out';
            bar.style.width = width;
        }, 100);
    });
}

// Add card hover effects
function setupCardInteractions() {
    const cards = document.querySelectorAll('.portfolio-card');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-8px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) scale(1)';
        });
    });
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    setupCardInteractions();
});