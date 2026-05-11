const guessInput = document.getElementById("guess-input");
const guessBtn = document.getElementById("guess-btn");
const message = document.getElementById("message");
const attemptsText = document.getElementById("attempts");
const guessList = document.getElementById("guesses");

let secretNumber = Math.floor(Math.random() * 100) + 1;
let attempts = 0;

guessBtn.addEventListener("click", () => {
	const guess = Number(guessInput.value);

	if (!guess || guess < 1 || guess > 100) {
		message.textContent = "Enter a valid number";
		return;
	}

	attempts++;
	attemptsText.textContent = `Attempts: ${attempts}`;

	if (guess === secretNumber) {
		message.textContent = "Correct! New number generated.";
		secretNumber = Math.floor(Math.random() * 100) + 1;
		attempts = 0;
		attemptsText.textContent = "Attempts: 0";
		guessList.textContent = "";
	} else if (guess < secretNumber) {
		message.textContent = "Too low";
		guessLi = document.createElement("li");
		guessLi.style.color = "lime";
		guessLi.textContent = `${guess} ⬆️`;
		guessList.appendChild(guessLi);
	} else {
		message.textContent = "Too high";
		guessLi = document.createElement("li");
		guessLi.style.color = "red";
		guessLi.textContent = `${guess} ⬇️`;
		guessList.appendChild(guessLi);
	}

	guessInput.value = "";
});
