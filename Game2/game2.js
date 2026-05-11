const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const scoreEl = document.getElementById("score");
const highScoreEl = document.getElementById("highScore");
const gameOverEl = document.getElementById("gameOver");
const restartBtn = document.getElementById("restartBtn");

const gridSize = 20;
const tileCount = canvas.width / gridSize;

let snake;
let food;
let dx;
let dy;
let score;
let highScore;
let gameLoop;

function initGame() {
	snake = [{x: 10, y: 10}];

	dx = 1;
	dy = 0;

	score = 0;
	scoreEl.textContent = score;

	gameOverEl.style.display = "none";

	highScore = localStorage.getItem("snakeHighScore") || 0;
	highScoreEl.textContent = highScore;

	placeFood();

	clearInterval(gameLoop);
	gameLoop = setInterval(updateGame, 120);
}

function placeFood() {
	food = {
		x: Math.floor(Math.random() * tileCount),
		y: Math.floor(Math.random() * tileCount),
	};

	for (let segment of snake) {
		if (segment.x === food.x && segment.y === food.y) {
			placeFood();
		}
	}
}

function updateGame() {
	const head = {
		x: snake[0].x + dx,
		y: snake[0].y + dy,
	};

	if (
		head.x < 0 ||
		head.x >= tileCount ||
		head.y < 0 ||
		head.y >= tileCount
	) {
		endGame();
		return;
	}

	for (let i = 0; i < snake.length; i++) {
		if (snake[i].x === head.x && snake[i].y === head.y) {
			endGame();
			return;
		}
	}

	snake.unshift(head);

	if (head.x === food.x && head.y === food.y) {
		score++;
		scoreEl.textContent = score;

		if (score > highScore) {
			highScore = score;
			localStorage.setItem("snakeHighScore", highScore);
			highScoreEl.textContent = highScore;
		}

		placeFood();
	} else {
		snake.pop();
	}

	drawGame();
}

function drawGame() {
	ctx.fillStyle = "#1b1b1b";
	ctx.fillRect(0, 0, canvas.width, canvas.height);

	snake.forEach((segment, index) => {
		ctx.fillStyle = index === 0 ? "#76ff03" : "#4caf50";
		ctx.fillRect(
			segment.x * gridSize,
			segment.y * gridSize,
			gridSize - 2,
			gridSize - 2,
		);
	});

	ctx.fillStyle = "#ff1744";
	ctx.fillRect(
		food.x * gridSize,
		food.y * gridSize,
		gridSize - 2,
		gridSize - 2,
	);
}

function endGame() {
	clearInterval(gameLoop);
	gameOverEl.style.display = "block";
}

document.addEventListener("keydown", (e) => {
	const key = e.key.toLowerCase();

	if ((key === "arrowup" || key === "w") && dy !== 1) {
		dx = 0;
		dy = -1;
	}

	if ((key === "arrowdown" || key === "s") && dy !== -1) {
		dx = 0;
		dy = 1;
	}

	if ((key === "arrowleft" || key === "a") && dx !== 1) {
		dx = -1;
		dy = 0;
	}

	if ((key === "arrowright" || key === "d") && dx !== -1) {
		dx = 1;
		dy = 0;
	}
	if (gameOverEl.style.display === "block" && key === "r") initGame();
});

restartBtn.addEventListener("click", initGame);

initGame();
