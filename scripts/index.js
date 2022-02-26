import FeldmanMachine from './modules/FeldmanMachine.js';
import MediaHelper from './modules/MediaHelper.js';
import { isTouchUnit } from './modules/utils.js';

function resize() {
	//resizing all objects
	const h = document.documentElement.clientHeight;
	const w = document.documentElement.clientWidth;
	const fontRatio = 0.03;
	const fontSize = fontRatio * h;
	const buttonWRatio = 0.1;
	const buttonW = w * buttonWRatio;
	const buttonHRatio = 0.05;
	const buttonH = h * buttonHRatio;
	document.getElementById('textContainer').style.fontSize = fontSize + 'px';
	document.getElementById('audio_visual').width = w;
	document.getElementById('audio_visual').height = h;
	document.getElementById('control-style').style.width = buttonW + 'px';
	document.getElementById('control-style').style.height = buttonH + 'px';
	document.getElementById('control-color').style.height = buttonH + 'px';
	document.getElementById('control-color').style.width = buttonW + 'px';
	document.getElementById('control-fullscreen').style.width = buttonW + 'px';
	document.getElementById('control-fullscreen').style.height = buttonH + 'px'
	console.log(h);
	console.log(fontSize);
}

//add this!!
document.addEventListener("orientationchange", function (event) {
	//deprecated?https://developer.mozilla.org/en-US/docs/Web/API/Window/orientationchange_event
	switch (window.orientation) {

		case -90: case 90:
			/* Device is in landscape mode */
			break;
		default:
		/* Device is in portrait mode */
	}
});

const main = async () => {
	const canvas = document.createElement('canvas');
	const w = document.documentElement.clientWidth;
	const h = document.documentElement.clientHeight;
	canvas.id = 'audio_visual';
	canvas.width = w;
	canvas.height = 0.98 * h;
	document.body.appendChild(canvas);
	console.log(screen.height);

	/////trying to figure out how to get the mouse back after pressing fullscreen in visualizer.js line 67///
	// function keyPress (e) {
	// 	if(e.key === "Escape") {
	// 		document.getElementById('audio_visual').style.cursor = 'default';
	// 	}
	// }

	if (isTouchUnit == true && document.documentElement.clientWidth <= 750) {
		//if touch and iphone resize all buttons to a larger degree
		const IbuttonSize = 48;
		document.getElementById('control-style').style.width = IbuttonSize + 'px';
		document.getElementById('control-style').style.height = IbuttonSize + 'px';
		document.getElementById('control-color').style.height = IbuttonSize + 'px';
		document.getElementById('control-color').style.width = IbuttonSize + 'px';
		document.getElementById('control-fullscreen').style.width = IbuttonSize + 'px';
		document.getElementById('control-fullscreen').style.height = IbuttonSize + 'px'
	}
	if (isTouchUnit == true && document.documentElement.clientWidth > 750) {
		//if touch still resize all buttons to a larger degree
		const IbuttonSize = 48;
		document.getElementById('control-style').style.width = IbuttonSize + 'px';
		document.getElementById('control-style').style.height = IbuttonSize + 'px';
		document.getElementById('control-color').style.height = IbuttonSize + 'px';
		document.getElementById('control-color').style.width = IbuttonSize + 'px';
		document.getElementById('control-fullscreen').style.width = IbuttonSize + 'px';
		document.getElementById('control-fullscreen').style.height = IbuttonSize + 'px'
	}
	if (isTouchUnit == false) {
		const buttonWRatio = 0.1;
		const buttonW = w * buttonWRatio;
		const buttonHRatio = 0.05;
		const buttonH = h * buttonHRatio;
		document.getElementById('control-style').style.width = buttonW + 'px';
		document.getElementById('control-style').style.height = buttonH + 'px';
		document.getElementById('control-color').style.height = buttonH + 'px';
		document.getElementById('control-color').style.width = buttonW + 'px';
		document.getElementById('control-fullscreen').style.width = buttonW + 'px';
		document.getElementById('control-fullscreen').style.height = buttonH + 'px'
		//You will not resize with an iphone, or ipad I assume.. 
		window.addEventListener('resize', resize);
	}
	//change fontsize
	const fontRatio = 0.03;
	const fontSize = canvas.height * fontRatio;
	document.getElementById('textContainer').style.fontSize = fontSize + 'px';

	const htmlElements = {
		canvas,
		progressBar: document.getElementById('progressBar'),
		styleButton: document.getElementById('control-style'),
		colorButton: document.getElementById('control-color'),
		fullscreenButton: document.getElementById('control-fullscreen'),
	};

	const res = await fetch('/media.php');
	const mediaData = await res.json()
	const mediaHelper = new MediaHelper(mediaData);

	const feldmanMachine = new FeldmanMachine(htmlElements, mediaHelper);

	const onClick = isTouchUnit ? 'touchstart' : 'click';
	document.body.addEventListener(onClick, feldmanMachine.click, true);
};

main();
