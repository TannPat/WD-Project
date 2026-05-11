const choices = document.querySelectorAll(".choice");
const resultText = document.getElementById("result-text");
const movesText = document.getElementById("moves");
const playerScoreText = document.getElementById("player-score");
const computerScoreText = document.getElementById("computer-score");
const restartBtn = document.getElementById("restart");

let playerScore = 0;
let computerScore = 0;

choices.forEach((choice) => {
	choice.addEventListener("click", () => {
		playGame(choice.dataset.choice);
	});
});

restartBtn.addEventListener("click", restartGame);

function playGame(playerChoice) {
	const computerChoice = getComputerChoice();

	movesText.textContent = `You chose ${capitalize(playerChoice)} | Computer chose ${capitalize(computerChoice)}`;

	const result = getResult(playerChoice, computerChoice);

	if (result === "win") {
		playerScore++;
		resultText.textContent = "You Win!";
	} else if (result === "lose") {
		computerScore++;
		resultText.textContent = "Computer Wins!";
	} else {
		resultText.textContent = "It's a Draw!";
	}

	playerScoreText.textContent = playerScore;
	computerScoreText.textContent = computerScore;
}

function getComputerChoice() {
	const options = ["rock", "paper", "scissors"];
	const randomIndex = Math.floor(Math.random() * options.length);
	return options[randomIndex];
}

function getResult(player, computer) {
	if (player === computer) {
		return "draw";
	}

	if (
		(player === "rock" && computer === "scissors") ||
		(player === "paper" && computer === "rock") ||
		(player === "scissors" && computer === "paper")
	) {
		return "win";
	}

	return "lose";
}

function capitalize(word) {
	return word.charAt(0).toUpperCase() + word.slice(1);
}

function restartGame() {
	playerScore = 0;
	computerScore = 0;

	playerScoreText.textContent = "0";
	computerScoreText.textContent = "0";

	resultText.textContent = "Choose your move";
	movesText.textContent = "";
}
