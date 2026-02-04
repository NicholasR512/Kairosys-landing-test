/* ============================================
   TRUSTED BY LOGOS - Dynamic Carousel Generator
   KairoSys Applied Intelligence
   ============================================ */

// Logo data - Add your companies here as you get new partnerships
const trustedCompanies = [
    {
        name: "Eliomedica",
        logoPath: "Logo/Eliomedica_logo.png",
        website: "https://eliomedica.com/"
    },
    // Add more companies as you get them:
    // {
    //     name: "Company Name",
    //     logoPath: "Logo/company_logo.png",
    //     website: "https://company-website.com/"
    // },
];

// Function to generate logo carousel dynamically
function initTrustedByCarousel() {
    const logoTrack = document.querySelector('.logo-track');
    
    // Exit if no track element found or no companies to display
    if (!logoTrack || trustedCompanies.length === 0) {
        console.warn('Trusted By carousel: No track element or no companies configured');
        return;
    }
    
    // Clear existing content
    logoTrack.innerHTML = '';
    
    const companyCount = trustedCompanies.length;
    
    // Create a single logo element
    function createLogoElement(company) {
        const link = document.createElement('a');
        link.href = company.website;
        link.target = '_blank';
        link.rel = 'noopener noreferrer';
        link.className = 'logo-item';
        link.setAttribute('aria-label', `Visit ${company.name} website`);
        
        const img = document.createElement('img');
        img.src = company.logoPath;
        img.alt = company.name;
        img.loading = 'lazy';
        
        // Error handling for missing images
        img.onerror = function() {
            console.warn(`Failed to load logo: ${company.logoPath}`);
            this.style.display = 'none';
            link.style.display = 'none';
        };
        
        link.appendChild(img);
        return link;
    }
    
    // If fewer than 5 companies, display them centered and static (no animation)
    if (companyCount < 5) {
        console.log(`Only ${companyCount} companies - displaying centered without animation`);
        
        // Add logos once (no duplication)
        trustedCompanies.forEach(company => {
            logoTrack.appendChild(createLogoElement(company));
        });
        
        // Remove animation and center the logos
        logoTrack.style.animation = 'none';
        logoTrack.style.justifyContent = 'center';
        logoTrack.style.width = 'auto';
        
    } else {
        // 5+ companies: Use scrolling animation
        console.log(`${companyCount} companies - using scrolling carousel`);
        
        // Calculate how many duplicates we need for seamless infinite scrolling
        const duplicateCount = Math.max(2, Math.ceil(10 / companyCount));
        
        // Add logos multiple times for infinite scroll effect
        for (let i = 0; i < duplicateCount; i++) {
            trustedCompanies.forEach(company => {
                logoTrack.appendChild(createLogoElement(company));
            });
        }
        
        // Adjust animation speed based on number of logos
        const animationDuration = Math.max(20, companyCount * 3); // 3 seconds per logo, minimum 20s
        logoTrack.style.animationDuration = `${animationDuration}s`;
        
        // Ensure animation is enabled
        logoTrack.style.animation = '';
        logoTrack.style.justifyContent = '';
        logoTrack.style.width = '';
        
        console.log(`Carousel initialized with ${companyCount} companies (${duplicateCount}x duplicated)`);
    }
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initTrustedByCarousel);
} else {
    // DOM already loaded
    initTrustedByCarousel();
}
