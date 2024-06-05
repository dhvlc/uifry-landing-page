// script.js
document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.querySelector('.menu-toggle');
    const closeBtn = document.querySelector('.close-btn');
    const navLinks = document.querySelector('.nav-links');

    menuToggle.addEventListener('click', () => {
        navLinks.classList.add('open');
    });

    closeBtn.addEventListener('click', () => {
        navLinks.classList.remove('open');
    });

    document.addEventListener('click', (e) => {
        if (!navLinks.contains(e.target) &&!menuToggle.contains(e.target)) {
            navLinks.classList.remove('open');
        }
    });

    const switchModeButton = document.querySelector('.switch-mode');
    const body = document.body;
    const logoImg = document.querySelector('.logo-nav img');
    const footerImg = document.querySelector('.contact-left-footer img');

    switchModeButton.addEventListener('click', () => {
        body.classList.toggle('dark-mode');

        const allTextElements = document.querySelectorAll('body *');
        allTextElements.forEach(element => {
            element.classList.toggle('dark-text');
        });

        if (body.classList.contains('dark-mode')) {
            logoImg.src = 'dir/images/logo-white.png';
        } else {
            logoImg.src = 'dir/images/logo.png';
        }

        if (body.classList.contains('dark-mode')) {
            footerImg.src = 'dir/images/logo-white.png';
        } else {
            footerImg.src = 'dir/images/logo.png';
        }

        if (body.classList.contains('dark-mode')) {
            switchModeButton.innerHTML = '<i class="fa-solid fa-sun"></i>';
        } else {
            switchModeButton.innerHTML = '<i class="fa-solid fa-moon"></i>';
        }
    });

    // Added smooth scrolling function
    const smoothScroll = (target, duration) => {
        const targetPosition = target.getBoundingClientRect().top;
        const startPosition = window.pageYOffset;
        let startTime = null;

        const animation = (currentTime) => {
            if (startTime === null) startTime = currentTime;
            const timeElapsed = currentTime - startTime;
            let progress = timeElapsed / duration;
            if (progress > 1) progress = 1;
            const newPosition = startPosition + (targetPosition * easeInOutQuad(progress));
            window.scrollTo(0, newPosition);
            if (progress < 1) requestAnimationFrame(animation);
        };

        const easeInOutQuad = (t) => t < 0.5? 2 * t * t : -1 + ((4 - (2 * t)) * t);

        requestAnimationFrame(animation);
    };

    // Added event listeners for smooth scrolling
    document.querySelectorAll('.smooth-scroll').forEach((link) => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const target = document.querySelector(e.target.getAttribute('href'));
            smoothScroll(target, 1000);
        });
    });

    // Added scroll-up button
    const scrollUpBtn = document.querySelector('.scroll-up-btn');
    scrollUpBtn.addEventListener('click', () => {
        smoothScroll(document.body, 500);
    });

    // Added scroll-up button show/hide functionality
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            scrollUpBtn.classList.add('show');
        } else {
            scrollUpBtn.classList.remove('show');
        }
    });

    // Added AOS library initialization
    AOS.init();
});

// Added GLightbox initialization
const lightbox = GLightbox({
    selector: '[data-glightbox]'
});