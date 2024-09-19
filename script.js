const gameContainer = document.getElementById('gameContainer');
const player = document.getElementById('player');
const creep = document.getElementById('creep');
const scoreElement = document.getElementById('score');

const gameWidth = gameContainer.clientWidth;
const gameHeight = gameContainer.clientHeight;
const playerWidth = player.offsetWidth;
const playerHeight = player.offsetHeight;
const creepWidth = creep.offsetWidth;

let playerX = (gameWidth - playerWidth) / 2;
let playerY = gameHeight - playerHeight;
let creepX = Math.random() * (gameWidth - creepWidth);
let creepY = -creepWidth;
let speed = 10;
let creepSpeed = 15;
let score = 0;
let gameOver = false;

document.addEventListener('keydown', movePlayer);

function movePlayer(event) {
    if (event.key === 'ArrowLeft' && playerX > 0) {
        playerX -= 20;
    } else if (event.key === 'ArrowRight' && playerX < gameWidth - playerWidth) {
        playerX += 20;
    }
    player.style.left = playerX + 'px';
}

function update() {
    if (gameOver) return;

    creepY += creepSpeed;
    creep.style.top = creepY + 'px';
    creep.style.left = creepX + 'px';

    if (creepY > gameHeight) {
        creepY = -creepWidth;
        creepX = Math.random() * (gameWidth - creepWidth);
        score += 1; // Increase score when a creep goes off-screen
        scoreElement.textContent = score; // Update score display
    }

    // Check for collision
    if (creepY + creepWidth > playerY && creepY < playerY + playerHeight &&
        creepX + creepWidth > playerX && creepX < playerX + playerWidth) {
        gameOver = true;
        alert('Game Over! Your score was ' + score);
    }

    requestAnimationFrame(update);
}

update();
