import FeldmanMachine from './modules/FeldmanMachine.js';
import MediaHelper from './modules/MediaHelper.js';

const main = async () => {
	const canvas = document.createElement('canvas');
	canvas.id = 'audio_visual';
	canvas.width = document.documentElement.clientWidth;
	canvas.height = 0.98*document.documentElement.clientHeight;
	document.body.appendChild(canvas);

	const htmlElements = {
		canvas,
		progressBar: document.getElementById("progressBar"),
		visualizer: document.getElementById("visualizer")
	}

	const res = await fetch('/media.php');
	const mediaData = await res.json()
	const mediaHelper = new MediaHelper(mediaData);

	const feldmanMachine = new FeldmanMachine(htmlElements, mediaHelper);

	const onClick = 'ontouchstart' in window ? 'touchstart' : 'click';
	document.body.addEventListener(onClick, feldmanMachine.click, true);
};

main();