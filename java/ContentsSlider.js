$(document).ready(function () {
  const $slider = $('.thumbnail-slider');
  const $mainImage = $('#mainImage');
  const $mainLink = $('#mainLink');
  const $contentItems = $('.content-item');
  const $heart = $('.heart-container');
  const $progressDot = $('.progress-dot');
  const $progressBar = $('.progress-bar');
  const totalItems = $contentItems.length;
  const dotStep = 100 / (totalItems - 1);

  const heartStates = Array(totalItems).fill(false);
  let currentIndex = 0;

  // 썸네일 클릭 시 이동하지 않도록 링크 제거 (HTML에도 <a> 대신 <img>로 교체하면 더 좋음)
  $slider.on('click', 'a', function (e) {
    e.preventDefault();
  });

  // 썸네일 순서대로 링크 입력
  const imageLinks = [  
    "#",
    "#",
    "#",
    "#",
    "#",
    "#",
    "#",
    "#"
  ];

  $slider.slick({
    slidesToShow: 5,
    centerMode: true,
    centerPadding: '0px',
    arrows: false,
    dots: false,
    focusOnSelect: true,
    responsive: [
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 3,
          centerMode: true
        }
      }
    ]
  });

  // 공통 UI 업데이트 함수
  function updateUI(index) {
    if (index === currentIndex) return;

    currentIndex = index;
    const src = $slider.find('img[data-index="' + index + '"]').attr('src');

    $mainImage.attr('src', src);
    $mainLink.attr('href', imageLinks[index]); // 링크 업데이트

    $contentItems.hide();
    $contentItems.eq(index).show();

    $heart.toggleClass('filled', heartStates[index]);

    const progressPercentage = ((index + 1) / totalItems) * 100;
    $progressBar.css('width', `${progressPercentage}%`);
    $progressDot.css('left', `${index * dotStep}%`);

    $slider.slick('slickGoTo', index, true);
  }

  // 썸네일 클릭 시
  $slider.on('click', 'img', function () {
    const index = $(this).data('index');
    updateUI(index);
  });

  // 하트 토글
  $heart.on('click keypress', function (e) {
    if (e.type === 'click' || (e.type === 'keypress' && (e.key === 'Enter' || e.key === ' '))) {
      e.preventDefault();
      $(this).toggleClass('filled');
      heartStates[currentIndex] = $(this).hasClass('filled');
    }
  });

  // 프로그레스 도트 드래그 기능
  let isDragging = false;
  const $container = $('.progress-dots-container');

  $progressDot.on('mousedown touchstart', function (e) {
    isDragging = true;
    e.preventDefault();
  });

  let dragTimeout;
  function updateUIThrottled(index) {
    clearTimeout(dragTimeout);
    dragTimeout = setTimeout(() => {
      updateUI(index);
    }, 5);
  }

  $(document).on('mousemove touchmove', function (e) {
    if (!isDragging) return;

    const containerOffset = $container.offset().left;
    const containerWidth = $container.width();
    const clientX = e.type.includes('touch') ? e.originalEvent.touches[0].clientX : e.clientX;
    let relativeX = clientX - containerOffset;

    relativeX = Math.max(0, Math.min(relativeX, containerWidth));
    const percent = (relativeX / containerWidth) * 100;
    const index = Math.round((percent / 100) * (totalItems - 1));
    updateUIThrottled(index);
  });

  $(document).on('mouseup touchend', function () {
    if (isDragging) {
      isDragging = false;
    }
  });

  // 초기 상태 설정
  updateUI(0);
});
