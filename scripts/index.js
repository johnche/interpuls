import FeldmanMachine from './modules/FeldmanMachine.js';
import MediaHelper from './modules/MediaHelper.js';

const main = async () => {
	const htmlElements = {
		progressBar: document.getElementById("progressBar"),
		canvas: document.getElementById('audio_visual'),
		visualizer: document.getElementById("visualizer")
	}

	const res = await fetch('/media.php');
	const mediaData = await res.json()
	const mediaHelper = new MediaHelper(mediaData);

	const feldmanMachine = new FeldmanMachine(htmlElements, mediaHelper);

	const onClick = 'ontouchstart' in window ? 'touchstart' : 'click';

	//document.getElementById("new").onclick = rothkoUpdate;
	document.body.addEventListener(onClick, feldmanMachine.click, true);
};

main();
