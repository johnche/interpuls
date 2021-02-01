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
export const range = (end) => {
	return [...Array(end + 1).keys()].slice(1);
};

// Fisher-Yates shuffle
export const shuffleArray = (l) => {
	const arrayCopy = [...l];
	for (let i = arrayCopy.length -1; i > 0; i--) {
		const j = Math.floor(Math.random() * i);
		const temp = arrayCopy[i];
		arrayCopy[i] = arrayCopy[j];
		arrayCopy[j] = temp;
	}

	return arrayCopy;
};

export const indexOfMax = (l) => {
	return l.reduce((i_max, val, i, arr) => {
		//console.log(val);
		return (val > arr[i_max]) ? i : i_max
	}, 0);
}

export const hexToHSL = (H) => {
	// Convert hex to RGB first
	let r = 0, g = 0, b = 0;
	if (H.length == 4) {
	  r = "0x" + H[1] + H[1];
	  g = "0x" + H[2] + H[2];
	  b = "0x" + H[3] + H[3];
	} else if (H.length == 7) {
	  r = "0x" + H[1] + H[2];
	  g = "0x" + H[3] + H[4];
	  b = "0x" + H[5] + H[6];
	}
	// Then to HSL
	r /= 255;
	g /= 255;
	b /= 255;
	let cmin = Math.min(r,g,b),
		cmax = Math.max(r,g,b),
		delta = cmax - cmin,
		h = 0,
		s = 0,
		l = 0;
  
	if (delta == 0)
	  h = 0;
	else if (cmax == r)
	  h = ((g - b) / delta) % 6;
	else if (cmax == g)
	  h = (b - r) / delta + 2;
	else
	  h = (r - g) / delta + 4;
  
	h = Math.round(h * 60);
  
	if (h < 0)
	  h += 360;
  
	l = (cmax + cmin) / 2;
	s = delta == 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));
	s = +(s * 100).toFixed(1);
	l = +(l * 100).toFixed(1);
  
	return [h,s,l];
  }

export function debounce(func, timeout) {
    var timeout_id;

    return function() {
        var me = this,
            args = arguments;

        clearTimeout(timeout_id);

        timeout_id = setTimeout(function()
        {
            func.apply(me, Array.prototype.slice.call(args));
        }, timeout);
    };
}