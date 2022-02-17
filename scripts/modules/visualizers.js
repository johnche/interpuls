import { indexOfMax, hexToHSL, random } from "./utils.js";

const setBackgroundColor = color => {
	const center = document.querySelectorAll(".center");
	center.forEach((_, i) => center[i].style.color = color);
	document.body.style.setProperty('background-color', color);
};

export const bottomBars = ({canvas, ctx, samplesBuffer, frequencyWidth}) => {
	samplesBuffer.forEach((value, i) => {
		ctx.beginPath();
		ctx.moveTo(frequencyWidth*i, canvas.height);
		ctx.lineTo(frequencyWidth*i, (canvas.height - value));
		ctx.stroke();
	});
};

export const topBars = ({ctx, samplesBuffer, frequencyWidth}) => {
	samplesBuffer.forEach((value, i) => {
		ctx.beginPath();
		ctx.moveTo(frequencyWidth*i, 0);
		ctx.lineTo(frequencyWidth*i, value);
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
	const ampScale = amplitude*(1/255);
	//filter out noise
	let filter = 1;
	let alphaAmplitude = 0;
	if (amplitude>80){
		alphaAmplitude = ampScale;
		filter = 1;
	} else if (amplitude<=80){
		alphaAmplitude = ampScale*0.01;
		filter = 0;
	}

	const normalizedFrequency = indexOfMax(frequencyBuffer)/analyser.fftSize;
	const colorAmplitude = Math.round(-amplitude)*filter;
	const colorL = Math.abs((colorAmplitude)*(80/255)+100).toFixed(2)+'%';
	const colorS = Math.abs((colorAmplitude)*(10/255)+100).toFixed(2)+'%';
	const color = `hsl(${hsla[0]+(Math.round(360*normalizedFrequency)*10)}, ${colorS}, ${colorL})`;
	const alpha = alphaAmplitude;

	//draw
	samplesBuffer.forEach((value, i) => {
		ctx.beginPath();
		ctx.moveTo(frequencyWidth*i, (canvas.height - value)+alpha*2);
		ctx.lineTo(frequencyWidth*i, (canvas.height - value));
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
	const ampScale = amplitude*(1/255);
	//filter out noise
	let filter = 1;
	let alphaAmplitude = 0;
	if (amplitude>80){
		alphaAmplitude = ampScale;
		filter = 1;
	}
	if (amplitude<=80){
		alphaAmplitude = ampScale;
		filter = 0.9;
	}
	const normalizedFrequency = indexOfMax(frequencyBuffer)/analyser.fftSize;
	const colorAmplitude = Math.round(-amplitude)*filter;
	const colorL = Math.abs((colorAmplitude)*(80/255)+100).toFixed(2)+'%';
	const colorS = Math.abs((colorAmplitude)*(10/255)+100).toFixed(2)+'%';
	const color = `hsl(${hsla[0]+(Math.round(360*normalizedFrequency)*10)}, ${colorS}, ${colorL})`;
	const alpha = alphaAmplitude;
	//draw
	samplesBuffer.forEach((value, i) => {
		ctx.beginPath();
		ctx.moveTo(frequencyWidth*i/alpha, (canvas.height - value));
		ctx.quadraticCurveTo(frequencyWidth*i/alpha*10, frequencyWidth*i*alpha*normalizedFrequency, frequencyWidth*i/alpha*10,frequencyWidth*i*alpha*normalizedFrequency);
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
	const ampScale = amplitude*(1/255);
	//filter out noise
	let filter = 1;
	let alphaAmplitude = 0;
	if (amplitude>80){
		alphaAmplitude = ampScale;
		filter = 1;
	}
	if (amplitude<=80){
		alphaAmplitude = ampScale;
		filter = 0.9;
	}
	const normalizedFrequency = indexOfMax(frequencyBuffer)/analyser.fftSize;
	const colorAmplitude = Math.round(-amplitude)*filter;
	const colorL = Math.abs((colorAmplitude)*(80/255)+100).toFixed(2)+'%';
	const colorS = Math.abs((colorAmplitude)*(10/255)+100).toFixed(2)+'%';
	const color = `hsl(${hsla[0]+(Math.round(360*normalizedFrequency)*10)}, ${colorS}, ${colorL})`;
	const alpha = alphaAmplitude;
	//draw
	samplesBuffer.forEach((value, i) => {
		ctx.beginPath();
		ctx.moveTo(frequencyWidth*i*alpha, (canvas.height - value));
		ctx.quadraticCurveTo(frequencyWidth*i/alpha*10, (frequencyWidth*i)*alpha, frequencyWidth*i/alpha*10,(frequencyWidth*i*alpha));
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
	const ampScale = amplitude*(1/255);
	//filter out noise
	let filter = 1;
	let alphaAmplitude = 0;
	if (amplitude>80){
		alphaAmplitude = ampScale;
		filter = 1;
	}
	if (amplitude<=80){
		alphaAmplitude = ampScale;
		filter = 0.9;
	}
	const normalizedFrequency = indexOfMax(frequencyBuffer)/analyser.fftSize;
	const colorAmplitude = Math.round(-amplitude)*filter;
	const colorL = Math.abs((colorAmplitude)*(80/255)+100).toFixed(2)+'%';
	const colorS = Math.abs((colorAmplitude)*(10/255)+100).toFixed(2)+'%';
	const color = `hsl(${hsla[0]+(Math.round(360*normalizedFrequency)*10)}, ${colorS}, ${colorL})`;
	const alpha = alphaAmplitude;

	//draw
	samplesBuffer.forEach((value, i) => {
		ctx.beginPath();
		// ctx.arc(x, y-50, amplitude, 0, 2 * Math.PI);
		ctx.moveTo(frequencyWidth*i/alpha, ((canvas.height - value)*alpha));
		ctx.quadraticCurveTo(frequencyWidth*i*alpha*normalizedFrequency, (canvas.height - value)*alpha, frequencyWidth*i*alpha*normalizedFrequency, (canvas.height - value)*alpha);
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
	const ampScale = amplitude*(1/255);
	//filter out noise
	let filter = 1;
	let alphaAmplitude = 0;
	if (amplitude>80){
		alphaAmplitude = ampScale;
		filter = 1;
	}
	if (amplitude<=80){
		alphaAmplitude = ampScale;
		filter = 1;
	}
	const normalizedFrequency = indexOfMax(frequencyBuffer)/analyser.fftSize;
	const colorAmplitude = Math.round(-amplitude)*filter;
	const h = hsla[0]+(Math.round(360*normalizedFrequency)*10);
	const colorL = Math.abs((colorAmplitude)*(80/255)+100).toFixed(2)+'%';
	const colorS = Math.abs((colorAmplitude)*(10/255)+100).toFixed(2)+'%';
	const color = `hsl(${hsla[0]+(Math.round(360*normalizedFrequency)*10)}, ${colorS}, ${colorL})`;
	const alpha = alphaAmplitude;

	//draw
	samplesBuffer.forEach((value, i) => {
		ctx.beginPath();
		ctx.moveTo(frequencyWidth*i/alpha, (canvas.height - value)*h);
		ctx.lineTo(frequencyWidth*i*h, (canvas.height - value)/alpha);
		ctx.arc(centerX, centerY+200, amplitude*alpha, 0, Math.PI, 1);
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
	const ampScale = amplitude*(1/255);
	//filter out noise
	let filter = 1;
	let alphaAmplitude = 0;
	if (amplitude>80){
		alphaAmplitude = ampScale;
		filter = 1;
	}
	if (amplitude<=80){
		alphaAmplitude = ampScale;
		filter = 0.9;
	}
	const normalizedFrequency = indexOfMax(frequencyBuffer)/analyser.fftSize;
	const colorAmplitude = Math.round(-amplitude)*filter;
	const h = hsla[0]+(Math.round(360*normalizedFrequency)*10);
	const colorL = Math.abs((colorAmplitude)*(80/255)+100).toFixed(2)+'%';
	const colorS = Math.abs((colorAmplitude)*(10/255)+100).toFixed(2)+'%';
	const color = `hsl(${hsla[0]+(Math.round(360*normalizedFrequency)*10)}, ${colorS}, ${colorL})`;
	const alpha = alphaAmplitude;

	//draw
	samplesBuffer.forEach((value, i) => {
		ctx.beginPath();
		ctx.strokeStyle = color;
		ctx.globalAlpha = alpha;
		ctx.moveTo(frequencyWidth*i*h, (canvas.height - value)*h);
		ctx.lineTo((frequencyWidth*i*h), -((canvas.height - value)/alpha)*2);
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
	const ampScale = amplitude*(1/255);
	//filter out noise
	let filter = 1;
	let alphaAmplitude = 0;
	if (amplitude>80){
		alphaAmplitude = ampScale;
		filter = 1;
	}
	if (amplitude<=80){
		alphaAmplitude = ampScale;
		filter = 0.1;
	}
	const normalizedFrequency = indexOfMax(frequencyBuffer)/analyser.fftSize;
	const colorAmplitude = Math.round(-amplitude)*filter;
	const colorL = Math.abs((colorAmplitude)*(80/255)+100).toFixed(2)+'%';
	const colorS = Math.abs((colorAmplitude)*(10/255)+100).toFixed(2)+'%';
	const color = `hsl(${hsla[0]+(Math.round(360*normalizedFrequency)*10)}, ${colorS}, ${colorL})`;
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
	const ampScale = amplitude*(1/255);
	//filter out noise
	let filter = 1;
	let alphaAmplitude = 0;
	if (amplitude>80){
		alphaAmplitude = ampScale;
		filter = 1;
	}
	if (amplitude<=80){
		alphaAmplitude = ampScale;
		filter = 0.9;
	}
	if (amplitude<=300){
	}
	const normalizedFrequency = indexOfMax(frequencyBuffer)/analyser.fftSize;
	const colorAmplitude = Math.round(-amplitude)*filter;
	const colorL = Math.abs((colorAmplitude)*(80/255)+100).toFixed(2)+'%';
	const colorS = Math.abs((colorAmplitude)*(10/255)+100).toFixed(2)+'%';
	const h = hsla[0]+(Math.round(360*normalizedFrequency)*10);
	const color = `hsl(${hsla[0]+(Math.round(360*normalizedFrequency)*10)}, ${colorS}, ${colorL})`;
	const alpha = alphaAmplitude;

	//draw
	ctx.beginPath();
	const gradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, random(100*alpha,3000*alpha)/alpha);
	gradient.addColorStop(0, `hsla(${h}, ${colorS}, ${colorL}, 0)`);
	gradient.addColorStop(1, `hsla(${h}, ${colorS}, ${colorL}, ${random(0,1)})`);
	ctx.fillStyle = gradient;
	ctx.arc(centerX, centerY, amplitude*alpha, 0, 2 * Math.PI);
	ctx.fill();
	ctx.strokeStyle = color;
	ctx.globalAlpha = alpha;
	ctx.stroke();
};

export const fadingDot = ({ctx, frequencyBuffer, analyser, centerX, centerY}) => {
	const amplitude = Math.max(...frequencyBuffer);
	const normalizedFrequency = indexOfMax(frequencyBuffer)/analyser.fftSize;
	const hue = Math.round(360*normalizedFrequency)*10;

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

	const mouseX = mousePosition.x/canvas.width;
	const mouseY = mousePosition.y/canvas.width;

	const centerRelationX = mouseX - 1;
	const centerRelationY = mouseY - 0.5;

	const centerRelationFlippedX = 1 - mouseX;
	const centerRelationFlippedY = 0.5 - mouseY;

	const newPositionX = cache.lastPositionX + centerRelationX*cache.speed;
	const newPositionY = cache.lastPositionY + centerRelationY*cache.speed;

	const newPositionFlippedX = cache.lastPositionFlippedX + centerRelationFlippedX*cache.speed;
	const newPositionFlippedY = cache.lastPositionFlippedY + centerRelationFlippedY*cache.speed;

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
