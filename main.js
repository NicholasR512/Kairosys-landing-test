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

let vantaEffect;

document.addEventListener('DOMContentLoaded', () => {
  const toggleBtn = document.getElementById('theme-toggle');
  const icon = document.getElementById('theme-icon');
  const root = document.documentElement;

  // Initialize VANTA.NET
  vantaEffect = VANTA.NET({
    el: "#my-background",
    mouseControls: false,
    touchControls: false,
    gyroControls: false,
    scale: 1.00,
    scaleMobile: 1.00,
    backgroundColor: 0xffffff,
    color: 0xEA9E8D,
    showDots: true,
    maxDistance: 17
  });

  toggleBtn.addEventListener('click', () => {
    root.classList.toggle('alt-theme');
    const darkMode = root.classList.contains('alt-theme');

    // Update icon
    icon.classList.replace(darkMode ? 'fa-moon' : 'fa-sun', darkMode ? 'fa-sun' : 'fa-moon');

    // Update VANTA background
    vantaEffect.setOptions({
      backgroundColor: darkMode ? 0x000000 : 0xffffff
    });
  });
});


