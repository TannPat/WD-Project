const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const scoreText = document.getElementById("score");

let paddle = {
	x: 300,
	y: 460,
	width: 120,
	height: 15,
	speed: 7,
};

let ball = {
	x: 350,
	y: 100,
	radius: 12,
	dx: 3.3,
	dy: 3.3,
};

let score = 0;

let rightPressed = false;
let leftPressed = false;

document.addEventListener("keydown", (e) => {
	if (e.key === "ArrowRight") {
		rightPressed = true;
	}

	if (e.key === "ArrowLeft") {
		leftPressed = true;
	}
});

document.addEventListener("keyup", (e) => {
	if (e.key === "ArrowRight") {
		rightPressed = false;
	}

	if (e.key === "ArrowLeft") {
		leftPressed = false;
	}
});

function drawPaddle() {
	ctx.fillStyle = "#00adb5";
	ctx.fillRect(paddle.x, paddle.y, paddle.width, paddle.height);
}

function drawBall() {
	ctx.beginPath();
	ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
	ctx.fillStyle = "#ff5722";
	ctx.fill();
	ctx.closePath();
}

function movePaddle() {
	if (rightPressed && paddle.x < canvas.width - paddle.width) {
		paddle.x += paddle.speed;
	}

	if (leftPressed && paddle.x > 0) {
		paddle.x -= paddle.speed;
	}
}

function moveBall() {
	ball.x += ball.dx;
	ball.y += ball.dy;

	if (ball.x + ball.radius > canvas.width || ball.x - ball.radius < 0) {
		ball.dx *= -1;
	}

	if (ball.y - ball.radius < 0) {
		ball.dy *= -1;
	}

	if (
		ball.y + ball.radius >= paddle.y &&
		ball.x >= paddle.x &&
		ball.x <= paddle.x + paddle.width
	) {
		ball.dy *= -1;
		score++;
		scoreText.textContent = `Score: ${score}`;

		ball.dy *= 1.03;
		ball.dx *= 1.03;
	}

	if (ball.y + ball.radius > canvas.height) {
		score = 0;
		scoreText.textContent = "Score: 0";

		ball.x = 350;
		ball.y = 100;
		ball.dx = 3.3;
		ball.dy = 3.3;
	}
}

function gameLoop() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);

	drawPaddle();
	drawBall();

	movePaddle();
	moveBall();

	requestAnimationFrame(gameLoop);
}

gameLoop();
