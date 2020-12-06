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
// 스와이퍼


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
