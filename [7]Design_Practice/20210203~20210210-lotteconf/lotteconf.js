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
      top_prev = document.querySelector('#contents .top-slider .prev'),
      top_next = document.querySelector('#contents .top-slider .next'),
      top_progress = document.querySelector('#contents .top-slider .progressbar'),
      top_banner = document.querySelector('#contents .top-slider .banner');

  slide_initialize(top_slider,0); // 톱 슬라이드 초기 위치 지정
  top_next.addEventListener('click', function() {
    if(top_clear){
      top_clear = false; // 슬라이드 시간동안 버튼 잠김
      slide_removeHidden(top_slides); // 숨김 z-index 초기화
      slide_next(top_slider,top_index); // 슬라이드 이동
      top_index = top_index+1 == top_slides.length ? 0 : top_index+1; // 현재 슬라이드 index 적용
      setTimeout(function() {
        top_clear = true;
      },1000);
    }
  }); // 톱 슬라이드 다음버튼 이벤트
  top_prev.addEventListener('click', function() {
    if(top_clear){
      top_clear = false; // 슬라이드 시간동안 버튼 잠김
      slide_removeHidden(top_slides); // 숨김 z-index 초기화
      slide_prev(top_slider,top_index); // 슬라이드 이동
      top_index = top_index-1 >= 0 ? top_index-1 : top_slides.length-1; // 현재 슬라이드 index 적용
      setTimeout(function() {
        top_clear = true;
      },1000);
    }
  }); // 톱 슬라이드 이전버튼 이벤트
});
