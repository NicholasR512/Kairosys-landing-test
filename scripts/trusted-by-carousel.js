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
    const logoCarousel = document.querySelector('.logo-carousel');
    
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
    
    // DECISION POINT: Check company count BEFORE doing anything
    if (companyCount < 5) {
        console.log(`Only ${companyCount} companies - displaying centered without animation`);
        
        // Add logos ONCE (no duplication)
        trustedCompanies.forEach(company => {
            logoTrack.appendChild(createLogoElement(company));
        });
        
        // Disable animation
        logoTrack.style.animation = 'none';
        logoTrack.style.justifyContent = 'center';
        
        // Remove the fade effect on edges since we're not scrolling
        if (logoCarousel) {
            logoCarousel.style.maskImage = 'none';
            logoCarousel.style.webkitMaskImage = 'none';
        }
        
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
        
        // Enable animation
        logoTrack.style.animation = `scroll ${Math.max(20, companyCount * 3)}s linear infinite`;
        logoTrack.style.justifyContent = 'flex-start';
        
        // Keep the fade effect on edges
        if (logoCarousel) {
            logoCarousel.style.maskImage = '';
            logoCarousel.style.webkitMaskImage = '';
        }
        
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
