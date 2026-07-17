document.addEventListener("DOMContentLoaded", () => {
	const revealItems = document.querySelectorAll(".reveal");
	const serviceCards = document.querySelectorAll("[data-plan-target]");
	const pestButtons = document.querySelectorAll("[data-pest-button]");
	const urgencySlider = document.querySelector("[data-urgency-slider]");
	const urgencyLabel = document.querySelector("[data-urgency-label]");
	const planTitle = document.querySelector("[data-plan-title]");
	const planCopy = document.querySelector("[data-plan-copy]");
	const planTips = document.querySelector("[data-plan-tips]");
	const planResponse = document.querySelector("[data-plan-response]");
	const planPrep = document.querySelector("[data-plan-prep]");
	const planFollowup = document.querySelector("[data-plan-followup]");
	const statusDot = document.querySelector("[data-status-dot]");
	const statusTitle = document.querySelector("[data-status-title]");
	const statusCopy = document.querySelector("[data-status-copy]");
	const statusService = document.querySelector("[data-status-service]");
	const statusUpdated = document.querySelector("[data-status-updated]");
	const callbackForm = document.querySelector("[data-callback-form]");
	const formNote = document.querySelector("[data-form-note]");
	const backToTop = document.querySelector("[data-back-to-top]");
	const faqDetails = document.querySelectorAll(".faq-list details");

	const planProfiles = {
		general: {
			label: "General pests",
			copy: "The quickest win is a focused inspection, a perimeter treatment, and a clean-up plan that keeps the same pests from returning.",
			tips: [
				"Clear food debris and sealed containers from countertops.",
				"Vacuum corners, baseboards, and entry points.",
				"Keep sinks and pet bowls dry overnight.",
			],
		},
		rodents: {
			label: "Rodent activity",
			copy: "Rodents need a tighter response: inspection, entry sealing, trapping, and a follow-up check to confirm the pressure is dropping.",
			tips: [
				"Move stored food into hard containers.",
				"Look for chew marks near utility gaps.",
				"Keep garage and attic access points closed.",
			],
		},
		termites: {
			label: "Termite concerns",
			copy: "Termites need a structural approach: inspection, moisture review, and a treatment path that protects the property long term.",
			tips: [
				"Watch for soft wood or bubbling paint.",
				"Reduce moisture around foundations.",
				"Book an inspection before the damage spreads.",
			],
		},
		seasonal: {
			label: "Seasonal prevention",
			copy: "If the issue is recurring each season, a maintenance plan usually works best because it stays ahead of the next wave.",
			tips: [
				"Schedule perimeter checks before weather changes.",
				"Seal small gaps around doors and vents.",
				"Use recurring visits to catch issues early.",
			],
		},
	};

	const urgencyLabels = {
		1: "Routine",
		2: "Soon",
		3: "Moderate",
		4: "Urgent",
		5: "Emergency",
	};

	let activePlanKey = "general";

	if (!("IntersectionObserver" in window)) {
		revealItems.forEach((item) => item.classList.add("is-visible"));
	} else {
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
	}

	const renderPlan = () => {
		const plan = planProfiles[activePlanKey];
		const urgencyValue = Number(urgencySlider ? urgencySlider.value : 3);
		const urgencyText = urgencyLabels[urgencyValue] || "Moderate";
		const responseText =
			urgencyValue >= 4 ? "Immediate dispatch" : urgencyValue === 3 ? "Same-day visit" : "Next available slot";
		const prepText = urgencyValue >= 4 ? "2-step prep" : "3-step prep";
		const followupText = urgencyValue >= 4 ? "Priority follow-up" : "Standard follow-up";

		if (planTitle) {
			planTitle.textContent = `${plan.label} - ${urgencyText} priority`;
		}

		if (planCopy) {
			planCopy.textContent = plan.copy;
		}

		if (planTips) {
			planTips.innerHTML = plan.tips.map((tip) => `<li>${tip}</li>`).join("");
		}

		if (planResponse) {
			planResponse.textContent = responseText;
		}

		if (planPrep) {
			planPrep.textContent = prepText;
		}

		if (planFollowup) {
			planFollowup.textContent = followupText;
		}

		if (urgencyLabel) {
			urgencyLabel.textContent = urgencyText;
		}

		pestButtons.forEach((button) => {
			const isActive = button.dataset.pestButton === activePlanKey;
			button.classList.toggle("is-active", isActive);
			button.setAttribute("aria-pressed", String(isActive));
		});
	};

	serviceCards.forEach((card) => {
		const activatePlan = () => {
			activePlanKey = card.dataset.planTarget || activePlanKey;
			renderPlan();
			const planner = document.querySelector("#planner");
			if (planner) {
				planner.scrollIntoView({ behavior: "smooth", block: "start" });
			}
		};

		card.addEventListener("click", activatePlan);
		card.addEventListener("keydown", (event) => {
			if (event.key === "Enter" || event.key === " ") {
				event.preventDefault();
				activatePlan();
			}
		});
	});

	pestButtons.forEach((button) => {
		button.addEventListener("click", () => {
			activePlanKey = button.dataset.pestButton || activePlanKey;
			renderPlan();
		});
	});

	if (urgencySlider) {
		urgencySlider.addEventListener("input", renderPlan);
	}

	renderPlan();

	faqDetails.forEach((detail) => {
		detail.addEventListener("toggle", () => {
			if (!detail.open) {
				return;
			}

			faqDetails.forEach((otherDetail) => {
				if (otherDetail !== detail) {
					otherDetail.removeAttribute("open");
				}
			});
		});
	});

	if (callbackForm) {
		callbackForm.addEventListener("submit", (event) => {
			event.preventDefault();
			const formData = new FormData(callbackForm);
			const name = String(formData.get("name") || "there").trim();
			const problem = String(formData.get("problem") || "your issue");

			if (formNote) {
				formNote.textContent = `Thanks, ${name}. We will contact you soon about ${problem}.`;
			}

			callbackForm.reset();
			renderPlan();
		});
	}

	const toggleBackToTop = () => {
		if (!backToTop) {
			return;
		}

		backToTop.classList.toggle("is-visible", window.scrollY > 560);
	};

	if (backToTop) {
		backToTop.addEventListener("click", () => {
			window.scrollTo({ top: 0, behavior: "smooth" });
		});
		window.addEventListener("scroll", toggleBackToTop, { passive: true });
		toggleBackToTop();
	}

	const footerSpan = document.querySelector(".site-footer span");
	if (footerSpan) {
		footerSpan.textContent = `Protecting homes with dependable care since ${new Date().getFullYear()}.`;
	}

	const loadLiveStatus = async () => {
		if (!statusDot || !statusTitle || !statusCopy || !statusService || !statusUpdated) {
			return;
		}

		try {
			const response = await fetch("status.php", {
				headers: {
					Accept: "application/json",
				},
			});

			if (!response.ok) {
				throw new Error("Status request failed");
			}

			const data = await response.json();
			statusDot.classList.remove("is-warning", "is-error");
			statusDot.classList.add("is-live");
			statusTitle.textContent = `${data.service} is online`;
			statusCopy.textContent = data.message;
			statusService.textContent = data.service;
			statusUpdated.textContent = `Updated ${new Date(data.timestamp).toLocaleString([], {
				month: "short",
				day: "numeric",
				hour: "numeric",
				minute: "2-digit",
			})}`;
		} catch (error) {
			statusDot.classList.remove("is-live");
			statusDot.classList.add("is-warning");
			statusTitle.textContent = "Live status unavailable";
			statusCopy.textContent = "The status endpoint could not be reached in this environment, but the landing page is still ready to use.";
			statusService.textContent = "Offline check";
			statusUpdated.textContent = "Refresh after launching PHP";
		}
	};

	loadLiveStatus();
});
