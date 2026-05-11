const coin = document.getElementById("coin");
const result = document.getElementById("result");
const flipBtn = document.getElementById("flip-btn");

flipBtn.addEventListener("click", () => {
	coin.style.transform = "rotateY(720deg)";

	setTimeout(() => {
		const flip = Math.random() < 0.5 ? "Heads" : "Tails";

		result.textContent = flip;

		if (flip === "Heads") {
			coin.textContent = "🪷";
		} else {
			coin.textContent = "🦁";
		}

		coin.style.transform = "rotateY(0deg)";
	}, 500);
});
