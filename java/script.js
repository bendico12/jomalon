document.addEventListener('DOMContentLoaded', function () {
    const menu_btn = document.querySelector('.hamburgur');
    const menu = document.querySelector('.menu');
    const body = document.body;
    const header = document.querySelector('header');
  
    // 1. 페이지 시작 시 헤더 표시
    header.classList.add('visible');
  
    // 2. 햄버거 메뉴 토글
    if (menu_btn && menu) {
      menu_btn.addEventListener('click', function () {
        menu_btn.classList.toggle('is-active');
        menu.classList.toggle('is-active');
        header.classList.add('visible');
  
        if (menu.classList.contains('is-active')) {
          body.classList.add('no-scroll');
        } else {
          body.classList.remove('no-scroll');
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
  });
  
  
  