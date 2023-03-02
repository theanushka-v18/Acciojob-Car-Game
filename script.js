const startContainer = document.querySelector(".start");
const gameContainer = document.querySelector(".game");
const scoreContainer = document.querySelector(".score");
const scoreId = document.querySelector("#score-id");

let prevRenderedTime = 0;
let carPos = { x: 0, y: 0 };
let score = 0;

let player = {
    ArrowUp : false,
    ArrowDown : false,
    ArrowLeft : false,
    ArrowRight : false
};

function moveLines() {
    score = score + 1;
    scoreId.textContent = score;
    const lines = document.querySelectorAll(".line");
    lines.forEach(line => {
        var top = line.offsetTop;
        const box = gameContainer.getBoundingClientRect();
        if(line.offsetTop > box.bottom) {
            top = 0;
        }
        line.style.top = top + 5 + "px";
    });
}

function playGame() {
    const car = document.querySelector(".car");
    const box = gameContainer.getBoundingClientRect();
    moveLines();
    // moveEnemy();
    // animation loop
    if (player.ArrowUp && carPos.y < box.bottom-200 ) {
        carPos.y += 5;
    }
    if (player.ArrowDown && carPos.y > box.top) {
        carPos.y -= 5;
    }
    if (player.ArrowRight && carPos.x < box.right-515) {
        carPos.x += 5;
    }
    if (player.ArrowLeft && carPos.x > 0) {
        carPos.x -= 5;
    }
    car.style.top = carPos.y + "px";
    car.style.left = carPos.x + "px";
    window.requestAnimationFrame(playGame);
}

function startGame() {
    // hide the start container
    startContainer.classList.add("hide");

    // create a car
    const car = document.createElement("div");
    car.classList.add('car');
    // add it inside game container
    gameContainer.appendChild(car);

    const carTop = car.offsetTop;
    const carLeft = car.offsetLeft;
    carPos.y = carTop;
    carPos.x = carLeft;

    var x = 0;
    // create a lines
    for(var i=0; i<4; i++) {
        const line = document.createElement("div");
        line.classList.add('line');
        line.style.top = x + "px";
        // add it inside game container
        gameContainer.appendChild(line);
        x += 150;
    }

    // create an enemy car
    for (let i = 0; i < 3; i++) {
        const enemy = document.createElement("div");
        enemy.classList.add("enemy");
        enemy.style.top = Math.floor(Math.random() * 400) + "px";
        enemy.style.left = Math.floor(Math.random() * 400) + "px";
        gameContainer.appendChild(enemy);
    }

    window.requestAnimationFrame(playGame);
}   

function handleKeyup(e) {
    e.preventDefault();
    player[e.key] = true;   
}

function handleKeydown(e) {
    e.preventDefault();
    player[e.key] = false;
}

document.addEventListener("keyup",  handleKeyup);
document.addEventListener("keydown",  handleKeydown);
startContainer.addEventListener("click", startGame);