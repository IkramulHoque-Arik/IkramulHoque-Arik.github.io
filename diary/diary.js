// Global variables
let allStories = [];
let currentPage = 1;
const STORIES_PER_PAGE = 9;

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

async function initializeApp() {
    setupEventListeners();
    await loadAllStories();
    renderStories();
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
    loadMoreBtn.addEventListener('click', loadMoreStories);

    // Modal close button
    const closeModal = document.querySelector('.close-modal');
    const storyModal = document.getElementById('story-modal');
    
    closeModal.addEventListener('click', () => {
        storyModal.classList.remove('active');
        document.body.style.overflow = 'auto';
    });

    // Close modal when clicking outside
    storyModal.addEventListener('click', (e) => {
        if (e.target === storyModal) {
            storyModal.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });

    // Close modal with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && storyModal.classList.contains('active')) {
            storyModal.classList.remove('active');
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

// Load all stories from JSON
async function loadAllStories() {
    try {
        const response = await fetch('stories.json');
        if (response.ok) {
            allStories = await response.json();
            // Sort by timestamp (newest first)
            allStories.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
        } else {
            console.log('No stories.json found');
            allStories = [];
        }
    } catch (error) {
        console.log('Error loading stories.json:', error);
        allStories = [];
    }
}

// Get stories for current page
function getCurrentStories() {
    const startIndex = (currentPage - 1) * STORIES_PER_PAGE;
    const endIndex = startIndex + STORIES_PER_PAGE;
    return allStories.slice(0, endIndex);
}

// Render stories
function renderStories() {
    const storiesGrid = document.getElementById('stories-grid');
    const currentStories = getCurrentStories();
    
    // Clear only if it's the first page
    if (currentPage === 1) {
        storiesGrid.innerHTML = '';
    }
    
    currentStories.forEach((story, index) => {
        // Only add new stories (not duplicates)
        if (index >= (currentPage - 1) * STORIES_PER_PAGE) {
            const storyElement = createStoryElement(story);
            storiesGrid.appendChild(storyElement);
        }
    });
    
    updateLoadMoreButton();
}

// Create story element
function createStoryElement(story) {
    const storyDiv = document.createElement('div');
    storyDiv.className = 'story-card fade-in';
    
    const previewText = getPreviewText(story.content, 3);
    
    storyDiv.innerHTML = `
        <div class="story-header">
            <h3 class="story-title">${story.title}</h3>
            <div class="story-meta">
                <span class="story-date">${formatDate(story.timestamp)}</span>
                <span class="story-read-time">${story.readTime || '3 min read'}</span>
            </div>
        </div>
        <div class="story-content">
            <p class="story-preview">${previewText}</p>
        </div>
        <div class="story-footer">
            <button class="read-full-btn" data-id="${story.id}">Read Full Story</button>
        </div>
    `;
    
    // Add click event to the card and button
    const readBtn = storyDiv.querySelector('.read-full-btn');
    readBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        openStoryModal(story);
    });
    
    storyDiv.addEventListener('click', () => {
        openStoryModal(story);
    });
    
    return storyDiv;
}

// Get preview text (first 3 lines)
function getPreviewText(content, lines = 3) {
    if (!content) return '';
    
    // Split by paragraphs first
    const paragraphs = content.split('\n\n');
    let preview = '';
    let lineCount = 0;
    
    for (const paragraph of paragraphs) {
        const sentences = paragraph.split('. ');
        for (const sentence of sentences) {
            if (lineCount < lines) {
                preview += sentence + '. ';
                lineCount++;
            }
            if (lineCount >= lines) break;
        }
        if (lineCount >= lines) break;
        preview += '\n\n';
    }
    
    return preview.trim();
}

// Format date
function formatDate(timestamp) {
    if (!timestamp) return '';
    
    const date = new Date(timestamp);
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}

// Format time for modal
function formatTime(timestamp) {
    if (!timestamp) return '';
    
    const date = new Date(timestamp);
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
}

// Open story modal
function openStoryModal(story) {
    const modal = document.getElementById('story-modal');
    const modalTitle = document.getElementById('modal-title');
    const modalDate = document.getElementById('modal-date');
    const modalReadTime = document.getElementById('modal-read-time');
    const modalContent = document.getElementById('modal-content');
    
    modalTitle.textContent = story.title;
    modalDate.textContent = formatTime(story.timestamp);
    modalReadTime.textContent = story.readTime || '3 min read';
    modalContent.innerHTML = formatStoryContent(story.content);
    
    modal.classList.add('active');
    document.body.style.overflow = 'hidden'; // Prevent background scrolling
}

// Format story content for modal
function formatStoryContent(content) {
    if (!content) return '<p>No content available.</p>';
    
    // Convert line breaks to paragraphs
    const paragraphs = content.split('\n\n');
    let formattedContent = '';
    
    paragraphs.forEach(paragraph => {
        if (paragraph.trim()) {
            // Check if paragraph is a heading (starts with #)
            if (paragraph.startsWith('# ')) {
                formattedContent += `<h1>${paragraph.substring(2)}</h1>`;
            } else if (paragraph.startsWith('## ')) {
                formattedContent += `<h2>${paragraph.substring(3)}</h2>`;
            } else if (paragraph.startsWith('### ')) {
                formattedContent += `<h3>${paragraph.substring(4)}</h3>`;
            } else {
                formattedContent += `<p>${paragraph}</p>`;
            }
        }
    });
    
    return formattedContent;
}

// Load more stories
function loadMoreStories() {
    currentPage++;
    renderStories();
}

// Update load more button
function updateLoadMoreButton() {
    const loadMoreBtn = document.getElementById('load-more');
    const currentStories = getCurrentStories();
    
    if (currentStories.length >= allStories.length) {
        loadMoreBtn.disabled = true;
        loadMoreBtn.textContent = 'No More Stories';
    } else {
        loadMoreBtn.disabled = false;
        loadMoreBtn.textContent = 'Load More Stories';
    }
}