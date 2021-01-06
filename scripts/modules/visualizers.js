import { indexOfMax } from "./utils.js";

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

export const bottomWaves = (canvas, ctx, freqs, fftSize, arr, space, x, y) => {
	const amplitude = Math.max(...freqs);
	const ampScale = amplitude*(1/255);
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
	const colorL = Math.abs((colorAmplitude)*(100/255)+100).toFixed(2)+'%';
	const colorS = Math.abs((colorAmplitude)*(50/255)+100).toFixed(2)+'%';
	const color = `hsl(${Math.round(360*normalizedFrequency)*10}, ${colorS}, ${colorL})`;
	const alpha = alphaAmplitude;
	arr.forEach((value, i) => {
		ctx.beginPath();
		ctx.moveTo(space*i, (canvas.height - value)+alpha*2);
		ctx.lineTo(space*i, (canvas.height - value));
		ctx.fill();
		ctx.strokeStyle = color;
		ctx.globalAlpha = alpha;
		ctx.stroke();
	});
};


export const sunRays = (canvas, ctx, freqs, fftSize, arr, space, x, y) => {
	const amplitude = Math.max(...freqs);
	const ampScale = amplitude*(1/255);
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
	const colorL = Math.abs((colorAmplitude)*(100/255)+100).toFixed(2)+'%';
	const colorS = Math.abs((colorAmplitude)*(50/255)+100).toFixed(2)+'%';
	const color = `hsl(${Math.round(360*normalizedFrequency)*10}, ${colorS}, ${colorL})`;
	const alpha = alphaAmplitude;
	arr.forEach((value, i) => {
		ctx.beginPath();
		ctx.moveTo(space*i, (canvas.height - value)+alpha);
		ctx.quadraticCurveTo(space*i/normalizedFrequency, -(space*i/ampScale), space*i/normalizedFrequency,space*i*ampScale);
		ctx.fill();
		ctx.strokeStyle = color;
		ctx.globalAlpha = alpha;
		ctx.stroke();
	});
};

export const dot = (ctx, freqs, fftSize, x, y) => {
	const amplitude = Math.max(...freqs);
	const ampScale = amplitude*(1/255);
	let filter = 1;
	let alphaAmplitude = 0;
	if (amplitude>5){
		alphaAmplitude = ampScale;
		filter = 1;
	}
	if (amplitude<=5){
		alphaAmplitude = ampScale*0.01;
		filter = 0;
	}
	const normalizedFrequency = indexOfMax(freqs)/fftSize;	
	const colorAmplitude = Math.round(-amplitude)*filter;
	const colorL = Math.abs((colorAmplitude)*(100/255)+100).toFixed(2)+'%';
	const colorS = Math.abs((colorAmplitude)*(50/255)+100).toFixed(2)+'%';
	const color = `hsl(${Math.round(360*normalizedFrequency)*10}, ${colorS}, ${colorL})`;
	const alpha = alphaAmplitude;

	ctx.beginPath();
	ctx.arc(x, y, amplitude, 0, 2 * Math.PI);
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
