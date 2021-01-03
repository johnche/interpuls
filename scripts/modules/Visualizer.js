export default class Visualizer {
	constructor(analyser) {
		analyser.fftSize = 2048; // this should be default, but just in case...
		this.analyser = analyser;
		this.animationId = window.requestAnimationFrame(this.visualizerLoop);
		this.frequencyBuffer = new Uint8Array(analyser.frequencyBinCount);
		this.samplesBuffer = new Uint8Array(analyser.fftSize);

		this.canvas = document.getElementById('audio_visual');
		this.ctx = this.canvas.getContext("2d");
		this.centerX = this.canvas.width/2;
		this.centerY = this.canvas.height/2;
		this.space = this.canvas.width/this.frequencyBuffer.length;
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
		this.clear();

		this.samplesBuffer.forEach((value, i) => {
			this.ctx.beginPath();
			this.ctx.moveTo(i, 0);
			this.ctx.lineTo(i, value);
			this.ctx.stroke();
		});

		this.frequencyBuffer.forEach((value, i) => {
			this.ctx.beginPath();
			this.ctx.moveTo(this.space*i, this.canvas.height);
			this.ctx.lineTo(this.space*i, (this.canvas.height - value));
			this.ctx.stroke();
		});
	};

	stop = () => cancelAnimationFrame(this.animationId);
}