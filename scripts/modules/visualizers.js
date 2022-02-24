import { indexOfMax, hexToHSL, random } from "./utils.js";

const setBackgroundColor = color => {
	const center = document.querySelectorAll(".center");
	center.forEach((_, i) => center[i].style.color = color);
	document.body.style.setProperty('background-color', color);
};

export const bottomBars = ({ canvas, ctx, samplesBuffer, frequencyWidth }) => {
	samplesBuffer.forEach((value, i) => {
		ctx.beginPath();
		ctx.moveTo(frequencyWidth * i, canvas.height);
		ctx.lineTo(frequencyWidth * i, (canvas.height - value));
		ctx.stroke();
	});
};

export const topBars = ({ ctx, samplesBuffer, frequencyWidth }) => {
	samplesBuffer.forEach((value, i) => {
		ctx.beginPath();
		ctx.moveTo(frequencyWidth * i, 0);
		ctx.lineTo(frequencyWidth * i, value);
		ctx.stroke();
	});
};

export const bottomWaves = ({
	canvas,
	ctx,
	frequencyBuffer,
	analyser,
	samplesBuffer,
	frequencyWidth,
	themeColor,
	backgroundColor
}) => {
	setBackgroundColor(backgroundColor);

	//change to next color in colorList from rothko whenever feldman short has been triggered
	//convert hex to HSL
	const hsla = hexToHSL(themeColor);
	const amplitude = Math.max(...frequencyBuffer);
	//scale amplitude
	const ampScale = amplitude * (1 / 255);
	//filter out noise
	let filter = 1;
	let alphaAmplitude = 0;
	if (amplitude > 80) {
		alphaAmplitude = ampScale;
		filter = 1;
	} else if (amplitude <= 80) {
		alphaAmplitude = ampScale * 0.01;
		filter = 0;
	}

	const normalizedFrequency = indexOfMax(frequencyBuffer) / analyser.fftSize;
	const colorAmplitude = Math.round(-amplitude) * filter;
	const colorL = Math.abs((colorAmplitude) * (80 / 255) + 100).toFixed(2) + '%';
	const colorS = Math.abs((colorAmplitude) * (10 / 255) + 100).toFixed(2) + '%';
	const color = `hsl(${hsla[0] + (Math.round(360 * normalizedFrequency) * 10)}, ${colorS}, ${colorL})`;
	const alpha = alphaAmplitude;

	//draw
	samplesBuffer.forEach((value, i) => {
		ctx.beginPath();
		ctx.moveTo(frequencyWidth * i, (canvas.height - value) + alpha * 2);
		ctx.lineTo(frequencyWidth * i, (canvas.height - value));
		ctx.strokeStyle = color;
		ctx.globalAlpha = alpha;
		ctx.stroke();
	});
};

export const sunRays = ({
	canvas,
	ctx,
	frequencyBuffer,
	analyser,
	samplesBuffer,
	frequencyWidth,
	themeColor,
	backgroundColor
}) => {
	setBackgroundColor(backgroundColor);

	//change to next color in colorList from rothko whenever feldman short has been triggered
	//convert hex to HSL
	const hsla = hexToHSL(themeColor);
	const amplitude = Math.max(...frequencyBuffer);
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
	const normalizedFrequency = indexOfMax(frequencyBuffer) / analyser.fftSize;
	const colorAmplitude = Math.round(-amplitude) * filter;
	const colorL = Math.abs((colorAmplitude) * (80 / 255) + 100).toFixed(2) + '%';
	const colorS = Math.abs((colorAmplitude) * (10 / 255) + 100).toFixed(2) + '%';
	const color = `hsl(${hsla[0] + (Math.round(360 * normalizedFrequency) * 10)}, ${colorS}, ${colorL})`;
	const alpha = alphaAmplitude;
	//draw
	samplesBuffer.forEach((value, i) => {
		ctx.beginPath();
		ctx.moveTo(frequencyWidth * i / alpha, (canvas.height - value));
		ctx.quadraticCurveTo(frequencyWidth * i / alpha * 10, frequencyWidth * i * alpha * normalizedFrequency, frequencyWidth * i / alpha * 10, frequencyWidth * i * alpha * normalizedFrequency);
		ctx.fill();
		ctx.strokeStyle = color;
		ctx.globalAlpha = alpha;
		ctx.stroke();
	});
};

export const sunWaves = ({
	canvas,
	ctx,
	frequencyBuffer,
	analyser,
	samplesBuffer,
	frequencyWidth,
	themeColor,
	backgroundColor
}) => {
	setBackgroundColor(backgroundColor);

	//change to next color in colorList from rothko whenever feldman short has been triggered
	//convert hex to HSL
	const hsla = hexToHSL(themeColor);
	const amplitude = Math.max(...frequencyBuffer);
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
	const normalizedFrequency = indexOfMax(frequencyBuffer) / analyser.fftSize;
	const colorAmplitude = Math.round(-amplitude) * filter;
	const colorL = Math.abs((colorAmplitude) * (80 / 255) + 100).toFixed(2) + '%';
	const colorS = Math.abs((colorAmplitude) * (10 / 255) + 100).toFixed(2) + '%';
	const color = `hsl(${hsla[0] + (Math.round(360 * normalizedFrequency) * 10)}, ${colorS}, ${colorL})`;
	const alpha = alphaAmplitude;
	//draw
	samplesBuffer.forEach((value, i) => {
		ctx.beginPath();
		ctx.moveTo(frequencyWidth * i * alpha, (canvas.height - value));
		ctx.quadraticCurveTo(frequencyWidth * i / alpha * 10, (frequencyWidth * i) * alpha, frequencyWidth * i / alpha * 10, (frequencyWidth * i * alpha));
		ctx.fill();
		ctx.strokeStyle = color;
		ctx.globalAlpha = alpha;
		ctx.stroke();
	});
};

export const colorField = ({
	canvas,
	ctx,
	frequencyBuffer,
	analyser,
	samplesBuffer,
	frequencyWidth,
	themeColor,
	backgroundColor
}) => {
	setBackgroundColor(backgroundColor);

	//change to next color in colorList from rothko whenever feldman short has been triggered
	//convert hex to HSL
	const hsla = hexToHSL(themeColor);
	const amplitude = Math.max(...frequencyBuffer);
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
	const normalizedFrequency = indexOfMax(frequencyBuffer) / analyser.fftSize;
	const colorAmplitude = Math.round(-amplitude) * filter;
	const colorL = Math.abs((colorAmplitude) * (80 / 255) + 100).toFixed(2) + '%';
	const colorS = Math.abs((colorAmplitude) * (10 / 255) + 100).toFixed(2) + '%';
	const color = `hsl(${hsla[0] + (Math.round(360 * normalizedFrequency) * 10)}, ${colorS}, ${colorL})`;
	const alpha = alphaAmplitude;

	//draw
	samplesBuffer.forEach((value, i) => {
		ctx.beginPath();
		// ctx.arc(x, y-50, amplitude, 0, 2 * Math.PI);
		ctx.moveTo(frequencyWidth * i / alpha, ((canvas.height - value) * alpha));
		ctx.quadraticCurveTo(frequencyWidth * i * alpha * normalizedFrequency, (canvas.height - value) * alpha, frequencyWidth * i * alpha * normalizedFrequency, (canvas.height - value) * alpha);
		ctx.strokeStyle = color;
		ctx.globalAlpha = alpha;
		ctx.stroke();
	});
};

export const sunRise = ({
	canvas,
	ctx,
	frequencyBuffer,
	analyser,
	samplesBuffer,
	frequencyWidth,
	centerX,
	centerY,
	themeColor,
	backgroundColor
}) => {
	setBackgroundColor(backgroundColor);

	//change to next color in colorList from rothko whenever feldman short has been triggered
	//convert hex to HSL
	const hsla = hexToHSL(themeColor);
	const amplitude = Math.max(...frequencyBuffer);
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
	const normalizedFrequency = indexOfMax(frequencyBuffer) / analyser.fftSize;
	const colorAmplitude = Math.round(-amplitude) * filter;
	const h = hsla[0] + (Math.round(360 * normalizedFrequency) * 10);
	const colorL = Math.abs((colorAmplitude) * (80 / 255) + 100).toFixed(2) + '%';
	const colorS = Math.abs((colorAmplitude) * (10 / 255) + 100).toFixed(2) + '%';
	const color = `hsl(${hsla[0] + (Math.round(360 * normalizedFrequency) * 10)}, ${colorS}, ${colorL})`;
	const alpha = alphaAmplitude;

	//draw
	samplesBuffer.forEach((value, i) => {
		ctx.beginPath();
		ctx.moveTo(frequencyWidth * i / alpha, (canvas.height - value) * h);
		ctx.lineTo(frequencyWidth * i * h, (canvas.height - value) / alpha);
		ctx.arc(centerX, centerY + 200, amplitude * alpha, 0, Math.PI, 1);
		ctx.strokeStyle = color;
		ctx.globalAlpha = alpha;
		ctx.stroke();
		ctx.beginPath();
	});
};

export const textile = ({
	canvas,
	ctx,
	frequencyBuffer,
	analyser,
	samplesBuffer,
	frequencyWidth,
	themeColor,
	backgroundColor
}) => {
	setBackgroundColor(backgroundColor);

	//change to next color in colorList from rothko whenever feldman short has been triggered
	//convert hex to HSL
	const hsla = hexToHSL(themeColor);
	const amplitude = Math.max(...frequencyBuffer);
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
	const normalizedFrequency = indexOfMax(frequencyBuffer) / analyser.fftSize;
	const colorAmplitude = Math.round(-amplitude) * filter;
	const h = hsla[0] + (Math.round(360 * normalizedFrequency) * 10);
	const colorL = Math.abs((colorAmplitude) * (80 / 255) + 100).toFixed(2) + '%';
	const colorS = Math.abs((colorAmplitude) * (10 / 255) + 100).toFixed(2) + '%';
	const color = `hsl(${hsla[0] + (Math.round(360 * normalizedFrequency) * 10)}, ${colorS}, ${colorL})`;
	const alpha = alphaAmplitude;

	//draw
	samplesBuffer.forEach((value, i) => {
		ctx.beginPath();
		ctx.strokeStyle = color;
		ctx.globalAlpha = alpha;
		ctx.moveTo(frequencyWidth * i * h, (canvas.height - value) * h);
		ctx.lineTo((frequencyWidth * i * h), -((canvas.height - value) / alpha) * 2);
		ctx.stroke();
	});
};

export const dot = ({
	ctx,
	frequencyBuffer,
	analyser,
	centerX,
	centerY,
	themeColor,
	backgroundColor
}) => {
	setBackgroundColor(backgroundColor);

	//change to next color in colorList from rothko whenever feldman short has been triggered
	//convert hex to HSL
	const hsla = hexToHSL(themeColor);
	const amplitude = Math.max(...frequencyBuffer);
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
	const normalizedFrequency = indexOfMax(frequencyBuffer) / analyser.fftSize;
	const colorAmplitude = Math.round(-amplitude) * filter;
	const colorL = Math.abs((colorAmplitude) * (80 / 255) + 100).toFixed(2) + '%';
	const colorS = Math.abs((colorAmplitude) * (10 / 255) + 100).toFixed(2) + '%';
	const color = `hsl(${hsla[0] + (Math.round(360 * normalizedFrequency) * 10)}, ${colorS}, ${colorL})`;
	const alpha = alphaAmplitude;
	// document.getElementById('introtext').style.setProperty('color', color);
	// document.getElementById('introtext').style.setProperty('opacity', alpha);
	//draw
	ctx.beginPath();
	ctx.arc(centerX, centerY, amplitude, 0, 2 * Math.PI);
	ctx.strokeStyle = color;
	ctx.globalAlpha = alpha;
	ctx.stroke();
};

export const fillDot = ({
	ctx,
	frequencyBuffer,
	analyser,
	centerX,
	centerY,
	themeColor,
	backgroundColor
}) => {
	setBackgroundColor(backgroundColor);

	//change to next color in colorList from rothko whenever feldman short has been triggered
	//convert hex to HSL
	const hsla = hexToHSL(themeColor);
	const amplitude = Math.max(...frequencyBuffer);
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
	if (amplitude <= 300) {
	}
	const normalizedFrequency = indexOfMax(frequencyBuffer) / analyser.fftSize;
	const colorAmplitude = Math.round(-amplitude) * filter;
	const colorL = Math.abs((colorAmplitude) * (80 / 255) + 100).toFixed(2) + '%';
	const colorS = Math.abs((colorAmplitude) * (10 / 255) + 100).toFixed(2) + '%';
	const h = hsla[0] + (Math.round(360 * normalizedFrequency) * 10);
	const color = `hsl(${hsla[0] + (Math.round(360 * normalizedFrequency) * 10)}, ${colorS}, ${colorL})`;
	const alpha = alphaAmplitude;

	//draw
	ctx.beginPath();
	const gradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, random(100 * alpha, 3000 * alpha) / alpha);
	gradient.addColorStop(0, `hsla(${h}, ${colorS}, ${colorL}, 0)`);
	gradient.addColorStop(1, `hsla(${h}, ${colorS}, ${colorL}, ${random(0, 1)})`);
	ctx.fillStyle = gradient;
	ctx.arc(centerX, centerY, amplitude * alpha, 0, 2 * Math.PI);
	ctx.fill();
	ctx.strokeStyle = color;
	ctx.globalAlpha = alpha;
	ctx.stroke();
};

export const fadingDot = ({ ctx, frequencyBuffer, analyser, centerX, centerY }) => {
	const amplitude = Math.max(...frequencyBuffer);
	const normalizedFrequency = indexOfMax(frequencyBuffer) / analyser.fftSize;
	const hue = Math.round(360 * normalizedFrequency) * 10;

	ctx.beginPath();
	const gradient = ctx.createRadialGradient(centerX, centerY, 1, centerX, centerY, amplitude);
	gradient.addColorStop(0, `hsla(${hue}, 100%, 50%, 1)`);
	gradient.addColorStop(1, `hsla(${hue}, 100%, 50%, 0)`);
	ctx.fillStyle = gradient;
	ctx.arc(centerX, centerY, amplitude, 0, 2 * Math.PI);
	ctx.fill();
};

export const vis1 = ({
	canvas,
	ctx,
	frequencyBuffer,
	analyser,
	themeColor,
	backgroundColor,
	mousePosition,
	centerX,
	centerY,
	cache
}) => {
	// Set initial values first
	if (cache === undefined) {
		cache = {};
		cache.speed = 100;
		cache.lastPositionX = centerX;
		cache.lastPositionY = centerY;
		cache.lastPositionFlippedY = centerY;
		cache.lastPositionFlippedX = centerX;
	}

	const centerRelationX = mousePosition.x - 1;
	const centerRelationY = mousePosition.y;

	const centerRelationFlippedX = 1 - mousePosition.x;
	const centerRelationFlippedY = 1 - mousePosition.y;

	const newPositionX = cache.lastPositionX + centerRelationX - window.innerWidth / 2;
	const newPositionY = cache.lastPositionY + centerRelationY - window.innerHeight / 2;

	const newPositionFlippedX = cache.lastPositionFlippedX + centerRelationFlippedX + window.innerWidth / 2;
	const newPositionFlippedY = cache.lastPositionFlippedY + centerRelationFlippedY + window.innerHeight / 2;

	cache.lastPositionX = newPositionX;
	cache.lastPositionY = newPositionY;
	cache.lastPositionFlippedY = newPositionFlippedX;
	cache.lastPositionFlippedX = newPositionFlippedY;

	//change background-color to rothko-color
	var center = document.querySelectorAll(".center");
	for (var i = 0; i < center.length; i++) {
		center[i].style.color = backgroundColor;
	}
	document.body.style.setProperty('background-color', backgroundColor);
	//convert hex to HSL
	const hsla = hexToHSL(themeColor);
	const amplitude = Math.max(...frequencyBuffer);
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

	const normalizedFrequency = indexOfMax(frequencyBuffer) / analyser.fftSize;
	const h = hsla[0] + (Math.round(360 * normalizedFrequency) * 10);
	const colorAmplitude = Math.round(-amplitude) * filter;
	const colorL = Math.abs((colorAmplitude) * (80 / 255) + 100).toFixed(2) + '%';
	const colorLShadow = Math.abs((colorAmplitude) * (80 / 255) + 100 * 0.80).toFixed(2) + '%';
	const colorS = Math.abs((colorAmplitude) * (10 / 255) + 100).toFixed(2) + '%';
	const color = `hsl(${hsla[0] + (Math.round(360 * normalizedFrequency) * 10)}, ${colorS}, ${colorL})`;
	const colorShadow = `hsl(${hsla[0] + (Math.round(360 * normalizedFrequency) * 10)}, ${colorS}, ${colorLShadow})`;

	const alpha = alphaAmplitude;

	ctx.fillStyle = color;
	ctx.strokeStyle = color;
	ctx.globalAlpha = alpha;
	ctx.lineCap = 'round';
	ctx.lineJoin = 'butt';
	ctx.strokeStyle = colorShadow;

	const multiplier = (canvas.width + canvas.height)/100
	ctx.lineWidth = ampScale * multiplier/4;
	for (var i = 0; i < 8; i++) {
		ctx.beginPath();
		ctx.moveTo(newPositionX, multiplier*0.75 + newPositionY - multiplier * i);
		ctx.bezierCurveTo(newPositionX + multiplier*5, multiplier*0.75 + newPositionY - multiplier * i, newPositionX, multiplier*0.75 + newPositionY - multiplier * i, newPositionX, multiplier*0.75 + newPositionY - multiplier * i);
		ctx.stroke();
	}
	for (var i = 0; i < 8; i++) {
		ctx.beginPath();
		ctx.moveTo(newPositionFlippedX, newPositionFlippedY - multiplier*0.75 + (multiplier * i));
		ctx.bezierCurveTo(newPositionFlippedX + multiplier*5, newPositionFlippedY - multiplier*0.75 + multiplier * i, newPositionFlippedX, newPositionFlippedY - multiplier*0.75 + multiplier * i, newPositionFlippedX, newPositionFlippedY - multiplier*0.75 + multiplier * i);
		ctx.stroke();
	}
};

export const carpet4P = ({
	canvas,
	ctx,
	frequencyBuffer,
	analyser,
	themeColor,
	backgroundColor,
	mousePosition,
	centerX,
	centerY,
	cache
}) => {
	// Set initial values first
	if (cache === undefined) {
		cache = {};
		cache.lastPositionX = centerX;
		cache.lastPositionY = centerY;
		cache.lastPositionFlippedY = centerY;
		cache.lastPositionFlippedX = centerX;
	}

	const centerRelationX = mousePosition.x - 1;
	const centerRelationY = mousePosition.y - 0.5;

	const centerRelationFlippedX = 1 - mousePosition.x;
	const centerRelationFlippedY = 0.5 - mousePosition.y;

	const newPositionX = cache.lastPositionX + centerRelationX - canvas.width / 2;
	const newPositionY = cache.lastPositionY + centerRelationY - canvas.height / 2;

	const newPositionFlippedX = cache.lastPositionFlippedX + centerRelationFlippedX + canvas.width / 2;
	const newPositionFlippedY = cache.lastPositionFlippedY + centerRelationFlippedY + canvas.height / 2;

	cache.lastPositionX = newPositionX;
	cache.lastPositionY = newPositionY;
	cache.lastPositionFlippedY = newPositionFlippedX;
	cache.lastPositionFlippedX = newPositionFlippedY;

	//change background-color to rothko-color
	var center = document.querySelectorAll(".center");
	for (var i = 0; i < center.length; i++) {
		center[i].style.color = backgroundColor;
	}
	document.body.style.setProperty('background-color', backgroundColor);
	//convert hex to HSL
	const hsla = hexToHSL(themeColor);
	const amplitude = Math.max(...frequencyBuffer);
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

	const normalizedFrequency = indexOfMax(frequencyBuffer) / analyser.fftSize;
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
	ctx.globalAlpha = alpha;
	ctx.lineCap = 'round';
	ctx.lineJoin = 'butt';

	const leftXCoordinates = [0, canvas.width]
	const rightXCoordinates = [canvas.width, 0]
	const ampMult = (canvas.width+canvas.height)/100;
	const multiplier = 5;
	ctx.lineWidth = ampScale * multiplier/2/2;
	for (var i = 0; i < canvas.width+canvas.height/multiplier; i++) {
		const scaleYtoX = (canvas.height-1)*(newPositionX-1)/canvas.width-1 + 1;
		const scaleYtoXFlipped = (canvas.height-1)*(newPositionFlippedX-1)/canvas.width-1 + 1;
		const newPosH = multiplier/2/2 + canvas.height - multiplier/2 * i;
		const newPosW = multiplier/2/2 + canvas.width - multiplier/2 * i;
		const newPos2H = canvas.height - multiplier/2 * i;
		const newPos2W = canvas.width - multiplier/2 * i;
		ctx.strokeStyle = colorShadow;
		ctx.beginPath();
		ctx.moveTo(newPositionX + ampMult * multiplier * ampScale, newPosH + ampMult * multiplier * ampScale);
		ctx.bezierCurveTo(newPositionX + canvas.width*2, newPosH, newPositionX, newPosH, newPositionX, newPosH);
		ctx.moveTo(newPosW + ampMult *multiplier * ampScale, scaleYtoX + ampMult * multiplier * ampScale);
		ctx.bezierCurveTo(newPosW, scaleYtoX + canvas.height*2, newPosW, scaleYtoX +ampMult * multiplier * ampScale, newPosW, scaleYtoX);
		ctx.stroke();
		ctx.strokeStyle = color;
		ctx.beginPath();
		ctx.moveTo(newPositionFlippedX - ampMult * multiplier * ampScale, newPos2H + ampMult * multiplier * ampScale );
		ctx.bezierCurveTo(newPositionFlippedX - canvas.width*2, newPos2H, newPositionFlippedX, newPos2H, newPositionFlippedX, newPos2H);
		ctx.moveTo(newPos2W + ampMult * multiplier * ampScale, newPositionFlippedX - ampMult * multiplier * ampScale);
		ctx.bezierCurveTo(newPos2W, scaleYtoXFlipped - canvas.height*2, newPos2W, scaleYtoXFlipped - ampMult * multiplier *ampScale, newPos2W, scaleYtoXFlipped);
		ctx.stroke();
	}
};

export const vis4 = ({
	canvas,
	ctx,
	frequencyBuffer,
	analyser,
	themeColor,
	backgroundColor,
	currentColorList,
	mousePosition,
	centerX,
	centerY,
	cache
}) => {
	// Set initial values first
	if (cache === undefined) {
		cache = {};
		cache.speed = 100;
		cache.lastPositionX = centerX;
		cache.lastPositionY = centerY;
		cache.lastPositionFlippedY = centerY;
		cache.lastPositionFlippedX = centerX;
	}

	const centerRelationX = mousePosition.x - 1;
	const centerRelationY = mousePosition.y;

	const centerRelationFlippedX = 1 - mousePosition.x;
	const centerRelationFlippedY = 1 - mousePosition.y;

	const newPositionX = cache.lastPositionX + centerRelationX - window.innerWidth / 2;
	const newPositionY = cache.lastPositionY + centerRelationY - window.innerHeight / 2;

	const newPositionFlippedX = cache.lastPositionFlippedX + centerRelationFlippedX + window.innerWidth / 2;
	const newPositionFlippedY = cache.lastPositionFlippedY + centerRelationFlippedY + window.innerHeight / 2;

	cache.lastPositionX = newPositionX;
	cache.lastPositionY = newPositionY;
	cache.lastPositionFlippedY = newPositionFlippedX;
	cache.lastPositionFlippedX = newPositionFlippedY;

	//change background-color to rothko-color
	var center = document.querySelectorAll(".center");
	for (var i = 0; i < center.length; i++) {
		center[i].style.color = backgroundColor;
	}
	document.body.style.setProperty('background-color', backgroundColor);
	//convert hex to HSL
	const colorArray = currentColorList['colorList'];
	console.log(colorArray.length);


	const amplitude = Math.max(...frequencyBuffer);
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
	const alpha = alphaAmplitude;
	ctx.globalAlpha = alpha;
	ctx.lineCap = 'round';
	ctx.lineJoin = 'butt';

	let hsla = '';
	let color = '';
	let colorShadow = '';

	for (var i = 0; i < colorArray.length; i++) {
		//define colors
		hsla = hexToHSL(colorArray[i]);
		const normalizedFrequency = indexOfMax(frequencyBuffer) / analyser.fftSize;
		const h = hsla[0] + (Math.round(360 * normalizedFrequency) * 10);
		const colorAmplitude = Math.round(-amplitude) * filter;
		const colorL = Math.abs((colorAmplitude) * (80 / 255) + 100).toFixed(2) + '%';
		const colorLShadow = Math.abs((colorAmplitude) * (80 / 255) + 100 * 0.80).toFixed(2) + '%';
		const colorS = Math.abs((colorAmplitude) * (10 / 255) + 100).toFixed(2) + '%';
		color = `hsl(${hsla[0] + (Math.round(360 * normalizedFrequency) * 10)}, ${colorS}, ${colorL})`;
		colorShadow = `hsl(${hsla[0] + (Math.round(360 * normalizedFrequency) * 10)}, ${colorS}, ${colorLShadow})`;
		ctx.strokeStyle = color;
		const number = i + 1;
		//draw
		const divider = 2;
		let stabilizer = centerY / 4;
		let roundedCorner = ampScale;
		const amount = canvas.height / (colorArray.length * 2) / divider;
		for (var s = 0; s < amount; s++) {
			ctx.lineWidth = ampScale * divider;
			const newPosH = (canvas.height / number) - (divider * s);
			if (colorArray.length == 2) {
				stabilizer = centerY / 3;
			}
			if (colorArray.length == 1) {
				stabilizer = 0;
			}
			if (colorArray.length == 2) {
				stabilizer = centerY / 4;
			}


			const newPosHalfH = (canvas.height / number / 2) - (divider * s) * ampScale + stabilizer;
			const newPosHalfH2 = (canvas.height / number / 2) + (divider * s) * ampScale + stabilizer;
			const newPosHalfHShadow = (canvas.height / number / 2) - (divider * s) + divider / 2 * ampScale + stabilizer;
			const newPosHalfH2Shadow = (canvas.height / number / 2) + (divider * s) + divider / 2 * ampScale + stabilizer;
			const randomNumber = random(0, 0.001);
			const randomNumber2 = random(0, 20);
			// const newPosH2 = canvas.height / i - 5 * s;
			ctx.strokeStyle = color;
			ctx.beginPath();
			ctx.moveTo(centerX + randomNumber2, newPosHalfH + randomNumber);
			ctx.bezierCurveTo(centerX + canvas.height * roundedCorner - random(0, 2), newPosHalfH, centerX, newPosHalfH, centerX, newPosHalfH);
			ctx.bezierCurveTo(centerX - canvas.height * roundedCorner + random(0, 2), newPosHalfH, centerX, newPosHalfH, centerX, newPosHalfH);
			ctx.moveTo(centerX + randomNumber2, newPosHalfH2 + randomNumber);
			ctx.bezierCurveTo(centerX + canvas.height * roundedCorner - random(0, 2), newPosHalfH2, centerX, newPosHalfH2, centerX, newPosHalfH2);
			ctx.bezierCurveTo(centerX - canvas.height * roundedCorner + random(0, 2), newPosHalfH2, centerX, newPosHalfH2, centerX, newPosHalfH2);
			ctx.strokeStyle = colorShadow;
			ctx.moveTo(centerX + randomNumber2, newPosHalfHShadow + randomNumber);
			ctx.bezierCurveTo(centerX + canvas.height * roundedCorner - random(0, 2), newPosHalfHShadow, centerX, newPosHalfHShadow, centerX, newPosHalfHShadow);
			ctx.bezierCurveTo(centerX - canvas.height * roundedCorner + random(0, 2), newPosHalfHShadow, centerX, newPosHalfHShadow, centerX, newPosHalfHShadow);
			ctx.moveTo(centerX + randomNumber2, newPosHalfH2Shadow + randomNumber);
			ctx.bezierCurveTo(centerX + canvas.height * roundedCorner - random(0, 2), newPosHalfH2Shadow, centerX, newPosHalfH2Shadow, centerX, newPosHalfH2Shadow);
			ctx.bezierCurveTo(centerX - canvas.height * roundedCorner + random(0, 2), newPosHalfH2Shadow, centerX, newPosHalfH2Shadow, centerX, newPosHalfH2Shadow);
			// ctx.moveTo(centerX, newPosH2 + mulitplier);
			// ctx.bezierCurveTo(centerX + 1000 * ampScale, newPosH2 - mulitplier, centerX, newPosH2 - mulitplier, centerX, newPosH2 - mulitplier);
			// ctx.bezierCurveTo(centerX - 1000 * ampScale, newPosH2 - mulitplier, centerX, newPosH2 - mulitplier, centerX, newPosH2 - mulitplier);
			// ctx.moveTo(centerX, newPosH2);
			// ctx.strokeStyle = colorShadow;
			// ctx.bezierCurveTo(centerX - 1000, newPosH2, centerX, newPosH2, centerX, newPosH2);
			ctx.stroke();
		}
	}
};

export const vis3 = ({
	canvas,
	ctx,
	frequencyBuffer,
	analyser,
	themeColor,
	backgroundColor,
	mousePosition,
	centerX,
	centerY,
	cache
}) => {
	// Set initial values first
	if (cache === undefined) {
		cache = {};
		cache.lastPositionX = centerX;
		cache.lastPositionY = centerY;
		cache.lastPositionFlippedY = centerY;
		cache.lastPositionFlippedX = centerX;
	}

	const centerRelationX = mousePosition.x - 1;
	const centerRelationY = mousePosition.y;

	const centerRelationFlippedX = 1 - mousePosition.x;
	const centerRelationFlippedY = 1 - mousePosition.y;

	const newPositionX = cache.lastPositionX + centerRelationX - window.innerWidth / 2;
	const newPositionY = cache.lastPositionY + centerRelationY - window.innerHeight / 2;

	const newPositionFlippedX = cache.lastPositionFlippedX + centerRelationFlippedX + window.innerWidth / 2;
	const newPositionFlippedY = cache.lastPositionFlippedY + centerRelationFlippedY + window.innerHeight / 2;

	cache.lastPositionX = newPositionX;
	cache.lastPositionY = newPositionY;
	cache.lastPositionFlippedY = newPositionFlippedX;
	cache.lastPositionFlippedX = newPositionFlippedY;

	//change background-color to rothko-color
	var center = document.querySelectorAll(".center");
	for (var i = 0; i < center.length; i++) {
		center[i].style.color = backgroundColor;
	}
	document.body.style.setProperty('background-color', backgroundColor);
	//convert hex to HSL
	const hsla = hexToHSL(themeColor);
	const amplitude = Math.max(...frequencyBuffer);
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

	const normalizedFrequency = indexOfMax(frequencyBuffer) / analyser.fftSize;
	const h = hsla[0] + (Math.round(360 * normalizedFrequency) * 10);
	const colorAmplitude = Math.round(-amplitude) * filter;
	const colorL = Math.abs((colorAmplitude) * (80 / 255) + 100).toFixed(2) + '%';
	const colorLShadow = Math.abs((colorAmplitude) * (80 / 255) + 100 * 0.8).toFixed(2) + '%';
	const colorLBackground = Math.abs((colorAmplitude) * (80 / 255) + 100 * 0.6).toFixed(2) + '%';
	const colorLBackgroundShadow = Math.abs((colorAmplitude) * (80 / 255) + 100 * 0.5).toFixed(2) + '%';
	const colorS = Math.abs((colorAmplitude) * (10 / 255) + 100).toFixed(2) + '%';
	const color = `hsl(${hsla[0] + (Math.round(360 * normalizedFrequency) * 10)}, ${colorS}, ${colorL})`;
	const colorShadow = `hsl(${hsla[0] + (Math.round(360 * normalizedFrequency) * 10)}, ${colorS}, ${colorLShadow})`;
	const colorBackground = `hsl(${hsla[0] + (Math.round(360 * normalizedFrequency) * 10)}, ${colorS}, ${colorLBackground})`;
	const colorBackgroundShadow = `hsl(${hsla[0] + (Math.round(360 * normalizedFrequency) * 10)}, ${colorS}, ${colorLBackgroundShadow})`;
	const colorBackground2 = `hsl(${hsla[0] + (Math.round(360 * normalizedFrequency) * 10)}, ${colorS}, ${colorLBackground})`;
	const colorBackgroundShadow2 = `hsl(${hsla[0] + (Math.round(360 * normalizedFrequency) * 10)}, ${colorS}, ${colorLBackgroundShadow})`;

	const alpha = alphaAmplitude;

	ctx.fillStyle = color;
	ctx.globalAlpha = alpha;
	ctx.lineCap = 'round';
	ctx.lineJoin = 'butt';
	const multiplier = (canvas.height+canvas.width)/100;
	const xPostLength = multiplier*15;
	// for (var i = 0; i < multiplier*2; i++) {
	// 	const yPos1 = newPositionY + multiplier*0.0625 + multiplier*0.125 * i;
	// 	ctx.lineWidth = ampScale * multiplier*0.0625;
	// 	ctx.strokeStyle = colorBackground2;
	// 	ctx.beginPath();
	// 	ctx.moveTo(newPositionX, yPos1);
	// 	ctx.bezierCurveTo(newPositionX + xPostLength, yPos1 * ampScale, newPositionX, yPos1 * ampScale, newPositionX, yPos1);
	// 	ctx.stroke();
	// 	const yPos2 = newPositionY - multiplier*0.125 * i;
	// 	ctx.strokeStyle = colorBackgroundShadow2;
	// 	ctx.beginPath();
	// 	ctx.moveTo(newPositionFlippedX, yPos2);
	// 	ctx.bezierCurveTo(newPositionFlippedX - xPostLength, yPos2 * ampScale, newPositionFlippedX, yPos2 * ampScale, newPositionFlippedX, yPos2);
	// 	ctx.stroke();
	// }
	for (var i = 0; i < multiplier; i++) {
		ctx.lineWidth = ampScale * multiplier*0.125;
		ctx.strokeStyle = colorBackground;
		ctx.beginPath();
		const offset = xPostLength/4.5;
		ctx.moveTo((newPositionX-offset)*i, newPositionY);
		ctx.bezierCurveTo((newPositionX-offset)*i + xPostLength, newPositionY, (newPositionX-offset)*i, newPositionY, (newPositionX-offset)*i, newPositionY);
		ctx.stroke();
		// const yPos2 = newPositionY + multiplier*0.25 + multiplier*0.125 - multiplier*0.25 * i;
		// ctx.strokeStyle = colorBackgroundShadow;
		// ctx.beginPath();
		// ctx.moveTo(newPositionFlippedX, yPos2);
		// ctx.bezierCurveTo(newPositionFlippedX - xPostLength, yPos2, newPositionFlippedX, yPos2, newPositionFlippedX, yPos2);
		// ctx.stroke();
	}
	// for (var i = 0; i < multiplier/2; i++) {
	// 	const yPos1 = newPositionY + multiplier*0.25 - multiplier/2 * i;
	// 	ctx.lineWidth = ampScale * multiplier*0.125;
	// 	ctx.strokeStyle = color;
	// 	ctx.beginPath();
	// 	ctx.moveTo(newPositionX, yPos1);
	// 	ctx.bezierCurveTo(newPositionX + xPostLength, yPos1, newPositionX, yPos1, newPositionX, yPos1);
	// 	ctx.stroke();
	// 	const yPos2 = newPositionY + multiplier/2 * i;
	// 	ctx.strokeStyle = colorShadow;
	// 	ctx.beginPath();
	// 	ctx.moveTo(newPositionFlippedX, yPos2);
	// 	ctx.bezierCurveTo(newPositionFlippedX - xPostLength, yPos2, newPositionFlippedX, yPos2, newPositionFlippedX, yPos2);
	// 	ctx.stroke();
	// }


};

export const carpet2P = ({
	canvas,
	ctx,
	frequencyBuffer,
	analyser,
	themeColor,
	backgroundColor,
	mousePosition,
	centerX,
	centerY,
	cache
}) => {
	// Set initial values first
	if (cache === undefined) {
		cache = {};
		cache.lastPositionX = centerX;
		cache.lastPositionY = centerY;
		cache.lastPositionFlippedY = centerY;
		cache.lastPositionFlippedX = centerX;
	}

	const mouseX = mousePosition.x / window.innerWidth;
	const mouseY = mousePosition.y / window.innerHeight;

	const centerRelationX = mousePosition.x - 1;
	const centerRelationY = mousePosition.y;

	const centerRelationFlippedX = 1 - mousePosition.x;
	const centerRelationFlippedY = 1 - mousePosition.y;

	const newPositionX = cache.lastPositionX + centerRelationX - window.innerWidth / 2;
	const newPositionY = cache.lastPositionY + centerRelationY - window.innerHeight / 2;

	const newPositionFlippedX = cache.lastPositionFlippedX + centerRelationFlippedX + window.innerWidth / 2;
	const newPositionFlippedY = cache.lastPositionFlippedY + centerRelationFlippedY + window.innerHeight / 2;

	cache.lastPositionX = newPositionX;
	cache.lastPositionY = newPositionY;
	cache.lastPositionFlippedY = newPositionFlippedX;
	cache.lastPositionFlippedX = newPositionFlippedY;

	//change background-color to rothko-color
	var center = document.querySelectorAll(".center");
	for (var i = 0; i < center.length; i++) {
		center[i].style.color = backgroundColor;
	}
	document.body.style.setProperty('background-color', backgroundColor);
	//convert hex to HSL
	const hsla = hexToHSL(themeColor);
	const amplitude = Math.max(...frequencyBuffer);
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

	const normalizedFrequency = indexOfMax(frequencyBuffer) / analyser.fftSize;
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
	ctx.globalAlpha = alpha;
	ctx.lineCap = 'round';
	ctx.lineJoin = 'butt';
	ctx.lineWidth = ampScale * 1;
	const ampMult = (canvas.width+canvas.height)/100;
	//try rotating maybe?
	console.log('canvas.width ' + canvas.width + ' canvas height ' + canvas.height)
	for (var i = 0; i < canvas.width; i++) {
		const newPosH = 1.25 + canvas.height - 2.5 * i;
		const newPosW = 1.25 + canvas.width - 2.5 * i;
		const newPos2H = canvas.height - 2.5 * i;
		const newPos2W = canvas.width - 2.5 * i;
		ctx.strokeStyle = colorShadow;
		ctx.beginPath();
		ctx.moveTo(newPosW + ampMult * ampScale, newPositionY + ampMult * ampScale);
		ctx.bezierCurveTo(newPosW, newPositionY + canvas.height*2, newPosW, newPositionY, newPosW, newPositionY);
		ctx.stroke();
		ctx.strokeStyle = color;
		ctx.beginPath();
		ctx.moveTo(newPos2W + ampMult * ampScale, newPositionFlippedY - ampMult * ampScale);
		ctx.bezierCurveTo(newPos2W, newPositionFlippedY - canvas.height*2, newPos2W, newPositionFlippedY, newPos2W, newPositionFlippedY);
		ctx.stroke();
	}
};

export const carpetCentre = ({
	canvas,
	ctx,
	frequencyBuffer,
	analyser,
	themeColor,
	backgroundColor,
	mousePosition,
	centerX,
	centerY,
	cache
}) => {
	// Set initial values first
	if (cache === undefined) {
		cache = {};
		cache.lastPositionX = centerX;
		cache.lastPositionY = centerY;
		cache.lastPositionFlippedY = centerY;
		cache.lastPositionFlippedX = centerX;
	}

	const mouseX = mousePosition.x / window.innerWidth;
	const mouseY = mousePosition.y / window.innerHeight;

	const centerRelationX = mousePosition.x - 1;
	const centerRelationY = mousePosition.y;

	const centerRelationFlippedX = 1 - mousePosition.x;
	const centerRelationFlippedY = 1 - mousePosition.y;

	const newPositionX = cache.lastPositionX + centerRelationX - window.innerWidth / 2;
	const newPositionY = cache.lastPositionY + centerRelationY - window.innerHeight / 2;

	const newPositionFlippedX = cache.lastPositionFlippedX + centerRelationFlippedX + window.innerWidth / 2;
	const newPositionFlippedY = cache.lastPositionFlippedY + centerRelationFlippedY + window.innerHeight / 2;

	cache.lastPositionX = newPositionX;
	cache.lastPositionY = newPositionY;
	cache.lastPositionFlippedY = newPositionFlippedX;
	cache.lastPositionFlippedX = newPositionFlippedY;

	//change background-color to rothko-color
	var center = document.querySelectorAll(".center");
	for (var i = 0; i < center.length; i++) {
		center[i].style.color = backgroundColor;
	}
	document.body.style.setProperty('background-color', backgroundColor);
	//convert hex to HSL
	const hsla = hexToHSL(themeColor);
	const amplitude = Math.max(...frequencyBuffer);
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

	const normalizedFrequency = indexOfMax(frequencyBuffer) / analyser.fftSize;
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
	ctx.globalAlpha = alpha;
	ctx.lineCap = 'round';
	ctx.lineJoin = 'butt';

	const leftXCoordinates = [0, canvas.width]
	const rightXCoordinates = [canvas.width, 0]
	//try rotating maybe?
	const averageToCentre = ((newPositionY / centerY) + (newPositionX / centerX)) / 2;
	let multiplier = averageToCentre;
	if (averageToCentre > 1) {
		multiplier = 1 / averageToCentre;
	}
	// console.log(averageToCentre);
	const divider = 5 / multiplier;
	ctx.lineWidth = ampScale * multiplier;
	console.log(divider);
	for (var i = 0; i < canvas.width / divider; i++) {
		ctx.strokeStyle = color;
		ctx.beginPath();
		ctx.moveTo(0 + divider * i, 0);
		ctx.bezierCurveTo(centerX, centerY, centerX, centerY, centerX, centerY);
		ctx.moveTo(0, 0 + divider * i);
		ctx.bezierCurveTo(centerX, centerY, centerX, centerY, centerX, centerY);
		ctx.strokeStyle = colorShadow;
		ctx.moveTo(canvas.width, canvas.height - divider * i);
		ctx.bezierCurveTo(centerX, centerY, centerX, centerY, centerX, centerY);
		ctx.moveTo(canvas.width - divider * i, canvas.height);
		ctx.bezierCurveTo(centerX, centerY, centerX, centerY, centerX, centerY);
		ctx.stroke();
		// ctx.strokeStyle = color;
		// ctx.beginPath();
		// ctx.moveTo(newPos2W - 5 * ampScale, newPositionFlippedY - 5 * ampScale);
		// ctx.bezierCurveTo(newPos2W, newPositionFlippedY - 1000, newPos2W, newPositionFlippedY, newPos2W, newPositionFlippedY);
		// ctx.stroke();
	}
};

export const carpetCentre2 = ({
	canvas,
	ctx,
	frequencyBuffer,
	analyser,
	themeColor,
	backgroundColor,
	mousePosition,
	centerX,
	centerY,
	cache
}) => {
	// Set initial values first
	if (cache === undefined) {
		cache = {};
		cache.lastPositionX = centerX;
		cache.lastPositionY = centerY;
		cache.lastPositionFlippedY = centerY;
		cache.lastPositionFlippedX = centerX;
	}

	const mouseX = mousePosition.x / window.innerWidth;
	const mouseY = mousePosition.y / window.innerHeight;

	const centerRelationX = mousePosition.x - 1;
	const centerRelationY = mousePosition.y;

	const centerRelationFlippedX = 1 - mousePosition.x;
	const centerRelationFlippedY = 1 - mousePosition.y;

	const newPositionX = cache.lastPositionX + centerRelationX - window.innerWidth / 2;
	const newPositionY = cache.lastPositionY + centerRelationY - window.innerHeight / 2;

	const newPositionFlippedX = cache.lastPositionFlippedX + centerRelationFlippedX + window.innerWidth / 2;
	const newPositionFlippedY = cache.lastPositionFlippedY + centerRelationFlippedY + window.innerHeight / 2;

	cache.lastPositionX = newPositionX;
	cache.lastPositionY = newPositionY;
	cache.lastPositionFlippedY = newPositionFlippedX;
	cache.lastPositionFlippedX = newPositionFlippedY;

	//change background-color to rothko-color
	var center = document.querySelectorAll(".center");
	for (var i = 0; i < center.length; i++) {
		center[i].style.color = backgroundColor;
	}
	document.body.style.setProperty('background-color', backgroundColor);
	//convert hex to HSL
	const hsla = hexToHSL(themeColor);
	const amplitude = Math.max(...frequencyBuffer);
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

	const normalizedFrequency = indexOfMax(frequencyBuffer) / analyser.fftSize;
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
	ctx.globalAlpha = alpha;
	ctx.lineCap = 'round';
	ctx.lineJoin = 'butt';

	const leftXCoordinates = [0, canvas.width]
	const rightXCoordinates = [canvas.width, 0]
	//try rotating maybe?
	const averageToCentre = newPositionY / centerY;
	let multiplier = averageToCentre;
	if (averageToCentre > 1) {
		multiplier = 2 - averageToCentre;
	}
	let oppositeMultiplier = (1 - multiplier) + 1;
	if (multiplier >= 1) {
		oppositeMultiplier = 2 - multiplier;
	}
	if(multiplier < 1){
		oppositeMultiplier = 1 - multiplier + 1
	}
	const divider = 10;
	ctx.lineWidth = ampScale*divider/5;
	const ampMult = (canvas.width+canvas.height)/100;
	const modifier = ampMult * ampScale;

	for (var i = 0; i < canvas.width / divider+1; i++) {
		let toCenterX = (centerX * multiplier)+divider*i-divider*i*multiplier;
		// let toCenterX = (centerX * multiplier)-(divider*i+divider/2)+((divider*i+divider/2)*oppositeMultiplier);

		ctx.strokeStyle = color;
		ctx.beginPath();
		ctx.moveTo(0 + (divider * i), 0);
		ctx.bezierCurveTo(toCenterX-modifier, centerY * multiplier+modifier,toCenterX+modifier, centerY * multiplier-modifier,toCenterX, centerY * multiplier);
		ctx.moveTo(0 + (divider * i), canvas.height);
		ctx.bezierCurveTo(toCenterX+modifier, centerY * oppositeMultiplier+modifier,toCenterX-modifier, centerY * oppositeMultiplier-modifier,toCenterX, centerY * oppositeMultiplier);
		ctx.stroke();
		// omvendt vei
		if(i!=canvas.width/divider){
		let toCenterXFlip = (centerX * multiplier)-(divider*i+divider/2)+((divider*i+divider/2)*oppositeMultiplier);
		// let toCenterXFlip = (centerX * multiplier)+divider*i-divider*i*multiplier;
		ctx.strokeStyle = colorShadow;
		ctx.beginPath();
		ctx.moveTo(centerX, centerY);
		ctx.bezierCurveTo(toCenterXFlip-modifier, centerY*multiplier+modifier,toCenterXFlip+modifier, centerY*multiplier-modifier,toCenterXFlip, centerY*multiplier);
		ctx.moveTo(centerX, centerY);
		ctx.bezierCurveTo(toCenterXFlip+modifier, centerY*oppositeMultiplier+modifier,toCenterXFlip-modifier, centerY*oppositeMultiplier-modifier,toCenterXFlip, centerY*oppositeMultiplier);
		ctx.stroke();
		}
	}
	for (var i = 0; i < canvas.height / divider+1; i++) {
		ctx.strokeStyle = color;
		let toCenterY = (centerY * multiplier) + (divider * i) - divider*i*multiplier;
		// let toCenterY = (centerY * multiplier)-(divider*i+divider/2)+((divider*i+divider/2)*oppositeMultiplier);

		ctx.moveTo(0, (i * divider));
		ctx.bezierCurveTo(centerX * multiplier+modifier, toCenterY+modifier,centerX * multiplier-modifier, toCenterY-modifier,centerX * multiplier, toCenterY);
		ctx.stroke();
		ctx.moveTo(canvas.width, (i * divider));
		ctx.bezierCurveTo(centerX * oppositeMultiplier-modifier, toCenterY+modifier,centerX * oppositeMultiplier+modifier, toCenterY-modifier,centerX * oppositeMultiplier, toCenterY);
		ctx.stroke();
		if(i!=canvas.height/divider){
			let toCenterYFlip = (centerY * multiplier)-(divider*i+divider/2)+((divider*i+divider/2)*oppositeMultiplier);
			// let toCenterYFlip = (centerY * multiplier) + (divider * i) - divider*i*multiplier;

			ctx.strokeStyle = colorShadow;
			ctx.beginPath();
			ctx.moveTo(centerX, centerY);
			ctx.bezierCurveTo(centerX * multiplier+modifier, toCenterYFlip+modifier,centerX * multiplier-modifier, toCenterYFlip-modifier,centerX * multiplier, toCenterYFlip);
			ctx.moveTo(centerX, centerY);
			ctx.bezierCurveTo(centerX * oppositeMultiplier-modifier, toCenterYFlip+modifier,centerX * oppositeMultiplier+modifier, toCenterYFlip-modifier,centerX * oppositeMultiplier, toCenterYFlip);
			ctx.stroke();
			}
		}
}

export const carpetCentre3 = ({
	canvas,
	ctx,
	frequencyBuffer,
	analyser,
	themeColor,
	backgroundColor,
	mousePosition,
	centerX,
	centerY,
	cache
}) => {
	// Set initial values first
	if (cache === undefined) {
		cache = {};
		cache.lastPositionX = centerX;
		cache.lastPositionY = centerY;
		cache.lastPositionFlippedY = centerY;
		cache.lastPositionFlippedX = centerX;
	}

	const centerRelationX = mousePosition.x - 1;
	const centerRelationY = mousePosition.y;

	const centerRelationFlippedX = 1 - mousePosition.x;
	const centerRelationFlippedY = 1 - mousePosition.y;

	const newPositionX = cache.lastPositionX + centerRelationX - window.innerWidth / 2;
	const newPositionY = cache.lastPositionY + centerRelationY - window.innerHeight / 2;

	const newPositionFlippedX = cache.lastPositionFlippedX + centerRelationFlippedX + window.innerWidth / 2;
	const newPositionFlippedY = cache.lastPositionFlippedY + centerRelationFlippedY + window.innerHeight / 2;

	cache.lastPositionX = newPositionX;
	cache.lastPositionY = newPositionY;
	cache.lastPositionFlippedY = newPositionFlippedX;
	cache.lastPositionFlippedX = newPositionFlippedY;

	//change background-color to rothko-color
	var center = document.querySelectorAll(".center");
	for (var i = 0; i < center.length; i++) {
		center[i].style.color = backgroundColor;
	}
	document.body.style.setProperty('background-color', backgroundColor);
	//convert hex to HSL
	const hsla = hexToHSL(themeColor);
	const amplitude = Math.max(...frequencyBuffer);
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

	const normalizedFrequency = indexOfMax(frequencyBuffer) / analyser.fftSize;
	const h = hsla[0] + (Math.round(360 * normalizedFrequency) * 10);
	const colorAmplitude = Math.round(-amplitude) * filter;
	const colorL = Math.abs((colorAmplitude) * (80 / 255) + 100).toFixed(2) + '%';
	const colorLShadow = Math.abs((colorAmplitude) * (80 / 255) + 100 * 0.80).toFixed(2) + '%';
	const colorS = Math.abs((colorAmplitude) * (10 / 255) + 100).toFixed(2) + '%';
	const color = `hsl(${hsla[0] + (Math.round(360 * normalizedFrequency) * 10)}, ${colorS}, ${colorL})`;
	const colorShadow = `hsl(${hsla[0] + (Math.round(360 * normalizedFrequency) * 10)}, ${colorS}, ${colorLShadow})`;

	const alpha = alphaAmplitude;

	ctx.globalAlpha = alpha;
	ctx.lineCap = 'round';
	ctx.lineJoin = 'butt';

	//try rotating maybe?
	const averageToCentre = newPositionY / centerY;
	let multiplier = averageToCentre;
	if (averageToCentre > 1) {
		multiplier = 2 - averageToCentre;
	}
	let oppositeMultiplier = (1 - multiplier) + 1;
	if (multiplier >= 1) {
		oppositeMultiplier = 2 - multiplier;
	}
	if(multiplier < 1){
		oppositeMultiplier = 1 - multiplier + 1
	}
	const number = Math.floor(100*multiplier);
	let divider = number;
	console.log(number);
	if(number < 2){
		divider = 2;
	}
	ctx.lineWidth = ampScale*divider/100;
	const ampMult = (canvas.width+canvas.height)/100;
	const modifier = ampMult * ampScale;

	for (var i = 0; i < canvas.width / divider+1; i++) {
		let toCenterX = (centerX * multiplier)+divider*i-divider*i*multiplier;
		// let toCenterX = (centerX * multiplier)-(divider*i+divider/2)+((divider*i+divider/2)*oppositeMultiplier);

		ctx.strokeStyle = color;
		ctx.beginPath();
		ctx.moveTo(0 + (divider * i), 0);
		ctx.bezierCurveTo(toCenterX, centerY * multiplier+modifier,toCenterX, centerY * multiplier-modifier,toCenterX, centerY * multiplier);
		ctx.moveTo(0 + (divider * i), canvas.height);
		ctx.bezierCurveTo(toCenterX, centerY * oppositeMultiplier+modifier,toCenterX, centerY * oppositeMultiplier-modifier,toCenterX, centerY * oppositeMultiplier);
		ctx.stroke();
		// omvendt vei
		if(i!=canvas.width/divider){
		let toCenterXFlip = (centerX * multiplier)-(divider*i+divider/2)+((divider*i+divider/2)*oppositeMultiplier);
		// let toCenterXFlip = (centerX * multiplier)+divider*i-divider*i*multiplier;
		ctx.strokeStyle = colorShadow;
		ctx.beginPath();
		ctx.moveTo(centerX, centerY);
		ctx.bezierCurveTo(toCenterXFlip, centerY*multiplier+modifier,toCenterXFlip, centerY*multiplier-modifier,toCenterXFlip, centerY*multiplier);
		ctx.moveTo(centerX, centerY);
		ctx.bezierCurveTo(toCenterXFlip, centerY*oppositeMultiplier+modifier,toCenterXFlip, centerY*oppositeMultiplier-modifier,toCenterXFlip, centerY*oppositeMultiplier);
		ctx.stroke();
		}
	}
	for (var i = 0; i < canvas.height / divider+1; i++) {
		ctx.strokeStyle = color;
		let toCenterY = (centerY * multiplier) + (divider * i) - divider*i*multiplier;
		// let toCenterY = (centerY * multiplier)-(divider*i+divider/2)+((divider*i+divider/2)*oppositeMultiplier);

		ctx.moveTo(0, (i * divider));
		ctx.bezierCurveTo(centerX * multiplier+modifier, toCenterY+modifier,centerX * multiplier-modifier, toCenterY-modifier,centerX * multiplier, toCenterY);
		ctx.stroke();
		ctx.moveTo(canvas.width, (i * divider));
		ctx.bezierCurveTo(centerX * oppositeMultiplier-modifier, toCenterY+modifier,centerX * oppositeMultiplier+modifier, toCenterY-modifier,centerX * oppositeMultiplier, toCenterY);
		ctx.stroke();
		if(i!=canvas.height/divider){
			let toCenterYFlip = (centerY * multiplier)-(divider*i+divider/2)+((divider*i+divider/2)*oppositeMultiplier);
			// let toCenterYFlip = (centerY * multiplier) + (divider * i) - divider*i*multiplier;

			ctx.strokeStyle = colorShadow;
			ctx.beginPath();
			ctx.moveTo(centerX, centerY);
			ctx.bezierCurveTo(centerX * multiplier+modifier, toCenterYFlip+modifier,centerX * multiplier-modifier, toCenterYFlip-modifier,centerX * multiplier, toCenterYFlip);
			ctx.moveTo(centerX, centerY);
			ctx.bezierCurveTo(centerX * oppositeMultiplier-modifier, toCenterYFlip+modifier,centerX * oppositeMultiplier+modifier, toCenterYFlip-modifier,centerX * oppositeMultiplier, toCenterYFlip);
			ctx.stroke();
			}
		}
}

export const flowerCircle = ({
	canvas,
	ctx,
	frequencyBuffer,
	analyser,
	themeColor,
	backgroundColor,
	mousePosition,
	centerX,
	centerY,
	cache
}) => {
	// Set initial values first
	if (cache === undefined) {
		cache = {};
		cache.speed = 100;
		cache.lastPositionX = centerX;
		cache.lastPositionY = centerY;
		cache.lastPositionFlippedY = centerY;
		cache.lastPositionFlippedX = centerX;
	}

	const centerRelationX = mousePosition.x - 1;
	const centerRelationY = mousePosition.y;

	const centerRelationFlippedX = 1 - mousePosition.x;
	const centerRelationFlippedY = 1 - mousePosition.y;

	const newPositionX = cache.lastPositionX + centerRelationX - window.innerWidth / 2;
	const newPositionY = cache.lastPositionY + centerRelationY - window.innerHeight / 2;

	const newPositionFlippedX = cache.lastPositionFlippedX + centerRelationFlippedX + window.innerWidth / 2;
	const newPositionFlippedY = cache.lastPositionFlippedY + centerRelationFlippedY + window.innerHeight / 2;

	cache.lastPositionX = newPositionX;
	cache.lastPositionY = newPositionY;
	cache.lastPositionFlippedY = newPositionFlippedX;
	cache.lastPositionFlippedX = newPositionFlippedY;
	//change background-color to rothko-color
	var center = document.querySelectorAll(".center");
	for (var i = 0; i < center.length; i++) {
		center[i].style.color = backgroundColor;
	}
	document.body.style.setProperty('background-color', backgroundColor);
	//convert hex to HSL
	const hsla = hexToHSL(themeColor);
	const amplitude = Math.max(...frequencyBuffer);
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

	const normalizedFrequency = indexOfMax(frequencyBuffer) / analyser.fftSize;
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
	ctx.globalAlpha = alpha;
	ctx.lineCap = 'round';
	ctx.lineJoin = 'butt';

	const averageToCentre = newPositionY / centerY;
	let multiplier = averageToCentre;
	if (averageToCentre > 1) {
		multiplier = 2 - averageToCentre;
	}
	let oppositeMultiplier = (1 - multiplier) + 1;
	if (multiplier >= 1) {
		oppositeMultiplier = 2 - multiplier;
	}
	if(multiplier < 1){
		oppositeMultiplier = 1 - multiplier + 1
	}

	const closeToCentre = multiplier;
	ctx.strokeStyle = color;
	const len = ampScale * closeToCentre;
	let leafCount = 100 * ampScale / (closeToCentre);
	const newMouseX = newPositionX * ampScale;
	const newMouseY = newPositionY * ampScale;


	for (var i = leafCount; i > 0; i--) {
		ctx.beginPath();
		ctx.translate(centerX, centerY);
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
		ctx.translate(-centerX, -centerY);
		ctx.stroke();
	}
};

export const vis6 = ({
	canvas,
	ctx,
	frequencyBuffer,
	analyser,
	themeColor,
	backgroundColor,
	mousePosition,
	centerX,
	centerY,
	cache
}) => {
	// Set initial values first
	if (cache === undefined) {
		cache = {};
		cache.speed = 100;
		cache.lastPositionX = centerX;
		cache.lastPositionY = centerY;
		cache.lastPositionFlippedY = centerY;
		cache.lastPositionFlippedX = centerX;
	}

	const mouseX = mousePosition.x / canvas.width;
	const mouseY = mousePosition.y / canvas.width;

	const centerRelationX = mouseX - 1;
	const centerRelationY = mouseY - 0.5;

	const centerRelationFlippedX = 1 - mouseX;
	const centerRelationFlippedY = 0.5 - mouseY;

	const newPositionX = cache.lastPositionX + centerRelationX * cache.speed;
	const newPositionY = cache.lastPositionY + centerRelationY * cache.speed;

	const newPositionFlippedX = cache.lastPositionFlippedX + centerRelationFlippedX * cache.speed;
	const newPositionFlippedY = cache.lastPositionFlippedY + centerRelationFlippedY * cache.speed;

	cache.lastPositionX = newPositionX;
	cache.lastPositionY = newPositionY;
	cache.lastPositionFlippedY = newPositionFlippedX;
	cache.lastPositionFlippedX = newPositionFlippedY;

	//change background-color to rothko-color
	var center = document.querySelectorAll(".center");
	for (var i = 0; i < center.length; i++) {
		center[i].style.color = backgroundColor;
	}
	document.body.style.setProperty('background-color', backgroundColor);
	//convert hex to HSL
	const hsla = hexToHSL(themeColor);
	const amplitude = Math.max(...frequencyBuffer);
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

	const normalizedFrequency = indexOfMax(frequencyBuffer) / analyser.fftSize;
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
	ctx.globalAlpha = alpha;
	ctx.lineCap = 'round';
	ctx.lineJoin = 'butt';
	ctx.lineWidth = ampScale * 1;

	const leftXCoordinates = [0, canvas.width]
	const rightXCoordinates = [canvas.width, 0]
	//try rotating maybe?
	for (var i = 0; i < 50; i++) {
		const newPosH = 2.5 + canvas.height - 5 * i;
		const newPosW = 1.25 + canvas.width - 2.5 * i;
		const newPos2H = canvas.height - 5 * i;
		const newPos2W = canvas.width - 2.5 * i;
		ctx.strokeStyle = colorShadow;
		ctx.beginPath();
		ctx.moveTo(newPositionX + 5 * ampScale, newPosH + 5 * ampScale - newPositionX);
		ctx.bezierCurveTo(newPositionX + 500, newPosH + 250 - newPositionX, newPositionX, newPosH - newPositionX, newPositionX, newPosH - newPositionX);
		ctx.stroke();
		ctx.strokeStyle = color;
		ctx.beginPath();
		ctx.moveTo(newPositionFlippedX + 5 * ampScale, newPos2H + 5 * ampScale - newPositionFlippedX);
		ctx.bezierCurveTo(newPositionFlippedX + 500, newPos2H + 250 - newPositionFlippedX, newPositionFlippedX, newPos2H - newPositionFlippedX, newPositionFlippedX, newPos2H - newPositionFlippedX);
		ctx.stroke();
	}
};