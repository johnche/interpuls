import { indexOfMax, hexToHSL, random } from "./utils.js";
import { counter } from "./FeldmanMachine.js";
import { getRothko } from './rothko.js';
import { textList, textCounter } from "./text.js";
export let randomList = 0;
export let alphaValue = 0;

//lag en rothko versjon
//lag en tegne versjon
//og lag en tunnell versjon 
export const bottomBars = (canvas, ctx, arr, space) => {
	arr.forEach((value, i) => {
		ctx.beginPath();
		ctx.moveTo(space * i, canvas.height);
		ctx.lineTo(space * i, (canvas.height - value));
		ctx.stroke();
	});
};

export const topBars = (ctx, arr, space) => {
	arr.forEach((value, i) => {
		ctx.beginPath();
		ctx.moveTo(space * i, 0);
		ctx.lineTo(space * i, value);
		ctx.stroke();
	});
};


export const bottomWaves = (canvas, ctx, freqs, fftSize, arr, space) => {
	//change background-color to rothko-color
	var center = document.querySelectorAll(".center");
	for (var i = 0; i < center.length; i++) {
		console.log(center[i].style.color);
		center[i].style.color = getRothko().background;
	}
	document.body.style.setProperty('background-color', getRothko().background);
	//change to next color in colorList from rothko whenever feldman short has been triggered
	const colorH = getRothko().colorList[counter];
	//convert hex to HSL
	const hsla = hexToHSL(colorH);
	const amplitude = Math.max(...freqs);
	//scale amplitude
	const ampScale = amplitude * (1 / 255);
	//filter out noise
	let filter = 1;
	let alphaAmplitude = 0;
	const sideMultiplier = 25;
	const iMultiplier = sideMultiplier * 2;

	if (amplitude > 80) {
		alphaAmplitude = ampScale;
		filter = 1;
	}
	if (amplitude <= 80) {
		alphaAmplitude = ampScale * 0.01;
		filter = 0;
	}
	const normalizedFrequency = indexOfMax(freqs) / fftSize;
	const colorAmplitude = Math.round(-amplitude) * filter;
	const colorL = Math.abs((colorAmplitude) * (80 / 255) + 100).toFixed(2) + '%';
	const colorS = Math.abs((colorAmplitude) * (10 / 255) + 100).toFixed(2) + '%';
	const color = `hsl(${hsla[0] + (Math.round(360 * normalizedFrequency) * 10)}, ${colorS}, ${colorL})`;
	const alpha = alphaAmplitude;
	//draw
	ctx.strokeStyle = color;
	ctx.globalAlpha = alpha;

	arr.forEach((value, i) => {
		ctx.beginPath();
		// ctx.moveTo(0, (canvas.height - value-200));
		ctx.moveTo(space * i, (canvas.height - value - 200));
		// ctx.bezierCurveTo(space/i, (canvas.height-value-200), space*i, (canvas.height-value-200), canvas.width, (canvas.height - value - 200));
		ctx.lineTo(space * i, (canvas.height - value) - 200);
		const gradient = ctx.createRadialGradient(x, y, 0, x, y, random(100 * alpha, 3000 * alpha) / alpha);
		gradient.addColorStop(0, `hsla(${h}, ${colorS}, ${colorL}, 0)`);
		gradient.addColorStop(1, `hsla(${h}, ${colorS}, ${colorL}, ${random(0, 1)})`);
		ctx.fillStyle = gradient;

		// ctx.lineTo(space * i/0.5, (canvas.height - value) - 200);
		ctx.stroke();
		// ctx.fill();

	});
};
//make drawing app, so that all these visualizers turn into variations of drawing.
export const verticalWavesTwo = (canvas, ctx, freqs, fftSize, arr, space, x, y) => {
	//change background-color to rothko-color
	var center = document.querySelectorAll(".center");
	for (var i = 0; i < center.length; i++) {
		center[i].style.color = getRothko().background;
	}
	document.body.style.setProperty('background-color', getRothko().background);
	//change to next color in colorList from rothko whenever feldman short has been triggered
	const colorH = getRothko().colorList[counter];
	//convert hex to HSL
	const hsla = hexToHSL(colorH);
	const amplitude = Math.max(...freqs);
	//scale amplitude
	const ampScale = amplitude * (1 / 255);
	//filter out noise
	let filter = 1;
	let alphaAmplitude = 0;


	if (amplitude > 80) {
		alphaAmplitude = ampScale;
		filter = 1;
	}
	if (amplitude <= 80) {
		alphaAmplitude = ampScale * 0.01;
		filter = 0;
	}
	const normalizedFrequency = indexOfMax(freqs) / fftSize;
	const h = hsla[0] + (Math.round(360 * normalizedFrequency) * 10);
	const colorAmplitude = Math.round(-amplitude) * filter;
	const colorL = Math.abs((colorAmplitude) * (80 / 255) + 100).toFixed(2) + '%';
	const colorS = Math.abs((colorAmplitude) * (10 / 255) + 100).toFixed(2) + '%';
	const color = `hsl(${hsla[0] + (Math.round(360 * normalizedFrequency) * 10)}, ${colorS}, ${colorL})`;

	const alpha = alphaAmplitude;
	const diameter = amplitude * 5;
	const side = Math.sqrt((diameter * diameter) / 2);

	const patternCanvas = document.createElement('canvas');
	const patternContext = patternCanvas.getContext('2d');

	// Give the pattern a width and height of 50
	patternCanvas.width = 50 / ampScale;
	patternCanvas.height = 50 / ampScale;
	patternContext.strokeStyle = color;
	patternContext.globalAlpha = alpha;
	const gradient = patternContext.createRadialGradient(0, 0, 0, 50, 50, random(100 * alpha, 3000 * alpha) / alpha);
	gradient.addColorStop(0, `hsla(${h}, ${colorS}, ${colorL}, 0)`);
	gradient.addColorStop(1, `hsla(${h}, ${colorS}, ${colorL}, ${random(0, 1)})`);
	patternContext.fillStyle = gradient;
	patternContext.lineWidth = ampScale;
	arr.forEach((value, i) => {
		patternContext.lineCap = 'round';
		patternContext.lineJoin = 'butt';
		patternContext.beginPath();
		patternContext.moveTo(patternCanvas.width * i * ampScale, (patternCanvas.height - value / ampScale * Math.PI));
		patternContext.lineTo(patternCanvas.width * i / ampScale * Math.PI, (patternCanvas.height - value) * ampScale + 100);
		patternContext.stroke();
	});

	//draw
	// arr.forEach((value, i) => {
	const pattern = ctx.createPattern(patternCanvas, 'repeat');
	const patternCanvasTwo = document.createElement('canvas');
	const patternContextTwo = patternCanvasTwo.getContext('2d');

	patternCanvasTwo.width = 75 / ampScale + 1;
	patternCanvasTwo.height = 75 / ampScale + 1;
	patternContextTwo.strokeStyle = color;

	patternContextTwo.fillStyle = pattern;
	patternContextTwo.beginPath();
	patternContextTwo.rect(x - side / 2, y - side / 2, side, side);
	patternContextTwo.fill();
	patternContextTwo.stroke();
	const patternTwo = ctx.createPattern(patternCanvasTwo, 'repeat');
	ctx.fillStyle = patternTwo;
	ctx.fillRect(x - side / 2, y - side / 2, side, side);
	ctx.lineWidth = ampScale * 2.5;
	ctx.strokeStyle = color;
	ctx.globalAlpha = alpha;
	ctx.stroke();
};

export const kumlokk = (canvas, ctx, freqs, fftSize, arr, space, x, y) => {
	//change background-color to rothko-color
	var center = document.querySelectorAll(".center");
	for (var i = 0; i < center.length; i++) {
		center[i].style.color = getRothko().background;
	}
	document.body.style.setProperty('background-color', getRothko().background);
	//change to next color in colorList from rothko whenever feldman short has been triggered
	const colorH = getRothko().colorList[counter];
	//convert hex to HSL
	const hsla = hexToHSL(colorH);
	const amplitude = Math.max(...freqs);
	//scale amplitude
	const ampScale = amplitude * (1 / 255);
	//filter out noise
	let filter = 1;
	let alphaAmplitude = 0;


	if (amplitude > 80) {
		alphaAmplitude = ampScale;
		filter = 1;
	}
	if (amplitude <= 80) {
		alphaAmplitude = ampScale * 0.01;
		filter = 0;
	}
	const normalizedFrequency = indexOfMax(freqs) / fftSize;
	const h = hsla[0] + (Math.round(360 * normalizedFrequency) * 10);
	const colorAmplitude = Math.round(-amplitude) * filter;
	const colorL = Math.abs((colorAmplitude) * (80 / 255) + 100).toFixed(2) + '%';
	const colorS = Math.abs((colorAmplitude) * (10 / 255) + 100).toFixed(2) + '%';
	const color = `hsl(${hsla[0] + (Math.round(360 * normalizedFrequency) * 10)}, ${colorS}, ${colorL})`;

	const alpha = alphaAmplitude;

	const patternCanvas = document.createElement('canvas');
	const patternContext = patternCanvas.getContext('2d');

	// Give the pattern a width and height of 50
	patternCanvas.width = 50;
	patternCanvas.height = 50;
	patternContext.strokeStyle = color;
	patternContext.globalAlpha = alpha;
	const diameter = amplitude * 2;
	const side = Math.sqrt((diameter * diameter) / 2);
	//draw

	arr.forEach((value, i) => {
		patternContext.beginPath();
		patternContext.strokeStyle = color;
		patternContext.globalAlpha = alpha;
		patternContext.moveTo(space * i * h, (canvas.height - value) * h);
		patternContext.lineTo((space * i * h), -((canvas.height - value) / alpha) * 2);
		patternContext.stroke();
	});
	//draw
	// arr.forEach((value, i) => {
	const pattern = ctx.createPattern(patternCanvas, 'repeat');
	ctx.fillStyle = pattern;
	ctx.beginPath();
	ctx.arc(x, y, amplitude * 1.5, 0, 2 * Math.PI / ampScale);
	ctx.fill();
	ctx.strokeStyle = color;
	ctx.globalAlpha = alpha;
	ctx.stroke();
};

export const sunset = (canvas, ctx, freqs, fftSize, arr, space, x, y) => {
	//change background-color to rothko-color
	var center = document.querySelectorAll(".center");
	for (var i = 0; i < center.length; i++) {
		center[i].style.color = getRothko().background;
	}
	document.body.style.setProperty('background-color', getRothko().background);
	//change to next color in colorList from rothko whenever feldman short has been triggered
	const colorH = getRothko().colorList[counter];
	//convert hex to HSL
	const hsla = hexToHSL(colorH);
	const amplitude = Math.max(...freqs);
	//scale amplitude
	const ampScale = amplitude * (1 / 255);
	//filter out noise
	let filter = 1;
	let alphaAmplitude = 0;


	if (amplitude > 80) {
		alphaAmplitude = ampScale;
		filter = 1;
	}
	if (amplitude <= 80) {
		alphaAmplitude = ampScale * 0.01;
		filter = 0;
	}
	const normalizedFrequency = indexOfMax(freqs) / fftSize;
	const h = hsla[0] + (Math.round(360 * normalizedFrequency) * 10);
	const colorAmplitude = Math.round(-amplitude) * filter;
	const colorL = Math.abs((colorAmplitude) * (80 / 255) + 100).toFixed(2) + '%';
	const colorS = Math.abs((colorAmplitude) * (10 / 255) + 100).toFixed(2) + '%';
	const color = `hsl(${hsla[0] + (Math.round(360 * normalizedFrequency) * 10)}, ${colorS}, ${colorL})`;

	const alpha = alphaAmplitude;

	const patternCanvas = document.createElement('canvas');
	const patternContext = patternCanvas.getContext('2d');

	// Give the pattern a width and height of 50
	patternCanvas.width = 50;
	patternCanvas.height = 50;
	patternContext.strokeStyle = color;
	patternContext.globalAlpha = alpha;
	const diameter = amplitude * 2;
	const side = Math.sqrt((diameter * diameter) / 2);
	const gradient = patternContext.createRadialGradient(0, 0, 0, 50, 50, random(100 * alpha, 3000 * alpha) / alpha);
	gradient.addColorStop(0, `hsla(${h}, ${colorS}, ${colorL}, 0)`);
	gradient.addColorStop(1, `hsla(${h}, ${colorS}, ${colorL}, ${random(0, 1)})`);
	ctx.fillStyle = color;
	ctx.strokeStyle = color;
	ctx.globalAlpha = alpha;
	ctx.lineCap = 'round';
	ctx.lineJoin = 'butt';
	arr.forEach((value, i) => {
		ctx.beginPath();
		ctx.fillRect(space, y - side / i * 2 + 350, 2000 / space, side / value);
		ctx.lineWidth = ampScale * 20;
		ctx.stroke();
	});
};

export const hypnoTunnel = (canvas, ctx, freqs, fftSize, arr, space, x, y) => {
	//change background-color to rothko-color
	var center = document.querySelectorAll(".center");
	for (var i = 0; i < center.length; i++) {
		center[i].style.color = getRothko().background;
	}
	document.body.style.setProperty('background-color', getRothko().background);
	//change to next color in colorList from rothko whenever feldman short has been triggered
	const colorH = getRothko().colorList[counter];
	//convert hex to HSL
	const hsla = hexToHSL(colorH);
	const amplitude = Math.max(...freqs);
	//scale amplitude
	const ampScale = amplitude * (1 / 255);
	//filter out noise
	let filter = 1;
	let alphaAmplitude = 0;


	if (amplitude > 80) {
		alphaAmplitude = ampScale;
		filter = 1;
	}
	if (amplitude <= 80) {
		alphaAmplitude = ampScale * 0.01;
		filter = 0;
	}
	const normalizedFrequency = indexOfMax(freqs) / fftSize;
	const h = hsla[0] + (Math.round(360 * normalizedFrequency) * 10);
	const colorAmplitude = Math.round(-amplitude) * filter;
	const colorL = Math.abs((colorAmplitude) * (80 / 255) + 100).toFixed(2) + '%';
	const colorS = Math.abs((colorAmplitude) * (10 / 255) + 100).toFixed(2) + '%';
	const color = `hsl(${hsla[0] + (Math.round(360 * normalizedFrequency) * 10)}, ${colorS}, ${colorL})`;

	const alpha = alphaAmplitude;

	const diameter = amplitude * 2;
	const side = Math.sqrt((diameter * diameter) / 2);
	ctx.strokeStyle = color;
	ctx.globalAlpha = alpha;
	ctx.lineCap = 'round';
	ctx.lineJoin = 'butt';
	ctx.lineWidth = ampScale;
	const gradient = ctx.createRadialGradient(0, 0, 0, 50, 50, random(100 * alpha, 3000 * alpha) / alpha);
	gradient.addColorStop(0, `hsla(${h}, ${colorS}, ${colorL}, 0)`);
	gradient.addColorStop(1, `hsla(${h}, ${colorS}, ${colorL}, ${random(0, 1)})`);
	ctx.fillStyle = gradient;
	for (var i = 0; i < 70; i++) {
		// ctx.clearRect(0, 0, canvas.width, canvas.height);
		ctx.lineWidth = ampScale;
		ctx.beginPath();
		ctx.arc(x, y, Math.abs(canvas.width - 10 * i / ampScale + 1), 0, 2 * Math.PI);
		ctx.stroke();
	}
	ctx.beginPath();
	ctx.moveTo(x, y);
	ctx.arc(x, y, ampScale, 0, 2 * Math.PI);
	ctx.fill();
	ctx.stroke();
};

export const squareTunnel = (canvas, ctx, freqs, fftSize, arr, space, x, y) => {
	document.onmousemove = handleMouseMove;
	//change background-color to rothko-color
	var center = document.querySelectorAll(".center");
	for (var i = 0; i < center.length; i++) {
		center[i].style.color = getRothko().background;
	}
	document.body.style.setProperty('background-color', getRothko().background);
	//change to next color in colorList from rothko whenever feldman short has been triggered
	const colorH = getRothko().colorList[counter];
	//convert hex to HSL
	const hsla = hexToHSL(colorH);
	const amplitude = Math.max(...freqs);
	//scale amplitude
	const ampScale = amplitude * (1 / 255);
	//filter out noise
	let filter = 1;
	let alphaAmplitude = 0;


	if (amplitude > 80) {
		alphaAmplitude = ampScale;
		filter = 1;
	}
	if (amplitude <= 80) {
		alphaAmplitude = ampScale * 0.01;
		filter = 0;
	}
	const normalizedFrequency = indexOfMax(freqs) / fftSize;
	const h = hsla[0] + (Math.round(360 * normalizedFrequency) * 10);
	const colorAmplitude = Math.round(-amplitude) * filter;
	const colorL = Math.abs((colorAmplitude) * (80 / 255) + 100).toFixed(2) + '%';
	const colorS = Math.abs((colorAmplitude) * (10 / 255) + 100).toFixed(2) + '%';
	const color = `hsl(${hsla[0] + (Math.round(360 * normalizedFrequency) * 10)}, ${colorS}, ${colorL})`;

	const alpha = alphaAmplitude;

	const diameter = amplitude * 2;
	const side = Math.sqrt((diameter * diameter) / 2);
	ctx.fillStyle = color;
	ctx.strokeStyle = color;
	ctx.globalAlpha = alpha;
	ctx.lineCap = 'round';
	ctx.lineJoin = 'butt';
	ctx.lineWidth = ampScale;

	//Everything inbetween
	const sideMultiplier = 25;
	const iMultiplier = sideMultiplier * 2;
	//leftSide
	//first star-shape
	function handleMouseMove(e) {
		for (var i = 0; i < iMultiplier; i++) {
			ctx.moveTo(0, sideMultiplier * i / 1.75);
			ctx.lineTo(e.clientX * alpha, y);
		}

		for (var i = 0; i < iMultiplier; i++) {
			ctx.moveTo(canvas.width, sideMultiplier * i / 1.75);
			ctx.lineTo(e.clientX * -alpha + x * 2, y);
		}

		for (var i = 0; i < iMultiplier; i++) {
			ctx.moveTo(sideMultiplier * i / 1.75, 0);
			ctx.lineTo(x, e.clientY * alpha);
		}

		for (var i = 0; i < iMultiplier; i++) {
			ctx.moveTo(sideMultiplier * i / 1.75, canvas.height);
			ctx.lineTo(x, e.clientY * -alpha + y * 2);
		}
	}

	//second starshape
	// for(var i = 0; i<iMultiplier; i++){
	// 	ctx.moveTo(0, canvas.height*i/2);
	// 	ctx.lineTo(x*alpha, y/2);
	// 	}

	// for(var i = 0; i<iMultiplier; i++){
	// 	ctx.moveTo(canvas.width, sideMultiplier*i/1.75);
	// 	ctx.lineTo(x*-alpha+x*2, y/2);
	// 	}

	// for(var i = 0; i<iMultiplier; i++){
	// 	ctx.moveTo(sideMultiplier*i/1.75, 0);
	// 	ctx.lineTo(x, y*alpha/2);
	// 	}

	// for(var i = 0; i<iMultiplier; i++){
	// 	ctx.moveTo(sideMultiplier*i/1.75, canvas.height);
	// 	ctx.lineTo(x, y*-alpha+y*2/2);
	// 	}
	console.log(x * -alpha + x);
	// //upperLeftCorner
	// ctx.moveTo(0, 0);
	// ctx.lineTo(x - side/2, y - side/2);
	// //lowerLeftCorner
	// ctx.moveTo(0, canvas.height);
	// ctx.lineTo(x + side/2, y - side/2);
	// //upperRightCorner
	// ctx.moveTo(canvas.width, 0);
	// ctx.lineTo(x + side/2, y - side/2);
	// // //lowerRightCorner
	// ctx.moveTo(canvas.width, canvas.height);
	// ctx.lineTo(x + side/2, y + side/2);
	ctx.stroke();

	// document.getElementById('introtext').style.setProperty('color', color);
	// document.getElementById('introtext').style.setProperty('opacity', alpha);
	// arr.forEach((value, i) => {
	// ctx.beginPath();
	// ctx.strokeRect(x-side/i*ampScale*2.5, y-side/2, side/value*ampScale*2.5, side);
	// ctx.strokeRect(x+side/i*ampScale*2.5, y-side/2, side/value*ampScale*2.5, side);
	//potet
	// ctx.lineWidth = ampScale*1.5;
	// ctx.strokeRect(x - side/2, y - side/2, side, side);
	//potet
	// ctx.moveTo(space*i/alpha, (canvas.height - value));
	// ctx.quadraticCurveTo(space*i/alpha*10, space*i*alpha*normalizedFrequency, space*i/alpha*10,space*i*alpha*normalizedFrequency);
	// ctx.fill();
	// ctx.stroke();
	// });
};

export const skyTunnel = (canvas, ctx, freqs, fftSize, arr, space, x, y) => {
	//change background-color to rothko-color
	var center = document.querySelectorAll(".center");
	for (var i = 0; i < center.length; i++) {
		center[i].style.color = getRothko().background;
	}
	document.body.style.setProperty('background-color', getRothko().background);
	//change to next color in colorList from rothko whenever feldman short has been triggered
	const colorH = getRothko().colorList[counter];
	//convert hex to HSL
	const hsla = hexToHSL(colorH);
	const amplitude = Math.max(...freqs);
	//scale amplitude
	const ampScale = amplitude * (1 / 255);
	//filter out noise
	let filter = 1;
	let alphaAmplitude = 0;


	if (amplitude > 80) {
		alphaAmplitude = ampScale;
		filter = 1;
	}
	if (amplitude <= 80) {
		alphaAmplitude = ampScale * 0.01;
		filter = 0;
	}
	const normalizedFrequency = indexOfMax(freqs) / fftSize;
	const h = hsla[0] + (Math.round(360 * normalizedFrequency) * 10);
	const colorAmplitude = Math.round(-amplitude) * filter;
	const colorL = Math.abs((colorAmplitude) * (80 / 255) + 100).toFixed(2) + '%';
	const colorS = Math.abs((colorAmplitude) * (10 / 255) + 100).toFixed(2) + '%';
	const color = `hsl(${hsla[0] + (Math.round(360 * normalizedFrequency) * 10)}, ${colorS}, ${colorL})`;

	const alpha = ampScale;

	const diameter = amplitude * 2;
	const side = Math.sqrt((diameter * diameter) / 2);
	ctx.fillStyle = color;
	ctx.strokeStyle = color;
	ctx.globalAlpha = alpha;
	ctx.lineCap = 'round';
	ctx.lineJoin = 'butt';
	ctx.lineWidth = ampScale;
	//upperLeftCorner

	for (var i = 0; i < 360; i++) {
		const angle = i;
		const xCircle = canvas.width * canvas.height / 2 * ampScale * Math.sin(Math.PI * 2 * angle / 360);
		const yCircle = canvas.width * canvas.height / 2 * ampScale * Math.cos(Math.PI * 2 * angle / 360);
		ctx.beginPath();
		ctx.moveTo(Math.round(xCircle), Math.round(yCircle));
		ctx.lineTo(x * ampScale, y * ampScale);
		ctx.stroke();
	}
};

export const sunTunnel = (canvas, ctx, freqs, fftSize, arr, space, x, y) => {
	//change background-color to rothko-color
	var center = document.querySelectorAll(".center");
	for (var i = 0; i < center.length; i++) {
		center[i].style.color = getRothko().background;
	}
	document.body.style.setProperty('background-color', getRothko().background);
	//change to next color in colorList from rothko whenever feldman short has been triggered
	const colorH = getRothko().colorList[counter];
	//convert hex to HSL
	const hsla = hexToHSL(colorH);
	const amplitude = Math.max(...freqs);
	//scale amplitude
	const ampScale = amplitude * (1 / 255);
	//filter out noise
	let filter = 1;
	let alphaAmplitude = 0;


	if (amplitude > 80) {
		alphaAmplitude = ampScale;
		filter = 1;
	}
	if (amplitude <= 80) {
		alphaAmplitude = ampScale * 0.01;
		filter = 0;
	}
	const normalizedFrequency = indexOfMax(freqs) / fftSize;
	const h = hsla[0] + (Math.round(360 * normalizedFrequency) * 10);
	const colorAmplitude = Math.round(-amplitude) * filter;
	const colorL = Math.abs((colorAmplitude) * (80 / 255) + 100).toFixed(2) + '%';
	const colorS = Math.abs((colorAmplitude) * (10 / 255) + 100).toFixed(2) + '%';
	const color = `hsl(${hsla[0] + (Math.round(360 * normalizedFrequency) * 10)}, ${colorS}, ${colorL})`;

	const alpha = alphaAmplitude;

	const diameter = amplitude * 2;
	const side = Math.sqrt((diameter * diameter) / 2);
	ctx.fillStyle = color;
	ctx.strokeStyle = color;
	ctx.globalAlpha = ampScale;
	ctx.lineCap = 'round';
	ctx.lineJoin = 'butt';
	ctx.lineWidth = ampScale;
	//upperLeftCorner

	for (var i = 0; i < 360; i++) {
		const angle = i;
		const xCircle = canvas.width * canvas.height / 2 * ampScale * Math.sin(Math.PI * 2 * ampScale * 10 * angle / 360);
		const yCircle = canvas.width * canvas.height / 2 * ampScale * Math.cos(Math.PI * 2 * ampScale * 10 * angle / 360);
		ctx.beginPath();
		ctx.moveTo(Math.round(xCircle), Math.round(yCircle));
		ctx.lineTo(x, y);
		ctx.stroke();
	}
};

export const circleTunnel = (canvas, ctx, freqs, fftSize, arr, space, x, y) => {
	//change background-color to rothko-color
	var center = document.querySelectorAll(".center");
	for (var i = 0; i < center.length; i++) {
		center[i].style.color = getRothko().background;
	}
	document.body.style.setProperty('background-color', getRothko().background);
	//change to next color in colorList from rothko whenever feldman short has been triggered
	const colorH = getRothko().colorList[counter];
	//convert hex to HSL
	const hsla = hexToHSL(colorH);
	const amplitude = Math.max(...freqs);
	//scale amplitude
	const ampScale = amplitude * (1 / 255);
	//filter out noise
	let filter = 1;
	let alphaAmplitude = 0;


	if (amplitude > 80) {
		alphaAmplitude = ampScale;
		filter = 1;
	}
	if (amplitude <= 80) {
		alphaAmplitude = ampScale * 0.01;
		filter = 0;
	}
	const normalizedFrequency = indexOfMax(freqs) / fftSize;
	const h = hsla[0] + (Math.round(360 * normalizedFrequency) * 10);
	const colorAmplitude = Math.round(-amplitude) * filter;
	const colorL = Math.abs((colorAmplitude) * (80 / 255) + 100).toFixed(2) + '%';
	const colorS = Math.abs((colorAmplitude) * (10 / 255) + 100).toFixed(2) + '%';
	const color = `hsl(${hsla[0] + (Math.round(360 * normalizedFrequency) * 10)}, ${colorS}, ${colorL})`;

	const alpha = alphaAmplitude;

	const diameter = amplitude * 2;
	const side = Math.sqrt((diameter * diameter) / 2);
	ctx.fillStyle = color;
	ctx.strokeStyle = color;
	ctx.globalAlpha = alpha;
	ctx.lineCap = 'round';
	ctx.lineJoin = 'butt';
	ctx.lineWidth = ampScale;
	//upperLeftCorner

	for (var i = 0; i < 360; i++) {
		const angle = i;
		const xCircle = canvas.width * canvas.height / 2 * ampScale * Math.sin(Math.PI * 2 * angle / 360);
		const yCircle = canvas.width * canvas.height / 2 * ampScale * Math.cos(Math.PI * 2 * angle / 360);
		ctx.beginPath();
		ctx.moveTo(Math.round(xCircle), Math.round(yCircle));
		ctx.lineTo(x, y);
		ctx.stroke();
	}
	ctx.arc(x, y, amplitude, 0, 2 * Math.PI);
	ctx.stroke();
};

export const waveWalls = (canvas, ctx, freqs, fftSize, arr, space, x, y, mouseX, mouseY, newLastCoordinates) => {
	//change background-color to rothko-color
	var center = document.querySelectorAll(".center");
	for (var i = 0; i < center.length; i++) {
		center[i].style.color = getRothko().background;
	}
	document.body.style.setProperty('background-color', getRothko().background);
	//change to next color in colorList from rothko whenever feldman short has been triggered
	const colorH = getRothko().colorList[counter];
	//convert hex to HSL
	const hsla = hexToHSL(colorH);
	const amplitude = Math.max(...freqs);
	//scale amplitude
	const ampScale = amplitude * (1 / 255);
	//filter out noise
	let filter = 1;
	let alphaAmplitude = 0;

	if (amplitude > 80) {
		alphaAmplitude = ampScale;
		filter = 1;
	}
	if (amplitude <= 80) {
		alphaAmplitude = ampScale * 0.01;
		filter = 0;
	}

	const normalizedFrequency = indexOfMax(freqs) / fftSize;
	const h = hsla[0] + (Math.round(360 * normalizedFrequency) * 10);
	const colorAmplitude = Math.round(-amplitude) * filter;
	const colorL = Math.abs((colorAmplitude) * (80 / 255) + 100).toFixed(2) + '%';
	const colorLShadow = Math.abs((colorAmplitude) * (80 / 255) + 100 * 0.80).toFixed(2) + '%';
	const colorS = Math.abs((colorAmplitude) * (10 / 255) + 100).toFixed(2) + '%';
	const color = `hsl(${hsla[0] + (Math.round(360 * normalizedFrequency) * 10)}, ${colorS}, ${colorL})`;
	const colorShadow = `hsl(${hsla[0] + (Math.round(360 * normalizedFrequency) * 10)}, ${colorS}, ${colorLShadow})`;

	const alpha = alphaAmplitude;

	const diameter = amplitude * 2;
	const side = Math.sqrt((diameter * diameter) / 2);
	ctx.fillStyle = color;
	ctx.strokeStyle = color;
	ctx.globalAlpha = alpha;
	ctx.lineCap = 'round';
	ctx.lineJoin = 'butt';
	ctx.lineWidth = ampScale * 2.5;
	//upperLeftCorner
	ctx.strokeStyle = colorShadow;

	const leftXCoordinates = [0, canvas.width]
	const rightXCoordinates = [canvas.width, 0]

	for (var i = 0; i < 45; i++) {
		ctx.beginPath();
		ctx.moveTo(0 + mouseX, canvas.height + 20 * i + mouseY);
		ctx.bezierCurveTo(0 + mouseX, mouseY + 200 * i * ampScale, 0, canvas.height + 20 * i * ampScale, mouseX, 20 * i * ampScale);
		ctx.stroke();
	}
	// right
	ctx.strokeStyle = color;
	for (var i = 0; i < 45; i++) {
		ctx.beginPath();
		ctx.moveTo(canvas.width - mouseX, canvas.height + 20 * i + mouseY * ampScale);
		ctx.bezierCurveTo(canvas.width - mouseX, mouseY + 200 * i * ampScale, rightXCoordinates[0], canvas.height + 20 * i * ampScale, canvas.width - mouseX, 20 * i * ampScale);
		ctx.stroke();
	}

};

export const waveWalls2 = (canvas, ctx, freqs, fftSize, arr, space, x, y, mouseX, mouseY, newLastCoordinates) => {
	//change background-color to rothko-color
	var center = document.querySelectorAll(".center");
	for (var i = 0; i < center.length; i++) {
		center[i].style.color = getRothko().background;
	}
	document.body.style.setProperty('background-color', getRothko().background);
	//change to next color in colorList from rothko whenever feldman short has been triggered
	const colorH = getRothko().colorList[counter];
	//convert hex to HSL
	const hsla = hexToHSL(colorH);
	const amplitude = Math.max(...freqs);
	//scale amplitude
	const ampScale = amplitude * (1 / 255);
	//filter out noise
	let filter = 1;
	let alphaAmplitude = 0;

	if (amplitude > 80) {
		alphaAmplitude = ampScale;
		filter = 1;
	}
	if (amplitude <= 80) {
		alphaAmplitude = ampScale * 0.01;
		filter = 0;
	}

	const normalizedFrequency = indexOfMax(freqs) / fftSize;
	const h = hsla[0] + (Math.round(360 * normalizedFrequency) * 10);
	const colorAmplitude = Math.round(-amplitude) * filter;
	const colorL = Math.abs((colorAmplitude) * (80 / 255) + 100).toFixed(2) + '%';
	const colorLShadow = Math.abs((colorAmplitude) * (80 / 255) + 100 * 0.80).toFixed(2) + '%';
	const colorS = Math.abs((colorAmplitude) * (10 / 255) + 100).toFixed(2) + '%';
	const color = `hsl(${hsla[0] + (Math.round(360 * normalizedFrequency) * 10)}, ${colorS}, ${colorL})`;
	const colorShadow = `hsl(${hsla[0] + (Math.round(360 * normalizedFrequency) * 10)}, ${colorS}, ${colorLShadow})`;

	const alpha = alphaAmplitude;

	const diameter = amplitude * 2;
	const side = Math.sqrt((diameter * diameter) / 2);
	ctx.fillStyle = color;
	ctx.strokeStyle = color;
	ctx.globalAlpha = alpha;
	ctx.lineCap = 'round';
	ctx.lineJoin = 'butt';
	ctx.lineWidth = ampScale * 2.5;
	//upperLeftCorner
	ctx.strokeStyle = colorShadow;

	const leftXCoordinates = [0, canvas.width]
	const rightXCoordinates = [canvas.width, 0]

	for (var i = 0; i < 45; i++) {
		ctx.beginPath();
		ctx.translate(x, y);
		ctx.rotate(Math.PI / 180);
		ctx.moveTo(0 + mouseX, canvas.height + 20 * i + mouseY);
		ctx.bezierCurveTo(0 + mouseX, mouseY + 200 * i * ampScale, 0, canvas.height + 20 * i * ampScale, mouseX, 20 * i * ampScale);
		ctx.translate(-x, -y);
		ctx.stroke();
	}
	// right
	ctx.strokeStyle = color;
	for (var i = 0; i < 45; i++) {
		ctx.beginPath();
		ctx.translate(x, y);
		ctx.rotate(Math.PI / 180);
		ctx.moveTo(canvas.width - mouseX, canvas.height + 20 * i + mouseY * ampScale);
		ctx.bezierCurveTo(canvas.width - mouseX, mouseY + 200 * i * ampScale, rightXCoordinates[0], canvas.height + 20 * i * ampScale, canvas.width - mouseX, 20 * i * ampScale);
		ctx.translate(-x, -y);
		ctx.stroke();
	}

};

export const waveWalls3 = (canvas, ctx, freqs, fftSize, arr, space, x, y, mouseX, mouseY, newLastCoordinates) => {
	//change background-color to rothko-color
	var center = document.querySelectorAll(".center");
	for (var i = 0; i < center.length; i++) {
		center[i].style.color = getRothko().background;
	}
	document.body.style.setProperty('background-color', getRothko().background);
	//change to next color in colorList from rothko whenever feldman short has been triggered
	const colorH = getRothko().colorList[counter];
	//convert hex to HSL
	const hsla = hexToHSL(colorH);
	const amplitude = Math.max(...freqs);
	//scale amplitude
	const ampScale = amplitude * (1 / 255);
	//filter out noise
	let filter = 1;
	let alphaAmplitude = 0;

	if (amplitude > 80) {
		alphaAmplitude = ampScale;
		filter = 1;
	}
	if (amplitude <= 80) {
		alphaAmplitude = ampScale * 0.01;
		filter = 0;
	}

	const normalizedFrequency = indexOfMax(freqs) / fftSize;
	const h = hsla[0] + (Math.round(360 * normalizedFrequency) * 10);
	const colorAmplitude = Math.round(-amplitude) * filter;
	const colorL = Math.abs((colorAmplitude) * (80 / 255) + 100).toFixed(2) + '%';
	const colorLShadow = Math.abs((colorAmplitude) * (80 / 255) + 100 * 0.80).toFixed(2) + '%';
	const colorS = Math.abs((colorAmplitude) * (10 / 255) + 100).toFixed(2) + '%';
	const color = `hsl(${hsla[0] + (Math.round(360 * normalizedFrequency) * 10)}, ${colorS}, ${colorL})`;
	const colorShadow = `hsl(${hsla[0] + (Math.round(360 * normalizedFrequency) * 10)}, ${colorS}, ${colorLShadow})`;

	const alpha = alphaAmplitude;

	const diameter = amplitude * 2;
	const side = Math.sqrt((diameter * diameter) / 2);
	ctx.fillStyle = color;
	ctx.strokeStyle = color;
	ctx.globalAlpha = alpha;
	ctx.lineCap = 'round';
	ctx.lineJoin = 'butt';
	ctx.lineWidth = ampScale * 2.5;
	//upperLeftCorner
	ctx.strokeStyle = colorShadow;

	const leftXCoordinates = [0, canvas.width]
	const rightXCoordinates = [canvas.width, 0]

	for (var i = 0; i < 100; i++) {
		ctx.beginPath();
		ctx.moveTo(0, canvas.height - 10 * i);
		ctx.bezierCurveTo(canvas.width, canvas.height - 10 * i, canvas.width - mouseX * 5, canvas.height - 10 * i, 0, canvas.height - 10 * i);
		ctx.stroke();
	}
	// right
	// ctx.strokeStyle = color;
	for (var i = 0; i < 100; i++) {
		ctx.beginPath();
		ctx.moveTo(canvas.width, canvas.height - 5 - 10 * i);
		ctx.bezierCurveTo(0, canvas.height - 5 - 10 * i, 0 + mouseX * 5, canvas.height - 5 - 10 * i, canvas.width, canvas.height - 5 - 10 * i);
		ctx.stroke();
	}
	// for (var i = 0; i < 45; i++) {
	// 	ctx.beginPath();
	// 	ctx.moveTo(canvas.width - mouseX, canvas.height + 20 * i + mouseY * ampScale);
	// 	ctx.bezierCurveTo(canvas.width - mouseX, mouseY + 200 * i * ampScale, rightXCoordinates[0], canvas.height + 20 * i * ampScale, canvas.width - mouseX, 20 * i * ampScale);
	// 	ctx.stroke();
	// }

};

export const vis1 = (canvas, ctx, freqs, fftSize, arr, space, x, y, mouseX, mouseY, newPositionX, newPositionY, newPositionFlippedX, newPositionFlippedY) => {
	//change background-color to rothko-color
	var center = document.querySelectorAll(".center");
	for (var i = 0; i < center.length; i++) {
		center[i].style.color = getRothko().background;
	}
	document.body.style.setProperty('background-color', getRothko().background);
	//change to next color in colorList from rothko whenever feldman short has been triggered
	const colorH = getRothko().colorList[counter];
	//convert hex to HSL
	const hsla = hexToHSL(colorH);
	const amplitude = Math.max(...freqs);
	//scale amplitude
	const ampScale = amplitude * (1 / 255);
	//filter out noise
	let filter = 1;
	let alphaAmplitude = 0;

	if (amplitude > 80) {
		alphaAmplitude = ampScale;
		filter = 1;
	}
	if (amplitude <= 80) {
		alphaAmplitude = ampScale * 0.01;
		filter = 0;
	}

	const normalizedFrequency = indexOfMax(freqs) / fftSize;
	const h = hsla[0] + (Math.round(360 * normalizedFrequency) * 10);
	const colorAmplitude = Math.round(-amplitude) * filter;
	const colorL = Math.abs((colorAmplitude) * (80 / 255) + 100).toFixed(2) + '%';
	const colorLShadow = Math.abs((colorAmplitude) * (80 / 255) + 100 * 0.80).toFixed(2) + '%';
	const colorS = Math.abs((colorAmplitude) * (10 / 255) + 100).toFixed(2) + '%';
	const color = `hsl(${hsla[0] + (Math.round(360 * normalizedFrequency) * 10)}, ${colorS}, ${colorL})`;
	const colorShadow = `hsl(${hsla[0] + (Math.round(360 * normalizedFrequency) * 10)}, ${colorS}, ${colorLShadow})`;

	const alpha = alphaAmplitude;

	const diameter = amplitude * 2;
	const side = Math.sqrt((diameter * diameter) / 2);
	ctx.fillStyle = color;
	ctx.strokeStyle = color;
	ctx.globalAlpha = alpha;
	ctx.lineCap = 'round';
	ctx.lineJoin = 'butt';
	ctx.lineWidth = ampScale * 2.5;
	//upperLeftCorner
	ctx.strokeStyle = colorShadow;

	const leftXCoordinates = [0, canvas.width]
	const rightXCoordinates = [canvas.width, 0]

	// ctx.clearRect(0, 0, canvas.width, canvas.height);
	//have a multiplier to turn on and off the verticality
	for (var i = 0; i < 8; i++) {
		ctx.beginPath();
		ctx.moveTo(newPositionX, 15 + newPositionY - 20 * i);
		ctx.bezierCurveTo(newPositionX+100, 15 + newPositionY - 20 * i, newPositionX, 15 + newPositionY - 20 * i, newPositionX, 15 + newPositionY - 20 * i);
		ctx.stroke();
	}

	for (var i = 0; i < 8; i++) {
		ctx.beginPath();
		ctx.moveTo(newPositionFlippedX, newPositionFlippedY - 15 + (20 * i));
		ctx.bezierCurveTo(newPositionFlippedX+100, newPositionFlippedY - 15 + 20 * i, newPositionFlippedX, newPositionFlippedY - 15 + 20 * i, newPositionFlippedX, newPositionFlippedY - 15 + 20 * i);
		ctx.stroke();
	}
	// right
	// // ctx.strokeStyle = color;
	// for (var i = 0; i < 4; i++) {
	// 	ctx.beginPath();
	// 	ctx.moveTo(canvas.width, canvas.height - 5 - 10 * i);
	// 	ctx.bezierCurveTo(0, canvas.height - 5 - 10 * i, 0 + mouseX * 5, canvas.height - 5 - 10 * i, canvas.width, canvas.height - 5 - 10 * i);
	// 	ctx.stroke();
	// }
	// for (var i = 0; i < 45; i++) {
	// 	ctx.beginPath();
	// 	ctx.moveTo(canvas.width - mouseX, canvas.height + 20 * i + mouseY * ampScale);
	// 	ctx.bezierCurveTo(canvas.width - mouseX, mouseY + 200 * i * ampScale, rightXCoordinates[0], canvas.height + 20 * i * ampScale, canvas.width - mouseX, 20 * i * ampScale);
	// 	ctx.stroke();
	// }

};

export const vis2 = (canvas, ctx, freqs, fftSize, arr, space, x, y, mouseX, mouseY, newPositionX, newPositionY, newPositionFlippedX, newPositionFlippedY) => {
	//change background-color to rothko-color
	var center = document.querySelectorAll(".center");
	for (var i = 0; i < center.length; i++) {
		center[i].style.color = getRothko().background;
	}
	document.body.style.setProperty('background-color', getRothko().background);
	//change to next color in colorList from rothko whenever feldman short has been triggered
	const colorH = getRothko().colorList[counter];
	//convert hex to HSL
	const hsla = hexToHSL(colorH);
	const amplitude = Math.max(...freqs);
	//scale amplitude
	const ampScale = amplitude * (1 / 255);
	//filter out noise
	let filter = 1;
	let alphaAmplitude = 0;

	if (amplitude > 80) {
		alphaAmplitude = ampScale;
		filter = 1;
	}
	if (amplitude <= 80) {
		alphaAmplitude = ampScale * 0.01;
		filter = 0;
	}

	const normalizedFrequency = indexOfMax(freqs) / fftSize;
	const h = hsla[0] + (Math.round(360 * normalizedFrequency) * 10);
	const colorAmplitude = Math.round(-amplitude) * filter;
	const colorL = Math.abs((colorAmplitude) * (80 / 255) + 100).toFixed(2) + '%';
	const colorLShadow = Math.abs((colorAmplitude) * (80 / 255) + 100 * 0.80).toFixed(2) + '%';
	const colorLBackground = Math.abs((colorAmplitude) * (30 / 255) + 100 * 0.80).toFixed(2) + '%';
	const colorS = Math.abs((colorAmplitude) * (10 / 255) + 100).toFixed(2) + '%';
	const color = `hsl(${hsla[0] + (Math.round(360 * normalizedFrequency) * 10)}, ${colorS}, ${colorL})`;
	const colorShadow = `hsl(${hsla[0] + (Math.round(360 * normalizedFrequency) * 10)}, ${colorS}, ${colorLShadow})`;
	const colorBackground = `hsl(${hsla[0] + (Math.round(360 * normalizedFrequency) * 10)}, ${colorS}, ${colorLBackground})`;

	const alpha = alphaAmplitude;

	const diameter = amplitude * 2;
	const side = Math.sqrt((diameter * diameter) / 2);
	ctx.fillStyle = color;
	ctx.strokeStyle = color;
	ctx.globalAlpha = alpha;
	ctx.lineCap = 'round';
	ctx.lineJoin = 'butt';
	//upperLeftCorner
	ctx.strokeStyle = colorShadow;

	const leftXCoordinates = [0, canvas.width]
	const rightXCoordinates = [canvas.width, 0]

	// ctx.clearRect(0, 0, canvas.width, canvas.height);
	//have a multiplier to turn on and off the verticality
	

	ctx.strokeStyle = colorBackground;
	ctx.lineWidth = ampScale * 0.05;

	for (var i = 0; i < 400; i++) {
		ctx.beginPath();
		ctx.moveTo(0, (2.5 * i + ampScale));
		ctx.bezierCurveTo(canvas.width, 2.5 * i + ampScale, canvas.width,  2.5 * i + ampScale, canvas.width,  2.5 * i + ampScale);
		ctx.stroke();
	}
	ctx.lineWidth = ampScale * 0.5;
	ctx.strokeStyle = color;
	for (var i = 0; i < 100; i++) {
		ctx.beginPath();
		ctx.moveTo(newPositionX, 55 + y - 5 * i + ampScale);
		ctx.bezierCurveTo(newPositionX+800, 55 + y - 5 * i + ampScale, newPositionX, 55 + y - 5 * i +  ampScale, newPositionX, 55 + y - 5 * i + ampScale);
		ctx.stroke();
	}

	ctx.strokeStyle = colorShadow;
	for (var i = 0; i < 100; i++) {
		ctx.beginPath();
		ctx.moveTo(newPositionFlippedX, y - 52.5 + (5 * i + ampScale));
		ctx.bezierCurveTo(newPositionFlippedX-800, y - 52.5 + 5 * i + ampScale, newPositionFlippedX, y - 52.5 + 5 * i + ampScale, newPositionFlippedX, y - 52.5 + 5 * i + ampScale);
		ctx.stroke();
	}

	// right
	// ctx.strokeStyle = color;
	// for (var i = 0; i < 4; i++) {
	// 	ctx.beginPath();
	// 	ctx.moveTo(canvas.width, canvas.height - 5 - 10 * i);
	// 	ctx.bezierCurveTo(0, canvas.height - 5 - 10 * i, 0 + mouseX * 5, canvas.height - 5 - 10 * i, canvas.width, canvas.height - 5 - 10 * i);
	// 	ctx.stroke();
	// }
	// for (var i = 0; i < 45; i++) {
	// 	ctx.beginPath();
	// 	ctx.moveTo(canvas.width - mouseX, canvas.height + 20 * i + mouseY * ampScale);
	// 	ctx.bezierCurveTo(canvas.width - mouseX, mouseY + 200 * i * ampScale, rightXCoordinates[0], canvas.height + 20 * i * ampScale, canvas.width - mouseX, 20 * i * ampScale);
	// 	ctx.stroke();
	// }

};

export const vis3 = (canvas, ctx, freqs, fftSize, arr, space, x, y, mouseX, mouseY, newPositionX, newPositionY, newPositionFlippedX, newPositionFlippedY) => {
	//change background-color to rothko-color
	var center = document.querySelectorAll(".center");
	for (var i = 0; i < center.length; i++) {
		center[i].style.color = getRothko().background;
	}
	document.body.style.setProperty('background-color', getRothko().background);
	//change to next color in colorList from rothko whenever feldman short has been triggered
	const colorH = getRothko().colorList[counter];
	//convert hex to HSL
	const hsla = hexToHSL(colorH);
	const amplitude = Math.max(...freqs);
	//scale amplitude
	const ampScale = amplitude * (1 / 255);
	//filter out noise
	let filter = 1;
	let alphaAmplitude = 0;

	if (amplitude > 80) {
		alphaAmplitude = ampScale;
		filter = 1;
	}
	if (amplitude <= 80) {
		alphaAmplitude = ampScale * 0.01;
		filter = 0;
	}

	const normalizedFrequency = indexOfMax(freqs) / fftSize;
	const h = hsla[0] + (Math.round(360 * normalizedFrequency) * 10);
	const colorAmplitude = Math.round(-amplitude) * filter;
	const colorL = Math.abs((colorAmplitude) * (80 / 255) + 100).toFixed(2) + '%';
	const colorLShadow = Math.abs((colorAmplitude) * (80 / 255) + 100 * 0.80).toFixed(2) + '%';
	const colorLBackground = Math.abs((colorAmplitude) * (30 / 255) + 100 * 0.80).toFixed(2) + '%';
	const colorS = Math.abs((colorAmplitude) * (10 / 255) + 100).toFixed(2) + '%';
	const color = `hsl(${hsla[0] + (Math.round(360 * normalizedFrequency) * 10)}, ${colorS}, ${colorL})`;
	const colorShadow = `hsl(${hsla[0] + (Math.round(360 * normalizedFrequency) * 10)}, ${colorS}, ${colorLShadow})`;
	const colorBackground = `hsl(${hsla[0] + (Math.round(360 * normalizedFrequency) * 10)}, ${colorS}, ${colorLBackground})`;

	const alpha = alphaAmplitude;

	const diameter = amplitude * 2;
	const side = Math.sqrt((diameter * diameter) / 2);
	ctx.fillStyle = color;
	ctx.strokeStyle = color;
	ctx.globalAlpha = alpha;
	ctx.lineCap = 'round';
	ctx.lineJoin = 'butt';
	//upperLeftCorner
	ctx.strokeStyle = colorShadow;

	const leftXCoordinates = [0, canvas.width]
	const rightXCoordinates = [canvas.width, 0]

	// ctx.clearRect(0, 0, canvas.width, canvas.height);
	//have a multiplier to turn on and off the verticality
	

	ctx.strokeStyle = colorBackground;

	// for (var i = 0; i < 400; i++) {
	// 	ctx.beginPath();
	// 	ctx.moveTo(0, (2.5 * i + ampScale));
	// 	ctx.bezierCurveTo(canvas.width, 2.5 * i + ampScale, canvas.width,  2.5 * i + ampScale, canvas.width,  2.5 * i + ampScale);
	// 	ctx.stroke();
	// }
	ctx.lineWidth = ampScale * 2.5;
	ctx.strokeStyle = color;
	for (var i = 0; i < 100; i++) {
		ctx.beginPath();
		ctx.moveTo(newPositionX, 10 * i + ampScale);
		ctx.bezierCurveTo(newPositionX+800, 10 * i + ampScale, newPositionX, 10 * i +  ampScale, newPositionX, 10 * i + ampScale);
		ctx.stroke();
	}

	ctx.strokeStyle = colorShadow;
	for (var i = 0; i < 100; i++) {
		ctx.beginPath();
		ctx.moveTo(newPositionFlippedX, 5 + (10 * i + ampScale));
		ctx.bezierCurveTo(newPositionFlippedX-800, 5 + 10 * i + ampScale, newPositionFlippedX, 5 + 10 * i + ampScale, newPositionFlippedX, 5 + 10 * i + ampScale);
		ctx.stroke();
	}

	// right
	// ctx.strokeStyle = color;
	// for (var i = 0; i < 4; i++) {
	// 	ctx.beginPath();
	// 	ctx.moveTo(canvas.width, canvas.height - 5 - 10 * i);
	// 	ctx.bezierCurveTo(0, canvas.height - 5 - 10 * i, 0 + mouseX * 5, canvas.height - 5 - 10 * i, canvas.width, canvas.height - 5 - 10 * i);
	// 	ctx.stroke();
	// }
	// for (var i = 0; i < 45; i++) {
	// 	ctx.beginPath();
	// 	ctx.moveTo(canvas.width - mouseX, canvas.height + 20 * i + mouseY * ampScale);
	// 	ctx.bezierCurveTo(canvas.width - mouseX, mouseY + 200 * i * ampScale, rightXCoordinates[0], canvas.height + 20 * i * ampScale, canvas.width - mouseX, 20 * i * ampScale);
	// 	ctx.stroke();
	// }

};

export const vis4 = (canvas, ctx, freqs, fftSize, arr, space, x, y, mouseX, mouseY, newPositionX, newPositionY, newPositionFlippedX, newPositionFlippedY) => {
	//change background-color to rothko-color
	var center = document.querySelectorAll(".center");
	for (var i = 0; i < center.length; i++) {
		center[i].style.color = getRothko().background;
	}
	document.body.style.setProperty('background-color', getRothko().background);
	//change to next color in colorList from rothko whenever feldman short has been triggered
	const colorH = getRothko().colorList[counter];
	//convert hex to HSL
	const hsla = hexToHSL(colorH);
	const amplitude = Math.max(...freqs);
	//scale amplitude
	const ampScale = amplitude * (1 / 255);
	//filter out noise
	let filter = 1;
	let alphaAmplitude = 0;

	if (amplitude > 80) {
		alphaAmplitude = ampScale;
		filter = 1;
	}
	if (amplitude <= 80) {
		alphaAmplitude = ampScale * 0.01;
		filter = 0;
	}

	const normalizedFrequency = indexOfMax(freqs) / fftSize;
	const h = hsla[0] + (Math.round(360 * normalizedFrequency) * 10);
	const colorAmplitude = Math.round(-amplitude) * filter;
	const colorL = Math.abs((colorAmplitude) * (80 / 255) + 100).toFixed(2) + '%';
	const colorLShadow = Math.abs((colorAmplitude) * (80 / 255) + 100 * 0.80).toFixed(2) + '%';
	const colorS = Math.abs((colorAmplitude) * (10 / 255) + 100).toFixed(2) + '%';
	const color = `hsl(${hsla[0] + (Math.round(360 * normalizedFrequency) * 10)}, ${colorS}, ${colorL})`;
	const colorShadow = `hsl(${hsla[0] + (Math.round(360 * normalizedFrequency) * 10)}, ${colorS}, ${colorLShadow})`;

	const alpha = alphaAmplitude;

	const diameter = amplitude * 2;
	const side = Math.sqrt((diameter * diameter) / 2);
	ctx.fillStyle = color;
	ctx.strokeStyle = color;
	ctx.globalAlpha = alpha;
	ctx.lineCap = 'round';
	ctx.lineJoin = 'butt';
	ctx.lineWidth = ampScale * 2.5;
	//upperLeftCorner
	ctx.strokeStyle = colorShadow;

	const leftXCoordinates = [0, canvas.width]
	const rightXCoordinates = [canvas.width, 0]

	// ctx.clearRect(0, 0, canvas.width, canvas.height);
	//have a multiplier to turn on and off the verticality

	// ctx.clearRect(0, 0, canvas.width, canvas.height);
	for (var i = 0; i < 50; i++) {
		ctx.beginPath();
		ctx.moveTo(newPositionX, 12.5 + y - 5 * i);
		ctx.bezierCurveTo(newPositionX+500*ampScale, 12.5 + y - 5 * i, newPositionX, 12.5 + y - 5 * i, newPositionX, 12.5 + y - 5 * i);
		ctx.stroke();
	}

	for (var i = 0; i < 50; i++) {
		ctx.beginPath();
		ctx.moveTo(newPositionFlippedX, y - 15 + (5 * i));
		ctx.bezierCurveTo(newPositionFlippedX-500*ampScale, y - 15 + 5 * i, newPositionFlippedX, y - 15 + 5 * i, newPositionFlippedX, y - 15 + 5 * i);
		ctx.stroke();
	}
	// right
	// // ctx.strokeStyle = color;
	// for (var i = 0; i < 4; i++) {
	// 	ctx.beginPath();
	// 	ctx.moveTo(canvas.width, canvas.height - 5 - 10 * i);
	// 	ctx.bezierCurveTo(0, canvas.height - 5 - 10 * i, 0 + mouseX * 5, canvas.height - 5 - 10 * i, canvas.width, canvas.height - 5 - 10 * i);
	// 	ctx.stroke();
	// }
	// for (var i = 0; i < 45; i++) {
	// 	ctx.beginPath();
	// 	ctx.moveTo(canvas.width - mouseX, canvas.height + 20 * i + mouseY * ampScale);
	// 	ctx.bezierCurveTo(canvas.width - mouseX, mouseY + 200 * i * ampScale, rightXCoordinates[0], canvas.height + 20 * i * ampScale, canvas.width - mouseX, 20 * i * ampScale);
	// 	ctx.stroke();
	// }

};



export const waveWalls5 = (canvas, ctx, freqs, fftSize, arr, space, x, y, mouseX, mouseY, newLastCoordinates) => {
	//change background-color to rothko-color
	var center = document.querySelectorAll(".center");
	for (var i = 0; i < center.length; i++) {
		center[i].style.color = getRothko().background;
	}
	document.body.style.setProperty('background-color', getRothko().background);
	//change to next color in colorList from rothko whenever feldman short has been triggered
	const colorH = getRothko().colorList[counter];
	//convert hex to HSL
	const hsla = hexToHSL(colorH);
	const amplitude = Math.max(...freqs);
	//scale amplitude
	const ampScale = amplitude * (1 / 255);
	//filter out noise
	let filter = 1;
	let alphaAmplitude = 0;

	if (amplitude > 80) {
		alphaAmplitude = ampScale;
		filter = 1;
	}
	if (amplitude <= 80) {
		alphaAmplitude = ampScale * 0.01;
		filter = 0;
	}

	const normalizedFrequency = indexOfMax(freqs) / fftSize;
	const h = hsla[0] + (Math.round(360 * normalizedFrequency) * 10);
	const colorAmplitude = Math.round(-amplitude) * filter;
	const colorL = Math.abs((colorAmplitude) * (80 / 255) + 100).toFixed(2) + '%';
	const colorLShadow = Math.abs((colorAmplitude) * (80 / 255) + 100 * 0.80).toFixed(2) + '%';
	const colorS = Math.abs((colorAmplitude) * (10 / 255) + 100).toFixed(2) + '%';
	const color = `hsl(${hsla[0] + (Math.round(360 * normalizedFrequency) * 10)}, ${colorS}, ${colorL})`;
	const colorShadow = `hsl(${hsla[0] + (Math.round(360 * normalizedFrequency) * 10)}, ${colorS}, ${colorLShadow})`;

	const alpha = alphaAmplitude;

	const diameter = amplitude * 2;
	const side = Math.sqrt((diameter * diameter) / 2);
	ctx.fillStyle = color;
	ctx.strokeStyle = color;
	ctx.globalAlpha = alpha;
	ctx.lineCap = 'round';
	ctx.lineJoin = 'butt';
	ctx.lineWidth = ampScale * 0.5;
	//upperLeftCorner
	ctx.strokeStyle = colorShadow;

	const leftXCoordinates = [0, canvas.width]
	const rightXCoordinates = [canvas.width, 0]

	for (var i = 0; i < 100; i++) {
		ctx.beginPath();
		ctx.moveTo(0, canvas.height - 7 * i + ampScale);
		ctx.bezierCurveTo(x+mouseX, y + mouseY, -x + mouseX/2, -y + mouseY/2, 0, canvas.height - 7 * i);

		ctx.moveTo(canvas.width, canvas.height - 7 * i + ampScale);
		ctx.bezierCurveTo(x+mouseX, y + mouseY, -x + mouseX/2, -y + mouseY/2, canvas.width, canvas.height - 7 * i);
		
		ctx.moveTo(canvas.width - 7 * i + ampScale, canvas.height);
		ctx.bezierCurveTo(x+mouseX, y + mouseY, -x + mouseX/2, -y + mouseY/2, canvas.width - 7 * i, canvas.height);

		ctx.moveTo(canvas.width - 7.07 * i + ampScale, 0);
		ctx.bezierCurveTo(x+mouseX, y + mouseY, -x + mouseX/2, -y + mouseY/2, canvas.width - 7.07 * i, 0);
		ctx.stroke();
	}
	// for (var i = 0; i < 100; i++) {
	// 	ctx.beginPath();
	// 	ctx.moveTo(canvas.width, canvas.height - 10 * i);
	// 	ctx.bezierCurveTo(mouseX, mouseY, mouseX, mouseY, canvas.width, canvas.height - 10 * i);
	// 	ctx.stroke();
	// }
	// right
	// ctx.strokeStyle = color;
	// for (var i = 0; i < 100; i++) {
	// 	ctx.beginPath();
	// 	ctx.moveTo(canvas.width, canvas.height - 5 - 10 * i);
	// 	ctx.bezierCurveTo(0, canvas.height - 5 - 10 * i, 0 + mouseX * 5, canvas.height - 5 - 10 * i, canvas.width, canvas.height - 5 - 10 * i);
	// 	ctx.stroke();
	// }
	// for (var i = 0; i < 45; i++) {
	// 	ctx.beginPath();
	// 	ctx.moveTo(canvas.width - mouseX, canvas.height + 20 * i + mouseY * ampScale);
	// 	ctx.bezierCurveTo(canvas.width - mouseX, mouseY + 200 * i * ampScale, rightXCoordinates[0], canvas.height + 20 * i * ampScale, canvas.width - mouseX, 20 * i * ampScale);
	// 	ctx.stroke();
	// }

};

export const waveWalls4 = (canvas, ctx, freqs, fftSize, arr, space, x, y, mouseX, mouseY, newLastCoordinates) => {
	//change background-color to rothko-color
	var center = document.querySelectorAll(".center");
	for (var i = 0; i < center.length; i++) {
		center[i].style.color = getRothko().background;
	}
	document.body.style.setProperty('background-color', getRothko().background);
	//change to next color in colorList from rothko whenever feldman short has been triggered
	const colorH = getRothko().colorList[counter];
	//convert hex to HSL
	const hsla = hexToHSL(colorH);
	const amplitude = Math.max(...freqs);
	//scale amplitude
	const ampScale = amplitude * (1 / 255);
	//filter out noise
	let filter = 1;
	let alphaAmplitude = 0;

	if (amplitude > 80) {
		alphaAmplitude = ampScale;
		filter = 1;
	}
	if (amplitude <= 80) {
		alphaAmplitude = ampScale * 0.01;
		filter = 0;
	}

	const normalizedFrequency = indexOfMax(freqs) / fftSize;
	const h = hsla[0] + (Math.round(360 * normalizedFrequency) * 10);
	const colorAmplitude = Math.round(-amplitude) * filter;
	const colorL = Math.abs((colorAmplitude) * (80 / 255) + 100).toFixed(2) + '%';
	const colorLShadow = Math.abs((colorAmplitude) * (80 / 255) + 100 * 0.80).toFixed(2) + '%';
	const colorS = Math.abs((colorAmplitude) * (10 / 255) + 100).toFixed(2) + '%';
	const color = `hsl(${hsla[0] + (Math.round(360 * normalizedFrequency) * 10)}, ${colorS}, ${colorL})`;
	const colorShadow = `hsl(${hsla[0] + (Math.round(360 * normalizedFrequency) * 10)}, ${colorS}, ${colorLShadow})`;

	const alpha = alphaAmplitude;

	const diameter = amplitude * 2;
	const side = Math.sqrt((diameter * diameter) / 2);
	ctx.fillStyle = color;
	ctx.strokeStyle = color;
	ctx.globalAlpha = alpha;
	ctx.lineCap = 'round';
	ctx.lineJoin = 'butt';
	ctx.lineWidth = ampScale * 1.5;
	//upperLeftCorner
	ctx.strokeStyle = color;

	const leftXCoordinates = [0, canvas.width]
	const rightXCoordinates = [canvas.width, 0]

	for (var i = 0; i < 100; i++) {
		ctx.beginPath();
		ctx.moveTo(canvas.width - 10 * i, 0);
		ctx.bezierCurveTo(canvas.width - 10 * i + 100 * ampScale + mouseX, canvas.height + mouseY * 10, 10 * i - 5 * ampScale - mouseX, canvas.height + mouseY, canvas.width - 10 * i, 0);
		ctx.stroke();
	}

	// for (var i = 0; i < 100; i++) {
	// 	ctx.beginPath();
	// 	ctx.moveTo(canvas.width - 10 * i, canvas.height);
	// 	ctx.bezierCurveTo(canvas.width - 10 * i + 5 * ampScale - mouseX, 0 - mouseY, canvas.width - 10 * i - 5 * ampScale , 0 - mouseY, canvas.width - 10 * i, canvas.height);
	// 	ctx.stroke();
	// }

	// ctx.strokeStyle = colorShadow;
	// for (var i = 0; i < 100; i++) {
	// 	ctx.beginPath();
	// ctx.moveTo(canvas.width - 10 * i, canvas.height);
	// 	ctx.bezierCurveTo(canvas.width - 10 * i + 10 * ampScale, 0 - mouseY, canvas.width - 10 * i - 10 * ampScale, canvas.height, canvas.width - 10 * i, canvas.height);
	// 	ctx.stroke();
	// }
	// for (var i = 0; i < 100; i++) {
	// 	ctx.beginPath();
	// 	ctx.moveTo(canvas.width - 10 * i, 0);
	// 	ctx.bezierCurveTo(canvas.width - 10 * i - 10 * ampScale, canvas.height, canvas.width -10 * i + 10 * ampScale + 10 * ampScale, canvas.height, canvas.width - 10 * i, 0);
	// 	ctx.stroke();
	// }
	// right
	// ctx.strokeStyle = color;
	// for (var i = 0; i < 100; i++) {
	// 	ctx.beginPath();
	// 	ctx.moveTo(canvas.width, canvas.height - 5 - 10*i);
	// 	ctx.bezierCurveTo(0, canvas.height - 5 - 10*i, 0 + mouseX*5, canvas.height - 5 - 10*i, canvas.width, canvas.height - 5 - 10*i);
	// 	ctx.stroke();
	// }
	// for (var i = 0; i < 45; i++) {
	// 	ctx.beginPath();
	// 	ctx.moveTo(canvas.width - mouseX, canvas.height + 20 * i + mouseY * ampScale);
	// 	ctx.bezierCurveTo(canvas.width - mouseX, mouseY + 200 * i * ampScale, rightXCoordinates[0], canvas.height + 20 * i * ampScale, canvas.width - mouseX, 20 * i * ampScale);
	// 	ctx.stroke();
	// }

};

export const ocean = (canvas, ctx, freqs, fftSize, arr, space, x, y, mouseX, mouseY, newLastCoordinates) => {
	//change background-color to rothko-color
	var center = document.querySelectorAll(".center");
	for (var i = 0; i < center.length; i++) {
		center[i].style.color = getRothko().background;
	}
	document.body.style.setProperty('background-color', getRothko().background);
	//change to next color in colorList from rothko whenever feldman short has been triggered
	const colorH = getRothko().colorList[counter];
	//convert hex to HSL
	const hsla = hexToHSL(colorH);
	const amplitude = Math.max(...freqs);
	//scale amplitude
	const ampScale = amplitude * (1 / 255);
	//filter out noise
	let filter = 1;
	let alphaAmplitude = 0;

	if (amplitude > 80) {
		alphaAmplitude = ampScale;
		filter = 1;
	}
	if (amplitude <= 80) {
		alphaAmplitude = ampScale * 0.01;
		filter = 0;
	}

	const normalizedFrequency = indexOfMax(freqs) / fftSize;
	const h = hsla[0] + (Math.round(360 * normalizedFrequency) * 10);
	const colorAmplitude = Math.round(-amplitude) * filter;
	const colorL = Math.abs((colorAmplitude) * (80 / 255) + 100).toFixed(2) + '%';
	const colorLShadow = Math.abs((colorAmplitude) * (80 / 255) + 100 * 0.80).toFixed(2) + '%';
	const colorS = Math.abs((colorAmplitude) * (10 / 255) + 100).toFixed(2) + '%';
	const color = `hsl(${hsla[0] + (Math.round(360 * normalizedFrequency) * 10)}, ${colorS}, ${colorL})`;
	const colorShadow = `hsl(${hsla[0] + (Math.round(360 * normalizedFrequency) * 10)}, ${colorS}, ${colorLShadow})`;

	const alpha = alphaAmplitude;

	const diameter = amplitude * 2;
	const side = Math.sqrt((diameter * diameter) / 2);
	ctx.fillStyle = color;
	ctx.strokeStyle = color;
	ctx.globalAlpha = alpha;
	ctx.lineCap = 'round';
	ctx.lineJoin = 'butt';
	ctx.lineWidth = ampScale * 2.5;
	//upperLeftCorner
	ctx.strokeStyle = colorShadow;

	const leftXCoordinates = [0, canvas.width]
	const rightXCoordinates = [canvas.width, 0]

	for (var i = 0; i < 45; i++) {
		ctx.beginPath();
		ctx.translate(canvas.width - mouseX, -y);
		ctx.rotate(Math.PI / 180);
		ctx.moveTo(0 + mouseX * ampScale, canvas.height * i + mouseY * ampScale);
		ctx.bezierCurveTo(0 + mouseX, mouseY * i * ampScale, 0, 20 * i * ampScale, mouseX, 20 * i * ampScale);
		ctx.translate(-(canvas.width - mouseX), y);
		ctx.stroke();
	}
	// right
	ctx.strokeStyle = color;
	for (var i = 0; i < 45; i++) {
		ctx.beginPath();
		ctx.translate(canvas.width - mouseX, -y);
		ctx.rotate(Math.PI / 180);
		ctx.moveTo(canvas.width - mouseX * ampScale, canvas.height * i + mouseY * ampScale);
		ctx.bezierCurveTo(canvas.width - mouseX, mouseY * i * ampScale, rightXCoordinates[0] * ampScale, 20 * i * ampScale, canvas.width - mouseX, 20 * i * ampScale);
		ctx.translate(-(canvas.width - mouseX), y);
		ctx.stroke();
	}

};

export const ocean2 = (canvas, ctx, freqs, fftSize, arr, space, x, y, mouseX, mouseY, newLastCoordinates) => {
	//change background-color to rothko-color
	var center = document.querySelectorAll(".center");
	for (var i = 0; i < center.length; i++) {
		center[i].style.color = getRothko().background;
	}
	document.body.style.setProperty('background-color', getRothko().background);
	//change to next color in colorList from rothko whenever feldman short has been triggered
	const colorH = getRothko().colorList[counter];
	//convert hex to HSL
	const hsla = hexToHSL(colorH);
	const amplitude = Math.max(...freqs);
	//scale amplitude
	const ampScale = amplitude * (1 / 255);
	//filter out noise
	let filter = 1;
	let alphaAmplitude = 0;

	if (amplitude > 80) {
		alphaAmplitude = ampScale;
		filter = 1;
	}
	if (amplitude <= 80) {
		alphaAmplitude = ampScale * 0.01;
		filter = 0;
	}

	const normalizedFrequency = indexOfMax(freqs) / fftSize;
	const h = hsla[0] + (Math.round(360 * normalizedFrequency) * 10);
	const colorAmplitude = Math.round(-amplitude) * filter;
	const colorL = Math.abs((colorAmplitude) * (80 / 255) + 100).toFixed(2) + '%';
	const colorLShadow = Math.abs((colorAmplitude) * (80 / 255) + 100 * 0.80).toFixed(2) + '%';
	const colorS = Math.abs((colorAmplitude) * (10 / 255) + 100).toFixed(2) + '%';
	const color = `hsl(${hsla[0] + (Math.round(360 * normalizedFrequency) * 10)}, ${colorS}, ${colorL})`;
	const colorShadow = `hsl(${hsla[0] + (Math.round(360 * normalizedFrequency) * 10)}, ${colorS}, ${colorLShadow})`;

	const alpha = alphaAmplitude;

	const diameter = amplitude * 2;
	const side = Math.sqrt((diameter * diameter) / 2);
	ctx.fillStyle = color;
	ctx.strokeStyle = color;
	ctx.globalAlpha = alpha;
	ctx.lineCap = 'round';
	ctx.lineJoin = 'butt';
	ctx.lineWidth = ampScale * 2.5;
	//upperLeftCorner
	ctx.strokeStyle = colorShadow;

	const leftXCoordinates = [0, canvas.width]
	const rightXCoordinates = [canvas.width, 0]

	const closeToCentre = x / mouseX * y / mouseY * (mouseY + mouseX) / 2;
	const farToCentre = mouseX / x * mouseY / y;
	ctx.lineWidth = farToCentre * 20000 / 10000;
	const numberOfLines = 100 * ampScale * closeToCentre * 0.001;

	for (var i = 0; i < numberOfLines; i++) {
		ctx.beginPath();
		ctx.translate(x, y);
		ctx.rotate(Math.PI / 180 * ampScale * (0.01));
		ctx.moveTo(0 + mouseX * ampScale, canvas.height * i + mouseY * ampScale);
		ctx.bezierCurveTo(0 + mouseX, mouseY * i * ampScale, 0, 20 * i * ampScale, mouseX, 20 * i * ampScale);
		ctx.translate(-x, -y);
		ctx.stroke();
	}
	// right
	ctx.strokeStyle = color;
	for (var i = 0; i < numberOfLines; i++) {
		ctx.beginPath();
		ctx.translate(x, y);
		ctx.rotate(Math.PI / 360 * ampScale * (0.01));
		ctx.moveTo(canvas.width - mouseX * ampScale, canvas.height * i + mouseY * ampScale);
		ctx.bezierCurveTo(canvas.width - mouseX, mouseY * i * ampScale, rightXCoordinates[0] * ampScale, 20 * i * ampScale, canvas.width - mouseX, 20 * i * ampScale);
		ctx.translate(-x, -y);
		ctx.stroke();
	}

};

export const flowerPattern = (canvas, ctx, freqs, fftSize, arr, space, x, y, mouseX, mouseY, newLastCoordinates) => {
	//change background-color to rothko-color
	var center = document.querySelectorAll(".center");
	for (var i = 0; i < center.length; i++) {
		center[i].style.color = getRothko().background;
	}
	document.body.style.setProperty('background-color', getRothko().background);
	//change to next color in colorList from rothko whenever feldman short has been triggered
	const colorH = getRothko().colorList[counter];
	//convert hex to HSL
	const hsla = hexToHSL(colorH);
	const amplitude = Math.max(...freqs);
	//scale amplitude
	const ampScale = amplitude * (1 / 255);
	//filter out noise
	let filter = 1;
	let alphaAmplitude = 0;

	if (amplitude > 80) {
		alphaAmplitude = ampScale;
		filter = 1;
	}
	if (amplitude <= 80) {
		alphaAmplitude = ampScale * 0.01;
		filter = 0;
	}

	const normalizedFrequency = indexOfMax(freqs) / fftSize;
	const h = hsla[0] + (Math.round(360 * normalizedFrequency) * 10);
	const colorAmplitude = Math.round(-amplitude) * filter;
	const colorL = Math.abs((colorAmplitude) * (80 / 255) + 100).toFixed(2) + '%';
	const colorLShadow = Math.abs((colorAmplitude) * (80 / 255) + 100 * 0.80).toFixed(2) + '%';
	const colorS = Math.abs((colorAmplitude) * (10 / 255) + 100).toFixed(2) + '%';
	const color = `hsl(${hsla[0] + (Math.round(360 * normalizedFrequency) * 10)}, ${colorS}, ${colorL})`;
	const colorShadow = `hsl(${hsla[0] + (Math.round(360 * normalizedFrequency) * 10)}, ${colorS}, ${colorLShadow})`;

	const alpha = alphaAmplitude;

	const diameter = amplitude * 2;
	const side = Math.sqrt((diameter * diameter) / 2);
	ctx.fillStyle = color;
	ctx.strokeStyle = color;
	ctx.globalAlpha = alpha;
	ctx.lineCap = 'round';
	ctx.lineJoin = 'butt';
	ctx.lineWidth = ampScale * 1.5;
	//upperLeftCorner
	ctx.strokeStyle = colorShadow;

	const leftXCoordinates = [0, canvas.width]
	const rightXCoordinates = [canvas.width, 0]



	ctx.strokeStyle = color;
	const len = 100 * ampScale;
	let leafCount = 4;
	let l = leafCount;
	const patternNumber = 20;

	for (var p = 0; p < patternNumber; p++) {
		let newMouseX = mouseX + 50 * p;
		let newMouseY = mouseY + 50 * p;
		for (var i = leafCount; i > 0; i--) {
			// ctx.translate(x,y);
			ctx.beginPath();
			ctx.moveTo(newMouseX, newMouseY);

			ctx.bezierCurveTo(newMouseX, (newMouseY + (len / i)), (newMouseX + (len / i / 2)), (newMouseY + len / i / 2), newMouseX, newMouseY);
			ctx.bezierCurveTo(newMouseX, newMouseY - (len / i), newMouseX - (len / i / 2), newMouseY - len / i / 2, newMouseX, newMouseY);
			ctx.bezierCurveTo(newMouseX, newMouseY + (len / i), newMouseX - (len / i / 2), newMouseY + len / i / 2, newMouseX, newMouseY);
			ctx.bezierCurveTo(newMouseX, newMouseY - (len / i), newMouseX + (len / i / 2), newMouseY - len / i / 2, newMouseX, newMouseY);

			ctx.bezierCurveTo(newMouseX + (len / i * 0.4), newMouseY + (len / i * 0.6), (newMouseX + (len / i * 0.6)), (newMouseY + len / i * 0.4), newMouseX, newMouseY);
			ctx.bezierCurveTo(newMouseX - (len / i * 0.4), newMouseY - (len / i * 0.6), newMouseX - (len / i * 0.6), newMouseY - len / i * 0.4, newMouseX, newMouseY);
			ctx.bezierCurveTo(newMouseX + (len / i * 0.4), newMouseY - (len / i * 0.6), newMouseX + (len / i * 0.6), newMouseY - len / i * 0.4, newMouseX, newMouseY);
			ctx.bezierCurveTo(newMouseX - (len / i * 0.4), newMouseY + (len / i * 0.6), newMouseX - (len / i * 0.6), newMouseY + len / i * 0.4, newMouseX, newMouseY);

			ctx.bezierCurveTo(newMouseX + (len / i * 0.3), newMouseY + (len / i * 0.7), (newMouseX + (len / i * 0.7)), (newMouseY + len / i * 0.3), newMouseX, newMouseY);
			ctx.bezierCurveTo(newMouseX - (len / i * 0.3), newMouseY - (len / i * 0.7), newMouseX - (len / i * 0.7), newMouseY - len / i * 0.3, newMouseX, newMouseY);
			ctx.bezierCurveTo(newMouseX + (len / i * 0.3), newMouseY - (len / i * 0.7), newMouseX + (len / i * 0.7), newMouseY - len / i * 0.3, newMouseX, newMouseY);
			ctx.bezierCurveTo(newMouseX - (len / i * 0.3), newMouseY + (len / i * 0.7), newMouseX - (len / i * 0.7), newMouseY + len / i * 0.3, newMouseX, newMouseY);

			ctx.bezierCurveTo(newMouseX + (len / i * 0.2), newMouseY + (len / i * 0.8), (newMouseX + (len / i * 0.8)), (newMouseY + len / i * 0.2), newMouseX, newMouseY);
			ctx.bezierCurveTo(newMouseX - (len / i * 0.2), newMouseY - (len / i * 0.8), newMouseX - (len / i * 0.8), newMouseY - len / i * 0.2, newMouseX, newMouseY);
			ctx.bezierCurveTo(newMouseX + (len / i * 0.2), newMouseY - (len / i * 0.8), newMouseX + (len / i * 0.8), newMouseY - len / i * 0.2, newMouseX, newMouseY);
			ctx.bezierCurveTo(newMouseX - (len / i * 0.2), newMouseY + (len / i * 0.8), newMouseX - (len / i * 0.8), newMouseY + len / i * 0.2, newMouseX, newMouseY);


			ctx.bezierCurveTo(newMouseX + (len / i * 0.33), newMouseY + (len / i * 0.66), (newMouseX + (len / i * 0.66)), (newMouseY + len / i * 0.33), newMouseX, newMouseY);
			ctx.bezierCurveTo(newMouseX - (len / i * 0.33), newMouseY - (len / i * 0.66), newMouseX - (len / i * 0.66), newMouseY - len / i * 0.33, newMouseX, newMouseY);
			ctx.bezierCurveTo(newMouseX + (len / i * 0.33), newMouseY - (len / i * 0.66), newMouseX + (len / i * 0.66), newMouseY - len / i * 0.33, newMouseX, newMouseY);
			ctx.bezierCurveTo(newMouseX - (len / i * 0.33), newMouseY + (len / i * 0.66), newMouseX - (len / i * 0.75), newMouseY + len / i * 0.33, newMouseX, newMouseY);

			ctx.bezierCurveTo(newMouseX + (len / i * 0.25), newMouseY + (len / i * 0.75), (newMouseX + (len / i * 0.75)), (newMouseY + len / i * 0.25), newMouseX, newMouseY);
			ctx.bezierCurveTo(newMouseX - (len / i * 0.25), newMouseY - (len / i * 0.75), newMouseX - (len / i * 0.75), newMouseY - len / i * 0.25, newMouseX, newMouseY);
			ctx.bezierCurveTo(newMouseX + (len / i * 0.25), newMouseY - (len / i * 0.75), newMouseX + (len / i * 0.75), newMouseY - len / i * 0.25, newMouseX, newMouseY);
			ctx.bezierCurveTo(newMouseX - (len / i * 0.25), newMouseY + (len / i * 0.75), newMouseX - (len / i * 0.75), newMouseY + len / i * 0.25, newMouseX, newMouseY);

			ctx.stroke();
			// ctx.translate(-x,-y);
		}
	}
	// }


	// 	ctx.bezierCurveTo(mouseX, mouseY+100*multiplier, mouseX+50*multiplier, mouseY+50*multiplier, mouseX, mouseY);
	// 	ctx.bezierCurveTo(mouseX, mouseY-100*multiplier, mouseX-50*multiplier, mouseY-50*multiplier, mouseX, mouseY);
	// 	ctx.bezierCurveTo(mouseX, mouseY+100*multiplier, mouseX-50*multiplier, mouseY+50*multiplier, mouseX, mouseY);
	// 	ctx.bezierCurveTo(mouseX, mouseY-100*multiplier, mouseX+50*multiplier, mouseY-50*multiplier, mouseX, mouseY);

	// 	ctx.bezierCurveTo(mouseX+100*multiplier, mouseY, mouseX+50*multiplier, mouseY+50*multiplier, mouseX, mouseY);
	// 	ctx.bezierCurveTo(mouseX+100*multiplier, mouseY, mouseX+50*multiplier, mouseY-50*multiplier, mouseX, mouseY);
	// 	ctx.bezierCurveTo(mouseX-100*multiplier, mouseY, mouseX-50*multiplier, mouseY+50*multiplier, mouseX, mouseY);
	// 	ctx.bezierCurveTo(mouseX-100*multiplier, mouseY, mouseX-50*multiplier, mouseY-50*multiplier, mouseX, mouseY);

	// 	ctx.bezierCurveTo(mouseX-75*multiplier, mouseY+25*multiplier, mouseX-25*multiplier, mouseY+75*multiplier, mouseX, mouseY);
	// 	ctx.bezierCurveTo(mouseX+75*multiplier, mouseY-25*multiplier, mouseX+25*multiplier, mouseY-75*multiplier, mouseX, mouseY);
	// 	ctx.bezierCurveTo(mouseX+75*multiplier, mouseY+25*multiplier, mouseX+25*multiplier, mouseY+75*multiplier, mouseX, mouseY);
	// 	ctx.bezierCurveTo(mouseX-75*multiplier, mouseY-25*multiplier, mouseX-25*multiplier, mouseY-75*multiplier, mouseX, mouseY);

	// 	ctx.bezierCurveTo(mouseX+25*multiplier, mouseY-75*multiplier, mouseX+75*multiplier, mouseY-25*multiplier, mouseX, mouseY);
	// 	ctx.bezierCurveTo(mouseX-25*multiplier, mouseY-75*multiplier, mouseX-75*multiplier, mouseY-25*multiplier, mouseX, mouseY);
	// 	ctx.bezierCurveTo(mouseX-25*multiplier, mouseY+75*multiplier, mouseX-75*multiplier, mouseY+25*multiplier, mouseX, mouseY);
	// 	ctx.bezierCurveTo(mouseX+25*multiplier, mouseY+75*multiplier, mouseX+75*multiplier, mouseY+25*multiplier, mouseX, mouseY);

	// 	ctx.stroke();
	// for (var i = 0; i < 100; i++) {
	// 	ctx.beginPath();
	// 	ctx.bezierCurveTo(canvas.width, canvas.height, -100*i,  mouseY/i*ampScale, mouseX/ampScale*i, mouseY/ ampScale*i,canvas.width/i*ampScale, canvas.height/i*ampScale);
	// 	ctx.stroke();
	// }



};

export const flowerCircle = (canvas, ctx, freqs, fftSize, arr, space, x, y, mouseX, mouseY, newLastCoordinates) => {
	//change background-color to rothko-color
	var center = document.querySelectorAll(".center");
	for (var i = 0; i < center.length; i++) {
		center[i].style.color = getRothko().background;
	}
	document.body.style.setProperty('background-color', getRothko().background);
	//change to next color in colorList from rothko whenever feldman short has been triggered
	const colorH = getRothko().colorList[counter];
	//convert hex to HSL
	const hsla = hexToHSL(colorH);
	const amplitude = Math.max(...freqs);
	//scale amplitude
	const ampScale = amplitude * (1 / 255);
	//filter out noise
	let filter = 1;
	let alphaAmplitude = 0;

	if (amplitude > 80) {
		alphaAmplitude = ampScale;
		filter = 1;
	}
	if (amplitude <= 80) {
		alphaAmplitude = ampScale * 0.01;
		filter = 0;
	}

	const normalizedFrequency = indexOfMax(freqs) / fftSize;
	const h = hsla[0] + (Math.round(360 * normalizedFrequency) * 10);
	const colorAmplitude = Math.round(-amplitude) * filter;
	const colorL = Math.abs((colorAmplitude) * (80 / 255) + 100).toFixed(2) + '%';
	const colorLShadow = Math.abs((colorAmplitude) * (80 / 255) + 100 * 0.80).toFixed(2) + '%';
	const colorS = Math.abs((colorAmplitude) * (10 / 255) + 100).toFixed(2) + '%';
	const color = `hsl(${hsla[0] + (Math.round(360 * normalizedFrequency) * 10)}, ${colorS}, ${colorL})`;
	const colorShadow = `hsl(${hsla[0] + (Math.round(360 * normalizedFrequency) * 10)}, ${colorS}, ${colorLShadow})`;

	const alpha = alphaAmplitude;

	const diameter = amplitude * 2;
	const side = Math.sqrt((diameter * diameter) / 2);
	ctx.fillStyle = color;
	ctx.strokeStyle = color;
	ctx.globalAlpha = alpha;
	ctx.lineCap = 'round';
	ctx.lineJoin = 'butt';
	ctx.lineWidth = ampScale * 1.5;
	//upperLeftCorner
	ctx.strokeStyle = colorShadow;

	const leftXCoordinates = [0, canvas.width]
	const rightXCoordinates = [canvas.width, 0]


	const closeToCentre = x / mouseX * y / mouseY * (mouseY + mouseX) / 2;
	ctx.strokeStyle = color;
	const len = ampScale * 0.5 * closeToCentre;
	let leafCount = 100 * ampScale / (closeToCentre * 0.01);
	const newMouseX = mouseX * ampScale;
	const newMouseY = mouseY * ampScale;


	for (var i = leafCount; i > 0; i--) {
		ctx.beginPath();
		ctx.translate(x, y);
		ctx.moveTo(newMouseX, newMouseY);
		ctx.rotate(Math.PI * 360 * ampScale * (0.1 * i));

		ctx.bezierCurveTo(newMouseX, (newMouseY + (len / i)), (newMouseX + (len / i / 2)), (newMouseY + len / i / 2), newMouseX, newMouseY);
		ctx.bezierCurveTo(newMouseX, newMouseY - (len / i), newMouseX - (len / i / 2), newMouseY - len / i / 2, newMouseX, newMouseY);
		ctx.bezierCurveTo(newMouseX, newMouseY + (len / i), newMouseX - (len / i / 2), newMouseY + len / i / 2, newMouseX, newMouseY);
		ctx.bezierCurveTo(newMouseX, newMouseY - (len / i), newMouseX + (len / i / 2), newMouseY - len / i / 2, newMouseX, newMouseY);

		ctx.bezierCurveTo(newMouseX + (len / i * 0.4), newMouseY + (len / i * 0.6), (newMouseX + (len / i * 0.6)), (newMouseY + len / i * 0.4), newMouseX, newMouseY);
		ctx.bezierCurveTo(newMouseX - (len / i * 0.4), newMouseY - (len / i * 0.6), newMouseX - (len / i * 0.6), newMouseY - len / i * 0.4, newMouseX, newMouseY);
		ctx.bezierCurveTo(newMouseX + (len / i * 0.4), newMouseY - (len / i * 0.6), newMouseX + (len / i * 0.6), newMouseY - len / i * 0.4, newMouseX, newMouseY);
		ctx.bezierCurveTo(newMouseX - (len / i * 0.4), newMouseY + (len / i * 0.6), newMouseX - (len / i * 0.6), newMouseY + len / i * 0.4, newMouseX, newMouseY);

		ctx.bezierCurveTo(newMouseX + (len / i * 0.3), newMouseY + (len / i * 0.7), (newMouseX + (len / i * 0.7)), (newMouseY + len / i * 0.3), newMouseX, newMouseY);
		ctx.bezierCurveTo(newMouseX - (len / i * 0.3), newMouseY - (len / i * 0.7), newMouseX - (len / i * 0.7), newMouseY - len / i * 0.3, newMouseX, newMouseY);
		ctx.bezierCurveTo(newMouseX + (len / i * 0.3), newMouseY - (len / i * 0.7), newMouseX + (len / i * 0.7), newMouseY - len / i * 0.3, newMouseX, newMouseY);
		ctx.bezierCurveTo(newMouseX - (len / i * 0.3), newMouseY + (len / i * 0.7), newMouseX - (len / i * 0.7), newMouseY + len / i * 0.3, newMouseX, newMouseY);

		ctx.bezierCurveTo(newMouseX + (len / i * 0.2), newMouseY + (len / i * 0.8), (newMouseX + (len / i * 0.8)), (newMouseY + len / i * 0.2), newMouseX, newMouseY);
		ctx.bezierCurveTo(newMouseX - (len / i * 0.2), newMouseY - (len / i * 0.8), newMouseX - (len / i * 0.8), newMouseY - len / i * 0.2, newMouseX, newMouseY);
		ctx.bezierCurveTo(newMouseX + (len / i * 0.2), newMouseY - (len / i * 0.8), newMouseX + (len / i * 0.8), newMouseY - len / i * 0.2, newMouseX, newMouseY);
		ctx.bezierCurveTo(newMouseX - (len / i * 0.2), newMouseY + (len / i * 0.8), newMouseX - (len / i * 0.8), newMouseY + len / i * 0.2, newMouseX, newMouseY);


		ctx.bezierCurveTo(newMouseX + (len / i * 0.33), newMouseY + (len / i * 0.66), (newMouseX + (len / i * 0.66)), (newMouseY + len / i * 0.33), newMouseX, newMouseY);
		ctx.bezierCurveTo(newMouseX - (len / i * 0.33), newMouseY - (len / i * 0.66), newMouseX - (len / i * 0.66), newMouseY - len / i * 0.33, newMouseX, newMouseY);
		ctx.bezierCurveTo(newMouseX + (len / i * 0.33), newMouseY - (len / i * 0.66), newMouseX + (len / i * 0.66), newMouseY - len / i * 0.33, newMouseX, newMouseY);
		ctx.bezierCurveTo(newMouseX - (len / i * 0.33), newMouseY + (len / i * 0.66), newMouseX - (len / i * 0.75), newMouseY + len / i * 0.33, newMouseX, newMouseY);

		ctx.bezierCurveTo(newMouseX + (len / i * 0.25), newMouseY + (len / i * 0.75), (newMouseX + (len / i * 0.75)), (newMouseY + len / i * 0.25), newMouseX, newMouseY);
		ctx.bezierCurveTo(newMouseX - (len / i * 0.25), newMouseY - (len / i * 0.75), newMouseX - (len / i * 0.75), newMouseY - len / i * 0.25, newMouseX, newMouseY);
		ctx.bezierCurveTo(newMouseX + (len / i * 0.25), newMouseY - (len / i * 0.75), newMouseX + (len / i * 0.75), newMouseY - len / i * 0.25, newMouseX, newMouseY);
		ctx.bezierCurveTo(newMouseX - (len / i * 0.25), newMouseY + (len / i * 0.75), newMouseX - (len / i * 0.75), newMouseY + len / i * 0.25, newMouseX, newMouseY);
		ctx.translate(-x, -y);
		ctx.stroke();
	}
	// }


	// 	ctx.bezierCurveTo(mouseX, mouseY+100*multiplier, mouseX+50*multiplier, mouseY+50*multiplier, mouseX, mouseY);
	// 	ctx.bezierCurveTo(mouseX, mouseY-100*multiplier, mouseX-50*multiplier, mouseY-50*multiplier, mouseX, mouseY);
	// 	ctx.bezierCurveTo(mouseX, mouseY+100*multiplier, mouseX-50*multiplier, mouseY+50*multiplier, mouseX, mouseY);
	// 	ctx.bezierCurveTo(mouseX, mouseY-100*multiplier, mouseX+50*multiplier, mouseY-50*multiplier, mouseX, mouseY);

	// 	ctx.bezierCurveTo(mouseX+100*multiplier, mouseY, mouseX+50*multiplier, mouseY+50*multiplier, mouseX, mouseY);
	// 	ctx.bezierCurveTo(mouseX+100*multiplier, mouseY, mouseX+50*multiplier, mouseY-50*multiplier, mouseX, mouseY);
	// 	ctx.bezierCurveTo(mouseX-100*multiplier, mouseY, mouseX-50*multiplier, mouseY+50*multiplier, mouseX, mouseY);
	// 	ctx.bezierCurveTo(mouseX-100*multiplier, mouseY, mouseX-50*multiplier, mouseY-50*multiplier, mouseX, mouseY);

	// 	ctx.bezierCurveTo(mouseX-75*multiplier, mouseY+25*multiplier, mouseX-25*multiplier, mouseY+75*multiplier, mouseX, mouseY);
	// 	ctx.bezierCurveTo(mouseX+75*multiplier, mouseY-25*multiplier, mouseX+25*multiplier, mouseY-75*multiplier, mouseX, mouseY);
	// 	ctx.bezierCurveTo(mouseX+75*multiplier, mouseY+25*multiplier, mouseX+25*multiplier, mouseY+75*multiplier, mouseX, mouseY);
	// 	ctx.bezierCurveTo(mouseX-75*multiplier, mouseY-25*multiplier, mouseX-25*multiplier, mouseY-75*multiplier, mouseX, mouseY);

	// 	ctx.bezierCurveTo(mouseX+25*multiplier, mouseY-75*multiplier, mouseX+75*multiplier, mouseY-25*multiplier, mouseX, mouseY);
	// 	ctx.bezierCurveTo(mouseX-25*multiplier, mouseY-75*multiplier, mouseX-75*multiplier, mouseY-25*multiplier, mouseX, mouseY);
	// 	ctx.bezierCurveTo(mouseX-25*multiplier, mouseY+75*multiplier, mouseX-75*multiplier, mouseY+25*multiplier, mouseX, mouseY);
	// 	ctx.bezierCurveTo(mouseX+25*multiplier, mouseY+75*multiplier, mouseX+75*multiplier, mouseY+25*multiplier, mouseX, mouseY);

	// 	ctx.stroke();
	// for (var i = 0; i < 100; i++) {
	// 	ctx.beginPath();
	// 	ctx.bezierCurveTo(canvas.width, canvas.height, -100*i,  mouseY/i*ampScale, mouseX/ampScale*i, mouseY/ ampScale*i,canvas.width/i*ampScale, canvas.height/i*ampScale);
	// 	ctx.stroke();
	// }



};

export const sunGazer = (canvas, ctx, freqs, fftSize, arr, space, x, y, mouseX, mouseY, newLastCoordinates) => {
	//change background-color to rothko-color
	var center = document.querySelectorAll(".center");
	for (var i = 0; i < center.length; i++) {
		center[i].style.color = getRothko().background;
	}
	document.body.style.setProperty('background-color', getRothko().background);
	//change to next color in colorList from rothko whenever feldman short has been triggered
	const colorH = getRothko().colorList[counter];
	//convert hex to HSL
	const hsla = hexToHSL(colorH);
	const amplitude = Math.max(...freqs);
	//scale amplitude
	const ampScale = amplitude * (1 / 255);
	//filter out noise
	let filter = 1;
	let alphaAmplitude = 0;

	if (amplitude > 80) {
		alphaAmplitude = ampScale;
		filter = 1;
	}
	if (amplitude <= 80) {
		alphaAmplitude = ampScale * 0.01;
		filter = 0;
	}

	const normalizedFrequency = indexOfMax(freqs) / fftSize;
	const h = hsla[0] + (Math.round(360 * normalizedFrequency) * 10);
	const colorAmplitude = Math.round(-amplitude) * filter;
	const colorL = Math.abs((colorAmplitude) * (80 / 255) + 100).toFixed(2) + '%';
	const colorLShadow = Math.abs((colorAmplitude) * (80 / 255) + 100 * 0.80).toFixed(2) + '%';
	const colorS = Math.abs((colorAmplitude) * (10 / 255) + 100).toFixed(2) + '%';
	const color = `hsl(${hsla[0] + (Math.round(360 * normalizedFrequency) * 10)}, ${colorS}, ${colorL})`;
	const colorShadow = `hsl(${hsla[0] + (Math.round(360 * normalizedFrequency) * 10)}, ${colorS}, ${colorLShadow})`;

	const alpha = alphaAmplitude;

	const diameter = amplitude * 2;
	const side = Math.sqrt((diameter * diameter) / 2);
	ctx.fillStyle = color;
	ctx.strokeStyle = color;
	ctx.globalAlpha = alpha;
	ctx.lineCap = 'round';
	ctx.lineJoin = 'butt';
	//upperLeftCorner
	ctx.strokeStyle = colorShadow;

	const leftXCoordinates = [0, canvas.width]
	const rightXCoordinates = [canvas.width, 0]



	ctx.strokeStyle = color;
	const closeToCentre = x / mouseX * y / mouseY * (mouseY + mouseX) / 2;
	const farToCentre = mouseX / x * mouseY / y;
	ctx.lineWidth = farToCentre * 110000 / 10000;
	const numberOfLines = 100 * ampScale;

	for (var i = 0; i < numberOfLines; i++) {
		ctx.beginPath();
		ctx.translate(x, y);
		ctx.rotate(Math.PI / 180 * closeToCentre);
		ctx.bezierCurveTo(10 * ampScale / closeToCentre, 10 * ampScale / closeToCentre, -10 * ampScale * closeToCentre, -10 * ampScale * closeToCentre, closeToCentre * ampScale / 100, closeToCentre * ampScale / 100, x, y);
		ctx.translate(-x, -y);
		ctx.stroke();
	}

	// ctx.clearRect(x, y, canvas.width, canvas.height);
	// for (var i = 0; i < 100; i++) {
	// 	ctx.beginPath();
	// 	ctx.bezierCurveTo(canvas.width, canvas.height, -100*i,  mouseY/i*ampScale, mouseX/ampScale*i, mouseY/ ampScale*i,canvas.width/i*ampScale, canvas.height/i*ampScale);
	// 	ctx.stroke();
	// }



};

export const buildingTunnel = (canvas, ctx, freqs, fftSize, arr, space, x, y, mouseX, mouseY, newLastCoordinates) => {
	//change background-color to rothko-color
	var center = document.querySelectorAll(".center");
	for (var i = 0; i < center.length; i++) {
		center[i].style.color = getRothko().background;
	}
	document.body.style.setProperty('background-color', getRothko().background);
	//change to next color in colorList from rothko whenever feldman short has been triggered
	const colorH = getRothko().colorList[counter];
	//convert hex to HSL
	const hsla = hexToHSL(colorH);
	const amplitude = Math.max(...freqs);
	//scale amplitude
	const ampScale = amplitude * (1 / 255);
	//filter out noise
	let filter = 1;
	let alphaAmplitude = 0;

	if (amplitude > 80) {
		alphaAmplitude = ampScale;
		filter = 1;
	}
	if (amplitude <= 80) {
		alphaAmplitude = ampScale * 0.01;
		filter = 0;
	}

	const normalizedFrequency = indexOfMax(freqs) / fftSize;
	const h = hsla[0] + (Math.round(360 * normalizedFrequency) * 10);
	const colorAmplitude = Math.round(-amplitude) * filter;
	const colorL = Math.abs((colorAmplitude) * (80 / 255) + 100).toFixed(2) + '%';
	const colorLShadow = Math.abs((colorAmplitude) * (80 / 255) + 100 * 0.80).toFixed(2) + '%';
	const colorS = Math.abs((colorAmplitude) * (10 / 255) + 100).toFixed(2) + '%';
	const color = `hsl(${hsla[0] + (Math.round(360 * normalizedFrequency) * 10)}, ${colorS}, ${colorL})`;
	const colorShadow = `hsl(${hsla[0] + (Math.round(360 * normalizedFrequency) * 10)}, ${colorS}, ${colorLShadow})`;

	const alpha = alphaAmplitude;

	const diameter = amplitude * 2;
	const side = Math.sqrt((diameter * diameter) / 2);
	ctx.fillStyle = color;
	ctx.strokeStyle = color;
	ctx.globalAlpha = alpha;
	ctx.lineCap = 'round';
	ctx.lineJoin = 'butt';
	ctx.lineWidth = ampScale * 2.5;
	//upperLeftCorner
	ctx.strokeStyle = colorShadow;

	const leftXCoordinates = [0, canvas.width]
	const rightXCoordinates = [canvas.width, 0]

	for (var i = 0; i < 45; i++) {
		ctx.beginPath();
		ctx.moveTo(0 + mouseX, canvas.height + 20 * i + mouseY);
		ctx.bezierCurveTo(0 + mouseX, mouseY + 20 * i, 0, canvas.height + 20 * i, x, 20 * i);
		ctx.stroke();
	}
	// right
	ctx.strokeStyle = color;
	for (var i = 0; i < 45; i++) {
		ctx.beginPath();
		ctx.moveTo(canvas.width - mouseX, canvas.height + 20 * i + mouseY);
		ctx.bezierCurveTo(canvas.width - mouseX, mouseY + 20 * i, rightXCoordinates[0], canvas.height + 20 * i, x, 20 * i);
		ctx.stroke();
	}
};

export const imageCatcher = (canvas, ctx, freqs, fftSize, arr, space, x, y) => {
	//change background-color to rothko-color
	var center = document.querySelectorAll(".center");
	for (var i = 0; i < center.length; i++) {
		center[i].style.color = getRothko().background;
	}
	document.body.style.setProperty('background-color', getRothko().background);
	//change to next color in colorList from rothko whenever feldman short has been triggered
	const colorH = getRothko().colorList[counter];
	//convert hex to HSL
	const hsla = hexToHSL(colorH);
	const amplitude = Math.max(...freqs);
	//scale amplitude
	const ampScale = amplitude * (1 / 255);
	//filter out noise
	let filter = 1;
	let alphaAmplitude = 0;

	if (amplitude > 80) {
		alphaAmplitude = ampScale;
		filter = 1;
	}
	if (amplitude <= 80) {
		alphaAmplitude = ampScale * 0.01;
		filter = 0;
	}

	const normalizedFrequency = indexOfMax(freqs) / fftSize;
	const h = hsla[0] + (Math.round(360 * normalizedFrequency) * 10);
	const colorAmplitude = Math.round(-amplitude) * filter;
	const colorL = Math.abs((colorAmplitude) * (80 / 255) + 100).toFixed(2) + '%';
	const colorLShadow = Math.abs((colorAmplitude) * (80 / 255) + 100 * 0.80).toFixed(2) + '%';
	const colorS = Math.abs((colorAmplitude) * (10 / 255) + 100).toFixed(2) + '%';
	const color = `hsl(${hsla[0] + (Math.round(360 * normalizedFrequency) * 10)}, ${colorS}, ${colorL})`;
	const colorShadow = `hsl(${hsla[0] + (Math.round(360 * normalizedFrequency) * 10)}, ${colorS}, ${colorLShadow})`;

	const alpha = alphaAmplitude;

	const diameter = amplitude * 2;
	const side = Math.sqrt((diameter * diameter) / 2);
	ctx.fillStyle = color;
	ctx.strokeStyle = color;
	ctx.globalAlpha = alpha;
	ctx.lineCap = 'round';
	ctx.lineJoin = 'butt';
	ctx.lineWidth = ampScale * 2.5;
	//upperLeftCorner
	ctx.strokeStyle = colorShadow;

	const leftXCoordinates = [0, canvas.width];
	const rightXCoordinates = [canvas.width, 0];

	// ctx.clearRect(canvas.width, canvas.height, 0 ,0);
	// left
	for (var i = 0; i < 45; i++) {
		ctx.beginPath();
		ctx.moveTo(0, canvas.height + 20 * i);
		ctx.bezierCurveTo(0, canvas.height + 20 * i, 0, canvas.height + 20 * i, x, 20 * i);
		ctx.stroke();
	}
	// right
	ctx.strokeStyle = color;
	for (var i = 0; i < 45; i++) {
		ctx.beginPath();
		ctx.moveTo(canvas.width, canvas.height + 20 * i);
		ctx.bezierCurveTo(canvas.width, canvas.height + 20 * i, rightXCoordinates[0], canvas.height + 20 * i, x, 20 * i);
		ctx.stroke();
	}
};

export const verticalWaves = (canvas, ctx, freqs, fftSize, arr, space, x, y) => {
	//change background-color to rothko-color
	var center = document.querySelectorAll(".center");
	for (var i = 0; i < center.length; i++) {
		center[i].style.color = getRothko().background;
	}
	document.body.style.setProperty('background-color', getRothko().background);
	//change to next color in colorList from rothko whenever feldman short has been triggered
	const colorH = getRothko().colorList[counter];
	//convert hex to HSL
	const hsla = hexToHSL(colorH);
	const amplitude = Math.max(...freqs);
	//scale amplitude
	const ampScale = amplitude * (1 / 255);
	//filter out noise
	let filter = 1;
	let alphaAmplitude = 0;


	if (amplitude > 80) {
		alphaAmplitude = ampScale;
		filter = 1;
	}
	if (amplitude <= 80) {
		alphaAmplitude = ampScale * 0.01;
		filter = 0;
	}
	const normalizedFrequency = indexOfMax(freqs) / fftSize;
	const h = hsla[0] + (Math.round(360 * normalizedFrequency) * 10);
	const colorAmplitude = Math.round(-amplitude) * filter;
	const colorL = Math.abs((colorAmplitude) * (80 / 255) + 100).toFixed(2) + '%';
	const colorS = Math.abs((colorAmplitude) * (10 / 255) + 100).toFixed(2) + '%';
	const color = `hsl(${hsla[0] + (Math.round(360 * normalizedFrequency) * 10)}, ${colorS}, ${colorL})`;

	const alpha = alphaAmplitude;
	const diameter = amplitude * 3;
	const side = Math.sqrt((diameter * diameter) / 2);

	const patternCanvas = document.createElement('canvas');
	const patternContext = patternCanvas.getContext('2d');

	// Give the pattern a width and height of 50
	const randomNumber = random(0, 1);
	patternCanvas.width = 50 * ampScale + 1 * random(1, 2);
	patternCanvas.height = 50 * ampScale + 1 * random(1, 2);
	patternContext.strokeStyle = color;
	patternContext.globalAlpha = alpha;
	const gradient = patternContext.createRadialGradient(0, 0, 0, 50, 50, random(100 * alpha, 3000 * alpha) / alpha);
	gradient.addColorStop(0, `hsla(${h}, ${colorS}, ${colorL}, 0)`);
	gradient.addColorStop(1, `hsla(${h}, ${colorS}, ${colorL}, ${random(0, 1)})`);
	patternContext.fillStyle = gradient;
	patternContext.lineWidth = ampScale;
	arr.forEach((value, i) => {
		patternContext.lineCap = 'round';
		patternContext.lineJoin = 'round';
		patternContext.beginPath();
		patternContext.moveTo(patternCanvas.width * i * ampScale, (patternCanvas.height - value));
		patternContext.lineTo(patternCanvas.width * i * ampScale, (patternCanvas.height - value) * ampScale + 100);
		patternContext.stroke();
	});

	//draw
	// arr.forEach((value, i) => {
	const pattern = ctx.createPattern(patternCanvas, 'repeat');
	ctx.fillStyle = pattern;
	// ctx.fillRect(x - side*(random(0,1)), y - side*(random(0,1)), side, side);
	// ctx.fillRect(x - side*(random(-2,3)), y - side*(random(-2,3)), side, side);
	ctx.fillRect(x - side / 2, y - side / 2, side, side);
	// ctx.lineWidth = 1;
	// ctx.beginPath();
	// ctx.moveTo(space*i*ampScale, (canvas.height - value-200)+ampScale*10);
	// ctx.lineTo(space*i, (canvas.height - value-200)+ampScale*12);	
	ctx.strokeStyle = color;
	ctx.globalAlpha = alpha;
	ctx.stroke();
};

export const sunRays = (canvas, ctx, freqs, fftSize, arr, space) => {
	//change background-color to rothko-color
	var center = document.querySelectorAll(".center");
	for (var i = 0; i < center.length; i++) {
		console.log(center[i].style.color);
		center[i].style.color = getRothko().background;
	}
	document.body.style.setProperty('background-color', getRothko().background);
	//change to next color in colorList from rothko whenever feldman short has been triggered
	const colorH = getRothko().colorList[counter];
	//convert hex to HSL
	const hsla = hexToHSL(colorH);
	const amplitude = Math.max(...freqs);
	//scale amplitude
	const ampScale = amplitude * (1 / 255);
	//filter out noise
	let filter = 1;
	let alphaAmplitude = 0;
	if (amplitude > 80) {
		alphaAmplitude = ampScale;
		filter = 1;
	}
	if (amplitude <= 80) {
		alphaAmplitude = ampScale;
		filter = 0.9;
	}
	const normalizedFrequency = indexOfMax(freqs) / fftSize;
	const colorAmplitude = Math.round(-amplitude) * filter;
	const colorL = Math.abs((colorAmplitude) * (80 / 255) + 100).toFixed(2) + '%';
	const colorS = Math.abs((colorAmplitude) * (10 / 255) + 100).toFixed(2) + '%';
	const color = `hsl(${hsla[0] + (Math.round(360 * normalizedFrequency) * 10)}, ${colorS}, ${colorL})`;
	const alpha = alphaAmplitude;
	//draw
	arr.forEach((value, i) => {
		ctx.beginPath();
		ctx.moveTo(space * i / alpha, (canvas.height - value));
		ctx.quadraticCurveTo(space * i / alpha * 10, space * i * alpha * normalizedFrequency, space * i / alpha * 10, space * i * alpha * normalizedFrequency);
		ctx.fill();
		ctx.strokeStyle = color;
		ctx.globalAlpha = alpha;
		ctx.lineDashOffset = 4;
		ctx.stroke();
	});
};

export const sunWaves = (canvas, ctx, freqs, fftSize, arr, space) => {
	//change background-color to rothko-color
	var center = document.querySelectorAll(".center");
	for (var i = 0; i < center.length; i++) {
		console.log(center[i].style.color);
		center[i].style.color = getRothko().background;
	}
	document.body.style.setProperty('background-color', getRothko().background);
	//change to next color in colorList from rothko whenever feldman short has been triggered
	const colorH = getRothko().colorList[counter];
	//convert hex to HSL
	const hsla = hexToHSL(colorH);
	const amplitude = Math.max(...freqs);
	//scale amplitude
	const ampScale = amplitude * (1 / 255);
	//filter out noise
	let filter = 1;
	let alphaAmplitude = 0;
	if (amplitude > 80) {
		alphaAmplitude = ampScale;
		filter = 1;
	}
	if (amplitude <= 80) {
		alphaAmplitude = ampScale;
		filter = 0.9;
	}
	const normalizedFrequency = indexOfMax(freqs) / fftSize;
	const colorAmplitude = Math.round(-amplitude) * filter;
	const colorL = Math.abs((colorAmplitude) * (80 / 255) + 100).toFixed(2) + '%';
	const colorS = Math.abs((colorAmplitude) * (10 / 255) + 100).toFixed(2) + '%';
	const color = `hsl(${hsla[0] + (Math.round(360 * normalizedFrequency) * 10)}, ${colorS}, ${colorL})`;
	const alpha = alphaAmplitude;
	//draw
	arr.forEach((value, i) => {
		ctx.beginPath();
		ctx.moveTo(space * i * alpha, (canvas.height - value));
		ctx.quadraticCurveTo(space * i / alpha * 10, (space * i) * alpha, space * i / alpha * 10, (space * i * alpha));
		ctx.fill();
		ctx.strokeStyle = color;
		ctx.globalAlpha = alpha;
		ctx.stroke();
	});
};

export const colorField = (canvas, ctx, freqs, fftSize, arr, space, x, y) => {
	//change background-color to rothko-color
	var center = document.querySelectorAll(".center");
	for (var i = 0; i < center.length; i++) {
		console.log(center[i].style.color);
		center[i].style.color = getRothko().background;
	}
	document.body.style.setProperty('background-color', getRothko().background);
	//change to next color in colorList from rothko whenever feldman short has been triggered
	const colorH = getRothko().colorList[counter];
	//convert hex to HSL
	const hsla = hexToHSL(colorH);
	const amplitude = Math.max(...freqs);
	//scale amplitude
	const ampScale = amplitude * (1 / 255);
	//filter out noise
	let filter = 1;
	let alphaAmplitude = 0;
	if (amplitude > 80) {
		alphaAmplitude = ampScale;
		filter = 1;
	}
	if (amplitude <= 80) {
		alphaAmplitude = ampScale;
		filter = 0.9;
	}
	const normalizedFrequency = indexOfMax(freqs) / fftSize;
	const colorAmplitude = Math.round(-amplitude) * filter;
	const h = hsla[0] + (Math.round(360 * normalizedFrequency) * 10);
	const colorL = Math.abs((colorAmplitude) * (80 / 255) + 100).toFixed(2) + '%';
	const colorS = Math.abs((colorAmplitude) * (10 / 255) + 100).toFixed(2) + '%';
	const color = `hsl(${hsla[0] + (Math.round(360 * normalizedFrequency) * 10)}, ${colorS}, ${colorL})`;
	const alpha = alphaAmplitude;

	//draw
	arr.forEach((value, i) => {
		ctx.beginPath();
		// ctx.arc(x, y-50, amplitude, 0, 2 * Math.PI);
		ctx.moveTo(space * i / alpha, ((canvas.height - value) * alpha));
		ctx.quadraticCurveTo(space * i * alpha * normalizedFrequency, (canvas.height - value) * alpha, space * i * alpha * normalizedFrequency, (canvas.height - value) * alpha);
		ctx.strokeStyle = color;
		ctx.globalAlpha = alpha;
		ctx.stroke();
	});
};

export const sunRise = (canvas, ctx, freqs, fftSize, arr, space, x, y) => {
	//change background-color to rothko-color
	var center = document.querySelectorAll(".center");
	for (var i = 0; i < center.length; i++) {
		console.log(center[i].style.color);
		center[i].style.color = getRothko().background;
	}
	document.body.style.setProperty('background-color', getRothko().background);
	//change to next color in colorList from rothko whenever feldman short has been triggered
	const colorH = getRothko().colorList[counter];
	//convert hex to HSL
	const hsla = hexToHSL(colorH);
	const amplitude = Math.max(...freqs);
	//scale amplitude
	const ampScale = amplitude * (1 / 255);
	//filter out noise
	let filter = 1;
	let alphaAmplitude = 0;
	if (amplitude > 80) {
		alphaAmplitude = ampScale;
		filter = 1;
	}
	if (amplitude <= 80) {
		alphaAmplitude = ampScale;
		filter = 1;
	}
	const normalizedFrequency = indexOfMax(freqs) / fftSize;
	const colorAmplitude = Math.round(-amplitude) * filter;
	const h = hsla[0] + (Math.round(360 * normalizedFrequency) * 10);
	const colorL = Math.abs((colorAmplitude) * (80 / 255) + 100).toFixed(2) + '%';
	const colorS = Math.abs((colorAmplitude) * (10 / 255) + 100).toFixed(2) + '%';
	const color = `hsl(${hsla[0] + (Math.round(360 * normalizedFrequency) * 10)}, ${colorS}, ${colorL})`;
	const alpha = alphaAmplitude;

	//draw
	arr.forEach((value, i) => {
		ctx.beginPath();
		ctx.moveTo(space * i / alpha, (canvas.height - value) * h);
		ctx.lineTo(space * i * h, (canvas.height - value) / alpha);
		ctx.arc(x, y + 200, amplitude * alpha, 0, Math.PI, 1);
		ctx.strokeStyle = color;
		ctx.globalAlpha = alpha;
		ctx.stroke();
		ctx.beginPath();
	});
};

export const textile = (canvas, ctx, freqs, fftSize, arr, space) => {
	//change background-color to rothko-color
	var center = document.querySelectorAll(".center");
	for (var i = 0; i < center.length; i++) {
		console.log(center[i].style.color);
		center[i].style.color = getRothko().background;
	}
	document.body.style.setProperty('background-color', getRothko().background);
	//change to next color in colorList from rothko whenever feldman short has been triggered
	const colorH = getRothko().colorList[counter];
	//convert hex to HSL
	const hsla = hexToHSL(colorH);
	const amplitude = Math.max(...freqs);
	//scale amplitude
	const ampScale = amplitude * (1 / 255);
	//filter out noise
	let filter = 1;
	let alphaAmplitude = 0;
	if (amplitude > 80) {
		alphaAmplitude = ampScale;
		filter = 1;
	}
	if (amplitude <= 80) {
		alphaAmplitude = ampScale;
		filter = 0.9;
	}
	const normalizedFrequency = indexOfMax(freqs) / fftSize;
	const colorAmplitude = Math.round(-amplitude) * filter;
	const h = hsla[0] + (Math.round(360 * normalizedFrequency) * 10);
	const colorL = Math.abs((colorAmplitude) * (80 / 255) + 100).toFixed(2) + '%';
	const colorS = Math.abs((colorAmplitude) * (10 / 255) + 100).toFixed(2) + '%';
	const color = `hsl(${hsla[0] + (Math.round(360 * normalizedFrequency) * 10)}, ${colorS}, ${colorL})`;
	const alpha = alphaAmplitude;

	//draw
	arr.forEach((value, i) => {
		ctx.beginPath();
		ctx.strokeStyle = color;
		ctx.globalAlpha = alpha;
		ctx.moveTo(space * i * h, (canvas.height - value) * h);
		ctx.lineTo((space * i * h), -((canvas.height - value) / alpha) * 2);
		ctx.stroke();
	});
};

export const textileSquiggly = (canvas, ctx, freqs, fftSize, arr, space) => {
	//change background-color to rothko-color
	var center = document.querySelectorAll(".center");
	for (var i = 0; i < center.length; i++) {
		console.log(center[i].style.color);
		center[i].style.color = getRothko().background;
	}
	document.body.style.setProperty('background-color', getRothko().background);
	//change to next color in colorList from rothko whenever feldman short has been triggered
	const colorH = getRothko().colorList[counter];
	//convert hex to HSL
	const hsla = hexToHSL(colorH);
	const amplitude = Math.max(...freqs);
	//scale amplitude
	const ampScale = amplitude * (1 / 255);
	//filter out noise
	let filter = 1;
	let alphaAmplitude = 0;
	if (amplitude > 80) {
		alphaAmplitude = ampScale;
		filter = 1;
	}
	if (amplitude <= 80) {
		alphaAmplitude = ampScale;
		filter = 0.9;
	}
	const normalizedFrequency = indexOfMax(freqs) / fftSize;
	const colorAmplitude = Math.round(-amplitude) * filter;
	const h = hsla[0] + (Math.round(360 * normalizedFrequency) * 10);
	const colorL = Math.abs((colorAmplitude) * (80 / 255) + 100).toFixed(2) + '%';
	const colorS = Math.abs((colorAmplitude) * (10 / 255) + 100).toFixed(2) + '%';
	const color = `hsl(${hsla[0] + (Math.round(360 * normalizedFrequency) * 10)}, ${colorS}, ${colorL})`;
	const alpha = alphaAmplitude;
	const diameter = amplitude * 2;
	const side = Math.sqrt((diameter * diameter) / 2);

	//draw
	arr.forEach((value, i) => {
		ctx.beginPath();
		ctx.strokeStyle = color;
		ctx.globalAlpha = alpha;
		ctx.moveTo(space * i / 2 - Math.sin(i * (Math.PI / side)), (canvas.height - value) * 2 - Math.sin(i * (Math.PI / side)));
		ctx.lineTo((space * i / side) / h, -(canvas.height * side) / h);
		ctx.stroke();
	});
};

export const dot = (ctx, freqs, fftSize, x, y) => {
	//change background-color to rothko-color
	var center = document.querySelectorAll(".center");
	for (var i = 0; i < center.length; i++) {
		console.log(center[i].style.color);
		center[i].style.color = getRothko().background;
	}
	document.body.style.setProperty('background-color', getRothko().background);
	//change to next color in colorList from rothko whenever feldman short has been triggered
	const colorH = getRothko().colorList[counter];
	//convert hex to HSL
	const hsla = hexToHSL(colorH);
	const amplitude = Math.max(...freqs);
	//scale amplitude
	const ampScale = amplitude * (1 / 255);
	//filter out noise
	let filter = 1;
	let alphaAmplitude = 0;
	if (amplitude > 80) {
		alphaAmplitude = ampScale;
		filter = 1;
	}
	if (amplitude <= 80) {
		alphaAmplitude = ampScale;
		filter = 0.1;
	}
	const normalizedFrequency = indexOfMax(freqs) / fftSize;
	const colorAmplitude = Math.round(-amplitude) * filter;
	const colorL = Math.abs((colorAmplitude) * (80 / 255) + 100).toFixed(2) + '%';
	const colorS = Math.abs((colorAmplitude) * (10 / 255) + 100).toFixed(2) + '%';
	const color = `hsl(${hsla[0] + (Math.round(360 * normalizedFrequency) * 10)}, ${colorS}, ${colorL})`;
	const alpha = alphaAmplitude;
	// document.getElementById('introtext').style.setProperty('color', color);
	// document.getElementById('introtext').style.setProperty('opacity', alpha);
	//draw
	ctx.beginPath();
	ctx.arc(x, y, amplitude, 0, 2 * Math.PI);
	ctx.strokeStyle = color;
	ctx.globalAlpha = alpha;
	ctx.stroke();
};

export const square = (ctx, freqs, fftSize, x, y) => {
	//change background-color to rothko-color
	var center = document.querySelectorAll(".center");
	for (var i = 0; i < center.length; i++) {
		console.log(center[i].style.color);
		center[i].style.color = getRothko().background;
	}
	document.body.style.setProperty('background-color', getRothko().background);
	//change to next color in colorList from rothko whenever feldman short has been triggered
	const colorH = getRothko().colorList[counter];
	//convert hex to HSL
	const hsla = hexToHSL(colorH);
	const amplitude = Math.max(...freqs);
	//scale amplitude
	const ampScale = amplitude * (1 / 255);
	//filter out noise
	let filter = 1;
	let alphaAmplitude = 0;
	if (amplitude > 80) {
		alphaAmplitude = ampScale;
		filter = 1;
	}
	if (amplitude <= 80) {
		alphaAmplitude = ampScale;
		filter = 0.1;
	}
	const normalizedFrequency = indexOfMax(freqs) / fftSize;
	const colorAmplitude = Math.round(-amplitude) * filter;
	const colorL = Math.abs((colorAmplitude) * (80 / 255) + 100).toFixed(2) + '%';
	const colorS = Math.abs((colorAmplitude) * (10 / 255) + 100).toFixed(2) + '%';
	const color = `hsl(${hsla[0] + (Math.round(360 * normalizedFrequency) * 10)}, ${colorS}, ${colorL})`;
	const alpha = alphaAmplitude;
	// document.getElementById('introtext').style.setProperty('color', color);
	// document.getElementById('introtext').style.setProperty('opacity', alpha);
	//draw
	ctx.beginPath();
	ctx.fill();
	const diameter = amplitude * 2;
	const side = Math.sqrt((diameter * diameter) / 2);
	//ctx.arc(x, y, amplitude, 0, 2 * Math.sqrt( (diameter * diameter)/2 ));
	//ctx.arc(x, y, amplitude, 0, Math.PI*2, false);
	ctx.strokeRect(x - side / 2, y - side / 2, side, side);
	ctx.closePath();
	ctx.fillStyle = color;
	ctx.strokeStyle = color;
	ctx.globalAlpha = alpha;
	ctx.stroke();
};

export const Corridoor = (ctx, freqs, fftSize, x, y) => {
	//change background-color to rothko-color
	var center = document.querySelectorAll(".center");
	for (var i = 0; i < center.length; i++) {
		center[i].style.color = getRothko().background;
	}
	document.body.style.setProperty('background-color', getRothko().background);
	//change to next color in colorList from rothko whenever feldman short has been triggered
	const colorH = getRothko().colorList[counter];
	//convert hex to HSL
	const hsla = hexToHSL(colorH);
	const amplitude = Math.max(...freqs);
	//scale amplitude
	const ampScale = amplitude * (1 / 255);
	//filter out noise
	let filter = 1;
	let alphaAmplitude = 0;
	if (amplitude > 80) {
		alphaAmplitude = ampScale;
		filter = 1;
	}
	if (amplitude <= 80) {
		alphaAmplitude = ampScale;
		filter = 0.1;
	}
	const normalizedFrequency = indexOfMax(freqs) / fftSize;
	const colorAmplitude = Math.round(-amplitude) * filter;
	const colorL = Math.abs((colorAmplitude) * (80 / 255) + 100).toFixed(2) + '%';
	const colorS = Math.abs((colorAmplitude) * (10 / 255) + 100).toFixed(2) + '%';
	const color = `hsl(${hsla[0] + (Math.round(360 * normalizedFrequency) * 10)}, ${colorS}, ${colorL})`;
	const alpha = alphaAmplitude;
	// document.getElementById('introtext').style.setProperty('color', color);
	// document.getElementById('introtext').style.setProperty('opacity', alpha);
	//draw
	ctx.beginPath();
	ctx.fill();
	const diameter = amplitude * 2;
	const side = Math.sqrt((diameter * diameter) / 3);
	//ctx.arc(x, y, amplitude, 0, 2 * Math.sqrt( (diameter * diameter)/2 ));
	//ctx.arc(x, y, amplitude, 0, Math.PI*2, false);
	// ctx.strokeRect(x - side/2-120*ampScale, y - side/2-120*ampScale, side, side);
	// ctx.strokeRect(x - side/2-100*ampScale, y - side/2-100*ampScale, side, side);
	// ctx.strokeRect(x - side/2-80*ampScale, y - side/2-80*ampScale, side, side);
	// ctx.strokeRect(x - side/2-60*ampScale, y - side/2-60*ampScale, side, side);
	// ctx.strokeRect(x - side/2*ampScale, y - side/2*ampScale, side, side*random(-6,7));
	// ctx.strokeRect(x - side/2*ampScale, y - side/2*ampScale, side, side*random(-6,7));
	// ctx.strokeRect(x - side/2-250, y - side/2*ampScale, side, side*random(-6,7)*ampScale);
	// ctx.strokeRect(x - side/2-225, y - side/2*ampScale+25, side, side*random(-6,7)*ampScale);
	// ctx.strokeRect(x - side/2-200, y - side/2*ampScale+50, side, side*random(-6,7)*ampScale);
	// ctx.strokeRect(x - side/2-175, y - side/2*ampScale+75, side, side*random(-6,7)*ampScale);
	// ctx.strokeRect(x - side/2-150, y - side/2*ampScale+100, side, side*random(-6,7)*ampScale);

	// ctx.strokeRect(x - side/2-25, y - side/2*ampScale+25, side, side*random(-6,7)*ampScale);
	// ctx.strokeRect(x - side/2-50, y - side/2*ampScale+50, side, side*random(-6,7)*ampScale);
	// ctx.strokeRect(x - side/2-75, y - side/2*ampScale+75, side, side*random(-6,7)*ampScale);
	// ctx.strokeRect(x - side/2-100, y - side/2*ampScale+100, side, side*random(-6,7)*ampScale);
	// ctx.strokeRect(x - side/2-125, y - side/2*ampScale+125, side, side*random(-6,7)*ampScale);

	ctx.strokeRect(x - side / 2, y - side / 2 * ampScale, side, side * random(-6, 7) * ampScale);

	// ctx.strokeRect(x - side/2+25, y - side/2*ampScale+25, side, side*random(-6,7)*ampScale);
	// ctx.strokeRect(x - side/2+50, y - side/2*ampScale+50, side, side*random(-6,7)*ampScale);
	// ctx.strokeRect(x - side/2+75, y - side/2*ampScale+75, side, side*random(-6,7)*ampScale);
	// ctx.strokeRect(x - side/2+100, y - side/2*ampScale+100, side, side*random(-6,7)*ampScale);
	// ctx.strokeRect(x - side/2+125, y - side/2*ampScale+125, side, side*random(-6,7)*ampScale);

	// ctx.strokeRect(x - side/2+250, y - side/2*ampScale, side, side*random(-6,7)*ampScale);
	// ctx.strokeRect(x - side/2+225, y - side/2*ampScale+25, side, side*random(-6,7)*ampScale);
	// ctx.strokeRect(x - side/2+200, y - side/2*ampScale+50, side, side*random(-6,7)*ampScale);
	// ctx.strokeRect(x - side/2+175, y - side/2*ampScale+75, side, side*random(-6,7)*ampScale);
	// ctx.strokeRect(x - side/2+150, y - side/2*ampScale+100, side, side*random(-6,7)*ampScale);
	// ctx.strokeRect(x - side/2*ampScale, y - side/2*ampScale, side, side*random(-6,7));
	// ctx.strokeRect(x - side/2*ampScale, y - side/2*ampScale, side, side*random(-6,7));
	// ctx.strokeRect(x - side/2+60*ampScale, y - side/2+60*ampScale, side, side);
	// ctx.strokeRect(x - side/2+80*ampScale, y - side/2+80*ampScale, side, side);
	// ctx.strokeRect(x - side/2+100*ampScale, y - side/2+100*ampScale, side, side);
	// ctx.strokeRect(x - side/2+120*ampScale, y - side/2+120*ampScale, side, side);


	ctx.closePath();
	ctx.fillStyle = color;
	ctx.strokeStyle = color;
	ctx.globalAlpha = alpha;
	ctx.stroke();
};

export const multipleSquare = (ctx, freqs, fftSize, x, y) => {
	//change background-color to rothko-color
	var center = document.querySelectorAll(".center");
	for (var i = 0; i < center.length; i++) {
		center[i].style.color = getRothko().background;
	}
	document.body.style.setProperty('background-color', getRothko().background);
	//change to next color in colorList from rothko whenever feldman short has been triggered
	const colorH = getRothko().colorList[counter];
	//convert hex to HSL
	const hsla = hexToHSL(colorH);
	const amplitude = Math.max(...freqs);
	//scale amplitude
	const ampScale = amplitude * (1 / 255);
	//filter out noise
	let filter = 1;
	let alphaAmplitude = 0;
	if (amplitude > 80) {
		alphaAmplitude = ampScale;
		filter = 1;
	}
	if (amplitude <= 80) {
		alphaAmplitude = ampScale;
		filter = 0.1;
	}
	const normalizedFrequency = indexOfMax(freqs) / fftSize;
	const colorAmplitude = Math.round(-amplitude) * filter;
	const colorL = Math.abs((colorAmplitude) * (80 / 255) + 100).toFixed(2) + '%';
	const colorS = Math.abs((colorAmplitude) * (10 / 255) + 100).toFixed(2) + '%';
	const color = `hsl(${hsla[0] + (Math.round(360 * normalizedFrequency) * 10)}, ${colorS}, ${colorL})`;
	const alpha = alphaAmplitude;
	// document.getElementById('introtext').style.setProperty('color', color);
	// document.getElementById('introtext').style.setProperty('opacity', alpha);
	//draw
	ctx.beginPath();
	ctx.fill();
	const diameter = amplitude * 2;
	const side = Math.sqrt((diameter * diameter) / 2);
	//ctx.arc(x, y, amplitude, 0, 2 * Math.sqrt( (diameter * diameter)/2 ));
	//ctx.arc(x, y, amplitude, 0, Math.PI*2, false);
	ctx.strokeRect(x - side / 2 - 120, y - side / 2 - 120, side, side);
	ctx.strokeRect(x - side / 2 - 100, y - side / 2 - 100, side, side);
	ctx.strokeRect(x - side / 2 - 80, y - side / 2 - 80, side, side);
	ctx.strokeRect(x - side / 2 - 60, y - side / 2 - 60, side, side);
	ctx.strokeRect(x - side / 2 - 40, y - side / 2 - 40, side, side);
	ctx.strokeRect(x - side / 2 - 20, y - side / 2 - 20, side, side);
	ctx.strokeRect(x - side / 2, y - side / 2, side, side);
	ctx.strokeRect(x - side / 2 + 20, y - side / 2 + 20, side, side);
	ctx.strokeRect(x - side / 2 + 40, y - side / 2 + 40, side, side);
	ctx.strokeRect(x - side / 2 + 60, y - side / 2 + 60, side, side);
	ctx.strokeRect(x - side / 2 + 80, y - side / 2 + 80, side, side);
	ctx.strokeRect(x - side / 2 + 100, y - side / 2 + 100, side, side);
	ctx.strokeRect(x - side / 2 + 120, y - side / 2 + 120, side, side);


	ctx.closePath();
	ctx.fillStyle = color;
	ctx.strokeStyle = color;
	ctx.globalAlpha = alpha;
	ctx.stroke();
};

export const fillSquare = (ctx, freqs, fftSize, x, y) => {
	//change background-color to rothko-color
	var center = document.querySelectorAll(".center");
	for (var i = 0; i < center.length; i++) {
		console.log(center[i].style.color);
		center[i].style.color = getRothko().background;
	}
	document.body.style.setProperty('background-color', getRothko().background);
	//change to next color in colorList from rothko whenever feldman short has been triggered
	const colorH = getRothko().colorList[counter];
	//convert hex to HSL
	const hsla = hexToHSL(colorH);
	const amplitude = Math.max(...freqs);
	//scale amplitude
	const ampScale = amplitude * (1 / 255);
	//filter out noise
	let filter = 1;
	let alphaAmplitude = 0;
	if (amplitude > 80) {
		alphaAmplitude = ampScale;
		filter = 1;
	}
	if (amplitude <= 80) {
		alphaAmplitude = ampScale;
		filter = 0.1;
	}
	const normalizedFrequency = indexOfMax(freqs) / fftSize;
	const hue = Math.round(360 * normalizedFrequency) * 10;
	const colorAmplitude = Math.round(-amplitude) * filter;
	const colorL = Math.abs((colorAmplitude) * (80 / 255) + 100).toFixed(2) + '%';
	const colorS = Math.abs((colorAmplitude) * (10 / 255) + 100).toFixed(2) + '%';
	const h = hsla[0] + (Math.round(360 * normalizedFrequency) * 10);
	const color = `hsl(${hsla[0] + (Math.round(360 * normalizedFrequency) * 10)}, ${colorS}, ${colorL})`;
	const alpha = alphaAmplitude;
	const diameter = amplitude * 2;
	const side = Math.sqrt((diameter * diameter) / 2);
	// document.getElementById('introtext').style.setProperty('color', color);
	// document.getElementById('introtext').style.setProperty('opacity', alpha);
	//draw
	// ctx.beginPath();
	// const gradient = ctx.createRadialGradient(x, y, 0, x, y, random(100 * alpha, 3000 * alpha) / alpha);
	// gradient.addColorStop(0, `hsla(${h}, ${colorS}, ${colorL}, 0)`);
	// gradient.addColorStop(1, `hsla(${h}, ${colorS}, ${colorL}, ${random(0, 1)})`);
	// ctx.fillStyle = gradient;
	// ctx.fill();
	// ctx.fillRect(x - side / 2, y - side / 2, side, side);
	// ctx.strokeStyle = color;
	// ctx.globalAlpha = alpha;
	// ctx.stroke();

	const gradient2 = ctx.createLinearGradient(x / alpha, y, 0, y);
	gradient2.addColorStop(0, `hsla(${h}, ${colorS}, ${colorL}, 0)`);
	gradient2.addColorStop(1, `hsla(${h}, ${colorS}, ${colorL}, ${random(0, 1)})`);
	ctx.fillStyle = gradient2;
	ctx.fillRect(x - side / 2, y - side / 2, side, side);
	ctx.strokeStyle = color;
	ctx.globalAlpha = alpha;
	ctx.stroke();
	console.log(ampScale);

};

export const fillRandomSquare = (ctx, freqs, fftSize, x, y) => {
	//change background-color to rothko-color
	var center = document.querySelectorAll(".center");
	for (var i = 0; i < center.length; i++) {
		console.log(center[i].style.color);
		center[i].style.color = getRothko().background;
	}
	document.body.style.setProperty('background-color', getRothko().background);
	//change to next color in colorList from rothko whenever feldman short has been triggered
	const colorH = getRothko().colorList[counter];
	//convert hex to HSL
	const hsla = hexToHSL(colorH);
	const amplitude = Math.max(...freqs);
	//scale amplitude
	const ampScale = amplitude * (1 / 255);
	//filter out noise
	let filter = 1;
	let alphaAmplitude = 0;
	if (amplitude > 80) {
		alphaAmplitude = ampScale;
		filter = 1;
	}
	if (amplitude <= 80) {
		alphaAmplitude = ampScale;
		filter = 0.1;
	}
	const normalizedFrequency = indexOfMax(freqs) / fftSize;
	const hue = Math.round(360 * normalizedFrequency) * 10;
	const colorAmplitude = Math.round(-amplitude) * filter;
	const colorL = Math.abs((colorAmplitude) * (80 / 255) + 100).toFixed(2) + '%';
	const colorS = Math.abs((colorAmplitude) * (10 / 255) + 100).toFixed(2) + '%';
	const h = hsla[0] + (Math.round(360 * normalizedFrequency) * 10);
	const color = `hsl(${hsla[0] + (Math.round(360 * normalizedFrequency) * 10)}, ${colorS}, ${colorL})`;
	const alpha = alphaAmplitude;
	const diameter = amplitude;
	const side = Math.sqrt((diameter * diameter));
	// document.getElementById('introtext').style.setProperty('color', color);
	// document.getElementById('introtext').style.setProperty('opacity', alpha);
	//draw
	ctx.beginPath();
	const gradient = ctx.createRadialGradient(x * (random(-1, 2)), y * (random(-1, 2)), 0, x, y, random(100 * alpha, 3000 * alpha) / alpha);
	gradient.addColorStop(0, `hsla(${h}, ${colorS}, ${colorL}, 0)`);
	gradient.addColorStop(1, `hsla(${h}, ${colorS}, ${colorL}, ${random(0, 1)})`);
	ctx.fillStyle = gradient;
	ctx.fillRect(x - side * (random(0, 1)), y - side * (random(0, 1)), side, side);
	ctx.strokeStyle = color;
	ctx.globalAlpha = alpha;
	ctx.stroke();
};

export const fillMultipleRandomSquare = (ctx, freqs, fftSize, x, y) => {
	//change background-color to rothko-color
	var center = document.querySelectorAll(".center");
	for (var i = 0; i < center.length; i++) {
		console.log(center[i].style.color);
		center[i].style.color = getRothko().background;
	}
	document.body.style.setProperty('background-color', getRothko().background);
	//change to next color in colorList from rothko whenever feldman short has been triggered
	const colorH = getRothko().colorList[counter];
	//convert hex to HSL
	const hsla = hexToHSL(colorH);
	const amplitude = Math.max(...freqs);
	//scale amplitude
	const ampScale = amplitude * (1 / 255);
	//filter out noise
	let filter = 1;
	let alphaAmplitude = 0;
	if (amplitude > 80) {
		alphaAmplitude = ampScale;
		filter = 1;
	}
	if (amplitude <= 80) {
		alphaAmplitude = ampScale;
		filter = 0.1;
	}
	const normalizedFrequency = indexOfMax(freqs) / fftSize;
	const hue = Math.round(360 * normalizedFrequency) * 10;
	const colorAmplitude = Math.round(-amplitude) * filter;
	const colorL = Math.abs((colorAmplitude) * (80 / 255) + 100).toFixed(2) + '%';
	const colorS = Math.abs((colorAmplitude) * (10 / 255) + 100).toFixed(2) + '%';
	const h = hsla[0] + (Math.round(360 * normalizedFrequency) * 10);
	const color = `hsl(${hsla[0] + (Math.round(360 * normalizedFrequency) * 10)}, ${colorS}, ${colorL})`;
	const alpha = alphaAmplitude;
	const diameter = amplitude;
	const side = Math.sqrt((diameter * diameter) / 3);
	// document.getElementById('introtext').style.setProperty('color', color);
	// document.getElementById('introtext').style.setProperty('opacity', alpha);
	//draw
	ctx.beginPath();
	const gradient = ctx.createRadialGradient(x * (random(-2, 3)), y * (random(-2, 3)), 0, x, y, random(100 * alpha, 3000 * alpha) / alpha);
	gradient.addColorStop(0, `hsla(${h}, ${colorS}, ${colorL}, 0)`);
	gradient.addColorStop(1, `hsla(${h}, ${colorS}, ${colorL}, ${random(0, 1)})`);
	ctx.fillStyle = gradient;
	ctx.fillRect(x - side * (random(-2, 3)), y - side * (random(-2, 3)), side, side);
	ctx.strokeStyle = color;
	ctx.globalAlpha = alpha;
	ctx.stroke();
};

export const fillMultipleDots = (ctx, freqs, fftSize, x, y) => {
	//change background-color to rothko-color
	var center = document.querySelectorAll(".center");
	for (var i = 0; i < center.length; i++) {
		console.log(center[i].style.color);
		center[i].style.color = getRothko().background;
	}
	document.body.style.setProperty('background-color', getRothko().background);
	//change to next color in colorList from rothko whenever feldman short has been triggered
	const colorH = getRothko().colorList[counter];
	//convert hex to HSL
	const hsla = hexToHSL(colorH);
	const amplitude = Math.max(...freqs);
	//scale amplitude
	const ampScale = amplitude * (1 / 255);
	//filter out noise
	let filter = 1;
	let alphaAmplitude = 0;
	if (amplitude > 80) {
		alphaAmplitude = ampScale;
		filter = 1;
	}
	if (amplitude <= 80) {
		alphaAmplitude = ampScale;
		filter = 0.1;
	}
	const normalizedFrequency = indexOfMax(freqs) / fftSize;
	const hue = Math.round(360 * normalizedFrequency) * 10;
	const colorAmplitude = Math.round(-amplitude) * filter;
	const colorL = Math.abs((colorAmplitude) * (80 / 255) + 100).toFixed(2) + '%';
	const colorS = Math.abs((colorAmplitude) * (10 / 255) + 100).toFixed(2) + '%';
	const h = hsla[0] + (Math.round(360 * normalizedFrequency) * 10);
	const color = `hsl(${hsla[0] + (Math.round(360 * normalizedFrequency) * 10)}, ${colorS}, ${colorL})`;
	const alpha = alphaAmplitude;
	// document.getElementById('introtext').style.setProperty('color', color);
	// document.getElementById('introtext').style.setProperty('opacity', alpha);
	//draw
	ctx.beginPath();
	const gradient = ctx.createRadialGradient(x, y, 0, x, y, random(100 * alpha, 3000 * alpha) / alpha);
	gradient.addColorStop(0, `hsla(${h}, ${colorS}, ${colorL}, 0)`);
	gradient.addColorStop(1, `hsla(${h}, ${colorS}, ${colorL}, ${random(0, 1)})`);
	ctx.fillStyle = gradient;
	ctx.arc(x + amplitude * alpha, y + amplitude * alpha, amplitude * alpha, 0, 1 * Math.PI);

	//ctx.fill();

	ctx.strokeStyle = color;
	ctx.globalAlpha = alpha;
	ctx.stroke();
};

export const fillMultipleRandomDots = (ctx, freqs, fftSize, x, y) => {
	//change background-color to rothko-color
	var center = document.querySelectorAll(".center");
	for (var i = 0; i < center.length; i++) {
		console.log(center[i].style.color);
		center[i].style.color = getRothko().background;
	}
	document.body.style.setProperty('background-color', getRothko().background);
	//change to next color in colorList from rothko whenever feldman short has been triggered
	const colorH = getRothko().colorList[counter];
	//convert hex to HSL
	const hsla = hexToHSL(colorH);
	const amplitude = Math.max(...freqs);
	//scale amplitude
	const ampScale = amplitude * (1 / 255);
	//filter out noise
	let filter = 1;
	let alphaAmplitude = 0;
	if (amplitude > 80) {
		alphaAmplitude = ampScale;
		filter = 1;
	}
	if (amplitude <= 80) {
		alphaAmplitude = ampScale;
		filter = 0.1;
	}
	const normalizedFrequency = indexOfMax(freqs) / fftSize;
	const hue = Math.round(360 * normalizedFrequency) * 10;
	const colorAmplitude = Math.round(-amplitude) * filter;
	const colorL = Math.abs((colorAmplitude) * (80 / 255) + 100).toFixed(2) + '%';
	const colorS = Math.abs((colorAmplitude) * (10 / 255) + 100).toFixed(2) + '%';
	const h = hsla[0] + (Math.round(360 * normalizedFrequency) * 10);
	const color = `hsl(${hsla[0] + (Math.round(360 * normalizedFrequency) * 10)}, ${colorS}, ${colorL})`;
	const alpha = alphaAmplitude;
	const diameter = amplitude;
	const side = Math.sqrt((diameter * diameter));
	// document.getElementById('introtext').style.setProperty('color', color);
	// document.getElementById('introtext').style.setProperty('opacity', alpha);
	//draw

	ctx.beginPath();
	const gradient = ctx.createRadialGradient(x * (random(-1, 1)), y * (random(-1, 1)), 0, x / 100, y / 100, random(100 * alpha, 3000 * alpha) / alpha);
	gradient.addColorStop(0, `hsla(${h}, ${colorS}, ${colorL}, 0)`);
	gradient.addColorStop(1, `hsla(${h}, ${colorS}, ${colorL}, ${random(0, 1)})`);
	ctx.fillStyle = gradient;
	ctx.arc(x - side * random(-1, 1), y - side * random(-1, 1), amplitude * alpha, 0, 2 * Math.PI * 1);
	//ctx.fill();
	ctx.lineWidth = ampScale * 2;
	ctx.strokeStyle = color;
	ctx.globalAlpha = alpha;
	ctx.stroke();
};

export const RandomSquare = (ctx, freqs, fftSize, x, y) => {
	//change background-color to rothko-color
	var center = document.querySelectorAll(".center");
	for (var i = 0; i < center.length; i++) {
		console.log(center[i].style.color);
		center[i].style.color = getRothko().background;
	}
	document.body.style.setProperty('background-color', getRothko().background);
	//change to next color in colorList from rothko whenever feldman short has been triggered
	const colorH = getRothko().colorList[counter];
	//convert hex to HSL
	const hsla = hexToHSL(colorH);
	const amplitude = Math.max(...freqs);
	//scale amplitude
	const ampScale = amplitude * (1 / 255);
	//filter out noise
	let filter = 1;
	let alphaAmplitude = 0;
	if (amplitude > 80) {
		alphaAmplitude = ampScale;
		filter = 1;
	}
	if (amplitude <= 80) {
		alphaAmplitude = ampScale;
		filter = 0.1;
	}
	const normalizedFrequency = indexOfMax(freqs) / fftSize;
	const hue = Math.round(360 * normalizedFrequency) * 10;
	const colorAmplitude = Math.round(-amplitude) * filter;
	const colorL = Math.abs((colorAmplitude) * (80 / 255) + 100).toFixed(2) + '%';
	const colorS = Math.abs((colorAmplitude) * (10 / 255) + 100).toFixed(2) + '%';
	const h = hsla[0] + (Math.round(360 * normalizedFrequency) * 10);
	const color = `hsl(${hsla[0] + (Math.round(360 * normalizedFrequency) * 10)}, ${colorS}, ${colorL})`;
	const alpha = alphaAmplitude;
	const diameter = amplitude;
	const side = Math.sqrt((diameter * diameter));
	// document.getElementById('introtext').style.setProperty('color', color);
	// document.getElementById('introtext').style.setProperty('opacity', alpha);
	//draw
	ctx.beginPath();
	const gradient = ctx.createRadialGradient(x * (random(-1, 2)), y * (random(-1, 2)), 0, x, y, random(100 * alpha, 3000 * alpha) / alpha);
	gradient.addColorStop(0, `hsla(${h}, ${colorS}, ${colorL}, 0)`);
	gradient.addColorStop(1, `hsla(${h}, ${colorS}, ${colorL}, ${random(0, 1)})`);
	ctx.fillStyle = gradient;
	ctx.strokeRect(x - side * (random(0, 1)), y - side * (random(0, 1)), side, side);
	ctx.strokeStyle = color;
	ctx.globalAlpha = alpha;
	ctx.stroke();
};

export const fillRandomStuff = (ctx, freqs, fftSize, x, y) => {
	//change background-color to rothko-color
	var center = document.querySelectorAll(".center");
	for (var i = 0; i < center.length; i++) {
		console.log(center[i].style.color);
		center[i].style.color = getRothko().background;
	}
	document.body.style.setProperty('background-color', getRothko().background);
	//change to next color in colorList from rothko whenever feldman short has been triggered
	const colorH = getRothko().colorList[counter];
	//convert hex to HSL
	const hsla = hexToHSL(colorH);
	const amplitude = Math.max(...freqs);
	//scale amplitude
	const ampScale = amplitude * (1 / 255);
	//filter out noise
	let filter = 1;
	let alphaAmplitude = 0;
	if (amplitude > 80) {
		alphaAmplitude = ampScale;
		filter = 1;
	}
	if (amplitude <= 80) {
		alphaAmplitude = ampScale;
		filter = 0.1;
	}
	const normalizedFrequency = indexOfMax(freqs) / fftSize;
	const hue = Math.round(360 * normalizedFrequency) * 10;
	const colorAmplitude = Math.round(-amplitude) * filter;
	const colorL = Math.abs((colorAmplitude) * (80 / 255) + 100).toFixed(2) + '%';
	const colorS = Math.abs((colorAmplitude) * (10 / 255) + 100).toFixed(2) + '%';
	const h = hsla[0] + (Math.round(360 * normalizedFrequency) * 10);
	const color = `hsl(${hsla[0] + (Math.round(360 * normalizedFrequency) * 10)}, ${colorS}, ${colorL})`;
	const alpha = alphaAmplitude;
	const diameter = amplitude;
	const side = Math.sqrt((diameter * diameter));
	// document.getElementById('introtext').style.setProperty('color', color);
	// document.getElementById('introtext').style.setProperty('opacity', alpha);
	//draw
	ctx.beginPath();
	const gradient = ctx.createRadialGradient(x, y, 0, x, y, random(100 * alpha, 3000 * alpha) / alpha);
	gradient.addColorStop(0, `hsla(${h}, ${colorS}, ${colorL}, 0)`);
	gradient.addColorStop(1, `hsla(${h}, ${colorS}, ${colorL}, ${random(0, 1)})`);
	ctx.fillStyle = gradient;
	ctx.fillRect(x - side * ampScale, y - side * ampScale, side, side);
	ctx.strokeStyle = color;
	ctx.globalAlpha = alpha;
	ctx.stroke();
};

export const fillDot = (ctx, freqs, fftSize, x, y) => {
	//change background-color to rothko-color
	var center = document.querySelectorAll(".center");
	for (var i = 0; i < center.length; i++) {
		console.log(center[i].style.color);
		center[i].style.color = getRothko().background;
	}
	document.body.style.setProperty('background-color', getRothko().background);
	//change to next color in colorList from rothko whenever feldman short has been triggered
	const colorH = getRothko().colorList[counter];
	//convert hex to HSL
	const hsla = hexToHSL(colorH);
	const amplitude = Math.max(...freqs);
	//scale amplitude
	const ampScale = amplitude * (1 / 255);
	//filter out noise
	let filter = 1;
	let alphaAmplitude = 0;
	let fillFilter = 1;
	if (amplitude > 80) {
		alphaAmplitude = ampScale;
		filter = 1;
		fillFilter = 0;
	}
	if (amplitude <= 80) {
		alphaAmplitude = ampScale;
		filter = 0.9;
	}
	if (amplitude <= 300) {
		fillFilter = 1;
	}
	const normalizedFrequency = indexOfMax(freqs) / fftSize;
	const hue = Math.round(360 * normalizedFrequency) * 10;
	const colorAmplitude = Math.round(-amplitude) * filter;
	const colorL = Math.abs((colorAmplitude) * (80 / 255) + 100).toFixed(2) + '%';
	const colorS = Math.abs((colorAmplitude) * (10 / 255) + 100).toFixed(2) + '%';
	const h = hsla[0] + (Math.round(360 * normalizedFrequency) * 10);
	const color = `hsl(${hsla[0] + (Math.round(360 * normalizedFrequency) * 10)}, ${colorS}, ${colorL})`;
	const alpha = alphaAmplitude;

	//draw
	ctx.beginPath();
	const gradient = ctx.createRadialGradient(x, y, 0, x, y, random(100 * alpha, 3000 * alpha) / alpha);
	gradient.addColorStop(0, `hsla(${h}, ${colorS}, ${colorL}, 0)`);
	gradient.addColorStop(1, `hsla(${h}, ${colorS}, ${colorL}, ${random(0, 1)})`);
	ctx.fillStyle = gradient;
	ctx.arc(x, y, amplitude * alpha, 0, 2 * Math.PI);
	ctx.fill();
	ctx.lineWidth = 1;
	ctx.strokeStyle = color;
	ctx.globalAlpha = alpha;
	ctx.stroke();
};

export const fadingDot = (ctx, freqs, fftSize, x, y) => {
	const amplitude = Math.max(...freqs);
	const normalizedFrequency = indexOfMax(freqs) / fftSize;
	const hue = Math.round(360 * normalizedFrequency) * 10;

	ctx.beginPath();
	const gradient = ctx.createRadialGradient(x, y, 1, x, y, amplitude);
	gradient.addColorStop(0, `hsla(${hue}, 100%, 50%, 1)`);
	gradient.addColorStop(1, `hsla(${hue}, 100%, 50%, 0)`);
	ctx.strokeWidth = 1;
	ctx.fillStyle = gradient;
	ctx.arc(x, y, amplitude, 0, 2 * Math.PI);
	ctx.fill();
};
