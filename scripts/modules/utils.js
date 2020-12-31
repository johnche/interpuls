export const asyncForEach = async (l, cb) => {
	for (let i = 0; i < l.length; i++) {
		await cb(l[i], i, l);
	}
};

export const sleep = (ms) => {
	return new Promise(resolve => setTimeout(resolve, ms));
};

export const leftPadZero = (num, length) => num.toString().padStart(length, '0');

export const random = (min, max) => {
	return Math.floor(Math.random()*(max-min+1)) + min;
};

export const waitForClick = (htmlElement) => {
	return new Promise(resolve => htmlElement.onclick = resolve);
};

// assuming
// 	- end > start
// 	- start >= 0
// 	- array includes end
// range(4) -> [1, 2, 3, 4]
export const range(end) {
	return [...Array(end).keys()].slice(1);
};

// Fisher-Yates shuffle
export const shuffleArray = (l) => {
	const arrayCopy = [...l];
	for (let i = arrayCopy.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * i);
		const temp = arrayCopy[i];
		array[i] = array[j];
		array[j] = temp;
	}

	return arrayCopy;
};
