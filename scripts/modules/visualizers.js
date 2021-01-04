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

export const bottomWaves = (canvas, ctx, arr, space) => {
	arr.forEach((value, i) => {
		ctx.beginPath();
		ctx.moveTo(space*i, (canvas.height - value + 1));
		ctx.lineTo(space*i, (canvas.height - value));
		ctx.stroke();
	});
};

export const dot = (ctx, freqs, fftSize, x, y) => {
	const amplitude = Math.max(...freqs);
	const normalizedFrequency = indexOfMax(freqs)/fftSize;
	const color = `hsl(${Math.round(360*normalizedFrequency)*10}, 100%, 50%)`;
	//const color = `rgb(${freqs[0]}, ${freqs[0]}, ${freqs[0]})`;

	ctx.beginPath();
	ctx.arc(x, y, amplitude, 0, 2 * Math.PI);
	ctx.fillStyle = color;
	ctx.strokeStyle = color;
	ctx.fill();
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
