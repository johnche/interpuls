import FeldmanMachine from './modules/FeldmanMachine.js';
import MediaHelper from './modules/MediaHelper.js';
import Visualizer from './modules/Visualizer.js';
import { rothkoUpdate } from './modules/rothko.js';

const main = async () => {

	const res = await fetch('/media.php');
	const mediaData = await res.json()
	const mediaHelper = new MediaHelper(mediaData);

	const messenger = { newTrack: false };

	const feldmanMachine = new FeldmanMachine(mediaHelper, messenger);
	const visualizer = new Visualizer(feldmanMachine.getAnalyser(), 44100, messenger);

	const onClick = 'ontouchstart' in window ? 'touchstart' : 'click';

	document.getElementById("new").onclick = rothkoUpdate;
	document.body.addEventListener(onClick, feldmanMachine.click, true);
};

main();
