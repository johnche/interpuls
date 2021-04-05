import {
	sunRays,
	dot,
	fillDot,
	textile
} from "./visualizers.js";
import { getIterator, indexOfMax } from "./utils.js";
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
		this.animationId = window.requestAnimationFrame(this.visualizerLoop);

		const canvas = document.getElementById('audio_visual');
		const frequencyBuffer = new Uint8Array(analyser.frequencyBinCount);
		const samplesBuffer = new Uint8Array(analyser.fftSize);

		this.visualizerContext = {
			canvas,
			frequencyBuffer,
			samplesBuffer,
			analyser,
			ctx: canvas.getContext("2d"),
			centerX: canvas.width/2,
			centerY: canvas.height/2,
			frequencyWidth: canvas.width/frequencyBuffer.length,
			samplesWidth: canvas.width/samplesBuffer.length
		};

		//this.visualizers = getIterator([dot, sunRays, textile, fillDot], loop=true);
	}

	visualizerLoop = () => {
		this.animationId = window.requestAnimationFrame(this.visualizerLoop);
		this.visualizerContext.analyser.getByteFrequencyData(this.visualizerContext.frequencyBuffer);
		this.visualizerContext.analyser.getByteTimeDomainData(this.visualizerContext.samplesBuffer);
		this.render();
	};

	clear = ({ctx, canvas}) => {
		ctx.clearRect(0, 0, canvas.width, canvas.height);
	};

	render = () => {
		if (clearCanvas == 1 ){
			this.clear(this.visualizerContext);
			clearCanvas = 0;
		}
		if (this.messenger.newTrack) {
			this.messenger.newTrack = false;
			if (mode == 0){
				this.clear(this.visualizerContext);
			}
		}
		if (indexOfMax(this.visualizerContext.frequencyBuffer)>4){
			if (textCounter == 31){
				chooseVisualizer = 3;
			}
			if (textCounter == 37){
				chooseVisualizer = 2;
			}
			if (chooseVisualizer == 0){
				dot(this.visualizerContext);
			}
			if (chooseVisualizer == 1){
				sunRays(this.visualizerContext);
			}
			if (chooseVisualizer == 2){
				textile(this.visualizerContext);
			}
			if (chooseVisualizer == 3){
				fillDot(this.visualizerContext);
			}
		}};
	stop = () => cancelAnimationFrame(this.animationId);
}
