const canvas = document.getElementById("canvas-element");

var play = true;

const cw = window.innerWidth;
const ch = window.innerHeight;
var bh_entities = {};
var bh_entitiesIndex = 0;
var bh_entitiesAmount = 12000;
const context = canvas.getContext("2d");

var mode;

const requestFrame = window.requestAnimationFrame ||
					window.webkitRequestAnimationFrame ||
					window.mozRequestAnimationFrame ||
					window.msRequestAnimationFrame ||
					window.oRequestAnimationFrame ||
					((callback) => {window.setTimeout(callback, 1000 / 60)});

//defining the bh entity class
instrument.bh = function (orbit) {
	bh_entitiesIndex++;
	this.id = bh_entitiesIndex;
	//console.log(this);
	bh_entities[bh_entitiesIndex] = this;

	this.width = 0.7;
	this.height = 0.7;
	this.orbit = orbit;

	this.velocity = Math.floor((Math.random() * 3200) + 2500);

	this.angle = (Math.PI * 2 / this.width) * Math.floor((Math.random() * cw * 4) + 10);
	var choice = Math.random() * 5;

	var rands = [];
	rands.push(Math.random() * 100 + 1);
	rands.push(Math.random() * 10 + 541);

	var choice2 = Math.random() * 4;

	var rands2 = [];
	rands2.push(Math.random() * 100 + 1);
	rands2.push(Math.random() * 180 + 211);

	this.distance = (rands.reduce((p, c) => {
		return p + c;
	}, 0) / rands.length);

	this.distance2 = (rands2.reduce((p, c) => {
		return p + c;
	}, 0) / rands2.length);
	this.increase = Math.PI * 2 / this.width;

	this.distancefix = this.distance;
	this.distance2fix = this.distance2;

	this.color = "50,203,200";
	this.alpha = 1;

	this.bx = Math.random() * 20 + 1;
	this.by = Math.random() * 20 + 1;
	this.inplace = true;
}

instrument.bh.prototype.draw = function () {
	if (this.orbit >= 3) {
		this.x = this.bx + this.distance * Math.cos(this.angle / this.velocity) + cw / 2;
		this.y = this.by + this.distance * Math.sin(this.angle / this.velocity) + ch / 2;
		this.alpha = 0.8;
	} else {
		this.x = this.bx + this.distance2 * Math.cos(this.angle / this.velocity) + cw / 2;
		this.y = this.by + this.distance2 * Math.sin(this.angle / this.velocity) + ch / 2;
		this.alpha = 0.9;
	}
	//this.distance= this.distance + 5;

	this.angle += this.increase;

	context.fillStyle = "rgba(" + this.color + "," + this.alpha + ")";
	context.fillRect(this.x, this.y, this.width, this.height);
}

for(var i = 0; i < bh_entitiesAmount; i++) {
	new instrument.bh((Math.random() * 5));
}

instrument.spawn_bh = () => {
	for(i in bh_entities) {
		bh_entities[i].draw();
	}
}

function instrument() {
	if(play == true){
		requestFrame(() => {
			context.clearRect(0, 0, cw, ch);
			instrument.spawn_bh();

			instrument();
		});
	}
}

instrument();