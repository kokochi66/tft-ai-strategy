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


$(".lightbox").lightGallery();
// 메인 컨텐츠 col5 라이트 박스 효과
