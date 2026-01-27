// Blog functionality script
document.addEventListener('DOMContentLoaded', function() {
    // Initialize blog
    renderBlogPosts();
    initializeThemeToggle();
});

function renderBlogPosts() {
    const featuredPostContainer = document.getElementById('featuredPost');
    const blogGrid = document.getElementById('blogGrid');
    
    if (blogPosts.length === 0) return;
    
    // Sort posts by date (newest first)
    const sortedPosts = [...blogPosts].sort((a, b) => new Date(b.date) - new Date(a.date));
    
    // Render featured post (first post)
    const featured = sortedPosts[0];
    featuredPostContainer.innerHTML = `
        <div class="featured-post" onclick="showPost('${featured.id}')">
            <div class="featured-content">
                <span class="featured-badge">✨ Featured</span>
                <h2 class="featured-title">${featured.title}</h2>
                <p class="featured-excerpt">${featured.excerpt}</p>
                <div class="featured-meta">
                    <span class="card-category">${featured.category}</span>
                    <span>•</span>
                    <span>${featured.date}</span>
                    <span>•</span>
                    <span>${featured.readTime}</span>
                </div>
            </div>
        </div>
    `;
    
    // Render remaining posts in grid
    const remainingPosts = sortedPosts.slice(1);
    blogGrid.innerHTML = remainingPosts.map(post => `
        <article class="blog-card" onclick="showPost('${post.id}')">
            <img src="${post.image}" alt="${post.title}" class="card-image">
            <div class="card-content">
                <div class="card-meta">
                    <span class="card-category">${post.category}</span>
                    <span>•</span>
                    <span>${post.readTime}</span>
                </div>
                <h3 class="card-title">${post.title}</h3>
                <p class="card-excerpt">${post.excerpt}</p>
                <a href="#" class="read-more" onclick="event.preventDefault()">Read More</a>
            </div>
        </article>
    `).join('');
}

function showPost(postId) {
    const post = blogPosts.find(p => p.id === postId);
    if (!post) return;
    
    const blogList = document.getElementById('blogList');
    const fullPostContainer = document.getElementById('fullPostContainer');
    
    // Hide blog list
    blogList.classList.add('hidden');
    
    // Create full post view
    fullPostContainer.innerHTML = `
        <div class="full-post active">
            <a href="#" class="back-button" onclick="event.preventDefault(); showBlogList()">Back to Blog</a>
            
            <div class="post-header">
                <h1 class="post-title">${post.title}</h1>
                <div class="post-meta">
                    <span class="card-category">${post.category}</span>
                    <span>•</span>
                    <span>${post.date}</span>
                    <span>•</span>
                    <span>${post.readTime}</span>
                </div>
            </div>
            
            <div class="post-content">
                ${post.content}
            </div>
            
            <a href="#" class="back-button" onclick="event.preventDefault(); showBlogList()" style="margin-top: 3rem;">Back to Blog</a>
        </div>
    `;
    
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    // Update URL without reloading
    history.pushState({ postId }, post.title, `#${postId}`);
}

function showBlogList() {
    const blogList = document.getElementById('blogList');
    const fullPostContainer = document.getElementById('fullPostContainer');
    
    // Show blog list
    blogList.classList.remove('hidden');
    
    // Clear full post
    fullPostContainer.innerHTML = '';
    
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    // Update URL
    history.pushState({}, 'Blog', window.location.pathname);
}

// Handle browser back/forward buttons
window.addEventListener('popstate', function(event) {
    if (event.state && event.state.postId) {
        showPost(event.state.postId);
    } else {
        showBlogList();
    }
});

// Check if URL has a post hash on load
window.addEventListener('load', function() {
    const hash = window.location.hash.substring(1);
    if (hash) {
        const post = blogPosts.find(p => p.id === hash);
        if (post) {
            showPost(hash);
        }
    }
});

// Theme toggle functionality
function initializeThemeToggle() {
    const themeToggle = document.getElementById('themeToggle');
    if (!themeToggle) return;
    
    // Check for saved theme preference
    const currentTheme = localStorage.getItem('theme') || 'light';
    if (currentTheme === 'dark') {
        document.body.classList.add('alt-theme');
        themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    }
    
    themeToggle.addEventListener('click', function() {
        document.body.classList.toggle('alt-theme');
        
        const isDark = document.body.classList.contains('alt-theme');
        themeToggle.innerHTML = isDark ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
    });
}