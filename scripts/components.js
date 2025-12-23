// Load navbar and footer components
async function loadComponents() {
    try {
        // Load navbar
        const navbarResponse = await fetch('/components/navbar.html');
        const navbarHTML = await navbarResponse.text();
        document.getElementById('navbar-placeholder').innerHTML = navbarHTML;
        
        // Load footer
        const footerResponse = await fetch('/components/footer.html');
        const footerHTML = await footerResponse.text();
        document.getElementById('footer-placeholder').innerHTML = footerHTML;
        
        // Initialize navbar functionality AFTER navbar is loaded
        initializeNavbar();
        
    } catch (error) {
        console.error('Error loading components:', error);
    }
}

// Initialize navbar functionality
function initializeNavbar() {
    const hamburger = document.querySelector(".hamburger");
    const navLinksContainer = document.querySelector(".nav-links-container");
    const overlay = document.querySelector(".nav-overlay");
    
    if (!hamburger || !navLinksContainer || !overlay) {
        console.error('Navbar elements not found');
        return;
    }
    
    // Toggle ARIA state on hamburger
    hamburger.setAttribute("aria-expanded", "false");
    
    function toggleMenu() {
        const isOpen = !navLinksContainer.classList.contains("open");
        hamburger.classList.toggle("open");
        navLinksContainer.classList.toggle("open");
        overlay.classList.toggle("active");
        hamburger.setAttribute("aria-expanded", String(isOpen));
    }
    
    hamburger.addEventListener("click", toggleMenu);
    overlay.addEventListener("click", toggleMenu);
    
    // Close menu when a link is clicked (mobile)
    document.querySelectorAll('.nav-links a').forEach((link) => {
        link.addEventListener('click', () => {
            if (navLinksContainer.classList.contains('open')) toggleMenu();
        });
    });
}

// Load components when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', loadComponents);
} else {
    loadComponents();
}
