// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    setupEventListeners();
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

    // QR Code click handlers
    setupQRCodeHandlers();

    // Modal close button
    const closeModal = document.querySelector('.close-modal');
    const qrModal = document.getElementById('qr-modal');
    
    closeModal.addEventListener('click', () => {
        qrModal.classList.remove('active');
        document.body.style.overflow = 'auto';
    });

    // Close modal when clicking outside
    qrModal.addEventListener('click', (e) => {
        if (e.target === qrModal) {
            qrModal.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });

    // Close modal with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && qrModal.classList.contains('active')) {
            qrModal.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
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

// Setup QR Code click handlers
function setupQRCodeHandlers() {
    const wechatQR = document.querySelector('.social-card.wechat .qr-container');
    const discordQR = document.querySelector('.social-card.discord .qr-container');
    const modal = document.getElementById('qr-modal');
    const modalImage = document.getElementById('modal-qr-image');
    const modalText = document.getElementById('modal-qr-text');

    if (wechatQR) {
        wechatQR.addEventListener('click', () => {
            modalImage.src = '../resources/photos/contact/wechat-qr.jpg';
            modalText.textContent = 'WeChat QR Code - Scan to connect';
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    }

    if (discordQR) {
        discordQR.addEventListener('click', () => {
            modalImage.src = '../resources/photos/contact/discord-qr.jpg';
            modalText.textContent = 'Discord QR Code - Scan to join server';
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    }
}

// Copy email to clipboard (optional enhancement)
function copyEmail() {
    const email = 'arik.ikramul@gmail.com';
    navigator.clipboard.writeText(email).then(() => {
        // Show copied notification
        showNotification('Email copied to clipboard!');
    });
}

function showNotification(message) {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: var(--accent);
        color: white;
        padding: 12px 20px;
        border-radius: 8px;
        font-weight: 700;
        z-index: 3000;
        animation: slideInRight 0.3s ease;
    `;
    notification.textContent = message;
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.remove();
    }, 3000);
}