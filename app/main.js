import style from "./styles.css";
import canvasElem from "./canvas";

canvasElem.c();
const canvas = document.getElementById("canvas-element");
const main_content = document.querySelector(".main-content");
const day_display = document.getElementById("day-display");

main_content.onmouseover = () => {
	canvas.style.filter = "blur(5px)";
}

main_content.onmouseout = () => {
	canvas.style.filter = "blur(0)";
}

var cdDate = new Date("Mar 17, 2017 00:00:00").getTime();

var timer = setInterval(() => {
	let now = new Date().getTime();
	let timelength = cdDate - now;
	let days = Math.floor(timelength/(1000 * 60 * 60 * 24));

	day_display.innerHTML = `${days} days to go`;

	if(timelength < 0) {
		day_display.innerHTML = `The game is currently open.`;
	}

	if((timelength+3) < 0) {
		day_display.innerHTML = `The game is closed.`;
	}

}, 1000);






