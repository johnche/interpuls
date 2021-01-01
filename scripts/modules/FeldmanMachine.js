import '../lib/howler/dist/howler.js';
import { sleep, range, shuffleArray } from './utils.js';

export default class FeldmanMachine {
	constructor(mediaHelper) {
		this.mediaHelper = mediaHelper;
		this.state = {
			medium: {
				directoryList: range(this.mediaHelper.getNumDirs('medium')),
				directoryIndex: 0,
				track: 1
			},
			short: {
				directoryList: range(this.mediaHelper.getNumDirs('short')),
				directoryIndex: 0,
				track: 1
			},
			aggro: {
				directoryList: range(this.mediaHelper.getNumDirs('aggro')),
				directoryIndex: 0,
				track: 1
			},
			current: {
				category: 'medium',
				howlerTrack: null,
				finishTimestamp: null
			},
			recordedTimestamp: Date.now(),
		};
	}

	updateTimestamp = () => this.state.recordedTimestamp = Date.now();

	getDir = (category) => {
		const index = this.state[category].directoryIndex;
		return this.state[category].directoryList[index];
	}

	getTrack = (category) => this.state[category].track;

	getCurrentTrackPath = () =>  {
		const category = this.state.current.category;
		return `./assets/audio/${category}/${this.getDir(category)}/${this.getTrack(category)}.ogg`
	}

	setCategory = (newCategory) => {
		this.state.current.category = newCategory;
		this.updateDirectory(newCategory);
	};

	scrambleDirectories = (category) => {
		this.state[category].directoryList = shuffleArray(this.state[category].directoryList);
	}

	resetDirectory = (category) => {
		this.scrambleDirectories(category);
		this.state[category].directoryIndex = 0;
	}

	incDirectory = (category) => this.state[category].directoryIndex++;
	resetTrack = (category) => this.state[category].track = 1;
	incTrack = (category) => this.state[category].track++;

	updateTrack = (category) => {
		const currentDir = this.getDir(category);
		const currentTrack = this.getTrack(category);

		this.mediaHelper.isTrackOverflow(category, currentDir, currentTrack)
			? this.updateDirectory(category)
			: this.incTrack(category);
	};

	updateDirectory = (category) => {
		this.resetTrack(category);

		this.mediaHelper.isDirOverflow(category, this.getDir(category))
			? this.resetDirectory(category)
			: this.incDirectory(category);
	};

	stopTrack = async (howlerTrack) => {
		howlerTrack.fade(1, 0, 200);
		await sleep(200);
		howlerTrack.stop();
	}

	// Time duration, finishTimestamp
	playSound = () => {
		if (this.state.current.howlerTrack?.playing ?? false) {
			this.stopTrack(this.state.current.howlerTrack);
		}

		// debug
		const category = this.state.current.category;
		console.log('playing', category, this.getDir(category), this.getTrack(category));
		const sound = new Howl({
			src: [this.getCurrentTrackPath()],
			onend: () => {
				this.state.current.finishTimestamp = Date.now();
				console.log('onend', this.state);
			}
		});
		sound.play();
		
		this.state.current.howlerTrack = sound;
		this.state.current.finishTimestamp = null;
	};

	feldmanMedium = (delta, currentTrack) => {
		if (currentTrack && delta < (0.10*currentTrack.duration()*1000)) {
			this.setCategory('short');
		}
		else {
			this.updateTrack('medium');
		}
	};

	feldmanShort = (delta, currentTrack, silenceDuration) => {
		if (currentTrack && delta < (0.10*currentTrack.duration()*1000)) {
			this.setCategory('aggro');
		}
		else if (silenceDuration > 2000) {
			this.setCategory('medium');
		}
		else {
			this.updateTrack('short');
		}
	};

	feldmanAggro = (silenceDuration) => {
		if (silenceDuration > 1000 && silenceDuration <= 2000) {
			this.setCategory('short');
		}
		else if (silenceDuration > 2000) {
			this.setCategory('medium');
		}
		else {
			this.updateTrack('aggro');
		}

	};

	click = () => {
		const now = Date.now();
		const delta = now - this.state.recordedTimestamp;
		const currentTrack = this.state.current.howlerTrack;
		const silenceDuration = this.state.current.finishTimestamp
			? now - this.state.current.finishTimestamp
			: 0;

		switch (this.state.current.category) {
			case 'medium':
				this.feldmanMedium(delta, currentTrack);
				break;
			case 'short':
				this.feldmanShort(delta, currentTrack);
				break;
			case 'aggro':
				this.feldmanAggro(silenceDuration);
				break;
		};

		this.updateTimestamp();
		this.playSound();
		console.log('end of click', this.state);
	};
}
