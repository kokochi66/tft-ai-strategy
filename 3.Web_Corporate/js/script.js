var mySwiper = new Swiper('.swiper-container',{
  pagination: {
    el: '.swiper-pagination',
  },
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  }, autoplay: {
    delay: 5000,
  },
});
// 메인 비주얼 스와이퍼
//
var mySwiper = new Swiper('.swiper-container2',{
  slidesPerView:4,
  spaceBetween:24,
  mousewheel:{
    invert: true,
  },
  keyboard: {
    enabled: true,
    onlyInViewport: false,
  },
  breakpoints: {
    600: {
      slidesPerView: 1.4,
      spaceBetween: 24
    },
    768: {
      slidesPerView: 2,
      spaceBetween: 24
    },
    960: {
      slidesPerView: 3,
      spaceBetween: 24
    },
  }
});
// 영화 차트 스와이퍼


var movBtn = $(".title > ul li");
var movContents = $(".chart_cont");
movContents.hide();
movContents.eq(0).show();
movBtn.click(function(e) {
  e.preventDefault();
  var target = $(this);
  var index = target.index();
  movBtn.removeClass("active");
  target.addClass("active");
  movContents.hide();
  movContents.eq(index).show();
});
