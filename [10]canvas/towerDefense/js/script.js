const canvas = document.getElementById('canvas1')
const ctx = canvas.getContext('2d')
canvas.width = 800;
canvas.height = 650;

//global variables;
const cellSize = 50;
const cellGap = 3;
const gameGrid = [];
const defenders = [];
const enemies = [];
const enemyPosition = [];
const mapTiles = [];
let enemiesInterval = 600;
let frame = 0;
let numberOfResources = 300;


// mouse
const mouse = {
    x : 10,
    y : 10,
    width : 0.1,
    height : 0.1,
}
let canvasPosition = canvas.getBoundingClientRect();
canvas.addEventListener('mousemove', function (e) {
    mouse.x = e.x - canvasPosition.left;
    mouse.y = e.y - canvasPosition.top;
})
canvas.addEventListener('mouseleave', function (e) {
    mouse.x = undefined;
    mouse.y = undefined;
})

// game board
const controlsBar = {
    width: canvas.width,
    height: cellSize,
}
class Cell {
    constructor(x,y) {
        this.x = x;
        this.y = y;
        this.width = cellSize;
        this.height = cellSize;
        this.draw();
    }
    draw() {
        if(collision(this, mouse)) {
            ctx.strokeStyle = 'black';
            ctx.strokeRect(this.x, this.y, this.width, this.height);
        }

    }
}
function createGrid() {
    for(let y= cellSize; y < canvas.height; y += cellSize) {
        for(let x = 0; x < canvas.width; x+= cellSize) {
            gameGrid.push(new Cell(x,y))
        }
    }
}
createGrid();
function handleGameGrid() {
    for(let i=0;i<gameGrid.length;i++) {
        gameGrid[i].draw();
    }
}


// project tiles


// map
class MapTiles {
    constructor(x,y) {
        this.x = x;
        this.y = y;
        this.width = cellSize;
        this.height = cellSize;
        this.draw();
    }
    draw() {
        ctx.fillStyle = '#672c22'
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
}
function mapHandler() {
    let mapPosX = mapStartX;
    let mapPosY = mapStartY;

    for(let i=0;i<mapRoute.length;i++) {
        mapPosX += mapRoute[i][0] * 50;
        mapPosY += mapRoute[i][1] * 50;
        mapTiles.push(new MapTiles(mapPosX,mapPosY))
    }
}


// defenders(tower)
class Defender {
    constructor(x,y) {
        this.x = x;
        this.y = y;
        this.width = cellSize;
        this.height = cellSize;
        this.shooting = false;
        this.health = 100;
        this.projectiles = [];
        this.timer = 0;
    }
    draw() {
        ctx.fillStyle = '#113992FF';
        ctx.fillRect(this.x, this.y, this.width, this.height);
        ctx.fillStyle = '#fff';
        ctx.font = '20px Arial';
        ctx.fillText(Math.floor(this.health), this.x, this.y + (this.height/2));
    }
}

function handleDefenders() {
    for(let i=0;i<defenders.length;i++) {
        defenders[i].draw();
    }
}   // 타워 draw 핸들러


// enemies
class Enemy {
    constructor(x,y) {
        this.x = x;
        this.y = y;
        this.width = cellSize;
        this.height = cellSize;
        this.speed = 2.5;
        this.movement = 0;
        this.moveIndex = 1;
        this.health = 100;
        this.maxHealth = this.health;
    }
    update() {
        this.x += mapRoute[this.moveIndex][0] * this.speed;
        this.y += mapRoute[this.moveIndex][1] * this.speed;
        if(mapTiles[this.moveIndex].x === this.x &&
        mapTiles[this.moveIndex].y === this.y) {
            this.moveIndex += 1;
        }
    }
    draw() {
        ctx.fillStyle = '#910606FF';
        ctx.fillRect(this.x, this.y, this.width, this.height);
        ctx.fillStyle = '#fff';
        ctx.font = '20px Arial';
        ctx.fillText(Math.floor(this.health), this.x, this.y + (this.height/2));
    }
}   // 적 객체
function handleEnemies() {
    for(let i=0;i<enemies.length;i++) {
        enemies[i].update();
        enemies[i].draw();
    }
    // if(frame % 10 === 0) {
    //     let verticalPosition = Math.floor(Math.random() * 5 + 1) * cellSize;    // 100 ~ 500 사이 위치에 랜덤으로 적을 소환함
    //    enemies.push(new Enemy(verticalPosition));
    //    enemyPosition.push(verticalPosition);
    // }
}   // 적 draw 핸들러

document.getElementById('btn-add-boss').addEventListener('click', (e)=>{
    enemies.push(new Enemy(mapStartX, mapStartY));
})



// resources
// utilities
function handleGameStatus() {
    ctx.fillStyle = 'gold';
    ctx.font = '30px Arial';
    ctx.fillText('Resources: ' + numberOfResources, 0, 30)
}


function collision(first, second) {
    if(
        !(first.x > second.x + second.width ||
        first.x + first.width < second.x ||
        first.y > second.y + second.height ||
        first.y + first.height < second.y)
    ) {
        return true;
    }
    return false;
}

canvas.addEventListener('click', function() {
    const gridPositionX = mouse.x - (mouse.x % cellSize);
    const gridPositionY = mouse.y - (mouse.y % cellSize);

    if(gridPositionY < cellSize) return;        // 옵션탭을 클릭시 무효처리
    for(let i=0;i<defenders.length;i++) {
        if(defenders[i].x === gridPositionX && defenders[i].y == gridPositionY) return;
    } // 이미 타워가 있는 부분을 클릭시 무효처리

    for(let i=0;i<mapTiles.length;i++) {
        if(mapTiles[i].x === gridPositionX && mapTiles[i].y === gridPositionY) return;
    }   // 맵을 클릭시 무효처리

    let defenderCost = 100;         // 타워의 비용 임시 설정
    if(numberOfResources >= defenderCost) {
        defenders.push(new Defender(gridPositionX, gridPositionY))
        numberOfResources -= defenderCost;
    }       // 타워를 설치하고, 자원 깎기

})      // 캔버스 클릭 이벤트

function animate() {
    // console.log('animate')
    ctx.clearRect(0,0,canvas.width, canvas.height)
    ctx.fillStyle = 'blue';
    ctx.fillRect(0,0,controlsBar.width, controlsBar.height);
    handleGameGrid();
    mapHandler();
    handleDefenders();
    handleGameStatus();
    handleEnemies();


    frame++;
    console.log(frame)
    requestAnimationFrame(animate);
}
animate();