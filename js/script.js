











/*MENU*/

function openMenu() {
    const overlay = document.getElementById("overlay-nav");
    document.documentElement.style.overflow = 'hidden';
    document.body.style.overflow = 'hidden';
    overlay.classList.remove('closing');
    overlay.classList.add("active");
}

function closeMenu() {
    const overlay = document.getElementById("overlay-nav");
    document.documentElement.style.overflow = '';
    document.body.style.overflow = '';
    overlay.classList.add('closing');

    setTimeout(() => {
        overlay.classList.remove('active');
        overlay.classList.remove('closing');
    }, 500);
}

document.addEventListener('DOMContentLoaded', function() {
    const menuLinks = document.querySelectorAll('.overlay-content a');

    menuLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const href = this.getAttribute('href');
            const overlay = document.getElementById("overlay-nav");

            // Add delay before starting the zoom effect
            setTimeout(() => {
                overlay.classList.add('closing');
                document.documentElement.style.overflow = '';
                document.body.style.overflow = '';

                // Navigate after zoom animation starts
                setTimeout(() => {
                    window.location.href = href;
                }, 300);
            }, 100); // Small delay before zoom starts
        });
    });
});












/*NAV HEADER ACTION*/

var lastScrollTop = 0;
var navHeader = $(".nav-header");
var isVisible = true;

// Throttle function to limit how often the scroll event is processed
function throttle(fn, wait) {
    let lastTime = 0;
    return function(...args) {
        const now = new Date().getTime();
        if (now - lastTime >= wait) {
            lastTime = now;
            fn.apply(this, args);
        }
    };
}

// Handle scroll events to show/hide the navigation header
$(window).scroll(throttle(function() {
    var currentScrollTop = $(this).scrollTop();

    // If at the top of the page, ensure header is visible
    if (currentScrollTop === 0) {
        if (!isVisible) {
            navHeader.removeClass('hidden').addClass('visible');
            isVisible = true;
        }
    } else {
        // Scrolling down
        if (currentScrollTop > lastScrollTop) {
            if (isVisible) {
                navHeader.removeClass('visible').addClass('hidden');
                isVisible = false;
            }
        }
        // Scrolling up
        else {
            if (!isVisible) {
                navHeader.removeClass('hidden').addClass('visible');
                isVisible = true;
            }
        }
    }

    // Update lastScrollTop after processing
    lastScrollTop = currentScrollTop;
}, 100)); // Adjust throttle time as needed













/*PARTNERS PAGE ACCORDION*/
let currentInfoPanelId = null;

// Add these debug variables at the top
let debugLastEvent = '';
let debugLastTarget = '';

// Toggle info panel visibility
function toggleInfo(id) {
    console.log('Toggle called with id:', id);
    const panels = document.querySelectorAll('.info-panel');
    const clickedPanel = document.getElementById(`info-${id}`);
    const profileCards = document.querySelector('.profile-cards');
    const clickedCard = document.querySelector(`[onclick="toggleInfo(${id})"]`);
    const allCards = document.querySelectorAll('.profile-card');

    // Debug logging
    document.addEventListener('touchstart', (e) => {
        debugLastEvent = 'touchstart';
        debugLastTarget = e.target;
        console.log('Touch Start on:', e.target);
    }, true);

    document.addEventListener('touchmove', (e) => {
        debugLastEvent = 'touchmove';
        debugLastTarget = e.target;
        console.log('Touch Move on:', e.target);
    }, true);

    document.addEventListener('touchend', (e) => {
        debugLastEvent = 'touchend';
        debugLastTarget = e.target;
        console.log('Touch End on:', e.target);
    }, true);

    document.addEventListener('scroll', (e) => {
        debugLastEvent = 'scroll';
        debugLastTarget = e.target;
        console.log('Scroll on:', e.target);
    }, true);

    // Your existing code continues here...
    if (currentInfoPanelId === id) {
        closeInfo(id);
        return;
    }

    if (currentInfoPanelId !== null) {
        closeInfo(currentInfoPanelId);
    }

    clickedPanel.classList.add('active');
    currentInfoPanelId = id;

    // Add this to prevent any touch events from bubbling up
    clickedPanel.addEventListener('touchstart', (e) => {
        console.log('Panel touch start');
        e.stopPropagation();
    }, { passive: false });

    clickedPanel.addEventListener('touchmove', (e) => {
        console.log('Panel touch move');
        e.stopPropagation();
    }, { passive: false });

    clickedPanel.addEventListener('touchend', (e) => {
        console.log('Panel touch end');
        e.stopPropagation();
    }, { passive: false });

    // Rest of your existing code...
}

// Modify the closeInfo function to log why it's being called
function closeInfo(id) {
    console.log('Close Info called with id:', id);
    console.log('Last event that triggered close:', debugLastEvent);
    console.log('Last target that triggered close:', debugLastTarget);

    const panel = document.getElementById(`info-${id}`);
    if (panel) {
        panel.classList.remove('active');
        currentInfoPanelId = null;

        const allCards = document.querySelectorAll('.profile-card');
        allCards.forEach(card => card.classList.remove('dimmed'));

        document.querySelector('.container').appendChild(panel);
    }
}

// Keep your existing resize event listener
window.addEventListener('resize', () => {
    if (currentInfoPanelId !== null) {
        toggleInfo(currentInfoPanelId);
    }
});











/* LANDING PAGE WHITE*/

document.addEventListener('DOMContentLoaded', function() {
    // Check if we're on the index page by looking for the background-video element
    const video = document.getElementById('background-video');

    // Only run the overlay code if video element exists (index page)
    if (video) {
        // Create white overlay
        const overlay = document.createElement('div');
        overlay.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: white;
            z-index: 1000;
            transition: opacity 1.5s ease;
        `;
        document.body.appendChild(overlay);

        // Function to handle fade out
        const fadeOut = () => {
            setTimeout(() => {
                overlay.style.opacity = '0';
                setTimeout(() => {
                    overlay.remove();
                }, 1500);
            }, 100);
        };

        // Check if video is already loaded
        if (video.readyState >= 3) {
            fadeOut();
        } else {
            video.addEventListener('loadeddata', fadeOut);
            video.addEventListener('canplay', fadeOut);

            // Fallback timeout
            setTimeout(() => {
                if (overlay && overlay.parentNode) {
                    fadeOut();
                }
            }, 5000);
        }

        video.load();
    }
});











const wow = new WOW({
    boxClass: 'wow',
    animateClass: 'animate__animated',
    offset: 0,
    mobile: true,
    live: true
}).init();
