import { topBars, bottomBars, bottomWaves, sunRays, dot, sunWaves, colorField, fadingDot, fillDot, sunRise, textile } from "./visualizers.js";
import { indexOfMax } from "./utils.js";
import { mode, textCounter } from "./text.js";

//mode = 0 -> dont clear between drawing, mode = 1 -> clear between drawing
let chooseVisualizer = 0;
let clearCanvas = 0;

document.getElementById("visualizer").onclick = function(){
	if (chooseVisualizer >= 3){
		chooseVisualizer = 0;
	}
	else{
	chooseVisualizer++;
}}
//buttons
document.getElementById("clear").style.visibility = "hidden";
if (mode == 0){
	document.getElementById("clear").style.visibility = "hidden";
	console.log(mode);
}
if (mode == 1){
	document.getElementById("clear").style.visibility = "visible";
	console.log(mode);
}
document.getElementById("clear").onclick = function(){
	clearCanvas = 1;
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
		this.centerX = this.canvas.width/2;
		this.centerY = this.canvas.height/2;
		this.space = this.canvas.width/this.frequencyBuffer.length;
		this.space2 = this.canvas.width/this.samplesBuffer.length;
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
		if (clearCanvas == 1 ){
			this.clear();
			clearCanvas = 0;
		}
		if (this.messenger.newTrack) {
			this.messenger.newTrack = false;
			if (mode == 0){
			this.clear();
			}
		}
		if (indexOfMax(this.frequencyBuffer)>4){
			if (textCounter == 37){
				chooseVisualizer = 2;
			}
		if (chooseVisualizer == 0){
			dot(this.ctx, this.frequencyBuffer, this.analyser.fftSize, this.centerX, this.centerY);
		}
		if (chooseVisualizer == 1){
			sunRays(this.canvas, this.ctx, this.frequencyBuffer, this.analyser.fftSize, this.samplesBuffer, this.space);
		}
		if (chooseVisualizer == 2){
			textile(this.canvas, this.ctx, this.frequencyBuffer, this.analyser.fftSize, this.samplesBuffer, this.space);
		}
		if (chooseVisualizer == 3){
			fillDot(this.ctx, this.frequencyBuffer, this.analyser.fftSize, this.centerX, this.centerY);
		}
	}};
	stop = () => cancelAnimationFrame(this.animationId);
}
