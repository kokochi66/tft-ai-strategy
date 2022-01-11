const mapRoute = [
    [0,0],
    [0,1],
    [0,1],
    [0,1],
    [1,0],
    [1,0],
    [1,0],
    [1,0],
    [1,0],
    [1,0],
    [1,0],
    [1,0],
    [1,0],
    [0,-1],
    [0,-1],
    [0,-1],
    [-1,0],
    [-1,0],
    [-1,0],
    [0,1],
    [0,1],
    [0,1],
    [0,1],
    [0,1],
    [0,1],
    [0,1],
    [0,1],
    [0,1],
    [1,0],
    [1,0],
    [1,0],
    [0,-1],
    [0,-1],
    [0,-1],
    [-1,0],
    [-1,0],
    [-1,0],
    [-1,0],
    [-1,0],
    [-1,0],
    [-1,0],
    [-1,0],
    [-1,0],
    [0,1],
    [0,1],
    [0,1],
    [1,0],
    [1,0],
    [1,0],
    [0,-1],
    [0,-1],
    [0,-1],
    [0,-1],
    [0,-1],
    [0,-1],
    [0,-1],
    [0,-1],
    [0,-1],
];
const mapStartX = 150;
const mapStartY = 100;

const df = [
    {name:'A', color:'#113992FF', power: 10, attackSpeed: 30, projectileSpeed: 20, comb: [{material:0, result:5},{material:2, result:10},{material:4, result:11}]},
    {name:'B', color:'#119252FF', power: 20, attackSpeed: 100, projectileSpeed: 30, comb: [{material:1, result:6},{material:2, result:12},{material:3, result:13}]},
    {name:'C', color:'#729211FF', power: 100, attackSpeed: 200, projectileSpeed: 10, comb: [{material:2, result:7},{material:0, result:10},{material:1, result:12}]},
    {name:'D', color:'#5e1192FF', power: 2, attackSpeed: 10, projectileSpeed: 50, comb: [{material:3, result:8},{material:1, result:13},{material:4, result:14}]},
    {name:'E', color:'#92114bFF', power: 20, attackSpeed: 70, projectileSpeed: 50, comb: [{material:4, result:9},{material:0, result:11},{material:3, result:14}]},
    {name:'A+', color:'#113992FF', power: 30, attackSpeed: 30, projectileSpeed: 20, comb: [{material:0, result:0}]},
    {name:'B+', color:'#119252FF', power: 50, attackSpeed: 100, projectileSpeed: 30},
    {name:'C+', color:'#729211FF', power: 250, attackSpeed: 200, projectileSpeed: 10},
    {name:'D+', color:'#5e1192FF', power: 5, attackSpeed: 10, projectileSpeed: 50},
    {name:'E+', color:'#92114bFF', power: 50, attackSpeed: 70, projectileSpeed: 50},
    {name:'AC', color:'#113992FF', power: 30, attackSpeed: 30, projectileSpeed: 20, comb: [{material:0, result:0}]},
    {name:'AE', color:'#119252FF', power: 50, attackSpeed: 100, projectileSpeed: 30},
    {name:'BC', color:'#729211FF', power: 250, attackSpeed: 200, projectileSpeed: 10},
    {name:'BD', color:'#5e1192FF', power: 5, attackSpeed: 10, projectileSpeed: 50},
    {name:'DE', color:'#92114bFF', power: 50, attackSpeed: 70, projectileSpeed: 50},
];

const controller = document.querySelectorAll('#controller > div');
const exitBtn = document.querySelectorAll('.exit');

const controlMainBox = {
    start : controller[0].querySelector('.start'),
    nextInfo : controller[0].querySelector('.nextInfo'),
    end : controller[0].querySelector('.end'),
}
const statusInfoBox = {
    name : controller[1].querySelector('.name'),
    power : controller[1].querySelector('.power'),
    attackSpeed : controller[1].querySelector('.attackSpeed'),
    projectileSpeed : controller[1].querySelector('.projectileSpeed'),
    combiSet : controller[1].querySelector('.combi-set'),
}

function controlClick(idx) {
    for(let i=0;i<controller.length;i++) {
        if(idx === i) {
            controller[i].classList.remove('displayNone');
        } else if(!controller[i].classList.contains('displayNone')) {
            controller[i].classList.add('displayNone');
        }
    }
}

for(let i=0;i<exitBtn.length;i++) {
    exitBtn[i].addEventListener('click', (e) => {
        controlClick(0);
    })
}