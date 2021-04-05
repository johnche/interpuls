import { indexOfMax, hexToHSL, random } from "./utils.js";
import { counter } from "./FeldmanMachine.js";
import { getRothko } from './rothko.js';

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
	frequencyWidth
}) => {
	//change background-color to rothko-color
	var center = document.querySelectorAll(".center");
	for(var i = 0; i < center.length; i++){
	console.log(center[i].style.color);
	center[i].style.color = getRothko().background;
	}
	document.body.style.setProperty('background-color', getRothko().background);
	//change to next color in colorList from rothko whenever feldman short has been triggered
	const colorH = getRothko().colorList[counter];
	//convert hex to HSL
	const hsla = hexToHSL(colorH);
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
	frequencyWidth
}) => {
	//change background-color to rothko-color
	var center = document.querySelectorAll(".center");
	for(var i = 0; i < center.length; i++){
	console.log(center[i].style.color);
	center[i].style.color = getRothko().background;
	}
	document.body.style.setProperty('background-color', getRothko().background);
	//change to next color in colorList from rothko whenever feldman short has been triggered
	const colorH = getRothko().colorList[counter];
	//convert hex to HSL
	const hsla = hexToHSL(colorH);
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
	frequencyWidth
}) => {
	//change background-color to rothko-color
	var center = document.querySelectorAll(".center");
	for(var i = 0; i < center.length; i++){
	console.log(center[i].style.color);
	center[i].style.color = getRothko().background;
	}
	document.body.style.setProperty('background-color', getRothko().background);
	//change to next color in colorList from rothko whenever feldman short has been triggered
	const colorH = getRothko().colorList[counter];
	//convert hex to HSL
	const hsla = hexToHSL(colorH);
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
	frequencyWidth
}) => {
	//change background-color to rothko-color
	var center = document.querySelectorAll(".center");
	for(var i = 0; i < center.length; i++){
	console.log(center[i].style.color);
	center[i].style.color = getRothko().background;
	}
	document.body.style.setProperty('background-color', getRothko().background);
	//change to next color in colorList from rothko whenever feldman short has been triggered
	const colorH = getRothko().colorList[counter];
	//convert hex to HSL
	const hsla = hexToHSL(colorH);
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
	centerY
}) => {
	//change background-color to rothko-color
	var center = document.querySelectorAll(".center");
	for(var i = 0; i < center.length; i++){
	console.log(center[i].style.color);
	center[i].style.color = getRothko().background;
	}
	document.body.style.setProperty('background-color', getRothko().background);
	//change to next color in colorList from rothko whenever feldman short has been triggered
	const colorH = getRothko().colorList[counter];
	//convert hex to HSL
	const hsla = hexToHSL(colorH);
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
	frequencyWidth
}) => {
	//change background-color to rothko-color
	var center = document.querySelectorAll(".center");
	for(var i = 0; i < center.length; i++){
	console.log(center[i].style.color);
	center[i].style.color = getRothko().background;
	}
	document.body.style.setProperty('background-color', getRothko().background);
	//change to next color in colorList from rothko whenever feldman short has been triggered
	const colorH = getRothko().colorList[counter];
	//convert hex to HSL
	const hsla = hexToHSL(colorH);
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

export const dot = ({ctx, frequencyBuffer, analyser, centerX, centerY}) => {
	//change background-color to rothko-color
	var center = document.querySelectorAll(".center");
	for(var i = 0; i < center.length; i++){
	console.log(center[i].style.color);
	center[i].style.color = getRothko().background;
	}
	document.body.style.setProperty('background-color', getRothko().background);
	//change to next color in colorList from rothko whenever feldman short has been triggered
	const colorH = getRothko().colorList[counter];
	//convert hex to HSL
	const hsla = hexToHSL(colorH);
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

export const fillDot = ({ctx, frequencyBuffer, analyser, centerX, centerY}) => {
	//change background-color to rothko-color
	var center = document.querySelectorAll(".center");
	for(var i = 0; i < center.length; i++){
	console.log(center[i].style.color);
	center[i].style.color = getRothko().background;
	}
	document.body.style.setProperty('background-color', getRothko().background);
	//change to next color in colorList from rothko whenever feldman short has been triggered
	const colorH = getRothko().colorList[counter];
	//convert hex to HSL
	const hsla = hexToHSL(colorH);
	const amplitude = Math.max(...frequencyBuffer);
	//scale amplitude
	const ampScale = amplitude*(1/255);
	//filter out noise
	let filter = 1;
	let alphaAmplitude = 0;
	let fillFilter = 1;
	if (amplitude>80){
		alphaAmplitude = ampScale;
		filter = 1;
		fillFilter = 0;
	}
	if (amplitude<=80){
		alphaAmplitude = ampScale;
		filter = 0.9;
	}
	if (amplitude<=300){
		fillFilter = 1;
	}
	const normalizedFrequency = indexOfMax(frequencyBuffer)/analyser.fftSize;
	const hue = Math.round(360*normalizedFrequency)*10;
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
