export default class Visualizer {
	constructor(analyser) {
		this.canvas = document.getElementById('audio_visual');
		this.ctx = this.canvas.getContext("2d");

		//analyser.fftSize = 2048;
		this.analyser = analyser;
		this.animationId = window.requestAnimationFrame(this.visualizerLoop);
		this.frequencyBuffer = new Uint8Array(analyser.frequencyBinCount);
		this.space = this.canvas.width/this.frequencyBuffer.length;
	}

	visualizerLoop = () => {
		this.animationId = window.requestAnimationFrame(this.visualizerLoop);
		this.analyser.getByteFrequencyData(this.frequencyBuffer);
		this.render();
	};

	clear = () => {
		this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
	};

	render = () => {
		this.clear();
		this.frequencyBuffer.forEach((value, i) => {
			this.ctx.beginPath();
			this.ctx.moveTo(this.space*i, this.canvas.height);
			this.ctx.lineTo(this.space*i, (this.canvas.height - value));
			this.ctx.stroke();
		});
	};

	stop = () => cancelAnimationFrame(this.animationId);
}
