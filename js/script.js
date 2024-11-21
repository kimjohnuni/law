











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
document.addEventListener('DOMContentLoaded', function() {
let activePanel = null;
let selectedItem = null;
const grid = document.querySelector('.custom-partner-grid');
const items = document.querySelectorAll('.custom-partner-item');

function scrollToPanel(panel) {
  const panelRect = panel.getBoundingClientRect();
  const offset = panelRect.top + window.scrollY - (window.innerHeight - panelRect.height) / 2;
  window.scrollTo({
      top: offset,
      behavior: 'smooth'
  });
}

function createInfoPanel(content, targetItem) {
  const template = document.getElementById('info-panel-template');
  const panel = template.content.cloneNode(true);
  const wrapper = panel.querySelector('.info-panel-wrapper');
  const infoPanel = panel.querySelector('.info-panel');
  const arrow = panel.querySelector('.info-panel-arrow');
  const closeButton = panel.querySelector('.close-button');

  panel.querySelector('.info-panel-content').innerHTML = content;

  const itemRect = targetItem.getBoundingClientRect();
  const gridRect = grid.getBoundingClientRect();
  const arrowLeft = itemRect.left - gridRect.left + (itemRect.width / 2) - 10;
  arrow.style.left = `${arrowLeft}px`;

  return { wrapper, infoPanel, closeButton };
}

function closePanel() {
  if (activePanel) {
      const wrapper = activePanel;
      const panel = wrapper.querySelector('.info-panel');

      panel.style.transform = 'translateY(-20px)';
      panel.style.opacity = '0';

      setTimeout(() => {
          wrapper.style.height = '0';
          setTimeout(() => {
              wrapper.remove();
              activePanel = null;
          }, 300);
      }, 100);
  }

  if (selectedItem) {
      selectedItem.classList.remove('selected');
      selectedItem = null;
  }

  items.forEach(item => {
      item.querySelector('.partner-overlay').style.opacity = '0';
  });
}

items.forEach(item => {
  item.addEventListener('click', function() {
      const partnerId = this.dataset.partner;

      // Calculate insertion point
      const itemIndex = Array.from(items).indexOf(this);
      const itemsPerRow = Math.floor(grid.offsetWidth / this.offsetWidth);
      const insertAfterIndex = Math.floor(itemIndex / itemsPerRow) * itemsPerRow + itemsPerRow - 1;
      const referenceNode = items[insertAfterIndex] || items[items.length - 1];

      let content;
      switch(partnerId) {
          case "1":
            content = `
            <h2>주대진</h2>
            <div class="position-title">대표변호사</div>
            <p>주대진 변호사(사법시험 28회, 연수원 18기)는 오랜 변호사 경력을 바탕으로 법무법인(유한) 에스제이파트너스에서 다루는 각종 사건에 대한 조언과 지원을 아끼지 않고 있습니다.</p>
            `;
              break;
          case "2":
          content = `
          <h2>Partner Name</h2>
          <div class="position-title">Position Title</div>
          <p>Detailed description about the partner. This can be multiple sentences long and will maintain proper spacing and line height for readability.</p>
          `;
            break;
          case "3":
          content = `
          <h2>Partner Name</h2>
          <div class="position-title">Position Title</div>
          <p>Detailed description about the partner. This can be multiple sentences long and will maintain proper spacing and line height for readability.</p>
          `;
            break;
          case "4":
          content = `
          <h2>Partner Name</h2>
          <div class="position-title">Position Title</div>
          <p>Detailed description about the partner. This can be multiple sentences long and will maintain proper spacing and line height for readability.</p>
          `;
            break;
          case "5":
          content = `
          <h2>Partner Name</h2>
          <div class="position-title">Position Title</div>
          <p>Detailed description about the partner. This can be multiple sentences long and will maintain proper spacing and line height for readability.</p>
          `;
            break;
          case "6":
          content = `
          <h2>Partner Name</h2>
          <div class="position-title">Position Title</div>
          <p>Detailed description about the partner. This can be multiple sentences long and will maintain proper spacing and line height for readability.</p>
          `;
            break;
          case "7":
          content = `
          <h2>Partner Name</h2>
          <div class="position-title">Position Title</div>
          <p>Detailed description about the partner. This can be multiple sentences long and will maintain proper spacing and line height for readability.</p>
          `;
            break;
          case "8":
          content = `
          <h2>Partner Name</h2>
          <div class="position-title">Position Title</div>
          <p>Detailed description about the partner. This can be multiple sentences long and will maintain proper spacing and line height for readability.</p>
          `;
            break;
            case "9":
            content = `
            <h2>Partner Name</h2>
            <div class="position-title">Position Title</div>
            <p>Detailed description about the partner. This can be multiple sentences long and will maintain proper spacing and line height for readability.</p>
            `;
              break;
              case "10":
              content = `
              <h2>Partner Name</h2>
              <div class="position-title">Position Title</div>
              <p>Detailed description about the partner. This can be multiple sentences long and will maintain proper spacing and line height for readability.</p>
              `;
                break;
                case "11":
                content = `
                <h2>Partner Name</h2>
                <div class="position-title">Position Title</div>
                <p>Detailed description about the partner. This can be multiple sentences long and will maintain proper spacing and line height for readability.</p>
                `;
                  break;
                  case "12":
                  content = `
                  <h2>Partner Name</h2>
                  <div class="position-title">Position Title</div>
                  <p>Detailed description about the partner. This can be multiple sentences long and will maintain proper spacing and line height for readability.</p>
                  `;
                    break;
                    case "13":
                    content = `
                    <h2>Partner Name</h2>
                    <div class="position-title">Position Title</div>
                    <p>Detailed description about the partner. This can be multiple sentences long and will maintain proper spacing and line height for readability.</p>
                    `;
                      break;
                      case "14":
                      content = `
                      <h2>Partner Name</h2>
                      <div class="position-title">Position Title</div>
                      <p>Detailed description about the partner. This can be multiple sentences long and will maintain proper spacing and line height for readability.</p>
                      `;
                        break;
                        case "15":
                        content = `
                        <h2>Partner Name</h2>
                        <div class="position-title">Position Title</div>
                        <p>Detailed description about the partner. This can be multiple sentences long and will maintain proper spacing and line height for readability.</p>
                        `;
                          break;
                          case "16":
                          content = `
                          <h2>Partner Name</h2>
                          <div class="position-title">Position Title</div>
                          <p>Detailed description about the partner. This can be multiple sentences long and will maintain proper spacing and line height for readability.</p>
                          `;
                            break;
                            case "17":
                            content = `
                            <h2>Partner Name</h2>
                            <div class="position-title">Position Title</div>
                            <p>Detailed description about the partner. This can be multiple sentences long and will maintain proper spacing and line height for readability.</p>
                            `;
                              break;
                              case "18":
                              content = `
                              <h2>Partner Name</h2>
                              <div class="position-title">Position Title</div>
                              <p>Detailed description about the partner. This can be multiple sentences long and will maintain proper spacing and line height for readability.</p>
                              `;
                                break;
                                case "19":
                                content = `
                                <h2>Partner Name</h2>
                                <div class="position-title">Position Title</div>
                                <p>Detailed description about the partner. This can be multiple sentences long and will maintain proper spacing and line height for readability.</p>
                                `;
                                  break;
                                  case "20":
                                  content = `
                                  <h2>Partner Name</h2>
                                  <div class="position-title">Position Title</div>
                                  <p>Detailed description about the partner. This can be multiple sentences long and will maintain proper spacing and line height for readability.</p>
                                  `;
                                    break;
                                    case "21":
                                    content = `
                                    <h2>Partner Name</h2>
                                    <div class="position-title">Position Title</div>
                                    <p>Detailed description about the partner. This can be multiple sentences long and will maintain proper spacing and line height for readability.</p>
                                    `;
                                      break;
                                      case "22":
                                      content = `
                                      <h2>Partner Name</h2>
                                      <div class="position-title">Position Title</div>
                                      <p>Detailed description about the partner. This can be multiple sentences long and will maintain proper spacing and line height for readability.</p>
                                      `;
                                        break;
                                        case "23":
                                        content = `
                                        <h2>Partner Name</h2>
                                        <div class="position-title">Position Title</div>
                                        <p>Detailed description about the partner. This can be multiple sentences long and will maintain proper spacing and line height for readability.</p>
                                        `;
                                          break;
          default:
              content = `<p>Information not available</p>`;
      }

      if (selectedItem === this) {
          closePanel();
          return;
      }

      if (activePanel) {
          const panel = activePanel.querySelector('.info-panel');
          const contentDiv = panel.querySelector('.info-panel-content');
          const arrow = panel.querySelector('.info-panel-arrow');

          // Update content and arrow position
          contentDiv.innerHTML = content;
          const itemRect = this.getBoundingClientRect();
          const gridRect = grid.getBoundingClientRect();
          const arrowLeft = itemRect.left - gridRect.left + (itemRect.width / 2) - 10;
          arrow.style.left = `${arrowLeft}px`;

          // Move panel if needed
          if (activePanel.previousElementSibling !== referenceNode) {
              activePanel.remove();
              referenceNode.insertAdjacentElement('afterend', activePanel);
              scrollToPanel(activePanel);
          }

          // Update selected state
          selectedItem.classList.remove('selected');
          this.classList.add('selected');
          selectedItem = this;

          // Update overlays
          items.forEach(otherItem => {
              otherItem.querySelector('.partner-overlay').style.opacity =
                  otherItem !== this ? '1' : '0';
          });

          return;
      }

      // Create new panel
      const { wrapper, infoPanel, closeButton } = createInfoPanel(content, this);
      referenceNode.insertAdjacentElement('afterend', wrapper);
      activePanel = wrapper;

      this.classList.add('selected');
      selectedItem = this;

      items.forEach(otherItem => {
          otherItem.querySelector('.partner-overlay').style.opacity =
              otherItem !== this ? '1' : '0';
      });

      requestAnimationFrame(() => {
          wrapper.style.height = `${infoPanel.offsetHeight}px`;
          infoPanel.classList.add('active');
          scrollToPanel(wrapper);
      });

      closeButton.addEventListener('click', closePanel);
  });
});
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
