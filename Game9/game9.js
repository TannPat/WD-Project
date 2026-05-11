const dice = document.getElementById("dice");
const diceNumber = document.getElementById("dice-number");
const diceSelect = document.getElementById("dice-select");
const rollBtn = document.getElementById("roll-btn");

rollBtn.addEventListener("click", () => {
	const sides = Number(diceSelect.value);

	dice.className = "dice";

	setTimeout(() => {
		dice.classList.add(`d${sides}`);
	}, 10);

	dice.classList.add("roll-animation");

	let animationInterval = setInterval(() => {
		diceNumber.textContent = Math.floor(Math.random() * sides) + 1;
	}, 80);

	setTimeout(() => {
		clearInterval(animationInterval);

		const finalRoll = Math.floor(Math.random() * sides) + 1;

		diceNumber.textContent = finalRoll;

		dice.classList.remove("roll-animation");
	}, 700);
});

dice.classList.add("d6");
