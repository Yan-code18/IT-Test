document.addEventListener("DOMContentLoaded", () => {
	const revealItems = document.querySelectorAll(".reveal");

	if (!("IntersectionObserver" in window)) {
		revealItems.forEach((item) => item.classList.add("is-visible"));
		return;
	}

	const observer = new IntersectionObserver(
		(entries, activeObserver) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting) {
					entry.target.classList.add("is-visible");
					activeObserver.unobserve(entry.target);
				}
			});
		},
		{
			threshold: 0.18,
			rootMargin: "0px 0px -10% 0px",
		}
	);

	revealItems.forEach((item) => observer.observe(item));

	const footerSpan = document.querySelector(".site-footer span");
	if (footerSpan) {
		footerSpan.textContent = `Protecting homes with dependable care since ${new Date().getFullYear()}.`;
	}
});
