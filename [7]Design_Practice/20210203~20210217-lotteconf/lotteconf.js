document.addEventListener('DOMContentLoaded', () => {
  var header = document.getElementById('header'),
      title = document.querySelector('#header .title'),
      menu = document.querySelector('#header .menu'),
      menu_item = document.querySelectorAll('#header .menu li'),
      util = document.querySelector('#header .util');

  menu_item.forEach(elem => {elem.addEventListener('mouseenter', headerAdd);}); // 상단메뉴 오버
  header.addEventListener('mouseleave', headerRemove); // 상단메뉴 리브


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

  slide_initialize(top_slider,0); // 톱 슬라이드 초기 위치 지정
  slide_progress(top_progress,top_index);
  top_next.addEventListener('click', function() {
    if(top_clear){
      top_autoEnd = true;
      top_clear = false; // 슬라이드 시간동안 버튼 잠김
      slide_removeHidden(top_slides); // 숨김 z-index 초기화
      slide_next(top_slider,top_index); // 슬라이드 이동
      top_index = top_index+1 == top_slides.length ? 0 : top_index+1; // 현재 슬라이드 index 적용
      slide_progress(top_progress,top_index);
      setTimeout(function() {
        top_clear = true;
        top_autoEnd = false;
      },1000); // 슬라이드 시간 후 버튼 잠김을 품
    }
  }); // 톱 슬라이드 다음버튼 이벤트
  top_prev.addEventListener('click', function() {
    if(top_clear){
      top_autoEnd = true;
      top_clear = false; // 슬라이드 시간동안 버튼 잠김
      slide_removeHidden(top_slides); // 숨김 z-index 초기화
      slide_prev(top_slider,top_index); // 슬라이드 이동
      top_index = top_index-1 >= 0 ? top_index-1 : top_slides.length-1; // 현재 슬라이드 index 적용
      slide_progress(top_progress,top_index);
      setTimeout(function() {
        top_clear = true;
        top_autoEnd = false;
      },1000); // 슬라이드 시간 후 버튼 잠김을 품
    }
  }); // 톱 슬라이드 이전버튼 이벤트
  top_slide_autoplay();
  function top_slide_autoplay() {
    setTimeout(function(){
      if(top_clear && !top_autoEnd){
        top_clear = false; // 슬라이드 시간동안 버튼 잠김
        slide_removeHidden(top_slides); // 숨김 z-index 초기화
        slide_next(top_slider,top_index); // 슬라이드 이동
        top_index = top_index+1 == top_slides.length ? 0 : top_index+1; // 현재 슬라이드 index 적용
        slide_progress(top_progress,top_index);
        setTimeout(function() {
          top_clear = true;
        },1000); // 슬라이드 시간 후 버튼 잠김을 품
      }
      top_slide_autoplay();
    },8000);
  }

  var cont01 = document.querySelector('#contents .cont01'),
      cont01_left = document.querySelector('#contents .cont01 .left'),
      cont01_text = document.querySelector('#contents .cont01 .left .text'),
      cont01_text_item = document.querySelectorAll('#contents .cont01 .left .text .item'),
      cont01_prev = document.querySelector('#contents .cont01 .left .prev'),
      cont01_next = document.querySelector('#contents .cont01 .left .next'),
      cont01_right = document.querySelector('#contents .cont01 .right'),
      cont01_slider = document.querySelector('#contents .cont01 .right .slider'),
      cont01_slides = document.querySelectorAll('#contents .cont01 .right .slides'),
      cont01_slides_index = 0,
      cont01_slides_clear = true,
      cont01_slides_video = document.querySelectorAll('#contents .cont01 .right .slides video');
  slide_initialize(cont01_slider,0);
  cont01_active(cont01_text_item, 0);
  cont01_video_play(cont01_slides_video,0);
  cont01_prev.addEventListener('click', () => {
    if(cont01_slides_clear){
      cont01_slides_clear = false; // 슬라이드 시간동안 버튼 잠김
      slide_removeHidden(cont01_slides); // 숨김 z-index 초기화
      slide_prev(cont01_slider,cont01_slides_index); // 슬라이드 이동
      cont01_slides_index = cont01_slides_index-1 >= 0 ? cont01_slides_index-1 : cont01_slides.length-1; // 현재 슬라이드 index 적용
      cont01_active(cont01_text_item,cont01_slides_index);
      cont01_video_play(cont01_slides_video,cont01_slides_index);
      setTimeout(function() {
        cont01_slides_clear = true;
      },1000); // 슬라이드 시간 후 버튼 잠김을 품
    }
  });
  cont01_next.addEventListener('click', () => {
    if(cont01_slides_clear){
      cont01_slides_clear = false; // 슬라이드 시간동안 버튼 잠김
      slide_removeHidden(cont01_slides); // 숨김 z-index 초기화
      slide_next(cont01_slider,cont01_slides_index); // 슬라이드 이동
      cont01_slides_index = cont01_slides_index+1 == cont01_slides.length ? 0 : cont01_slides_index+1; // 현재 슬라이드 index 적용
      cont01_active(cont01_text_item,cont01_slides_index);
      cont01_video_play(cont01_slides_video,cont01_slides_index);
      setTimeout(function() {
        cont01_slides_clear = true;
      },1000); // 슬라이드 시간 후 버튼 잠김을 품
    }
  });

  var cont02 = document.querySelector('#contents .cont02');
  document.addEventListener('scroll', function(e){
    if(window.scrollY != 0) {
      header.classList.add('scroll');
    } else header.classList.remove('scroll');
    if(window.scrollY >= cont01.getBoundingClientRect().top) cont01.classList.add('display');
    if(window.scrollY >= cont02.getBoundingClientRect().top) cont02.classList.add('display');
  }); // 스크롤 이벤트
});
