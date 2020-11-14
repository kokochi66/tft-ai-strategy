
var TopMenuButton = $("#TOPnav ul li");     // 탑nav 메뉴버튼
var ContentSection = $("article section");  // 컨텐츠 섹션창

TopMenuButton.click(function(e) {
    e.preventDefault();                     // HTML의 # 기본기능 차단
    var CurrTargetButton = $(this);         // 입력된 버튼 변수할당
    var index = CurrTargetButton.index();
    var offset = ContentSection.eq(index).offset();
    $("html, body").animate({scrollTop: offset.top},600,"easeInOutQuint");
});

$(window).scroll(function() {
        var CurrScroolVar = $(this).scrollTop();
        if(CurrScroolVar >= ContentSection.eq(0).offset().top) {
            TopMenuButton.removeClass("active");
            TopMenuButton.eq(0).addClass("active");
        }
        if(CurrScroolVar >= ContentSection.eq(1).offset().top) {
            TopMenuButton.removeClass("active");
            TopMenuButton.eq(1).addClass("active");
        }
        if(CurrScroolVar >= ContentSection.eq(2).offset().top) {
            TopMenuButton.removeClass("active");
            TopMenuButton.eq(2).addClass("active");
        }
        if(CurrScroolVar >= ContentSection.eq(3).offset().top) {
            TopMenuButton.removeClass("active");
            TopMenuButton.eq(3).addClass("active");
        }
        if(CurrScroolVar >= ContentSection.eq(4).offset().top) {
            TopMenuButton.removeClass("active");
            TopMenuButton.eq(4).addClass("active");
        }
    })
