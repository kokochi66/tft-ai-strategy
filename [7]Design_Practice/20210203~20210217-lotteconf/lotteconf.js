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
      cont01_slides_index = 0,
      cont01_slides_clear = true,
      cont01_slides_video = document.querySelectorAll('#contents .cont01 .right .slides video');

  var cont01_swiper = new Swiper(cont01_right, {
    loop: true,
    navigation: {
      nextEl: cont01_next,
      prevEl: cont01_prev,
    }
  });
  // slide_initialize(cont01_slider,0);
  // cont01_active(cont01_text_item, 0);
  // cont01_video_play(cont01_slides_video,0);
  // cont01_prev.addEventListener('click', () => {
  //   if(cont01_slides_clear){
  //     cont01_slides_clear = false; // 슬라이드 시간동안 버튼 잠김
  //     slide_removeHidden(cont01_slides); // 숨김 z-index 초기화
  //     slide_prev(cont01_slider,cont01_slides_index); // 슬라이드 이동
  //     cont01_slides_index = cont01_slides_index-1 >= 0 ? cont01_slides_index-1 : cont01_slides.length-1; // 현재 슬라이드 index 적용
  //     cont01_active(cont01_text_item,cont01_slides_index);
  //     cont01_video_play(cont01_slides_video,cont01_slides_index);
  //     setTimeout(function() {
  //       cont01_slides_clear = true;
  //     },1000); // 슬라이드 시간 후 버튼 잠김을 품
  //   }
  // });
  // cont01_next.addEventListener('click', () => {
  //   if(cont01_slides_clear){
  //     cont01_slides_clear = false; // 슬라이드 시간동안 버튼 잠김
  //     slide_removeHidden(cont01_slides); // 숨김 z-index 초기화
  //     slide_next(cont01_slider,cont01_slides_index); // 슬라이드 이동
  //     cont01_slides_index = cont01_slides_index+1 == cont01_slides.length ? 0 : cont01_slides_index+1; // 현재 슬라이드 index 적용
  //     cont01_active(cont01_text_item,cont01_slides_index);
  //     cont01_video_play(cont01_slides_video,cont01_slides_index);
  //     setTimeout(function() {
  //       cont01_slides_clear = true;
  //     },1000); // 슬라이드 시간 후 버튼 잠김을 품
  //   }
  // });

  var cont02 = document.querySelector('#contents .cont02');
  document.addEventListener('scroll', function(e){
    if(window.scrollY != 0) {
      header.classList.add('scroll');
    } else header.classList.remove('scroll');
    if(window.scrollY >= cont01.getBoundingClientRect().top) cont01.classList.add('display');
    if(window.scrollY >= cont02.getBoundingClientRect().top) cont02.classList.add('display');
  }); // 스크롤 이벤트
});
