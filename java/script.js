document.addEventListener('DOMContentLoaded', function () {
    const menu_btn = document.querySelector('.hamburgur');
    const menu = document.querySelector('.menu');
    const body = document.body;
    const header = document.querySelector('header');
  
    // 1. 페이지 시작 시 헤더 표시
    header.classList.add('visible');
  
    // 2. 햄버거 메뉴 토글
   if (menu_btn && menu) {
    let scrollPosition = 0;

    menu_btn.addEventListener('click', function () {
      const isActive = menu_btn.classList.toggle('is-active');
      menu.classList.toggle('is-active', isActive);

      if (isActive) {
        scrollPosition = window.scrollY;
        body.classList.add('no-scroll');
        body.style.top = `-${scrollPosition}px`;
      } else {
        body.classList.remove('no-scroll');
        body.style.top = '';
        window.scrollTo({ top: scrollPosition, behavior: 'instant' });
      }
    });
  }


  
    // 3. 스크롤 감지
    let lastScrollY = window.scrollY;
  
    window.addEventListener('scroll', () => {
      const currentScrollY = window.scrollY;
  
      if (menu.classList.contains('is-active')) return;
  
      if (currentScrollY === 0 || currentScrollY < lastScrollY) {
        header.classList.add('visible');
      } else {
        header.classList.remove('visible');
      }
  
      lastScrollY = currentScrollY;
    });
  });
  

    
  
  
  $(document).ready(function () {
    $('.mobile_nav > li > a').on('click', function (e) {
      e.preventDefault(); // 기본 링크 동작 방지
  
      const $li = $(this).parent(); 
      const $mobileSub = $li.find('.mobile_sub');
  
      if ($mobileSub.is(':visible')) {
        $mobileSub.slideUp(300);
      } else {
        $('.mobile_sub').slideUp(300); // 다른 메뉴 닫기
        $mobileSub.slideDown(300);     // 현재 메뉴 열기
  
        // ✅ 첫 번째 new_nav 항목 자동 선택
        const $firstItem = $mobileSub.find('.new_nav > li').first();
        const bg = $firstItem.data('bg');
        const target = $firstItem.data('target');
  
        $mobileSub.find('.sub_left').css('background-image', `url(${bg})`);
        $mobileSub.find('.new_nav > li').removeClass('active');
        $firstItem.addClass('active');
  
        $mobileSub.find('._sub').hide();
        $mobileSub.find(`._sub[data-target="${target}"]`).fadeIn();
      }
    });
  
    // ✅ new_nav 항목 클릭 시 배경 변경 및 _sub 표시
    $('.mobile_sub .new_nav > li').on('click', function (e) {
      e.preventDefault();
  
      const target = $(this).data('target');
      const bg = $(this).data('bg');
      const $mobileSub = $(this).closest('.mobile_sub');
      const $subLeft = $(this).closest('.sub_left');
  
      $subLeft.css('background-image', `url(${bg})`);
      $(this).siblings().removeClass('active');
      $(this).addClass('active');
  
      $mobileSub.find('._sub').hide();
      $mobileSub.find(`._sub[data-target="${target}"]`).fadeIn();
    });
  });
  
  
  $(document).ready(function () {
    let currentTarget = null; // 현재 열린 서브 메뉴 타겟
  
    $('.nav > li').on('click', function (e) {
      e.preventDefault();
      const target = $(this).data('target');
     
      // hover 스타일
      $('.nav > li').removeClass('hovered');
      $(`.nav > li[data-target="${target}"]`).addClass('hovered');
      
      // 만약 이미 열려있는 상태에서 같은 항목을 다시 클릭하면 닫기
      if (currentTarget === target && $('.pc_sub').is(':visible')) {
        $('.pc_sub').fadeOut(200);
        $('.pc_sub .sub').fadeOut(200);
        currentTarget = null;
        return;
      }
  
      // target이 다르거나 처음 클릭한 경우
      currentTarget = target;
  
      // pc_sub 보이게
      if (!$('.pc_sub').is(':visible')) {
        $('.pc_sub').fadeIn(200);
      }
  
      // 모든 서브 숨기고 해당 target만 표시
      $('.pc_sub .sub').stop(true, true).fadeOut(200);
      const $currentSub = $(`.pc_sub .sub[data-target="${target}"]`);
      $currentSub.stop(true, true).fadeIn(300);
  
      // 첫 아이템 설정
      const $firstItem = $currentSub.find('.new_nav > li').first();
      const bg = $firstItem.data('bg');
      const subTarget = $firstItem.data('target');
  
      $currentSub.find('.sub_left').css('background-image', `url(${bg})`);
      $currentSub.find('.new_nav > li').removeClass('active');
      $firstItem.addClass('active');
  
      $currentSub.find('._sub').hide();
      $currentSub.find(`._sub[data-target="${subTarget}"]`).fadeIn();
    });
  
    // 바깥 클릭 시 닫기
    $(document).on('click', function (e) {
      if (!$(e.target).closest('.pc_sub, .nav').length) {
        $('.pc_sub').fadeOut(200);
        $('.pc_sub .sub').fadeOut(200);
        currentTarget = null;
      }
    });
  
    // 내부 탭 전환 (new_nav)
    $('.pc_sub .new_nav > li').on('click', function (e) {
      e.preventDefault();
  
      const target = $(this).data('target');
      const bg = $(this).data('bg');
      const $sub = $(this).closest('.sub');
      const $subLeft = $sub.find('.sub_left');
  
      $subLeft.css('background-image', `url(${bg})`);
      $(this).siblings().removeClass('active');
      $(this).addClass('active');
  
      $sub.find('._sub').hide();
      $sub.find(`._sub[data-target="${target}"]`).fadeIn();
    });

    // ✅ 여기가 핵심: `.sub`을 벗어나면 닫기
    $('.pc_sub .sub').on('mouseleave', function () {
        $('.pc_sub').fadeOut(200);
        $('.pc_sub .sub').fadeOut(200);
        $('.nav > li').removeClass('hovered');
        currentTarget = null;
      }, );

  });
  
  
   const infoIcon = document.getElementById('info-icon');
    const tooltip = document.getElementById('info-tooltip');

    // 툴팁 위치를 아이콘 왼쪽 고정 위치로 맞춤
    function positionTooltip() {
      const rect = infoIcon.getBoundingClientRect();
      // 아이콘 왼쪽 기준으로 툴팁 위치 계산
      // 약간 오른쪽 여백 8px 주고, 수직 중앙 맞춤
      const left = rect.left - tooltip.offsetWidth - 8;
      const top = rect.top + rect.height / 2 - tooltip.offsetHeight / 2;

      // 화면 밖으로 나가는거 방지
      tooltip.style.left = (left < 8 ? 8 : left) + 'px';
      tooltip.style.top = (top < 8 ? 8 : top) + 'px';
    }

    // 마우스가 infoIcon 위에 있을 때만 툴팁 표시 + 위치 재조정
    infoIcon.addEventListener('mouseenter', () => {
      tooltip.style.display = 'block';
      tooltip.style.opacity = '1';
      positionTooltip();
    });

    infoIcon.addEventListener('mouseleave', () => {
      tooltip.style.display = 'none';
      tooltip.style.opacity = '0';
    });

    // 화면 리사이즈 시 툴팁 위치 재조정
    window.addEventListener('resize', () => {
      if (tooltip.style.display === 'block') {
        positionTooltip();
      }
    });

    function validateForm() {
      const email = document.getElementById('email');
      const error = document.getElementById('email-error');
      const form = document.getElementById('form-container');
      const thankYou = document.getElementById('thank-you-message');
      const value = email.value.trim();
      const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      error.textContent = '';
      email.classList.remove('error');
      email.setAttribute('aria-invalid', 'false');

      if (!value) {
        error.textContent = 'Please enter your email address.';
        email.classList.add('error');
        email.setAttribute('aria-invalid', 'true');
        return;
      }

      if (!pattern.test(value)) {
        error.textContent = 'Please enter a valid email address.';
        email.classList.add('error');
        email.setAttribute('aria-invalid', 'true');
        return;
      }

      if (value.toLowerCase() === 'notfound@example.com') {
        error.textContent = "This email address doesn't appear to exist.";
        email.classList.add('error');
        email.setAttribute('aria-invalid', 'true');
        return;
      }

      form.classList.add('hidden');
      thankYou.classList.remove('hidden');
    }

    document.getElementById('email').addEventListener('keypress', function (e) {
      if (e.key === 'Enter') {
        e.preventDefault();
        validateForm();
      }
    });

    document.addEventListener("DOMContentLoaded", function () {
  if (window.innerWidth <= 480) {
    const headers = document.querySelectorAll("footer h2");

    headers.forEach(h2 => {
      h2.addEventListener("click", function () {
        const ul = this.nextElementSibling;
        
        // 닫기 전 다른 ul 모두 닫기 (선택사항)
        document.querySelectorAll("footer ul").forEach(list => {
          if (list !== ul) list.classList.remove("show");
        });
        document.querySelectorAll("footer h2").forEach(header => {
          if (header !== this) header.classList.remove("active");
        });

        ul.classList.toggle("show");
        this.classList.toggle("active");
      });
    });
  }
});
