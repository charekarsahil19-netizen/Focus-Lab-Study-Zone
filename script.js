// ========== CUSTOM CURSOR ==========
const cursor = document.querySelector('.custom-cursor');
if (cursor) {
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX - 10 + 'px';
        cursor.style.top = e.clientY - 10 + 'px';
    });
}

// ========== MOBILE MENU ==========
const menuIcon = document.getElementById('menuIcon');
const navLinks = document.getElementById('navLinks');

if (menuIcon) {
    menuIcon.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });
}

// ========== SUBSCRIBE BUTTON ==========
const subscribeBtn = document.getElementById('subscribeBtn');
const youtubeChannelLink = document.getElementById('youtubeChannelLink');

// REPLACE WITH YOUR YOUTUBE CHANNEL URL
const YOUTUBE_URL = 'https://www.youtube.com/@FocusLabStudyZone';

function openYouTube() {
    window.open(YOUTUBE_URL, '_blank');
}

if (subscribeBtn) {
    subscribeBtn.addEventListener('click', openYouTube);
}
if (youtubeChannelLink) {
    youtubeChannelLink.href = YOUTUBE_URL;
    youtubeChannelLink.addEventListener('click', (e) => {
        e.preventDefault();
        openYouTube();
    });
}

// ========== DOWNLOAD COUNTER ==========
let totalDownloads = localStorage.getItem('totalDownloads') ? parseInt(localStorage.getItem('totalDownloads')) : 0;
const downloadCounter = document.getElementById('totalDownloads');

function updateDownloadCounter() {
    if (downloadCounter) {
        downloadCounter.textContent = totalDownloads;
    }
}

function incrementDownload() {
    totalDownloads++;
    localStorage.setItem('totalDownloads', totalDownloads);
    updateDownloadCounter();
    
    if (downloadCounter) {
        downloadCounter.style.transform = 'scale(1.2)';
        setTimeout(() => {
            downloadCounter.style.transform = 'scale(1)';
        }, 300);
    }
}

document.querySelectorAll('.download-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        incrementDownload();
        
        const originalText = btn.innerHTML;
        btn.innerHTML = '✅ Downloaded!';
        setTimeout(() => {
            btn.innerHTML = originalText;
        }, 1500);
        
        alert('📥 Download started! Total downloads: ' + (totalDownloads + 1));
    });
});

updateDownloadCounter();

// ========== SEARCH FUNCTION ==========
const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');
const searchResults = document.getElementById('searchResults');

const studyMaterial = [
    { title: "Class 7 Maths Complete Notes", category: "Class 7", link: "#" },
    { title: "Class 7 Science Guide", category: "Class 7", link: "#" },
    { title: "Class 8 Maths Solutions", category: "Class 8", link: "#" },
    { title: "Class 8 Science Notes", category: "Class 8", link: "#" },
    { title: "Class 9 Maths Chapter 1-15", category: "Class 9", link: "#" },
    { title: "Class 9 Science Full Guide", category: "Class 9", link: "#" },
    { title: "Class 9 Sample Papers", category: "Class 9", link: "#" },
    { title: "Class 10 Maths Board Prep", category: "Class 10", link: "#" },
    { title: "Class 10 Science Notes", category: "Class 10", link: "#" },
    { title: "Class 10 Previous Papers", category: "Class 10", link: "#" },
    { title: "Diploma Lab Manual Answers", category: "Diploma", link: "#" },
    { title: "Diploma Question Papers", category: "Diploma", link: "#" },
    { title: "Practice Worksheets All Classes", category: "Worksheets", link: "#" },
];

function searchNotes() {
    const query = searchInput.value.toLowerCase().trim();
    
    if (!query) {
        searchResults.classList.remove('active');
        return;
    }
    
    const results = studyMaterial.filter(item => 
        item.title.toLowerCase().includes(query) || 
        item.category.toLowerCase().includes(query)
    );
    
    if (results.length > 0) {
        searchResults.innerHTML = results.map(result => `
            <div class="result-item">
                <strong>📄 ${result.title}</strong>
                <p>Category: ${result.category}</p>
                <a href="${result.link}" style="color: var(--neon-cyan);">View →</a>
            </div>
        `).join('');
        searchResults.classList.add('active');
    } else {
        searchResults.innerHTML = '<div class="result-item">❌ No results found. Try "Maths", "Science", or "Class 9"</div>';
        searchResults.classList.add('active');
    }
}

if (searchBtn) {
    searchBtn.addEventListener('click', searchNotes);
    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') searchNotes();
    });
}

// ========== THEME TOGGLE ==========
const themeToggle = document.getElementById('themeToggle');

function toggleTheme() {
    const root = document.documentElement;
    const currentTheme = root.getAttribute('data-theme');
    
    if (currentTheme === 'light') {
        root.setAttribute('data-theme', 'dark');
        root.style.setProperty('--bg-dark', '#0a0a0f');
        root.style.setProperty('--glass-bg', 'rgba(255,255,255,0.05)');
        localStorage.setItem('theme', 'dark');
    } else {
        root.setAttribute('data-theme', 'light');
        root.style.setProperty('--bg-dark', '#f5f7fa');
        root.style.setProperty('--glass-bg', 'rgba(0,0,0,0.05)');
        localStorage.setItem('theme', 'light');
    }
}

if (themeToggle) {
    themeToggle.addEventListener('click', toggleTheme);
}

// ========== NEWSLETTER ==========
const newsletterForm = document.getElementById('newsletterForm');
if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = document.getElementById('newsletterEmail').value;
        alert(`✅ Thanks for subscribing! Materials will be sent to ${email}`);
        newsletterForm.reset();
    });
}

// ========== RIPPLE EFFECT ON BUTTONS ==========
document.querySelectorAll('.btn-neon, .btn-outline-neon').forEach(btn => {
    btn.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        ripple.classList.add('btn-ripple');
        const rect = this.getBoundingClientRect();
        ripple.style.left = e.clientX - rect.left + 'px';
        ripple.style.top = e.clientY - rect.top + 'px';
        this.appendChild(ripple);
        setTimeout(() => ripple.remove(), 600);
    });
});

// ========== SMOOTH SCROLL ==========
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
            }
        }
    });
});

console.log('🚀 Focus Lab Study Zone - Website Loaded!');