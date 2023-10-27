let countdown;

const h1TimeLeft = document.querySelector(".display__time-left");
const pEndTime = document.querySelector(".display__end-time");
const buttonsCtrl = document.querySelectorAll(".timer__button");

/**
 * timer - runs the countdown sequence
 * @param {number} seconds time in seconds
 */
function timer(seconds) {
	clearInterval(countdown); // Clear pre-existing timers

	const now = Date.now(); // milliseconds
	const future = now + seconds * 1000; // milliseconds

	displayEndTime(future);
	displayTimeLeft(seconds);
	countdown = setInterval(function () {
		const newNow = Date.now();
		const secondsLeft = Math.round((future - newNow) / 1000); // seconds
		if (secondsLeft < 0) {
			clearInterval(countdown);
			return;
		}
		displayTimeLeft(secondsLeft);
	}, 1000);
}

function displayTimeLeft(seconds) {
	const minutes = Math.floor(seconds / 60);
	const remSeconds = seconds % 60; // 102:27

	const displayTime = `${minutes < 10 ? "0" : ""}${minutes}:${
		remSeconds < 10 ? "0" : ""
	}${remSeconds}`;

	h1TimeLeft.textContent = displayTime;
}

function displayEndTime(future) {
	const endTime = new Date(future);
	const hours = endTime.getHours();
	const adjustedHours = hours > 12 ? hours - 12 : hours;
	const minutes = endTime.getMinutes();
	const AMPM = hours > 12 ? "PM" : "AM";

	const diplayEnd = `Be Back At ${
		adjustedHours < 10 ? "0" : ""
	}${adjustedHours}:${minutes < 10 ? "0" : ""}${minutes} ${AMPM}`;

	pEndTime.textContent = diplayEnd;
}

buttonsCtrl.forEach((button) =>
	button.addEventListener("click", function (event) {
		// console.log(typeof event.target.dataset.time);
		timer(parseInt(event.target.dataset.time)); // Grab the time from the dataset attribute
	})
);

document.customForm.addEventListener("submit", (event) => {
	event.preventDefault();

	// Check for empty or non-numbers
	if (
		event.target.minutes.value === "" ||
		!parseInt(event.target.minutes.value)
	) {
		alert("Please enter a number");
		event.target.reset();
		return;
	}

	timer(event.target.minutes.value * 60);

	// event.target.minutes.value = "";

	event.target.reset();
});
