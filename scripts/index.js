//import { test, audioPlay } from './modules/audio/utils.js';
import FeldmanMachine from './modules/FeldmanMachine.js';
import MediaHelper from './modules/MediaHelper.js';

const main = async () => {
	const res = await fetch('/media.php');
	const mediaData = await res.json()
	const mediaHelper = new MediaHelper(mediaData);

	const feldmanMachine = new FeldmanMachine(mediaHelper);

	document.body.addEventListener('click', feldmanMachine.click, true);
};

main();
