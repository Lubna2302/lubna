const gamesec = document.querySelector(".game-sec");
const blockwidth = 100;
const blockheight = 20;
const boardwidth = 675;
const boardheight = 400;
const Score = document.querySelector("#score");
let score = 0;
let result = document.querySelector("#Result");
class Block {
	constructor(x, y) {
		this.bl = [x, y]; //bottomleft
		this.br = [x + blockwidth, y];
		this.tl = [x, y + blockheight]; //top left
		this.tr = [x + blockwidth, y + blockheight]; //
	}
}
const blocks = [
	new Block(10, 370),
	new Block(120, 370),
	new Block(230, 370),
	new Block(340, 370),
	new Block(450, 370),
	new Block(560, 370),
	new Block(10, 330),
	new Block(120, 330),
	new Block(230, 330),
	new Block(340, 330),
	new Block(450, 330),
	new Block(560, 330),
	new Block(10, 290),
	new Block(120, 290),
	new Block(230, 290),
	new Block(340, 290),
	new Block(450, 290),
	new Block(560, 290),
	new Block(10, 250),
	new Block(120, 250),
	new Block(230, 250),
	new Block(340, 250),
	new Block(450, 250),
	new Block(560, 250),
	new Block(10, 210),
	new Block(120, 210),
	new Block(230, 210),
	new Block(340, 210),
	new Block(450, 210),
	new Block(560, 210),
];
function drawBlocks() {
	for (let i = 0; i < blocks.length; i++) {
		let d = document.createElement("div");
		d.classList.add("block");
		d.style.left = blocks[i].bl[0] + "px";
		d.style.bottom = blocks[i].bl[1] + "px";
		gamesec.appendChild(d);
	}
}
drawBlocks();
const userStart = [250, 30];
let currentuserpos = userStart;
const user = document.createElement("div");
user.classList.add("user");
drawuser();
gamesec.appendChild(user);
function drawuser() {
	user.style.left = currentuserpos[0] + "px";
	user.style.bottom = currentuserpos[1] + "px";
}

function moveuser(e) {
	switch (e.key) {
		case "ArrowLeft":
			if (currentuserpos[0] > 0) currentuserpos[0] -= 25;
			drawuser();
			break;
		case "ArrowRight":
			if (currentuserpos[0] < boardwidth - blockwidth) currentuserpos[0] += 25;
			drawuser();
			break;
	}
}
document.addEventListener("keydown", moveuser);
const ballstart = [250, 80];
const currentballpos = ballstart;
const ball = document.createElement("div");
ball.classList.add("ball");
drawBall();
gamesec.appendChild(ball);

function drawBall() {
	ball.style.left = currentballpos[0] + "px";
	ball.style.bottom = currentballpos[1] + "px";
}
let xdir = -2;
let ydir = 2;
function moveBall() {
	currentballpos[0] += xdir;
	currentballpos[1] += ydir;
	drawBall();
	collisions();
}
const timerid = setInterval(moveBall, 15);
const balldiameter = 20;
//collisions
function collisions() {
	//with walls
	if (
		currentballpos[0] >= boardwidth - balldiameter ||
		currentballpos[1] >= boardheight - balldiameter ||
		currentballpos[0] <= 0
	) {
		changedirection();
	}
	if (currentballpos[1] <= 0) {
		clearInterval(timerid);
		document.removeEventListener("keydown", moveuser);
		result.innerHTML = "You lost!";
	}
	//user collions
	if (
		currentballpos[0] > currentuserpos[0] &&
		currentballpos[0] < currentuserpos[0] + blockwidth &&
		currentballpos[1] > currentuserpos[1] &&
		currentballpos[1] < currentuserpos[1] + blockheight
	) {
		changedirection();
	}

	//block collisions
	for (let i = 0; i < blocks.length; i++) {
		if (
			currentballpos[0] > blocks[i].bl[0] &&
			currentballpos[0] < blocks[i].br[0] &&
			currentballpos[1] + balldiameter > blocks[i].bl[1] &&
			currentballpos[1] < blocks[i].tl[1]
		) {
			const allBlocks = Array.from(document.querySelectorAll(".block"));
			allBlocks[i].classList.remove("block");
			blocks.splice(i, 1);
			changedirection();
			score++;
			Score.innerHTML = score;
			if (blocks.length === 0) {
				result.innerHTML = "YOU WIN!!";
				clearInterval(timerid);
				document.removeEventListener("keydown", moveuser);
			}
		}
	}
}

function changedirection() {
	if (xdir === 2 && ydir === 2) {
		ydir = -2;
		return;
	}
	if (xdir === 2 && ydir === -2) {
		xdir = -2;
		return;
	}
	if (xdir === -2 && ydir === -2) {
		ydir = 2;
		return;
	}
	if (xdir === -2 && ydir === 2) {
		xdir = 2;
		return;
	}
}
