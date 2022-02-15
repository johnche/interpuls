import { topBars, bottomBars, bottomWaves, sunRays, square, dot, sunWaves, colorField, Corridoor, verticalWaves, fadingDot, fillDot, sunRise, textile, textileSquiggly, multipleSquare, fillMultipleDots, fillRandomStuff, fillMultipleRandomSquare, RandomSquare, fillMultipleRandomDots, fillSquare, verticalWavesTwo, squareTunnel, circleTunnel, skyTunnel, sunTunnel, hypnoTunnel, buildingTunnel, waveWalls, sunGazer, flowerPattern, flowerCircle, waveWalls2,waveWalls3,waveWalls4,waveWalls5, ocean, ocean2 } from "./visualizers.js";
import { indexOfMax } from "./utils.js";
import { mode, textCounter } from "./text.js";

//mode = 0 -> dont clear between drawing, mode = 1 -> clear between drawing
let chooseVisualizer = 0;
let clearCanvas = 0;

document.getElementById("visualizer").onclick = function () {
	if (chooseVisualizer >= 9) {
		chooseVisualizer = 0;
	}
	else {
		chooseVisualizer++;
	}
}
//buttons
document.getElementById("clear").style.visibility = "hidden";
if (mode == 0) {
	document.getElementById("clear").style.visibility = "hidden";
	console.log(mode);
}
if (mode == 1) {
	document.getElementById("clear").style.visibility = "visible";
	console.log(mode);
}
document.getElementById("clear").onclick = function () {
	clearCanvas = 1;
}

document.onmousemove = handleMouseMove;

var mouse = {};

function handleMouseMove(e) {
	mouse.y = e.clientY-70;
	mouse.x = e.clientX-420;
}

//visualizer
export default class Visualizer {
	constructor(analyser, sampleRate, messenger) {
		this.messenger = messenger;
		analyser.fftSize = 2048; // this should be default, but just in case...
		this.sampleRate = sampleRate;
		this.analyser = analyser;
		this.animationId = window.requestAnimationFrame(this.visualizerLoop);
		this.frequencyBuffer = new Uint8Array(analyser.frequencyBinCount);
		this.samplesBuffer = new Uint8Array(analyser.fftSize);

		this.canvas = document.getElementById('audio_visual');
		this.ctx = this.canvas.getContext("2d");
		this.centerX = this.canvas.width / 2;
		this.centerY = this.canvas.height / 2;
		this.space = this.canvas.width / this.frequencyBuffer.length;
		this.space2 = this.canvas.width / this.samplesBuffer.length;
	}

	visualizerLoop = () => {
		this.animationId = window.requestAnimationFrame(this.visualizerLoop);
		this.analyser.getByteFrequencyData(this.frequencyBuffer);
		this.analyser.getByteTimeDomainData(this.samplesBuffer);
		this.render();
	};

	clear = () => {
		this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
	};

	render = () => {
		if (clearCanvas == 1) {
			this.clear();
			clearCanvas = 0;
		}
		if (this.messenger.newTrack) {
			this.messenger.newTrack = false;
			if (mode == 0) {
				this.clear();
			}
		}
		if (indexOfMax(this.frequencyBuffer) > 4) {
			if (textCounter == 31) {
				chooseVisualizer = 3;
			}
			if (textCounter == 37) {
				chooseVisualizer = 2;
			}
			//lag en visualzier som tracker hvor du er hen og lager noe symmetrisk med det
			if (chooseVisualizer == 0) {
				// square(this.ctx, this.frequencyBuffer, this.analyser.fftSize, this.centerX, this.centerY);
				// fillSquare(this.ctx, this.frequencyBuffer, this.analyser.fftSize, this.centerX, this.centerY);
				// fillMultipleRandomSquare(this.ctx, this.frequencyBuffer, this.analyser.fftSize, this.centerX, this.centerY);
				// fillMultipleRandomDots(this.ctx, this.frequencyBuffer, this.analyser.fftSize, this.centerX, this.centerY);
				// squareTunnel(this.canvas, this.ctx, this.frequencyBuffer, this.analyser.fftSize, this.samplesBuffer, this.space, this.centerX, this.centerY);
				// const lastCoordinates = buildingTunnel(this.canvas, this.ctx, this.frequencyBuffer, this.analyser.fftSize, this.samplesBuffer, this.space, this.centerX, this.centerY, mouse.x, mouse.y);
				
				
				// sunGazer(this.canvas, this.ctx, this.frequencyBuffer, this.analyser.fftSize, this.samplesBuffer, this.space, this.centerX, this.centerY, mouse.x, mouse.y);
				// flowerPattern(this.canvas, this.ctx, this.frequencyBuffer, this.analyser.fftSize, this.samplesBuffer, this.space, this.centerX, this.centerY, mouse.x, mouse.y);
				// buildingTunnel(this.canvas, this.ctx, this.frequencyBuffer, this.analyser.fftSize, this.samplesBuffer, this.space, this.centerX, this.centerY, mouse.x, mouse.y);

				waveWalls(this.canvas, this.ctx, this.frequencyBuffer, this.analyser.fftSize, this.samplesBuffer, this.space, this.centerX, this.centerY, mouse.x, mouse.y);
				// waveWalls2(this.canvas, this.ctx, this.frequencyBuffer, this.analyser.fftSize, this.samplesBuffer, this.space, this.centerX, this.centerY, mouse.x, mouse.y);
				// waveWalls3(this.canvas, this.ctx, this.frequencyBuffer, this.analyser.fftSize, this.samplesBuffer, this.space, this.centerX, this.centerY, mouse.x, mouse.y);
				// waveWalls5(this.canvas, this.ctx, this.frequencyBuffer, this.analyser.fftSize, this.samplesBuffer, this.space, this.centerX, this.centerY, mouse.x, mouse.y);
				// flowerCircle(this.canvas, this.ctx, this.frequencyBuffer, this.analyser.fftSize, this.samplesBuffer, this.space, this.centerX, this.centerY, mouse.x, mouse.y);
				// hypnoTunnel(this.canvas, this.ctx, this.frequencyBuffer, this.analyser.fftSize, this.samplesBuffer, this.space, this.centerX, this.centerY);
				// textile(this.canvas, this.ctx, this.frequencyBuffer, this.analyser.fftSize, this.samplesBuffer, this.space);

				// ocean(this.canvas, this.ctx, this.frequencyBuffer, this.analyser.fftSize, this.samplesBuffer, this.space, this.centerX, this.centerY, mouse.x, mouse.y);
				// ocean2(this.canvas, this.ctx, this.frequencyBuffer, this.analyser.fftSize, this.samplesBuffer, this.space, this.centerX, this.centerY, mouse.x, mouse.y);
				// bottomWaves(this.canvas, this.ctx, this.frequencyBuffer, this.analyser.fftSize, this.samplesBuffer, this.space);
				// verticalWavesTwo(this.canvas, this.ctx, this.frequencyBuffer, this.analyser.fftSize, this.samplesBuffer, this.space, this.centerX, this.centerY);
				// textileSquiggly(this.canvas, this.ctx, this.frequencyBuffer, this.analyser.fftSize, this.samplesBuffer, this.space);
			}
			if (chooseVisualizer == 1) {
				//sunRays(this.canvas, this.ctx, this.frequencyBuffer, this.analyser.fftSize, this.samplesBuffer, this.space);
				waveWalls3(this.canvas, this.ctx, this.frequencyBuffer, this.analyser.fftSize, this.samplesBuffer, this.space, this.centerX, this.centerY, mouse.x, mouse.y);
				// squareTunnel(this.canvas, this.ctx, this.frequencyBuffer, this.analyser.fftSize, this.samplesBuffer, this.space, this.centerX, this.centerY);
				// fillMultipleRandomDots(this.ctx, this.frequencyBuffer, this.analyser.fftSize, this.centerX, this.centerY);
			}
			if (chooseVisualizer == 2) {
				waveWalls2(this.canvas, this.ctx, this.frequencyBuffer, this.analyser.fftSize, this.samplesBuffer, this.space, this.centerX, this.centerY, mouse.x, mouse.y);
				// circleTunnel(this.canvas, this.ctx, this.frequencyBuffer, this.analyser.fftSize, this.samplesBuffer, this.space, this.centerX, this.centerY);
				// textile(this.canvas, this.ctx, this.frequencyBuffer, this.analyser.fftSize, this.samplesBuffer, this.space);
			}
			if (chooseVisualizer == 3) {
				waveWalls5(this.canvas, this.ctx, this.frequencyBuffer, this.analyser.fftSize, this.samplesBuffer, this.space, this.centerX, this.centerY, mouse.x, mouse.y);
				// flowerCircle(this.canvas, this.ctx, this.frequencyBuffer, this.analyser.fftSize, this.samplesBuffer, this.space, this.centerX, this.centerY, mouse.x, mouse.y);
				// sunTunnel(this.canvas, this.ctx, this.frequencyBuffer, this.analyser.fftSize, this.samplesBuffer, this.space, this.centerX, this.centerY);
				//fillDot(this.ctx, this.frequencyBuffer, this.analyser.fftSize, this.centerX, this.centerY);
			}
			if (chooseVisualizer == 4) {
				flowerCircle(this.canvas, this.ctx, this.frequencyBuffer, this.analyser.fftSize, this.samplesBuffer, this.space, this.centerX, this.centerY, mouse.x, mouse.y);
				// skyTunnel(this.canvas, this.ctx, this.frequencyBuffer, this.analyser.fftSize, this.samplesBuffer, this.space, this.centerX, this.centerY);
				// fillSquare(this.ctx, this.frequencyBuffer, this.analyser.fftSize, this.centerX, this.centerY);
			}
			if (chooseVisualizer == 5) {
				// skyTunnel(this.canvas, this.ctx, this.frequencyBuffer, this.analyser.fftSize, this.samplesBuffer, this.space, this.centerX, this.centerY);
				hypnoTunnel(this.canvas, this.ctx, this.frequencyBuffer, this.analyser.fftSize, this.samplesBuffer, this.space, this.centerX, this.centerY);
				//dot(this.ctx, this.frequencyBuffer, this.analyser.fftSize, this.centerX, this.centerY);
			}
			if (chooseVisualizer == 6) {
				textile(this.canvas, this.ctx, this.frequencyBuffer, this.analyser.fftSize, this.samplesBuffer, this.space);
			}
			if (chooseVisualizer == 7) {
				fillMultipleRandomSquare(this.ctx, this.frequencyBuffer, this.analyser.fftSize, this.centerX, this.centerY);
			}
			if (chooseVisualizer == 8) {
				bottomWaves(this.canvas, this.ctx, this.frequencyBuffer, this.analyser.fftSize, this.samplesBuffer, this.space);
			}
			if (chooseVisualizer == 9) {
				textile(this.canvas, this.ctx, this.frequencyBuffer, this.analyser.fftSize, this.samplesBuffer, this.space);
			}
		}
	};
	stop = () => cancelAnimationFrame(this.animationId);
}
