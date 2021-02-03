document.addEventListener('DOMContentLoaded', () => {
  var header = document.getElementById('header'),
      title = document.querySelector('#header .title'),
      menu = document.querySelector('#header .menu'),
      menu_item = document.querySelectorAll('#header .menu li'),
      util = document.querySelector('#header .util');

  menu_item.forEach(elem => {
    elem.addEventListener('mouseenter',() => {
      header.classList.add('hover');
    });
  });
  header.addEventListener('mouseleave', () => {
    header.classList.remove('hover');
  });

});
