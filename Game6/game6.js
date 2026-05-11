const pointsText = document.getElementById("points");
const clickBtn = document.getElementById("click-btn");

const buyCursorBtn = document.getElementById("buy-cursor");
const buyAutoBtn = document.getElementById("buy-auto");

const cursorCostText = document.getElementById("cursor-cost");
const autoCostText = document.getElementById("auto-cost");

const clickPowerText = document.getElementById("click-power");
const autoCountText = document.getElementById("auto-count");

let points = 0;

let clickPower = 1;
let autoClickers = 0;

let cursorCost = 10;
let autoCost = 50;

clickBtn.addEventListener("click", () => {
	points += clickPower;
	updateDisplay();
});

buyCursorBtn.addEventListener("click", () => {
	if (points >= cursorCost) {
		points -= cursorCost;

		clickPower += 1;

		cursorCost = Math.floor(cursorCost * 1.5);

		updateDisplay();
	}
});

buyAutoBtn.addEventListener("click", () => {
	if (points >= autoCost) {
		points -= autoCost;

		autoClickers += 1;

		autoCost = Math.floor(autoCost * 1.7);

		updateDisplay();
	}
});

function updateDisplay() {
	pointsText.textContent = Math.floor(points);

	clickPowerText.textContent = clickPower;
	autoCountText.textContent = autoClickers;

	cursorCostText.textContent = cursorCost;
	autoCostText.textContent = autoCost;
}

setInterval(() => {
	points += autoClickers;
	updateDisplay();
}, 1000);

updateDisplay();
