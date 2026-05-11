const cards = document.querySelectorAll(".card");

cards.forEach((card) => {
	card.addEventListener("mouseenter", () => {
		card.style.boxShadow = "0 0 15px cyan";
	});

	card.addEventListener("mouseleave", () => {
		card.style.boxShadow = "none";
	});
});
