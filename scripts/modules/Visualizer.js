import { topBars, bottomBars, bottomWaves, sunRays, dot, fadingDot } from "./visualizers.js";
import { indexOfMax } from "./utils.js";

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
		//this.clear();
		if (this.messenger.newTrack) {
			//this.ctx.translate(0, -5);
			//this.ctx.setTransform(1, 0, 0, 1, 0, 0);
			this.messenger.newTrack = false;
		}

		//fadingDot(
		//	this.ctx,
		//	this.frequencyBuffer,
		//	this.analyser.fftSize,
		//	this.centerX,
		//	this.centerY
		//);
		//dot(
		//	this.ctx,
		//	this.frequencyBuffer,
		//	this.analyser.fftSize,
		//	this.centerX,
		//	this.centerY
		//);
		//topBars(this.ctx, this.samplesBuffer, this.space2);
		//bottomBars(this.canvas, this.ctx, this.samplesBuffer, this.space);
		if (indexOfMax(this.frequencyBuffer)>4){
		// bottomWaves(this.canvas, this.ctx, this.frequencyBuffer, this.analyser.fftSize, this.samplesBuffer, this.space);
		dot(this.ctx, this.frequencyBuffer, this.analyser.fftSize, this.centerX, this.centerY);
	}
	};
	stop = () => cancelAnimationFrame(this.animationId);
}
