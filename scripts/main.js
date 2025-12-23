// FAQ Accordion functionality
const faqButtons = document.querySelectorAll('.question button');
faqButtons.forEach(button => {
    button.addEventListener('click', () => {
        const faq = button.nextElementSibling;
        const icon = button.querySelector('.d-arrow svg');
        faq.classList.toggle('show');
        icon.classList.toggle('rotate');
    });
});

// Theme toggle and VANTA background
let vantaEffect;
document.addEventListener('DOMContentLoaded', () => {
    const toggleBtn = document.getElementById('theme-toggle');
    const icon = document.getElementById('theme-icon');
    const root = document.documentElement;
    
    // Initialize VANTA.NET
    if (document.getElementById('my-background')) {
        vantaEffect = VANTA.NET({
            el: "#my-background",
            mouseControls: false,
            touchControls: false,
            gyroControls: false,
            scale: 1,
            scaleMobile: 1.00,
            backgroundColor: 0xffffff,
            color: 0xEA9E8D,
            showDots: true,
            maxDistance: 12,
            points: 6
        });
    }
    
    // Theme toggle functionality
    if (toggleBtn && icon) {
        toggleBtn.addEventListener('click', () => {
            root.classList.toggle('alt-theme');
            const darkMode = root.classList.contains('alt-theme');
            
            // Update icon
            icon.classList.replace(darkMode ? 'fa-moon' : 'fa-sun', darkMode ? 'fa-sun' : 'fa-moon');
            
            // Update VANTA background
            if (vantaEffect) {
                vantaEffect.setOptions({
                    backgroundColor: darkMode ? 0x000000 : 0xffffff
                });
            }
        });
    }
});

// Carousel functionality
const carouselImgs = [
    document.getElementById('img-1'),
    document.getElementById('img-2'),
    document.getElementById('img-3')
];

const carouselBtns = [
    document.getElementById('cc-1'),
    document.getElementById('cc-2'),
    document.getElementById('cc-3')
];

// Initialize carousel - show first image by default
if (carouselImgs[0]) carouselImgs[0].style.display = 'block';
if (carouselImgs[1]) carouselImgs[1].style.display = 'none';
if (carouselImgs[2]) carouselImgs[2].style.display = 'none';

// Set first button as active by default
if (carouselBtns[0]) {
    carouselBtns[0].style.backgroundColor = 'var(--main-blue)';
    carouselBtns[0].style.color = 'var(--white)';
}

carouselBtns.forEach((btn, idx) => {
    if (btn) {
        btn.addEventListener('click', () => {
            // Show the selected image, hide others
            carouselImgs.forEach((img, i) => {
                if (img) {
                    img.style.display = i === idx ? 'block' : 'none';
                }
            });
            
            // Update button styles
            carouselBtns.forEach((b, i) => {
                if (b) {
                    if (i === idx) {
                        b.style.backgroundColor = 'var(--main-blue)';
                        b.style.color = 'var(--white)';
                    } else {
                        b.style.backgroundColor = 'transparent';
                        b.style.color = 'var(--main-blue)';
                    }
                }
            });
        });
    }
});

// Use case toggle functionality
function toggleDetails(header) {
    const useCase = header.closest('.use-case');
    if (useCase) {
        useCase.classList.toggle('active');
    }
}

// Make toggleDetails available globally for onclick handlers
window.toggleDetails = toggleDetails;
