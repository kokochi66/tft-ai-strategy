$(".slider").slick({
    dots: true,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: true,
    responsive: [
        {
            breakpoint: 768,
            settings: {
              autoplay:false,
                arrows: true,
                dots: true
                }
        }
    ]
});
// 메인 컨텐츠 col4 이미지 슬라이더 효과


$(".lightbox").lightGallery({
  autoplay: true,
  pause: 3000,
  progressBar: true
});
// 메인 컨텐츠 col5 라이트 박스 효과

$(".button").click(function(e){
  e.preventDefault();
  $(".nav").slideToggle();
  $(".button").toggleClass("open");

  if( $(".button").hasClass("open") ){
    $(".button").find("i").attr("class","fa fa-arrow-up");
  } else {
    $(".button").find("i").attr("class","fa fa-arrow-down");
  }
});
$(window).resize(function(){
  var wWidth = $(window).width();
  if(wWidth >= 600) $(".nav").removeAttr("style");
})
// 내비 접기/펼치기
