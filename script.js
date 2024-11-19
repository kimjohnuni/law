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

    if (currentScrollTop > lastScrollTop && isVisible) {
        navHeader.removeClass('visible').addClass('hidden');
        isVisible = false;
    } else if (currentScrollTop < lastScrollTop && !isVisible) {
        navHeader.removeClass('hidden').addClass('visible');
        isVisible = true;
    }

    lastScrollTop = currentScrollTop;
}, 100)); // Adjust the throttle time as needed














let currentInfoPanelId = null;

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
    clickedPanel.classList.add('active'); // Ensure this class does not conflict with Bootstrap's 'active'
    currentInfoPanelId = id;

    // Dim all other cards
    allCards.forEach(card => {
        if (card !== clickedCard) {
            card.classList.add('dimmed'); // Ensure this class does not conflict with Bootstrap's styles
        }
    });

    // Insert info panel after the clicked card's row
    const cardRect = clickedCard.getBoundingClientRect();
    const containerRect = profileCards.getBoundingClientRect();
    const cardsPerRow = Math.floor(containerRect.width / cardRect.width);

    // Calculate the index to insert the info panel
    const cardIndex = Array.from(profileCards.children).indexOf(clickedCard);
    const rowIndex = Math.floor(cardIndex / cardsPerRow);

    // Calculate insert index for positioning
    const insertIndex = (rowIndex + 1) * cardsPerRow;

    // Position the info panel correctly in the grid
    if (insertIndex < profileCards.children.length) {
        profileCards.insertBefore(clickedPanel, profileCards.children[insertIndex]);
    } else {
        profileCards.appendChild(clickedPanel);
    }

    // Smooth scroll to make the info panel visible
    setTimeout(() => {
        clickedPanel.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }, 0);
}

// Close the info panel
function closeInfo(id) {
    const panel = document.getElementById(`info-${id}`);

    if (panel) {
        panel.classList.remove('active'); // Ensure this does not conflict with Bootstrap's 'active'
        currentInfoPanelId = null;

        // Remove dimming effect from all cards
        const allCards = document.querySelectorAll('.profile-card');
        allCards.forEach(card => card.classList.remove('dimmed'));

        // Move the panel back to its default position
        document.querySelector('.container').appendChild(panel);
    }
}

// Reposition info panel on window resize
window.addEventListener('resize', () => {
    if (currentInfoPanelId !== null) {
        toggleInfo(currentInfoPanelId);
    }
});










$(document).ready(function() {
    // Wait for the video to load before triggering animations
    $('#background-video').on('loadeddata', function() {
        // Initialize WOW.js after the video is loaded
        new WOW().init();

        // Make sure the animated elements are visible and add animation classes
        $('#content .wow').each(function() {
            $(this).css('visibility', 'visible'); // Ensure elements are visible
            $(this).addClass('animate__animated'); // Add animation class
        });
    });
});
