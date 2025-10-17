// Global variables
let allPosts = [];
let currentPage = 1;
const POSTS_PER_PAGE = 20;

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

async function initializeApp() {
    setupEventListeners();
    await loadAllPosts();
    renderPosts();
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

    // Load more button
    const loadMoreBtn = document.getElementById('load-more');
    loadMoreBtn.addEventListener('click', loadMorePosts);

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

// Load all posts from JSON
async function loadAllPosts() {
    try {
        const response = await fetch('posts.json');
        if (response.ok) {
            allPosts = await response.json();
            // Sort by timestamp (newest first)
            allPosts.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
        } else {
            console.log('No posts.json found');
            allPosts = [];
        }
    } catch (error) {
        console.log('Error loading posts.json:', error);
        allPosts = [];
    }
}

// Get posts for current page
function getCurrentPosts() {
    const startIndex = (currentPage - 1) * POSTS_PER_PAGE;
    const endIndex = startIndex + POSTS_PER_PAGE;
    return allPosts.slice(0, endIndex);
}

// Render posts
function renderPosts() {
    const postsFeed = document.getElementById('posts-feed');
    const currentPosts = getCurrentPosts();
    
    postsFeed.innerHTML = '';
    
    currentPosts.forEach(post => {
        const postElement = createPostElement(post);
        postsFeed.appendChild(postElement);
    });
    
    updateLoadMoreButton();
}

// Create post element
function createPostElement(post) {
    const postDiv = document.createElement('div');
    postDiv.className = 'post fade-in';
    
    const mediaHTML = createMediaHTML(post);
    
    postDiv.innerHTML = `
        <div class="post-header">
            <img src="${post.avatar || '../resources/photos/general/profile.jpg'}" alt="Avatar" class="post-avatar">
            <div class="post-user">
                <div class="post-name">${post.name || 'Md Ikramul Hoque Arik'}</div>
                <div class="post-username">${post.username || '@arik_dev'}</div>
            </div>
            <div class="post-time">${formatTime(post.timestamp)}</div>
        </div>
        <div class="post-content">${post.content || ''}</div>
        ${mediaHTML}
    `;
    
    return postDiv;
}

// Create media HTML based on number of images/videos
function createMediaHTML(post) {
    if (!post.images && !post.videos) return '';
    
    const images = post.images || [];
    const videos = post.videos || [];
    const allMedia = [...images, ...videos];
    
    if (allMedia.length === 0) return '';
    
    let mediaHTML = '<div class="post-media">';
    
    if (allMedia.length === 1) {
        // Single media
        const media = allMedia[0];
        if (media.includes('.mp4') || media.includes('.webm') || media.includes('.ogg')) {
            mediaHTML += `<video controls><source src="${media}" type="video/mp4">Your browser does not support the video tag.</video>`;
        } else {
            mediaHTML += `<img src="${media}" alt="Post image" loading="lazy">`;
        }
    } else {
        // Multiple media - create grid
        const gridClass = getGridClass(allMedia.length);
        mediaHTML += `<div class="media-grid ${gridClass}">`;
        
        allMedia.forEach(media => {
            if (media.includes('.mp4') || media.includes('.webm') || media.includes('.ogg')) {
                mediaHTML += `<video controls><source src="${media}" type="video/mp4">Your browser does not support the video tag.</video>`;
            } else {
                mediaHTML += `<img src="${media}" alt="Post image" loading="lazy">`;
            }
        });
        
        mediaHTML += '</div>';
    }
    
    mediaHTML += '</div>';
    return mediaHTML;
}

// Get grid class based on number of media items
function getGridClass(count) {
    if (count === 2) return 'media-grid-2';
    if (count === 3) return 'media-grid-3';
    if (count >= 4) return 'media-grid-4';
    return '';
}

// Format timestamp
function formatTime(timestamp) {
    if (!timestamp) return '';
    
    const now = new Date();
    const postTime = new Date(timestamp);
    const diff = now - postTime;
    
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);
    
    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    if (days < 7) return `${days}d ago`;
    
    return postTime.toLocaleDateString();
}

// Load more posts
function loadMorePosts() {
    currentPage++;
    renderPosts();
}

// Update load more button
function updateLoadMoreButton() {
    const loadMoreBtn = document.getElementById('load-more');
    const currentPosts = getCurrentPosts();
    
    if (currentPosts.length >= allPosts.length) {
        loadMoreBtn.disabled = true;
        loadMoreBtn.textContent = 'No More Posts';
    } else {
        loadMoreBtn.disabled = false;
        loadMoreBtn.textContent = 'Load More Posts';
    }
}