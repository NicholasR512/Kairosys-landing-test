// Blog functionality script
let currentCategory = 'all';

document.addEventListener('DOMContentLoaded', function() {
    // Initialize blog
    renderBlogPosts();
    initializeThemeToggle();
    initializeCategoryFilter();
});

function renderBlogPosts(category = 'all') {
    const featuredPostContainer = document.getElementById('featuredPost');
    const blogGrid = document.getElementById('blogGrid');
    
    if (blogPosts.length === 0) return;
    
    // Sort posts by date (newest first)
    let sortedPosts = [...blogPosts].sort((a, b) => new Date(b.date) - new Date(a.date));
    
    // Filter by category if not "all"
    if (category !== 'all') {
        sortedPosts = sortedPosts.filter(post => post.category === category);
    }
    
    // Find featured post (either marked as featured, or use most recent)
    const featuredPost = sortedPosts.find(post => post.featured === true) || sortedPosts[0];
    
    // Render featured post if exists
    if (featuredPost) {
        featuredPostContainer.innerHTML = `
            <div class="featured-post" onclick="showPost('${featuredPost.id}')">
                <div class="featured-content">
                    <span class="featured-badge">✨ Featured</span>
                    <h2 class="featured-title">${featuredPost.title}</h2>
                    <p class="featured-excerpt">${featuredPost.excerpt}</p>
                    <div class="featured-meta">
                        <span class="card-category">${featuredPost.category}</span>
                        <span>•</span>
                        <span>${featuredPost.date}</span>
                        <span>•</span>
                        <span>${featuredPost.readTime}</span>
                    </div>
                </div>
            </div>
        `;
        featuredPostContainer.style.display = 'block';
    } else {
        featuredPostContainer.style.display = 'none';
    }
    
    // Render remaining posts in grid (exclude the featured post)
    const remainingPosts = sortedPosts.filter(post => post.id !== (featuredPost ? featuredPost.id : null));
    
    if (remainingPosts.length > 0) {
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
    } else {
        blogGrid.innerHTML = '<p style="text-align: center; color: var(--gray); padding: 3rem;">No posts found in this category.</p>';
    }
}

function showPost(postId) {
    const post = blogPosts.find(p => p.id === postId);
    if (!post) return;
    
    const blogList = document.getElementById('blogList');
    const fullPostContainer = document.getElementById('fullPostContainer');
    
    // Hide blog list
    blogList.classList.add('hidden');
    
    // Find next post
    const sortedPosts = [...blogPosts].sort((a, b) => new Date(b.date) - new Date(a.date));
    const currentIndex = sortedPosts.findIndex(p => p.id === postId);
    const nextPost = currentIndex < sortedPosts.length - 1 ? sortedPosts[currentIndex + 1] : null;
    
    // Create next post navigation HTML
    const nextPostHtml = nextPost ? `
        <div class="next-post-nav">
            <div class="next-post-label">Read Next</div>
            <a href="#" class="next-post-link" onclick="event.preventDefault(); showPost('${nextPost.id}')">
                <div class="next-post-info">
                    <h3 class="next-post-title">${nextPost.title}</h3>
                    <p class="next-post-excerpt">${nextPost.excerpt}</p>
                </div>
                <div class="next-post-arrow">→</div>
            </a>
        </div>
    ` : '';
    
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
            
            ${nextPostHtml}
            
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

// Category filter functionality
function initializeCategoryFilter() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Get category and render posts
            const category = this.getAttribute('data-category');
            currentCategory = category;
            renderBlogPosts(category);
        });
    });
}