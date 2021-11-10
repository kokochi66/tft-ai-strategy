function headerAdd() {
  header.classList.add('hover');
}
function headerRemove(a) {
  header.classList.remove('hover');
}


function slide_initialize(tg, index) {
  var slds = tg.querySelectorAll('.slides'),
      max = slds.length;
  slds[index].style.left = 0;
  slds[index+1 < max ? index+1 : 0].style.left = 100+'%';
  slds[index-1 >= 0 ? index-1 : max-1].style.left = (-100)+'%';
  slds[index].classList.add('active');
}
function slide_next(tg, index) {
  var slds = tg.querySelectorAll('.slides'),
      max = slds.length;
  slds[index].classList.remove('active');
  slds[index-1 >= 0 ? index-1 : max-1].classList.add('hidden');
  slds[index+1 < max ? index+1 : 0].classList.add('active');
  slds[index].style.left = (-100)+'%';
  slds[index+1 < max ? index+1 : 0].style.left = 0;
  slds[index-1 >= 0 ? index-1 : max-1].style.left = 100+'%';
}
function slide_prev(tg, index) {
  var slds = tg.querySelectorAll('.slides'),
      max = slds.length;
  slds[index].classList.remove('active');
  slds[index+1 < max ? index+1 : 0].classList.add('hidden');
  slds[index-1 >= 0 ? index-1 : max-1].classList.add('active');
  slds[index].style.left = 100+'%';
  slds[index+1 < max ? index+1 : 0].style.left = (-100)+'%';
  slds[index-1 >= 0 ? index-1 : max-1].style.left = 0;
}
function slide_removeHidden(slds) {
  slds.forEach(elem => {
    elem.classList.remove('hidden');
  });
}
function slide_progress(tg, index) {
  tg.classList.remove('state01');
  tg.classList.remove('state02');
  tg.classList.remove('state03');
  tg.classList.add('state0'+(index+1));
}
function cont01_active(tg, index){
  tg.forEach(elem => {
    elem.classList.remove('active');
  });
  tg[index].classList.add('active');
}
function cont01_video_play(tg, index) {
  tg.forEach(elem => {
    elem.pause();
  });
  tg[index].play();
}