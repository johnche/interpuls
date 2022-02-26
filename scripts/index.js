import FeldmanMachine from './modules/FeldmanMachine.js';
import MediaHelper from './modules/MediaHelper.js';
import { isTouchUnit } from './modules/utils.js';



//add this!!
window.addEventListener("orientationchange", function () {
	function resize() {
		const client = JSON.parse(window.localStorage.getItem('client'));
		const w = client['width'];
		const h = client['height'];
		//resizing all objects
		const fontRatio = 0.03;
		const fontSize = fontRatio * h;
		const buttonWRatio = 0.15;
		const buttonW = w * buttonWRatio;
		const buttonHRatio = 0.03;
		const buttonH = h * buttonHRatio;
		// document.getElementById('textContainer').style.fontSize = fontSize + 'px';
		document.getElementById('audio_visual').width = h;
		document.getElementById('audio_visual').height = w;
		document.getElementById('control-style').style.width = buttonW + 'px';
		document.getElementById('control-style').style.height = buttonH + 'px';
		document.getElementById('control-color').style.height = buttonH + 'px';
		document.getElementById('control-color').style.width = buttonW + 'px';
		document.getElementById('control-fullscreen').style.width = buttonW + 'px';
		document.getElementById('control-fullscreen').style.height = buttonH + 'px'
		console.log('resized succesfully');
	}
	// Announce the new orientation number
	if (this.window.orientation == 0) {
		const client = JSON.parse(window.localStorage.getItem('client'));
		const w = client['width'];
		const h = client['height'];
		const buttonWRatio = 0.15;
		const buttonW = w * buttonWRatio;
		const buttonHRatio = 0.03;
		const buttonH = h * buttonHRatio;
		document.getElementById('audio_visual').width = w;
		document.getElementById('audio_visual').height = h;
		document.getElementById('control-style').style.width = buttonW + 'px';
		document.getElementById('control-style').style.height = buttonH + 'px';
		document.getElementById('control-color').style.height = buttonH + 'px';
		document.getElementById('control-color').style.width = buttonW + 'px';
		document.getElementById('control-fullscreen').style.width = buttonW + 'px';
		document.getElementById('control-fullscreen').style.height = buttonH + 'px'
		console.log('resized succesfully for original orientation');
	}
	if (this.window.orientation == 90) {
		resize();
	}
	if (this.window.orientation == -90) {
		resize();
	}
	console.log(this.window.orientation);
	console.log('has changed orientation');
	console.log('height = ' + document.documentElement.clientHeight + ' width = ' + document.documentElement.clientWidth);
	console.log(this.screen.height);
	// resize();
}, false);

const main = async () => {
	const client = {};
	client.width = document.documentElement.clientWidth;
	client.height = document.documentElement.clientHeight;
	window.localStorage.setItem('client', JSON.stringify(client));
	const canvas = document.createElement('canvas');
	const w = document.documentElement.clientWidth;
	const h = document.documentElement.clientHeight;
	const buttonWRatio = 0.15;
	const buttonW = w * buttonWRatio;
	const buttonHRatio = 0.03;
	const buttonH = h * buttonHRatio;
	document.getElementById('control-style').style.width = buttonW + 'px';
	document.getElementById('control-style').style.height = buttonH + 'px';
	document.getElementById('control-color').style.height = buttonH + 'px';
	document.getElementById('control-color').style.width = buttonW + 'px';

	canvas.id = 'audio_visual';
	canvas.width = w;
	canvas.height = h;
	document.body.appendChild(canvas);

	if (isTouchUnit == true && w / h < 1) {
		document.getElementById("fullscreen-button").style.display = "none";
		//if touch and iphone resize all buttons to a larger degree
		console.log('is phone' + document.documentElement.clientWidth);
		const fontRatio = 0.025;
		const fontSize = canvas.height * fontRatio;
		// document.getElementById('textContainer').style.fontSize = fontSize + 'px';
		const wRatio = 0.1;
		const IbuttonSizeW = canvas.width * wRatio;
		const hRatio = 0.03;
		const IbuttonSizeH = canvas.height * hRatio;
		document.getElementById('control-style').style.width = IbuttonSizeW * 2 + 'px';
		document.getElementById('control-style').style.height = IbuttonSizeH + 'px';
		document.getElementById('control-style').style.fontSize = fontSize * 0.8 + 'px';
		document.getElementById('control-color').style.width = IbuttonSizeW * 2 + 'px';
		document.getElementById('control-color').style.height = IbuttonSizeH + 'px';
		document.getElementById('control-color').style.fontSize = fontSize * 0.8 + 'px';
		document.getElementById('control-fullscreen').style.width = IbuttonSizeW * 2 + 'px';
		document.getElementById('control-fullscreen').style.height = IbuttonSizeH + 'px';
		document.getElementById('control-fullscreen').style.fontSize = fontSize * 0.8 + 'px';
	}
	if (isTouchUnit == true && h / w < 1) {
		document.getElementById("fullscreen-button").style.display = "none";
		//if touch still resize all buttons to a larger degree
		console.log('is tablet' + document.documentElement.clientWidth);
		const fontRatio = 0.03;
		const fontSize = canvas.height * fontRatio;
		// document.getElementById('textContainer').style.fontSize = fontSize + 'px';
		const wRatio = 0.1;
		const IbuttonSizeW = canvas.width * wRatio;
		const hRatio = 0.03;
		const IbuttonSizeH = canvas.height * hRatio;
		document.getElementById('control-style').style.width = IbuttonSizeW * 2 + 'px';
		document.getElementById('control-style').style.height = IbuttonSizeH + 'px';
		document.getElementById('control-style').style.fontSize = fontSize * 0.8 + 'px';
		document.getElementById('control-color').style.width = IbuttonSizeW * 2 + 'px';
		document.getElementById('control-color').style.height = IbuttonSizeH + 'px';
		document.getElementById('control-color').style.fontSize = fontSize * 0.8 + 'px';
		document.getElementById('control-fullscreen').style.width = IbuttonSizeW * 2 + 'px';
		document.getElementById('control-fullscreen').style.height = IbuttonSizeH + 'px';
		document.getElementById('control-fullscreen').style.fontSize = fontSize * 0.8 + 'px';
	}
	if (isTouchUnit == false) {
		const fontRatio = 0.03;
		const fontSize = canvas.height * fontRatio;
		// document.getElementById('textContainer').style.fontSize = fontSize + 'px';
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
	}
	//change fontsize

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
