import {
	sunRays,
	dot,
	fillDot,
	textile
} from "./visualizers.js";
import { getIterator, indexOfMax, shuffleArray } from "./utils.js";
import { colors } from "../lib/colors.js";

export default class Visualizer {
	constructor(htmlElements, analyser, sampleRate) {
		analyser.fftSize = 2048; // this should be default, but just in case...
		this.sampleRate = sampleRate;
		this.animationId = window.requestAnimationFrame(this.visualizerLoop);

		const canvas = htmlElements.canvas;
		const frequencyBuffer = new Uint8Array(analyser.frequencyBinCount);
		const samplesBuffer = new Uint8Array(analyser.fftSize);

		this.visualizerIterator = getIterator([dot, sunRays, textile, fillDot], true);
		this.visualizer = this.visualizerIterator.next().value;
		this.colorThemeIterator = getIterator(shuffleArray([...colors]), true);
		const { colorList, background } = this.colorThemeIterator.next().value;
		this.currentColorsIterator = getIterator(colorList, true);

		this.visualizerContext = {
			canvas,
			frequencyBuffer,
			samplesBuffer,
			analyser,
			ctx: canvas.getContext("2d"),
			centerX: canvas.width/2,
			centerY: canvas.height/2,
			frequencyWidth: canvas.width/frequencyBuffer.length,
			samplesWidth: canvas.width/samplesBuffer.length,
			themeColor: this.currentColorsIterator.next().value,
			backgroundColor: background
		};

		htmlElements.visualizer.onclick = this.updateVisualizer;
	}

	visualizerLoop = () => {
		this.animationId = window.requestAnimationFrame(this.visualizerLoop);
		this.visualizerContext.analyser.getByteFrequencyData(this.visualizerContext.frequencyBuffer);
		this.visualizerContext.analyser.getByteTimeDomainData(this.visualizerContext.samplesBuffer);
		this.render();
	};

	updateVisualizer = () => {
		this.visualizer = this.visualizerIterator.next().value;
	};

	updateColorTheme = () => {
		const { colorList, background } = this.colorThemeIterator.next().value;
		this.currentColorsIterator = getIterator(colorList, true);
		this.visualizerContext = {
			...this.visualizerContext,
			themeColor: this.currentColorsIterator.next().value,
			backgroundColor: background,
		};
	};

	updateColors = () => {
		this.visualizerContext = {
			...this.visualizerContext,
			themeColor: this.currentColorsIterator.next().value
		};
	};

	clear = ({ctx, canvas}) => {
		ctx.clearRect(0, 0, canvas.width, canvas.height);
	};

	render = () => {
		// Only lower frequencies, we spread context properties as arguments
		// into the visualizer
		if (indexOfMax(this.visualizerContext.frequencyBuffer) > 4) {
			this.visualizer(this.visualizerContext);
		}
	};

	stop = () => cancelAnimationFrame(this.animationId);
}
