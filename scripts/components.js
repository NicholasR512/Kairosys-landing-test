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
    } catch (error) {
        console.error('Error loading components:', error);
    }
}

// Load components when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', loadComponents);
} else {
    loadComponents();
}
