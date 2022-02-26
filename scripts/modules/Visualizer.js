import {
	carpet2P,
	vis3,
	vis5,
	vis7,
	carpet4P,
	rope,
	carpetPattern,
	carpetPattern3,
	dot,
	carpetCentre3,
	vis1,
} from "./visualizers.js";
import { isTouchUnit, getIterator, indexOfMax, shuffleArray } from "./utils.js";
import { colors } from "../lib/colors.js";

export default class Visualizer {
	constructor(htmlElements, analyser, sampleRate) {
		analyser.fftSize = 2048; // this should be default, but just in case...
		this.sampleRate = sampleRate;
		this.animationId = window.requestAnimationFrame(this.visualizerLoop);

		const canvas = htmlElements.canvas;
		const frequencyBuffer = new Uint8Array(analyser.frequencyBinCount);
		const samplesBuffer = new Uint8Array(analyser.fftSize);

		this.visualizerIterator = getIterator([
			vis3,
			vis5,
			vis7,
			carpetPattern,
			carpetPattern3,
			rope,
			carpet2P,
			carpet4P,
			dot,
			carpetCentre3,
			vis1
		], true);

		this.visualizer = this.visualizerIterator.next().value;
		this.colorThemeIterator = getIterator(shuffleArray([...colors]), true);
		const { colorList, background } = this.colorThemeIterator.next().value;
		this.currentColorsIterator = getIterator(colorList, true);

		const centerX = canvas.width/2;
		const centerY = canvas.height/2;
		this.visualizerContext = {
			canvas,
			frequencyBuffer,
			samplesBuffer,
			analyser,
			ctx: canvas.getContext("2d"),
			frequencyWidth: canvas.width/frequencyBuffer.length,
			samplesWidth: canvas.width/samplesBuffer.length,
			themeColor: this.currentColorsIterator.next().value,
			currentColorList: this.colorThemeIterator.next().value,
			backgroundColor: background,
			mousePosition: { x: centerX, y: centerY },
			clickPosition: { x: centerX, y: centerY },
			centerX,
			centerY,
		};

		htmlElements.styleButton.addEventListener('click', this.updateVisualizer);
		htmlElements.colorButton.addEventListener('click', this.updateColorTheme);

		if (isTouchUnit) {
			document.addEventListener('touchmove', this.handleT);
			document.addEventListener('touchstart', this.handleGlobalClick);
		}
		else {
			document.addEventListener('mousemove', this.handleMoveEvent);
			document.addEventListener('click', this.handleClickEvent);
		}
	}

	handleMoveEvent = (e) => {
		this.visualizerContext.mousePosition.x = e.clientX;
		this.visualizerContext.mousePosition.y = e.clientY;
	};

	handleTouchMoveEvent = (e) => {
		e.preventDefault();
		this.visualizerContext.mousePosition.x = e.touches[0].pageX;
		this.visualizerContext.mousePosition.y = e.touches[0].pageY;
	};

	handleClickEvent = (e) => {
		this.visualizerContext.clickPosition.x = e.clientX;
		this.visualizerContext.clickPosition.y = e.clientY;
	};

	handleTapEvent = (e) => {
		e.preventDefault();
		this.visualizerContext.clickPosition.x = e.touches[0].pageX;
		this.visualizerContext.clickPosition.y = e.touches[0].pageY;
	};

	visualizerLoop = () => {
		this.animationId = window.requestAnimationFrame(this.visualizerLoop);
		this.visualizerContext.analyser.getByteFrequencyData(this.visualizerContext.frequencyBuffer);
		this.visualizerContext.analyser.getByteTimeDomainData(this.visualizerContext.samplesBuffer);
		this.render();
	};

	updateVisualizer = () => {
		this.visualizer = this.visualizerIterator.next().value;

		// Clear visualizer "local" cache
		this.visualizerContext.cache = undefined;
	};

	updateColorTheme = () => {
		const { colorList, background } = this.colorThemeIterator.next().value;
		document.body.style.background = background;
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
