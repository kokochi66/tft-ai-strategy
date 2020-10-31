// 탭메뉴 설정 (.tab_menu1)
var $tabMenuList = $(".tab_menu1");
$tabMenuList.find("ul ul").hide();
$tabMenuList.find("ul .active_tab ul").show();
function tabMenuSight(e){
    e.preventDefault();
    var $Button = $(this);
    $Button.next("ul").show().parent("li").addClass("active_tab").siblings("li").removeClass("active_tab").find(">ul").hide();
    $Button.parent("li").siblings("li").find("a").removeClass("active_tab_a");
    $Button.addClass("active_tab_a");
}
$tabMenuList.find("ul li a").click(tabMenuSight).focus(tabMenuSight);

$(".gallery_img").slick({
    arrows: false,
    fade: true
});
$(".play").click(function() {
    $(".gallery_img").slick("slickPlay");
})
$(".pause").click(function() {
    $(".gallery_img").slick("slickPause");
})
$(".prev").click(function() {
    $(".gallery_img").slick("slickPrev");
})
$(".next").click(function() {
    $(".gallery_img").slick("slickNext");
})

// 라이트 갤러리 박스
$(".lightgallery").lightGallery({
    thembnail: true,
    autoplay: false,
    progressBar: true
});


// 배너 (.ban)
// html 마크업 -> CSS 연동 -> JQuery연동 -> JQuery 호출
$(".ban").slick({
    infinite : true,
    slidesToShow:3,
    slidesToScroll:1,
    autoplay:true,
    autoScroll:2000,
    dots:true
    
});

// 버튼을 클릭하면 전체 메뉴를 보이게 함
$(".tit .btn").click(function(e){
    e.preventDefault();
    // $("#cont_nav").css("display","block");
    // $("#cont_nav").show();
    // $("#cont_nav").fadeIn();
    // $("#cont_nav").slideDown();
    // $("#cont_nav").toggle();
    // $("#cont_nav").fadeToggle();
    $("#cont_nav").slideToggle(200);
    $(this).toggleClass("on");
});

//레이어 팝업 띄우기
$(".ViewPoP").click(function(e){
    e.preventDefault(); 
    // $("#layer").css("display","block");
    $("#layer").slideDown(250);
});
$(".closePOP").click(function (e) {  
    e.preventDefault(); 
    // $("#layer").fadeOut();
    $("#layer").slideUp(250);
});

$(".ViewWinPoP").click(function(e) {
    e.preventDefault();
    // window.open("파일명","팝업이름","옵션설정")
    // 종류 : left, top, width, height, status, toolbar, location , menubar, scrollbar, fullscreen
    window.open("pop/winpop.html","winpop1","width=800, height=590, left=50, top=50, scrollbars=0, toolbar=0, menubar=0")
});