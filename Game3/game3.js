const cells = document.querySelectorAll(".cell");
const statusText = document.getElementById("status");
const restartBtn = document.getElementById("restart");

let board = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let gameRunning = true;

const winningConditions = [
	[0, 1, 2],
	[3, 4, 5],
	[6, 7, 8],
	[0, 3, 6],
	[1, 4, 7],
	[2, 5, 8],
	[0, 4, 8],
	[2, 4, 6],
];

cells.forEach((cell) => {
	cell.addEventListener("click", cellClick);
});

restartBtn.addEventListener("click", restartGame);

function cellClick() {
	const index = this.dataset.index;

	if (board[index] !== "" || !gameRunning) {
		return;
	}

	board[index] = currentPlayer;
	this.textContent = currentPlayer;
	currentPlayer === "X"
		? (this.style.color = "red")
		: (this.style.color = "blue");

	checkWinner();
}

function checkWinner() {
	let won = false;

	for (let condition of winningConditions) {
		const [a, b, c] = condition;

		if (board[a] && board[a] === board[b] && board[a] === board[c]) {
			won = true;

			cells[a].classList.add("winner");
			cells[b].classList.add("winner");
			cells[c].classList.add("winner");
		}
	}

	if (won) {
		statusText.textContent = `Player ${currentPlayer} Wins!`;
		gameRunning = false;
		return;
	}

	if (!board.includes("")) {
		statusText.textContent = "It's a Draw!";
		gameRunning = false;
		return;
	}

	currentPlayer = currentPlayer === "X" ? "O" : "X";
	statusText.textContent = `Player ${currentPlayer}'s Turn`;
}

function restartGame() {
	board = ["", "", "", "", "", "", "", "", ""];
	currentPlayer = "X";
	gameRunning = true;

	statusText.textContent = `Player ${currentPlayer}'s Turn`;

	cells.forEach((cell) => {
		cell.textContent = "";
		cell.classList.remove("winner");
	});
}
