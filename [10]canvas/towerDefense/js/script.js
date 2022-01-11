const canvas = document.getElementById('canvas1')
const ctx = canvas.getContext('2d')
canvas.width = 800;
canvas.height = 650;

//global variables;
const cellSize = 50;
const cellGap = 3;
const gameGrid = [];
const defenders = [];
const enemyPosition = [];
const mapTiles = [];
const projectiles = [];

let enemiesInterval = 600;
let frame = 0;
let numberOfResources = 500;
let gameOver = false;
let enemy = undefined;
let statusWindowFlag = false;


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
    // mouse.x = undefined;
    // mouse.y = undefined;
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
class Projectile {
    constructor(x,y, targetX, targetY, speed, power) {
        this.x = x;
        this.y = y;
        this.width = 5;
        this.height = 5;
        this.power = power;
        this.speed = speed;
        this.targetX = targetX;
        this.targetY = targetY;

        this.xMove = (this.speed * Math.abs(targetX - this.x)) / (Math.abs(targetX - this.x) + Math.abs(targetY - this.y));
        if(this.x > targetX) this.xMove *= -1;
        this.yMove = (this.speed * Math.abs(targetY - this.y)) / (Math.abs(targetX - this.x) + Math.abs(targetY - this.y));
        if(this.y > targetY) this.yMove *= -1;
    }
    update() {
        this.x += this.xMove;
        this.y += this.yMove;

    }
    draw() {
        // console.log('projectiles draw()', this.xMove, this.yMove)
        ctx.fillStyle = 'black';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.width, 0, Math.PI * 2);
        ctx.fill();
    }
}
function handleProjectiles() {
    for(let i=0;i<projectiles.length;i++) {
        projectiles[i].update();
        projectiles[i].draw();

        if(projectiles[i]) {
            if((projectiles[i].xMove > 0 && projectiles[i].x > projectiles[i].targetX) || (projectiles[i].xMove < 0 && projectiles[i].x < projectiles[i].targetX)) {
                projectiles.splice(i, 1);
                i--;
            } else if (enemy && collision(projectiles[i], enemy)) {
                enemy.health -= projectiles[i].power;
                projectiles.splice(i, 1);
                i--;
            }
        }
        // console.log('projectiles ' + projectiles.length);
    }
}   // 투사체 draw 핸들러

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
    constructor(x,y,name,color,power,attackSpeed, projectileSpeed, comb) {
        this.x = x;
        this.y = y;
        this.width = cellSize;
        this.height = cellSize;
        this.power =power;
        this.name = name;
        this.color = color;
        this.attackSpeed = attackSpeed;
        this.projectileSpeed = projectileSpeed;
        this.comb = comb;

        this.health = 100;
        this.shooting = false;
        this.projectiles = [];
        this.timer = 0;
    }
    draw() {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
        ctx.fillStyle = '#fff';
        ctx.font = '20px Cinzel Decorative';
        ctx.fillText(this.name, this.x, this.y + (this.height/2));
    }
    update() {
        if(enemy) {
            if(this.timer % this.attackSpeed === 0) {
                projectiles.push(new Projectile(this.x, this.y, enemy.x + (enemy.width/2), enemy.y + (enemy.height/2), this.projectileSpeed, this.power));
            }
            this.timer++;
        }
    }
}
function handleDefenders() {
    for(let i=0;i<defenders.length;i++) {
        defenders[i].draw();
        defenders[i].update();
    }
}   // 타워 draw 핸들러
function setCombDefenders() {
    let combResultSet = document.querySelectorAll('.combi-result');
    for(let i=0;i<combResultSet.length;i++) {
        combResultSet[i].addEventListener('click', combDefenders)
    }
}
function combDefenders(e) {
    let idx = e.target.getAttribute('data-index');
    let material = e.target.getAttribute('data-material');
    let result = e.target.getAttribute('data-result');
    for(let i=0;i<defenders.length;i++) {
        if(defenders[i].name === material && i !== idx) {

        }
    }
}

// enemies
class Enemy {
    constructor(x,y) {
        this.x = x;
        this.y = y;
        this.width = cellSize;
        this.height = cellSize;
        this.speed = 2;
        this.movement = 0;
        this.moveIndex = 1;
        this.health = 1000;
        this.maxHealth = this.health;
    }
    update() {
        this.x += mapRoute[this.moveIndex][0] * this.speed;
        this.y += mapRoute[this.moveIndex][1] * this.speed;
        if(mapTiles[this.moveIndex].x === this.x &&
        mapTiles[this.moveIndex].y === this.y) {
            this.moveIndex += 1;
        }
        if(this.moveIndex === mapRoute.length) {
            gameOver = true;
        }
    }
    draw() {
        ctx.fillStyle = '#910606FF';
        ctx.fillRect(this.x, this.y, this.width, this.height);
        ctx.fillStyle = '#fff';
        ctx.font = '20px Cinzel Decorative';
        ctx.fillText(Math.floor(this.health), this.x, this.y + (this.height/2));
    }
}   // 적 객체
function handleEnemies() {
    // for(let i=0;i<enemies.length;i++) {
    //     enemies[i].update();
    //     enemies[i].draw();
    // }
    // if(frame % 10 === 0) {
    //     let verticalPosition = Math.floor(Math.random() * 5 + 1) * cellSize;    // 100 ~ 500 사이 위치에 랜덤으로 적을 소환함
    //    enemies.push(new Enemy(verticalPosition));
    //    enemyPosition.push(verticalPosition);
    // }
    if(enemy) {
        enemy.update();
        enemy.draw();
        if(enemy.health <= 0) {
            enemy = undefined;
        }
    }
}   // 적 draw 핸들러

controlMainBox.start.addEventListener('click', (e)=>{
    // enemies.push(new Enemy(mapStartX, mapStartY));
    enemy = new Enemy(mapStartX, mapStartY)
})  // 게임시작 버튼 클릭 이벤트



// resources
// utilities
function handleGameStatus() {
    ctx.fillStyle = 'gold';
    ctx.font = '30px Cinzel Decorative';
    ctx.fillText('Resources: ' + numberOfResources, 0, 30)

    if(statusWindowFlag) {
        ctx.fillStyle = '#BADCAFFF';
        ctx.fillRect(50, 200, 700, 300);
    }

    if(gameOver) {
        ctx.fillStyle = 'black';
        ctx.font = '60px Cinzel Decorative';
        ctx.fillText('GAME OVER', 200, 370);
    }
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
        if(defenders[i].x === gridPositionX && defenders[i].y == gridPositionY) {
            statusInfoBox.name.innerHTML = '이름 : ' + defenders[i].name;
            statusInfoBox.power.innerHTML = '공격력 : ' + defenders[i].power;
            statusInfoBox.attackSpeed.innerHTML = '공격속도 : ' + defenders[i].attackSpeed;
            statusInfoBox.projectileSpeed.innerHTML = '투사체속도 : ' + defenders[i].projectileSpeed;
            statusInfoBox.combiSet.innerHTML = '';
            for(let j=0;j<defenders[i].comb.length;j++) {
                let combiBox = document.createElement('div')
                combiBox.className = 'combi';
                combiBox.innerHTML = `
                    <div class="combi">
                        <div class="combi-material">${df1[defenders[i].comb[j].material].name}</div>
                        <div class="combi-result" data-index="${i}" data-material="${defenders[i].name}" data-result="${defenders[i].comb[j].result}">${df2[defenders[i].comb[j].result].name}</div>
                    </div>
                `;
                statusInfoBox.combiSet.appendChild(combiBox);
            }

            controlClick(1)
            return;
        }   // 조합 버튼
    } // 이미 타워가 있는 부분을 클릭시 타워에 대한 정보 표시

    for(let i=0;i<mapTiles.length;i++) {
        if(mapTiles[i].x === gridPositionX && mapTiles[i].y === gridPositionY) return;
    }   // 맵을 클릭시 무효처리

    let defenderCost = 100;         // 타워의 비용 임시 설정
    if(numberOfResources >= defenderCost) {
        // defenders.push(new Defender(gridPositionX, gridPositionY, 'A','#113992FF', 20, 10, 20))
        let rd = Math.floor(Math.random() * 5); // 1성 랜덤 타워 건설
        defenders.push(new Defender(gridPositionX, gridPositionY, df1[rd].name, df1[rd].color, df1[rd].power
            , df1[rd].attackSpeed, df1[rd].projectileSpeed, df1[rd].comb));
        numberOfResources -= defenderCost;
    }       // 타워를 설치하고, 자원 깎기

})      // 캔버스 클릭 이벤트

function animate() {
    // console.log('animate')
    ctx.clearRect(0,0, canvas.width, canvas.height)
    ctx.fillStyle = 'blue';
    ctx.fillRect(0,0, controlsBar.width, controlsBar.height);
    handleGameGrid();
    mapHandler();
    handleDefenders();
    handleEnemies();
    handleGameStatus();
    handleProjectiles();



    frame++;
    // console.log(frame)
    if(!gameOver)  requestAnimationFrame(animate);
}
animate();