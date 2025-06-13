document.addEventListener("DOMContentLoaded", function () {
    const hamburger = document.querySelector(".hamburger");
    const navLinksContainer = document.querySelector(".nav-links-container");
    const overlay = document.querySelector(".nav-overlay");

    function toggleMenu() {
        hamburger.classList.toggle("open");
        navLinksContainer.classList.toggle("open");
        overlay.classList.toggle("active");
    }

    hamburger.addEventListener("click", toggleMenu);
    overlay.addEventListener("click", toggleMenu); // closes on overlay click
});
