import '../lib/howler/dist/howler.js';
import Visualizer from './Visualizer.js';
import { sleep, range, shuffleArray } from './utils.js';

export default class FeldmanMachine {
	constructor(htmlElements, mediaHelper) {
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
			currentCategory: 'medium',
			current: {
				category: 'medium',
				howlerTrack: null,
				startTimestamp: null,
				finishTimestamp: null
			},
			recordedTimestamp: Date.now(),
		};

		this._progressBar = htmlElements.progressBar;
		this._progressAnimationid = window.requestAnimationFrame(this.progressBarLoop);

		//(new Howl({src: 'assets/phantom.ogg'})).play();
		// Howler creates AudioContext after sound is played
		this.playSound();
		this._analyser = Howler.ctx.createAnalyser();
		Howler.masterGain.connect(this._analyser);

		this.visualizer = new Visualizer(htmlElements, this._analyser, 44100);
	}

	progressBarLoop = () => {
		this.animationId = window.requestAnimationFrame(this.progressBarLoop);
		if (this.state.current.howlerTrack?.playing() ?? false) {
			const duration = this.state.current.howlerTrack.duration()*10;
			const playbackPosition = Date.now() - this.state.current.startTimestamp;
			const playbackPercentage = playbackPosition/duration;
			this._progressBar.style.width = `${playbackPercentage}%`;
		}
		else {
			this._progressBar.style.width = '0';
		}
	};

	updateTimestamp = () => this.state.recordedTimestamp = Date.now();

	getAnalyser = () => this._analyser;

	getDir = (category) => {
		const index = this.state[category].directoryIndex;
		return this.state[category].directoryList[index];
	}

	getTrack = (category) => this.state[category].track;

	getCurrentTrackPath = () =>  {
		const category = this.state.current.category;
		return `./assets/audio/${category}/${this.getDir(category)}/${this.getTrack(category)}.wav`
	};

	setCategory = (newCategory) => {
		this.state.current.category = newCategory;
		this.updateDirectory(newCategory);
	};

	scrambleDirectories = (category) => {
		this.state[category].directoryList = shuffleArray(this.state[category].directoryList);
	};

	resetDirectory = (category) => {
		this.scrambleDirectories(category);
		this.state[category].directoryIndex = 0;
	};

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
	};

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
				this.state.current.startTimestamp = null;
				this.state.current.finishTimestamp = Date.now();
				console.log('onend', this.state);
			}
		});
		sound.play();
		
		this.state.current.howlerTrack = sound;
		this.state.current.startTimestamp = Date.now();
		this.state.current.finishTimestamp = null;
	};

	feldmanMedium = (delta, currentTrack) => {
		if (currentTrack && delta < (0.50*currentTrack.duration()*1000)) {
			this.setCategory('short');
		}
		else {
			this.updateTrack('medium');
		}
	};

	feldmanShort = (delta, currentTrack, silenceDuration) => {
		this.visualizer.updateColors();

		// track is playing and very fast click since last click
		if (currentTrack && delta < (0.10*currentTrack.duration()*1000)) {
			this.setCategory('aggro');
		}
		else if (silenceDuration > 1000) {
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

		this.visualizer.clear(this.visualizer.visualizerContext);
		switch (this.state.current.category) {
			case 'medium':
				this.feldmanMedium(delta, currentTrack);
				break;
			case 'short':
				this.feldmanShort(delta, currentTrack, silenceDuration);
				break;
			case 'aggro':
				this.feldmanAggro(silenceDuration);
				break;
		};

		this.updateTimestamp();
		this.playSound();
		this.mediaHelper.play(this.getCurrentTrackPath());
	};
}
