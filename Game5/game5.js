const gameBoard = document.getElementById("game-board");
const movesText = document.getElementById("moves");
const matchesText = document.getElementById("matches");
const restartBtn = document.getElementById("restart");

const emojis = ["🍎", "🍌", "🍇", "🍒", "🍉", "🥝", "🍍", "🍑"];

let cards = [...emojis, ...emojis];
let flippedCards = [];
let matchedPairs = 0;
let moves = 0;
let lockBoard = false;

restartBtn.addEventListener("click", startGame);

function shuffle(array) {
	return array.sort(() => Math.random() - 0.5);
}

function startGame() {
	gameBoard.innerHTML = "";
	flippedCards = [];
	matchedPairs = 0;
	moves = 0;
	lockBoard = false;

	movesText.textContent = "0";
	matchesText.textContent = "0";

	shuffle(cards);

	cards.forEach((emoji) => {
		const card = document.createElement("div");
		card.classList.add("card");
		card.dataset.emoji = emoji;
		card.textContent = "";

		card.addEventListener("click", flipCard);

		gameBoard.appendChild(card);
	});
}

function flipCard() {
	if (
		lockBoard ||
		this.classList.contains("flipped") ||
		this.classList.contains("matched")
	) {
		return;
	}

	this.classList.add("flipped");
	this.textContent = this.dataset.emoji;

	flippedCards.push(this);

	if (flippedCards.length === 2) {
		moves++;
		movesText.textContent = moves;

		checkMatch();
	}
}

function checkMatch() {
	const [card1, card2] = flippedCards;

	if (card1.dataset.emoji === card2.dataset.emoji) {
		card1.classList.add("matched");
		card2.classList.add("matched");

		matchedPairs++;
		matchesText.textContent = matchedPairs;

		flippedCards = [];

		if (matchedPairs === emojis.length) {
			setTimeout(() => {
				alert("You matched all the cards!");
			}, 300);
		}
	} else {
		lockBoard = true;

		setTimeout(() => {
			card1.classList.remove("flipped");
			card2.classList.remove("flipped");

			card1.textContent = "";
			card2.textContent = "";

			flippedCards = [];
			lockBoard = false;
		}, 800);
	}
}

startGame();
