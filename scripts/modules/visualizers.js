import { indexOfMax, hexToHSL, random } from "./utils.js";
import { counter } from "./FeldmanMachine.js";
import { getRothko } from './rothko.js';
import { textList, textCounter } from "./text.js";
export let randomList = 0;
export let alphaValue = 0;

export const bottomBars = (canvas, ctx, arr, space) => {
	arr.forEach((value, i) => {
		ctx.beginPath();
		ctx.moveTo(space*i, canvas.height);
		ctx.lineTo(space*i, (canvas.height - value));
		ctx.stroke();
	});
};

export const topBars = (ctx, arr, space) => {
	arr.forEach((value, i) => {
		ctx.beginPath();
		ctx.moveTo(space*i, 0);
		ctx.lineTo(space*i, value);
		ctx.stroke();
	});
};

export const bottomWaves = (canvas, ctx, freqs, fftSize, arr, space) => {
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
	const amplitude = Math.max(...freqs);
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
	const normalizedFrequency = indexOfMax(freqs)/fftSize;
	const colorAmplitude = Math.round(-amplitude)*filter;
	const colorL = Math.abs((colorAmplitude)*(80/255)+100).toFixed(2)+'%';
	const colorS = Math.abs((colorAmplitude)*(10/255)+100).toFixed(2)+'%';
	const color = `hsl(${hsla[0]+(Math.round(360*normalizedFrequency)*10)}, ${colorS}, ${colorL})`;
	const alpha = alphaAmplitude;
	//draw
	arr.forEach((value, i) => {
		ctx.beginPath();
		ctx.moveTo(space*i, (canvas.height - value)+alpha*2);
		ctx.lineTo(space*i, (canvas.height - value));
		ctx.strokeStyle = color;
		ctx.globalAlpha = alpha;
		ctx.stroke();
	});
};

export const sunRays = (canvas, ctx, freqs, fftSize, arr, space) => {
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
	const amplitude = Math.max(...freqs);
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
	const normalizedFrequency = indexOfMax(freqs)/fftSize;
	const colorAmplitude = Math.round(-amplitude)*filter;
	const colorL = Math.abs((colorAmplitude)*(80/255)+100).toFixed(2)+'%';
	const colorS = Math.abs((colorAmplitude)*(10/255)+100).toFixed(2)+'%';
	const color = `hsl(${hsla[0]+(Math.round(360*normalizedFrequency)*10)}, ${colorS}, ${colorL})`;
	const alpha = alphaAmplitude;
	//draw
	arr.forEach((value, i) => {
		ctx.beginPath();
		ctx.moveTo(space*i/alpha, (canvas.height - value));
		ctx.quadraticCurveTo(space*i/alpha*10, space*i*alpha*normalizedFrequency, space*i/alpha*10,space*i*alpha*normalizedFrequency);
		ctx.fill();
		ctx.strokeStyle = color;
		ctx.globalAlpha = alpha;
		ctx.stroke();
	});
};

export const sunWaves = (canvas, ctx, freqs, fftSize, arr, space) => {
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
	const amplitude = Math.max(...freqs);
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
	const normalizedFrequency = indexOfMax(freqs)/fftSize;
	const colorAmplitude = Math.round(-amplitude)*filter;
	const colorL = Math.abs((colorAmplitude)*(80/255)+100).toFixed(2)+'%';
	const colorS = Math.abs((colorAmplitude)*(10/255)+100).toFixed(2)+'%';
	const color = `hsl(${hsla[0]+(Math.round(360*normalizedFrequency)*10)}, ${colorS}, ${colorL})`;
	const alpha = alphaAmplitude;
	//draw
	arr.forEach((value, i) => {
		ctx.beginPath();
		ctx.moveTo(space*i*alpha, (canvas.height - value));
		ctx.quadraticCurveTo(space*i/alpha*10, (space*i)*alpha, space*i/alpha*10,(space*i*alpha));
		ctx.fill();
		ctx.strokeStyle = color;
		ctx.globalAlpha = alpha;
		ctx.stroke();
	});
};

export const colorField = (canvas, ctx, freqs, fftSize, arr, space, x, y) => {
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
	const amplitude = Math.max(...freqs);
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
	const normalizedFrequency = indexOfMax(freqs)/fftSize;
	const colorAmplitude = Math.round(-amplitude)*filter;
	const h = hsla[0]+(Math.round(360*normalizedFrequency)*10);
	const colorL = Math.abs((colorAmplitude)*(80/255)+100).toFixed(2)+'%';
	const colorS = Math.abs((colorAmplitude)*(10/255)+100).toFixed(2)+'%';
	const color = `hsl(${hsla[0]+(Math.round(360*normalizedFrequency)*10)}, ${colorS}, ${colorL})`;
	const alpha = alphaAmplitude;

	//draw
	arr.forEach((value, i) => {
		ctx.beginPath();
		// ctx.arc(x, y-50, amplitude, 0, 2 * Math.PI);
		ctx.moveTo(space*i/alpha, ((canvas.height - value)*alpha));
		ctx.quadraticCurveTo(space*i*alpha*normalizedFrequency, (canvas.height - value)*alpha, space*i*alpha*normalizedFrequency, (canvas.height - value)*alpha);
		ctx.strokeStyle = color;
		ctx.globalAlpha = alpha;
		ctx.stroke();
	});
};

export const sunRise = (canvas, ctx, freqs, fftSize, arr, space, x, y) => {
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
	const amplitude = Math.max(...freqs);
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
	const normalizedFrequency = indexOfMax(freqs)/fftSize;
	const colorAmplitude = Math.round(-amplitude)*filter;
	const h = hsla[0]+(Math.round(360*normalizedFrequency)*10);
	const colorL = Math.abs((colorAmplitude)*(80/255)+100).toFixed(2)+'%';
	const colorS = Math.abs((colorAmplitude)*(10/255)+100).toFixed(2)+'%';
	const color = `hsl(${hsla[0]+(Math.round(360*normalizedFrequency)*10)}, ${colorS}, ${colorL})`;
	const alpha = alphaAmplitude;

	//draw
	arr.forEach((value, i) => {
		ctx.beginPath();
		ctx.moveTo(space*i/alpha, (canvas.height - value)*h);
		ctx.lineTo(space*i*h, (canvas.height - value)/alpha);
		ctx.arc(x, y+200, amplitude*alpha, 0, Math.PI, 1);
		ctx.strokeStyle = color;
		ctx.globalAlpha = alpha;
		ctx.stroke();
		ctx.beginPath();
	});
};

export const textile = (canvas, ctx, freqs, fftSize, arr, space) => {
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
	const amplitude = Math.max(...freqs);
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
	const normalizedFrequency = indexOfMax(freqs)/fftSize;
	const colorAmplitude = Math.round(-amplitude)*filter;
	const h = hsla[0]+(Math.round(360*normalizedFrequency)*10);
	const colorL = Math.abs((colorAmplitude)*(80/255)+100).toFixed(2)+'%';
	const colorS = Math.abs((colorAmplitude)*(10/255)+100).toFixed(2)+'%';
	const color = `hsl(${hsla[0]+(Math.round(360*normalizedFrequency)*10)}, ${colorS}, ${colorL})`;
	const alpha = alphaAmplitude;

	//draw
	arr.forEach((value, i) => {
		ctx.beginPath();
		ctx.strokeStyle = color;
		ctx.globalAlpha = alpha;
		ctx.moveTo(space*i*h, (canvas.height - value)*h);
		ctx.lineTo((space*i*h), -((canvas.height - value)/alpha)*2);
		ctx.stroke();
	});
};

export const dot = (ctx, freqs, fftSize, x, y) => {
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
	const amplitude = Math.max(...freqs);
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
	const normalizedFrequency = indexOfMax(freqs)/fftSize;
	const colorAmplitude = Math.round(-amplitude)*filter;
	const colorL = Math.abs((colorAmplitude)*(80/255)+100).toFixed(2)+'%';
	const colorS = Math.abs((colorAmplitude)*(10/255)+100).toFixed(2)+'%';
	const color = `hsl(${hsla[0]+(Math.round(360*normalizedFrequency)*10)}, ${colorS}, ${colorL})`;
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

export const fillDot = (ctx, freqs, fftSize, x, y) => {
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
	const amplitude = Math.max(...freqs);
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
	const normalizedFrequency = indexOfMax(freqs)/fftSize;
	const hue = Math.round(360*normalizedFrequency)*10;
	const colorAmplitude = Math.round(-amplitude)*filter;
	const colorL = Math.abs((colorAmplitude)*(80/255)+100).toFixed(2)+'%';
	const colorS = Math.abs((colorAmplitude)*(10/255)+100).toFixed(2)+'%';
	const h = hsla[0]+(Math.round(360*normalizedFrequency)*10);
	const color = `hsl(${hsla[0]+(Math.round(360*normalizedFrequency)*10)}, ${colorS}, ${colorL})`;
	const alpha = alphaAmplitude;

	//draw
	ctx.beginPath();
	const gradient = ctx.createRadialGradient(x, y, 0, x, y, random(100*alpha,3000*alpha)/alpha);
	gradient.addColorStop(0, `hsla(${h}, ${colorS}, ${colorL}, 0)`);
	gradient.addColorStop(1, `hsla(${h}, ${colorS}, ${colorL}, ${random(0,1)})`);
	ctx.fillStyle = gradient;
	ctx.arc(x, y, amplitude*alpha, 0, 2 * Math.PI);
	ctx.fill();
	ctx.strokeStyle = color;
	ctx.globalAlpha = alpha;
	ctx.stroke();
};

export const fadingDot = (ctx, freqs, fftSize, x, y) => {
	const amplitude = Math.max(...freqs);
	const normalizedFrequency = indexOfMax(freqs)/fftSize;
	const hue = Math.round(360*normalizedFrequency)*10;

	ctx.beginPath();
	const gradient = ctx.createRadialGradient(x, y, 1, x, y, amplitude);
	gradient.addColorStop(0, `hsla(${hue}, 100%, 50%, 1)`);
	gradient.addColorStop(1, `hsla(${hue}, 100%, 50%, 0)`);
	ctx.fillStyle = gradient;
	ctx.arc(x, y, amplitude, 0, 2 * Math.PI);
	ctx.fill();
};
