
const body = document.querySelector('body'),
      menu_menuIcon = document.querySelector('#menu'),
      menu_menuSide = document.querySelector('#menu_side'),
      menu_menuSide_block = document.querySelector('#menu_side .side-block'),
      menu_menuSide_bg = document.querySelector('#menu_side .side-bg');

menu_menuSide_bg.addEventListener('click', () => {
  menu_menuSide.classList.remove('active')
})
menu_menuIcon.addEventListener('click', () => {
  menu_menuSide.classList.add('active')
})
// 사이드 메뉴 바 구현
