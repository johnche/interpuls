import FeldmanMachine from './modules/FeldmanMachine.js';
import MediaHelper from './modules/MediaHelper.js';
import Visualizer from './modules/Visualizer.js';

const main = async () => {
	const res = await fetch('/media.php');
	const mediaData = await res.json()
	const mediaHelper = new MediaHelper(mediaData);

	const feldmanMachine = new FeldmanMachine(mediaHelper);
	const visualizer = new Visualizer(feldmanMachine.getAnalyser(), 44100);

	document.body.addEventListener('click', feldmanMachine.click, true);
};

main();
