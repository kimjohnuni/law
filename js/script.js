











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








/*COMPANY & ACHIEVEMENTS ACCORDION*/
document.addEventListener('DOMContentLoaded', function() {
    // Company Accordion
    const companyTriggers = document.querySelectorAll('.company-accordion-trigger');

    companyTriggers.forEach(trigger => {
        trigger.addEventListener('click', () => {
            const content = trigger.nextElementSibling;
            const isExpanded = trigger.getAttribute('aria-expanded') === 'true';

            // Close all company accordion items
            document.querySelectorAll('.company-accordion-content').forEach(content => {
                content.classList.remove('active');
            });
            document.querySelectorAll('.company-accordion-trigger').forEach(btn => {
                btn.setAttribute('aria-expanded', 'false');
            });

            // Toggle current item
            if (!isExpanded) {
                content.classList.add('active');
                trigger.setAttribute('aria-expanded', 'true');
            }
        });
    });

    // Achievement Accordion
    const achievementTriggers = document.querySelectorAll('.achievement-trigger');

    achievementTriggers.forEach(trigger => {
        const content = trigger.nextElementSibling;
        const contentInner = content.querySelector('.achievement-body');

        // Set initial states
        trigger.setAttribute('aria-expanded', 'false');
        content.style.maxHeight = '0';
        content.style.opacity = '0';
        content.style.visibility = 'hidden';

        trigger.addEventListener('click', () => {
            const isExpanded = trigger.getAttribute('aria-expanded') === 'true';

            if (!isExpanded) {
                // Close all other achievement items first
                document.querySelectorAll('.achievement-content').forEach(item => {
                    if (item !== content) {
                        item.style.maxHeight = '0';
                        item.style.opacity = '0';
                        item.style.visibility = 'hidden';
                        item.classList.remove('active');
                    }
                });
                document.querySelectorAll('.achievement-trigger').forEach(btn => {
                    if (btn !== trigger) {
                        btn.setAttribute('aria-expanded', 'false');
                    }
                });

                // Open clicked item
                content.style.visibility = 'visible';
                content.classList.add('active');
                content.style.maxHeight = contentInner.scrollHeight + 'px';
                content.style.opacity = '1';
                trigger.setAttribute('aria-expanded', 'true');
            } else {
                // Close clicked item with transition
                content.style.maxHeight = '0';
                content.style.opacity = '0';
                setTimeout(() => {
                    content.style.visibility = 'hidden';
                    content.classList.remove('active');
                }, 300);
                trigger.setAttribute('aria-expanded', 'false');
            }
        });
    });
});










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
            <h2>옥준원</h2>
            <div class="position-title">대표변호사</div>
            <p>옥준원 대표변호사는 사법연수원 수료(15기) 후 1986년부터 2009년까지 만 23년간 전국 각 지방 및 고등검찰청에서 검사 및 부장검사로 근무 후 퇴직하였고, 이후 변호사로 개업하여 법무법인(유한) 에이스를 거쳐 법무법인(유한) 에스제이파트너스에서 16년째 변호사로 재직하고 있습니다. 검찰에 재직하는 동안 특수부와 공안부에도 근무하였으나, 주로 형사부와 조사부에 근무하면서 다양한 형사사건을 수사하였고, 특히 복잡다단한 고소사건을 많이 수사하였습니다. 변호사로 개업한 이후에는 주로 형사사건을 수임하였지만, 민사, 행정, 가사사건도 많이 수임하는 등 38년이 넘는 법조생활 동안 다양한 사건을 처리하였습니다.</p>
            `;
              break;
          case "2":
          content = `
          <h2>김정학</h2>
          <div class="position-title">대표변호사</div>
          <p>김정학 변호사는 부산 경남중·고(25회)와 서울법대(29회)를 졸업한 후 사법연수원(18기)을 수료하고, 인천지법, 창원지법 통영지원, 서울 남부, 서부, 북부, 중앙, 가정법원 판사와 서울고등법원 판사를 거쳐 부산지법, 수원지법, 서울 서부지법, 중앙지법, 인천지법 부장판사로 약30년간 근무한 후 2018. 1. 퇴직하였습니다. 좀더 구체적 학력, 경력, 성품 등은 네이버 블로그명 '김정학변호사'에서 충분히 확인하실 수 있습니다. 오랜 기간 민 ·형사, 행정, 가사 등 다방면에 걸친 재판 경력으로 폭 넓고 질 높은 법률 소양과 경험을 갖추고 있고 각종 소송 현장에서 재판을 한 만큼 남다른 실무경험과 실효적인 법률지식을 바탕으로 믿을 수 있고 성공적인 소송수행과 법률자문을 할 수 있습니다.
          </p>
          `;
            break;
          case "3":
          content = `
          <h2>주대진</h2>
          <div class="position-title">대표변호사</div>
          <p>주대진 변호사(사법시험 28회, 연수원 18기)는 오랜 변호사 경력을 바탕으로 법무법인(유한) 에스제이파트너스에서 다루는 각종 사건에 대한 조언과 지원을 아끼지 않고 있습니다.</p>
          `;
            break;
          case "4":
          content = `
          <h2>송범준</h2>
          <div class="position-title">구성원변호사</div>
          <p>전) 대구시청 행정심판위원회 시보<br>
             현) 경찰청 '사이버범죄 예방을 위한 법제 구성방안에 대한 연구용역' 법제위원<br>
             현) 한국인터넷진흥원(KISA) '주요정보통신기반보호제도 개산방안연구용역' 법제위원<br>
             현) 대한변호사협회 등기.경매 변호사회 이사<br>
             현) 주식회사 시스웍 등기이사(코스닥 상장사)<br>
             현) 본아이에프 주식회사(본그룹/본죽) 자문
          </p>
          `;
            break;
          case "5":
          content = `
          <h2>장현경</h2>
          <div class="position-title">구성원변호사</div>
          <p>장현경 변호사는 대한변호사협회에 형사법과 손해배상 전문 변호사로 등록되어 있으면서, 검찰총장 출신 등이 포진하고 있는 법무법인 대건에서 파트너 변호사로 근무하며 다수의 형사사건과 민사 사건을 성공적으로 처리한 바 있습니다. 또한, 대기업 대금청구 사건 및 하도급법 등과 관련된 다수의 공정거래위원회 사건을 담당한 바 있으며, 2014년 중앙선거관리위원회에서 진행한 선거용어사전 편찬에 참여하고 2018년 서울에서 열린 세계헌법대회 조직위원회에도 활동하였을 정도로 공법 분야에서도 그 역량을 보이고 있을 뿐만 아니라, 현재 투자회사의 준법감시인 역할을 겸하면서 그 전문성을 광범위한 분야로 넓히고 있습니다.
          </p>
          `;
            break;
          case "6":
          content = `
          <h2>이석재</h2>
          <div class="position-title">구성원변호사</div>
          <p>이석재 변호사는 1997년 국립세무대학을 졸업한 후, 서초·용산·종로세무서에서 법인 및 개인세금 관련 업무를, 2001년부터는 서울지방국세청 조사1국에서 세무조사업무에 종사하였으며, 특히 조사4국에서 특별세무조사와 주식변동조사에 관한 풍부한 실무경험을 쌓았습니다.<br><br>국세청 퇴직 후에는 9급 신화 박찬욱 서울지방국세청장과 PB세무컨설팅을 창업하여 세무사로서 세금신고 및 세무회계조정, 세무조사대응, 불복청구, 유권해석 및 조세전략 등 제반 조세문제를 균형잡힌 시각에서 다뤄왔습니다.<br><br>2019년부터 법무법인 호연에서 변호사, 법무법인(유한) 평산에서 파트너 변호사로서 조세형사, 행정소송 및 법률사무에까지 그 업무영역을 넓혔습니다.<br><br>2024년 법무법인(유한) 에스제이파트너스에 합류한 이석재 구성원 변호사는 그동안 조세전반의 다양한 분야에서 쌓아온 실무경험을 살려 고객에게 최고의 변호사가 될 것을 약속합니다.
          </p>
          `;
            break;
          case "7":
          content = `
          <h2>옥민석</h2>
          <div class="position-title">구성원변호사</div>
          <p>옥민석 변호사는 제1보병사단 헌병대 수사과, 성범죄 전문 로펌에서 근무하였습니다.<br><br>

          옥민석 변호사는 대한변호사협회 등록 형사전문변호사로서 다수의 성범죄, 음주운전 사건을 해결하며 얻은 경험과 노하우를 바탕으로 형사법 분야에서 최상의 법률서비스를 제공하고 있습니다.<br><br>

          옥민석 변호사는 'N번방 사건', '박사방 사건' 등과 같은 아동·청소년의성보호에관한법률위반 사건, '윤드로저 사건' 등과 같은 성폭력범죄의처벌등에관한특례법위반 사건, 강제추행, 강간 등 사건을 연이어 성공적으로 해결하며 성범죄 분야에서 그 전문성을 인정받고 있습니다.<br><br>

          옥민석 변호사는 '윤창호 사건' 이후 음주운전에 대한 처벌이 강화된 상황에서 벌금형 등 선처를 이끌어내며 음주운전 사건에서도 그 두각을 나타내고 있습니다.<br><br>

          옥민석 변호사는 소비자들의 선택을 받아 '2021 KCA 우수 전문인 어워즈'를 수상하였습니다.
          </p>
          `;
            break;
          case "8":
          content = `
          <h2>이창우</h2>
          <div class="position-title">구성원변호사</div>
          <p>이창우 변호사는 상장회사 및 신기술투자조합의 법률자문, 경영권 분쟁, 인수합병, 가상자산 분쟁 대응 등 기업법무와 사기, 횡령, 배임 등 형사사건에 대한 수사대응 및 재판업무를 주로 수행하고 있습니다.</p>
          `;
            break;
            case "9":
            content = `
            <h2>강지웅</h2>
            <div class="position-title">구성원변호사</div>
            <p>강지웅 변호사는 사기, 횡령, 공갈 등 재산범죄, 성범죄, 교통범죄, 스토킹범죄, 명예훼손 등등의 형사 사건 및 이와 관련된 민사 손해배상 사건을 주된 업무로 수행하면서 성공적인 업무 성과를 보여왔습니다. 특히 명예훼손·모욕, 스토킹범죄 분야에서는 압도적인 사건 수행 경험 및 노하우를 바탕으로 하여 풍부한 성공사례를 쌓아가고 있습니다. 이 외에도, 이혼(상간자 위자료 청구 소송, 양육비 이행 명령 청구 등 포함), 상속재산분할, 친양자 입양 등의 가사사건 및 기업소송, 일조권 침해 소송 등의 다양한 사건을 수행하며 전분 분야를 넓혀가고 있습니다.</p>
            `;
              break;
              case "10":
              content = `
              <h2>하서정</h2>
              <div class="position-title">변호사</div>
              <p>[학력] 서울대학교 경영학과<br><br>[경력] (전) 서울지방변호사회 회원이사 (현) 서울지방변호사회 교육이사 (현) 여성변호사회 문화이사 (현) 대한변호사협회 대의원 (현) 서울중앙지방법원 조기조정위원 (현) 노원경찰서 징계심의위원회 위원 (현) 인천공항본부세관 법률고문 (현) 서울시물재생위원회 위원 (전) 광진경찰서 정보공개심의위원회 위원 (현) 서초구청 정보공개심의위원회 위원 (현) 남양주 사회적경제육성위원회 위원 (현) 서울경제진흥원 심사위원회 위원 (현) 서울시 사이버성폭력센터 법률전담위원 (전) 강동송파교육지원청 학교폭력심의위원회 위원 (전) 남부교육지원청 학교폭력심의위원회 위원 (현) 수서경찰서 정보공개심의위원회 위원 (현) 서울경제진흥원 규제개혁지원단 전문위원 (현) 대한변호사협회 광고심사위원회 위원 (현) 서울지방변호사회 미디어특별위원회 위원 (현) 중소벤처기업법포럼 상임이사 (전) 중소벤처기업부 법률전문위원 (현) 대한변호사협회 이민출입국변호사회 이사 (현) 대한변호사협회 등기경매변호사회 정회원 / 2021 가사연수원 수료 / 2019 조세연수원 수료
              </p>
              `;
                break;
                case "11":
                content = `
                <h2>김석훈</h2>
                <div class="position-title">변호사</div>
                <p>김석훈 변호사는 익산 남성고등학교 및 연세대학교 경영학과와 같은 대학교 법학과 일반대학원(석사, 민법전공, 석사학위논문 : 성희롱의 법적 책임에 관한 연구)을 졸업하였고, 헌법재판소에서 실무 수습을 한 경력이 있습니다.<br>현재 에스제이파트너스에서 행정심판, 행정소송 등 행정사건 및 이혼, 상속 등 가사사건과 일반 민·형사 사건을 담당하고 있습니다.<br>주요 업무 분야 : 주택·상가건물 임대차 관련 분쟁, 인터넷게시금지가처분 등 인터넷상 명예훼손·모욕 관련 분쟁, (하)도급 등 건설 관련 분쟁 등
                </p>
                `;
                  break;
                  case "12":
                  content = `
                  <h2>박재성</h2>
                  <div class="position-title">변호사</div>
                  <p>박재성 변호사는 서울대학교 법학부를 졸업하고 변호사시험에 합격한 뒤, 에스제이파트너스에서 민사, 형사, 행정, 노무, 의료분쟁, 병원 및 기업자문 등의 다양한 업무를 수행하고 있습니다.<br><br>박재성 변호사는 현재 서울지방변호사회 형사당직변호사, 대한병원협회 준법지원인, 공군검찰부 국선변호인(피해자) 등으로 활동하고 있으며, 자문 및 송무전문 변호사로서 다수의 업무를 수행하면서 쌓아온 전문성과 사안의 핵심을 정확하게 파악하는 능력을 바탕으로 고객의 모든 법률적 고민에 대하여 명쾌하면서도 최선의 답을 드리고자 노력하는 변호사입니다.
                  </p>
                  `;
                    break;
                    case "13":
                    content = `
                    <h2>홍후혁</h2>
                    <div class="position-title">변호사</div>
                    <p>홍후혁 변호사는 민·형사사건을 수행하고 있고, 특히 강제추행, 카메라등이용촬영, 성착취물소지, 통신매체이용음란 등 성범죄 사건에서 다수의 성공사례를 보유하고 있습니다. 또한 서울지방변호사회 형사당직 변호사로 활동하고 있습니다.
                    </p>
                    `;
                      break;
                      case "14":
                      content = `
                      <h2>홍민</h2>
                      <div class="position-title">변호사</div>
                      <p>홍민 변호사는 PF사업 및 기타 각종 부동산개발, 공사대금 및 지체상금, 건축물에 대한 하자, 재건축, 재개발 기타 도시정비사업 등 각종 부동산 관련 소송 및 자문, 임시주주총회허가, 주주총회결의 취소, 직무집행정지가처분, 회계장부열람등사가처분 등 주식회사 관련 소송 및 자문, 보험 관련 소송 및 자문, 가압류, 가처분 등 보전처분 및 청구이의 등 집행 관련 소송 및 자문, 사기, 횡령, 배임, 명예훼손, 성범죄 등 일반 형사사건의 수사 및 재판 대응<br>현) 본아이에프 주식회사(본그룹/본죽) 자문</p>
                      `;
                        break;
                        case "15":
                        content = `
                        <h2>김도훈</h2>
                        <div class="position-title">변호사</div>
                        <p>홍후혁 변호사는 민·형사사건을 수행하고 있고, 특히 강제추행, 카메라등이용촬영, 성착취물소지, 통신매체이용음란 등 성범죄 사건에서 다수의 성공사례를 보유하고 있습니다. 또한 서울지방변호사회 형사당직 변호사로 활동하고 있습니다.</p>
                        `;
                          break;
                          case "16":
                          content = `
                          <h2>백종빈</h2>
                          <div class="position-title">변호사</div>
                          <p>홍민 변호사는 PF사업 및 기타 각종 부동산개발, 공사대금 및 지체상금, 건축물에 대한 하자, 재건축, 재개발 기타 도시정비사업 등 각종 부동산 관련 소송 및 자문, 임시주주총회허가, 주주총회결의 취소, 직무집행정지가처분, 회계장부열람등사가처분 등 주식회사 관련 소송 및 자문, 보험 관련 소송 및 자문, 가압류, 가처분 등 보전처분 및 청구이의 등 집행 관련 소송 및 자문, 사기, 횡령, 배임, 명예훼손, 성범죄 등 일반 형사사건의 수사 및 재판 대응</p>
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
    }

    // Reset height to auto temporarily to get the new content height
    activePanel.style.height = 'auto';
    const newHeight = panel.offsetHeight;

    // Animate to the new height
    requestAnimationFrame(() => {
        activePanel.style.height = `${newHeight}px`;
        scrollToPanel(activePanel);
    });

    // Update selected state and overlays
    selectedItem.classList.remove('selected');
    this.classList.add('selected');
    selectedItem = this;

    items.forEach(otherItem => {
        otherItem.querySelector('.partner-overlay').style.opacity = otherItem !== this ? '1' : '0';
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
document.addEventListener('click', function(event) {
   if (activePanel) {
     const isClickInsidePartnerItem = event.target.closest('.custom-partner-item');
     const isClickInsideInfoPanel = event.target.closest('.info-panel');

     if (!isClickInsidePartnerItem && !isClickInsideInfoPanel) {
       closePanel();
     }
   }
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
