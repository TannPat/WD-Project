const box = document.getElementById("box");
const result = document.getElementById("result");
const startBtn = document.getElementById("start");

let startTime = 0;
let canClick = false;
let timeout;

startBtn.addEventListener("click", startGame);

function startGame() {
	box.style.background = "red";
	box.textContent = "Wait for Green...";
	result.textContent = "";
	canClick = false;

	clearTimeout(timeout);

	const delay = Math.random() * 2000 + 1000;

	timeout = setTimeout(() => {
		box.style.background = "lime";
		box.style.color = "black";
		box.textContent = "CLICK!";
		startTime = Date.now();
		canClick = true;
	}, delay);
}

box.addEventListener("click", () => {
	box.style.color = "white";
	if (!canClick) {
		result.textContent = "Too Early!";
		box.style.background = "darkBlue";
		box.textContent = "Too Early!";
		return;
	}

	const reactionTime = Date.now() - startTime;

	result.textContent = `${reactionTime} ms`;

	box.style.background = "darkGreen";
	box.textContent = reactionTime;

	canClick = false;
});

startGame();
