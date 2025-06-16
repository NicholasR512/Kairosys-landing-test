const hamburger = document.querySelector(".hamburger");
const navLinksContainer = document.querySelector(".nav-links-container");
const overlay = document.querySelector(".nav-overlay");

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
const buttons = document.querySelectorAll('button');

buttons.forEach( button =>{
    button.addEventListener('click',()=>{
        const faq = button.nextElementSibling;
        const icon = button.querySelector('.d-arrow svg');


        faq.classList.toggle('show');
        icon.classList.toggle('rotate');
    })
} )