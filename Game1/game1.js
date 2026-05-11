"use strict";

const squares = document.querySelectorAll(".square");
const mole = document.querySelector(".mole");
const timeLeft = document.getElementById("time-amt");
const score = document.getElementById("score-amt");
let molePosition;
let currentTime = 60;

let result = 0;

function randomSquare() {
	squares.forEach((square) => {
		square.classList.remove("mole");
	});

	let randomPosition = squares[Math.floor(Math.random() * 9)];
	randomPosition.classList.add("mole");
	molePosition = randomPosition.id;
}

squares.forEach((square) => {
	square.addEventListener("mousedown", () => {
		if ((square.id = molePosition)) {
			result++;
			score.textContent = result;
			molePosition = null;
		}
	});
});

const timerID = setInterval(randomSquare, 850);
const countDownTimerID = setInterval(countDown, 1000);

function countDown() {
	timeLeft.textContent = --currentTime;
	if (currentTime === 0) {
		clearInterval(countDownTimerID);
		clearInterval(timerID);
		molePosition = null;
		alert("Game Over! Score is: " + result);
	}
}
