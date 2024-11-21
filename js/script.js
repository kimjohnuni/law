











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
let isScrollingPanel = false;

// Toggle info panel visibility
function toggleInfo(id) {
    const panels = document.querySelectorAll('.info-panel');
    const clickedPanel = document.getElementById(`info-${id}`);
    const profileCards = document.querySelector('.profile-cards');
    const clickedCard = document.querySelector(`[onclick="toggleInfo(${id})"]`);
    const allCards = document.querySelectorAll('.profile-card');

    // If clicking the same card, close the panel and reset
    if (currentInfoPanelId === id) {
        closeInfo(id);
        return;
    }

    // Close any open panel
    if (currentInfoPanelId !== null) {
        closeInfo(currentInfoPanelId);
    }

    // Open the clicked panel
    clickedPanel.classList.add('active');
    currentInfoPanelId = id;

    // Add touch handlers specifically for scrolling
    const handleTouchStart = (e) => {
        isScrollingPanel = true;
        e.stopPropagation();
    };

    const handleTouchEnd = () => {
        isScrollingPanel = false;
    };

    // Prevent any parent elements from receiving the scroll event
    const handleScroll = (e) => {
        if (isScrollingPanel) {
            e.stopPropagation();
        }
    };

    clickedPanel.addEventListener('touchstart', handleTouchStart, { passive: false });
    clickedPanel.addEventListener('touchend', handleTouchEnd, { passive: false });
    clickedPanel.addEventListener('scroll', handleScroll, { passive: false });

    // Store handlers for removal later
    clickedPanel.eventHandlers = {
        touchStart: handleTouchStart,
        touchEnd: handleTouchEnd,
        scroll: handleScroll
    };

    // Rest of your existing code remains the same
    allCards.forEach(card => {
        if (card !== clickedCard) {
            card.classList.add('dimmed');
        }
    });

    const cardRect = clickedCard.getBoundingClientRect();
    const containerRect = profileCards.getBoundingClientRect();
    const cardsPerRow = Math.floor(containerRect.width / cardRect.width);
    const cardIndex = Array.from(profileCards.children).indexOf(clickedCard);
    const rowIndex = Math.floor(cardIndex / cardsPerRow);
    const insertIndex = (rowIndex + 1) * cardsPerRow;

    if (insertIndex < profileCards.children.length) {
        profileCards.insertBefore(clickedPanel, profileCards.children[insertIndex]);
    } else {
        profileCards.appendChild(clickedPanel);
    }

    setTimeout(() => {
        clickedPanel.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }, 0);
}

// Close the info panel
function closeInfo(id) {
    const panel = document.getElementById(`info-${id}`);

    if (panel && !isScrollingPanel) {  // Only close if we're not scrolling
        // Remove event listeners
        if (panel.eventHandlers) {
            panel.removeEventListener('touchstart', panel.eventHandlers.touchStart);
            panel.removeEventListener('touchend', panel.eventHandlers.touchEnd);
            panel.removeEventListener('scroll', panel.eventHandlers.scroll);
            delete panel.eventHandlers;
        }

        panel.classList.remove('active');
        currentInfoPanelId = null;

        const allCards = document.querySelectorAll('.profile-card');
        allCards.forEach(card => card.classList.remove('dimmed'));

        document.querySelector('.container').appendChild(panel);
    }
}

// Reposition info panel on window resize
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
