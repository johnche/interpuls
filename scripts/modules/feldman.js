import '../lib/howler/dist/howler.js';
import { range } from './utils.js';

export default class FeldmanMachine {
	constructor(mediaData) {
		// To be set when FeldmanMachine is called
		// object with category as key, and array as val,
		// array index as directory number and array value
		// as number of tracks in directory.
		this.mediaData = mediaData;
		this.state = {
			medium: {
				directoryList: range(mediaData.medium.length),
				directory: 1,
				track: 1
			},
			short: {
				directoryList: range(mediaData.short.length),
				directory: 1,
				track: 1
			},
			aggro: {
				directoryList: range(mediaData.aggro.length),
				directory: 1,
				track: 1
			},
			current: {
				category: 'medium',
				howlerTrack: null,
				finishTimestamp: null
			},
			recordedTimestamp: Date.now(),
			lastFinishTimestamp: null // fill this out when audio finishes playing
		};
	}

	updateTimestamp = () => this.state.recordedTimestamp = Date.now();

	// TODO: scramble directory order here
	resetDirectory = (category) => this.state[category].directory = 1;
	incDirectory = (category) => this.state[category].directory++;
	resetTrack = (category) => this.state[category].track = 1;
	incTrack = (category) => this.state[category].track++;

	updateTrack = (category) => {
		const numTracks = this.mediaData[category];
		const currentTrack = this.state[category].track;
		const overflow = currentTrack >= numTracks;

		overflow ? this.resetTrack(directory) : this.incTrack(category);
	};

	updateDirectory = (category) => {
		const numDirs = this.mediaData[category].length;
		const currentDir = this.state[category].directory;
		const overflow = currentDir >= numDirs;

		overflow ? this.resetDirectory(category) : this.incDirectory(category);
		this.resetTrack(category);
	};

	setCategory = (newCategory) => {
		this.state.current.category = newCategory;
		this.updateDirectory(newCategory);
	};

	getNextTrackPath = () => {
		const category = this.state.current.category;
		const directory = this.state[category].directory;
		const track = this.state[category].track;
		return `./assets/audio/${category}/${directory}/${track}`;
	};

	// Time duration, finishTimestamp
	playSound = () => {
		this.state.current.howlerTrack.fade(1, 0, 200);
		const sound = new Howl({src: [this.getNextTrackPath()]});
		sound.play();
		this.state.current.howlerTrack = sound;
		this.state.current.finishTimestamp = null;
	};

	feldmanMedium = (now, delta, silenceDuration) => {
		const trackOverflow = state.medium.track >= mediaData.medium[state.medium.directory];

		if (silenceDuration < 0.75 || delta < 0.25*this.state.current.howlerTrack.duration()) {
			this.setCategory('short');
		}
		else if (trackOverflow) {
			this.updateDirectory('medium');
		}
		else {
			this.incTrack('medium');
		}
	};

	feldmanShort = (now, delta, silenceDuration) => {
		const trackOverflow = state.short.track >= mediaData.short[state.short.directory];

		if (silenceDuration < 0.5 || delta < 0.25*this.state.current.howlerTrack.duration()) {
			this.setCategory('aggro');
		}
		else if (silenceDuration > 2) {
			this.setCategory('medium');
		}
		else if (trackOverflow) {
			this.updateDirectory('short');
		}
		else {
			this.incTrack('short');
		}
	};

	feldmanAggro = (now, delta, silenceDuration) => {
		const trackOverflow = state.aggro.track >= mediaData.aggro[state.aggro.directory];

		if (silenceDuration > 1 && silenceDuration <= 2) {
			this.setCategory('short');
		}
		else if (silenceDuration > 2) {
			this.setCategory('medium');
		}
		else if (trackOverflow) {
			this.updateDirectory('aggro');
		}
		else {
			this.incTrack('aggro');
		}

	};

	click = () => {
		const now = Date.now();
		const delta = now - this.state.recordedTimestamp;
		const silenceDuration = this.state.current.finishTimestamp
			? now - this.state.current.finishTimestamp
			: 0;

		//switch (this.state.current.category) {
		//	case 'medium':
		//		this.feldmanMedium(now, delta, silenceDuration);
		//		break;
		//	case 'short':
		//		this.feldmanShort(now, delta, silenceDuration);
		//		break;
		//	case 'aggro':
		//		this.feldmanAggro(now, delta, silenceDuration);
		//		break;
		//};
		//this.playSound();

		this.updateTimestamp();
		const sound = new Howl({src: ['./assets/audio/aggro/1/1.ogg']})
		const hid = sound.play();
		console.log(sound.duration());
		console.log(this.mediaData);
	};
}
