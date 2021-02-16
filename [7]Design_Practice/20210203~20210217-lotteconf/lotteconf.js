document.addEventListener('DOMContentLoaded', () => {
  var header = document.getElementById('header'),
      title = document.querySelector('#header .title'),
      menu = document.querySelector('#header .menu'),
      menu_item = document.querySelectorAll('#header .menu .item'),
      util = document.querySelector('#header .util'),
      menu_bar = document.querySelector('#header .menu-bar'),
      menu_cancel = document.querySelector('#header .menu-cancel'),
      menu_open = document.querySelectorAll('#header .menu li .down'),
      menu_item_cont = document.querySelectorAll('#header .menu li ul');

  menu_item.forEach(elem => {elem.addEventListener('mouseenter', headerAdd);}); // 상단메뉴 오버
  header.addEventListener('mouseleave', headerRemove); // 상단메뉴 리브
  menu_bar.addEventListener('click', function(){header.classList.add('active');}); // 반응형 사이드 메뉴
  menu_cancel.addEventListener('click', function(){header.classList.remove('active');}); // 반응형 사이드 메뉴 닫기
  menu_open.forEach((elem,i) => {
    elem.addEventListener('click', () => {
      if(menu_item[i].classList.contains('open')) {
        menu_item[i].removeAttribute('style');
        menu_item[i].classList.remove('open');
      } else {
        var ul_height = menu_item_cont[i].clientHeight;
        menu_item[i].style.paddingBottom = ul_height+'px';
        menu_item[i].classList.add('open');
      }
    });
  }); // 반응형 사이드 메뉴 상세열기

  var contents = document.getElementById('contents'),
      top_slider = document.querySelector('#contents .top-slider .slider'),
      top_slides = document.querySelectorAll('#contents .top-slider .slider .slides'),
      top_curr = document.querySelectorAll('#contents .top-slider .slider .slides')[0],
      top_index = 0,
      top_clear = true,
      top_autoEnd = false,
      top_prev = document.querySelector('#contents .top-slider .prev'),
      top_next = document.querySelector('#contents .top-slider .next'),
      top_progress = document.querySelector('#contents .top-slider .progressbar'),
      top_banner = document.querySelector('#contents .top-slider .banner');

  var top_swiper = new Swiper('#top-slider', {
      loop: true,
      pagination: {
        el: '#top-slider .progressbar',
        type: 'progressbar',
      },
      autoplay : {  // 자동 슬라이드 설정 , 비 활성화 시 false
        delay : 5000,   // 시간 설정
        disableOnInteraction : false,  // false로 설정하면 스와이프 후 자동 재생이 비활성화 되지 않음
      },
      navigation: {   // 버튼 사용자 지정
    	nextEl: '#top-slider .next',
    	prevEl: '#top-slider .prev',
    },
  });

  var cont01 = document.querySelector('#contents .cont01'),
      cont01_left = document.querySelector('#contents .cont01 .left'),
      cont01_text = document.querySelector('#contents .cont01 .left .text'),
      cont01_text_item = document.querySelectorAll('#contents .cont01 .left .text .item'),
      cont01_prev = document.querySelector('#contents .cont01 .left .prev'),
      cont01_next = document.querySelector('#contents .cont01 .left .next'),
      cont01_right = document.querySelector('#contents .cont01 .swiper-container'),
      cont01_slider = document.querySelector('#contents .cont01 .right .slider'),
      cont01_slides = document.querySelectorAll('#contents .cont01 .right .slides'),
      cont01_active_slide = document.querySelector('#contents .cont01 .right .slides .swiper-slide-active'),
      cont01_slides_video = document.querySelectorAll('#contents .cont01 .right .slides video');

  var cont01_swiper = new Swiper(cont01_right, {
    loop: true,
    navigation: {
      nextEl: cont01_next,
      prevEl: cont01_prev,
    },
  }); // cont01의 Swiper
  cont01_swiper.on('transitionEnd', function (e) {
    cont01_active_slide = document.querySelector('#contents .cont01 .right .slider .swiper-slide-active');
    var data_index = cont01_active_slide.getAttribute('data-swiper-slide-index');
    cont01_text_item.forEach(elem => {
      elem.classList.remove('active');
    });
    cont01_text_item[data_index].classList.add('active');
  }); // 슬라이드가 움직일 때 마다 텍스트 변경효과

  var cont02 = document.querySelector('#contents .cont02');
  var cont03 = document.querySelector('#contents .cont03'),
      cont03_slider = document.getElementById('cont03-slider'),
      cont03_text = document.querySelectorAll('.cont03 .main-text .text'),
      cont03_active_slide = document.querySelector('.cont03 .swiper-container .swiper-wrapper .swiper-slide-active'),
      cont03_ban_item = document.querySelectorAll('.cont03 .banner .ban-item');
  var cont03_swiper = new Swiper(cont03_slider, {
    loop: true,
  });
  cont03_swiper.on('transitionEnd', function (e) {
    cont03_active_slide = document.querySelector('.cont03 .swiper-container .swiper-wrapper .swiper-slide-active');
    var data_index = cont03_active_slide.getAttribute('data-swiper-slide-index');
    console.log(cont03_ban_item[data_index]);
    cont03_text.forEach(elem => {
      elem.classList.remove('active');
    });
    cont03_ban_item.forEach(elem => {
      elem.classList.remove('active');
    });
    cont03_text[data_index].classList.add('active');
    cont03_ban_item[data_index].classList.add('active');
  }); // 슬라이드가 움직일 때 마다 텍스트 변경효과

  document.addEventListener('scroll', function(e){
    if(window.scrollY != 0) {
      header.classList.add('scroll');
    } else header.classList.remove('scroll');
    if(window.scrollY >= cont01.getBoundingClientRect().top+100) cont01.classList.add('display');
    if(window.scrollY >= cont02.getBoundingClientRect().top+100) cont02.classList.add('display');
    if(window.scrollY >= cont03.getBoundingClientRect().top+100) cont03.classList.add('display');
  }); // 스크롤 이벤트
});
