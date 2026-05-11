const colorBox = document.getElementById("color-box");
const rgbText = document.getElementById("rgb-text");
const choicesDiv = document.getElementById("choices");
const resultText = document.getElementById("result");
const newGameBtn = document.getElementById("new-game");

let correctColor = "";

function randomColor() {
	const r = Math.floor(Math.random() * 256);
	const g = Math.floor(Math.random() * 256);
	const b = Math.floor(Math.random() * 256);

	return `rgb(${r}, ${g}, ${b})`;
}

function generateGame() {
	choicesDiv.innerHTML = "";
	resultText.textContent = "";

	const colors = [];

	for (let i = 0; i < 4; i++) {
		colors.push(randomColor());
	}

	correctColor = colors[Math.floor(Math.random() * colors.length)];

	colorBox.style.background = correctColor;
	rgbText.textContent = correctColor.toUpperCase();

	colors.forEach((color) => {
		const btn = document.createElement("button");

		btn.classList.add("choice");
		btn.style.background = color;

		btn.addEventListener("click", () => {
			if (color === correctColor) {
				resultText.textContent = "Correct!";
			} else {
				resultText.textContent = "Wrong!";
			}
		});

		choicesDiv.appendChild(btn);
	});
}

newGameBtn.addEventListener("click", generateGame);

generateGame();
