//import { test, audioPlay } from './modules/audio/utils.js';
import FeldmanMachine from './modules/feldman.js';

const main = async () => {
	const res = await fetch('/media.php');
	const mediaData = await res.json()
	const feldmanMachine = new FeldmanMachine(mediaData);

	document.body.addEventListener('click', feldmanMachine.click, true);
};

main();
